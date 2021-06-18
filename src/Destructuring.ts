type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

export function createMenu(config: MenuConfig) {
    config.title = config.title || 'Foo';
    config.body = config.body || 'Bar';
    config.buttonText = config.buttonText || 'Baz';
    config.cancellable = config.cancellable !== undefined ? config.cancellable : true;
    //TODO Object.assign({}, config);
    // TODO export function createMenu({ title = 'Foo', body = 'BarDefault', buttonText = 'Baz', cancellable = true }: MenuConfig) {


    console.log("Inside: ", config);
}

