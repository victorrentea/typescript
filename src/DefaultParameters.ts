type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

export function createMenu(config: MenuConfig) {
    // NO: noisy, changes parameter state
    // config.title = config.title || 'Foo';
    // config.body = config.body || 'Bar';
    // config.buttonText = config.buttonText || 'Baz';
    // config.cancellable = config.cancellable !== undefined ? config.cancellable : true;

    // ** Object.assign
    // let myConfig = Object.assign({
    //     title:"Foo",
    //     body:"Bar",
    //     buttonText:"Baz",
    //     cancellable: true
    // }, config);

    // NO: myConfig is not instanceof MenuConfig anymote
    // ** Object.assign
    let myConfig: MenuConfig = {
        title:"Foo",
        body:"Bar",
        buttonText:"Baz",
        cancellable: true,
        ...config // spread operator
    };
    console.log("Inside: ", myConfig);
}

export function createMenu2({ title = 'Foo', body = 'BarDefault', buttonText = 'Baz', cancellable = true }: MenuConfig) {
    console.log("Inside: ", title);
}

