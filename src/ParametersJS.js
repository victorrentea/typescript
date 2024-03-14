export function createMenu(config0) {
    // const config = Object.assign(
    //     {
    //         body: "N/A",
    //         cancellable: false
    //     },
    //     config0
    // );
    const config = {
        body: "N/A",
        cancellable: false,
        ...config0
    };
    console.log("Inside: ", config);
}

createMenu({title: "title", body: "body", cancellable: true});
createMenu({title: "title", body: "body"});
createMenu({title: "title"});