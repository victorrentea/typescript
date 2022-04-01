function defaultErrorHandler(err, index, item) {
    return (
        "Whoops... Something went wrong while importing. Here is the error: \n" +
        err +
        "\n" +
        "This error happened while importing this product: \n" +
        `items[${index}] => ${item}`
    );
}

function defaultContinueErrorHandler(arrayOfItems) {
    console.log(
        "There were some products that didn't quite make the cut. Here is an array of indexes:",
        arrayOfItems
    );
}

const defaultOptions = {
    stopOnFail: true,
    stopOnFailErr: defaultErrorHandler,
    continueOnFailErr: defaultContinueErrorHandler,
};

async function resolveCB(item) {

}

async function rejectCB(item) {

}

export async function apImport(_items, options) {
    if (!Array.isArray(_items))
        throw new TypeError("First parameter must be an array");

    options = {...defaultOptions, ...options};

    const items = [..._items];
    const faultProductsIndex = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // const a = async () => {
        //     try {
        //         return {
        //             success: true,
        //             msg: await resolveCB(item),
        //         };
        //     } catch (err) {
        //         return {
        //             success: false,
        //             msg: await rejectCB(err, item),
        //         };
        //     }
        // };

        let result = await resolveCB(item)
            .then(r => ({
                success: true,
                msg: r
            }))
            .catch(async err => ({
                success: false,
                msg: await rejectCB(err, item)
            }));

        if (!result.success) {
            if (options.stopOnFail) {
                throw new Error(options.stopOnFailErr(result.msg, i, item));
            } else {
                faultProductsIndex.push(i);
            }
        }
    }

    if (!options.stopOnFail && faultProductsIndex.length > 0) {
        options.continueOnFailErr(faultProductsIndex);
    }
}

////////////////


const items = [1];
async function resolveCB(item) {
    console.log('Resolved', item);
    return item;
}
async function rejectCB(err, item) {
    console.log(`Error: ${err} on ${item}`);
}

let promises = items.map(item => resolveCB(item)
        .catch(e => rejectCB(e, item)));
const results = await Promise.all(promises)
console.log(results);
