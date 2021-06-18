type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function m(x) {
    x.f();
}

export function createMenu(config: MenuConfig) {
    // NU:
    // config.title = config.title || 'Foo';
    // config.body = config.body || 'Bar';
    // config.buttonText = config.buttonText || 'Baz';
    // config.cancellable = config.cancellable !== undefined ? config.cancellable : true;

    // let myConfig = Object.assign({
    //     title:"Foo",
    //     body:"Bar",
    //     buttonText:"Baz",
    //     cancellable: true
    // }, config);
    //

    try {
        let x;

        m(x);
    } catch (e) {
    }

    let myConfig = {
        title:"Foo",
        body:"Bar",
        buttonText:"Baz",
        cancellable: true,
        ...config
    };
    console.log("Inside: ", myConfig);
}

export function createMenu2({ title = 'Foo', body = 'BarDefault', buttonText = 'Baz', cancellable = true }: MenuConfig) {


    console.log("Inside: ", title);
}

