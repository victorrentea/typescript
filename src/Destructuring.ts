type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function m(x) {
    x.f();
}

class MenuConfigClass {
    public title: string = "Foo";
    public body: string = "Bar";
    public buttonText: string = "Baz";
    public cancellable: boolean = true;
    public data: any;
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


    // let myConfig = {
    //     title:"Foo",
    //     body:"Bar",
    //     buttonText:"Baz",
    //     cancellable: true,
    //     ...config
    // };


    let myConfig: MenuConfigClass = {
        ...new MenuConfigClass(),
        ...config
    };
    console.log("Inside: ", myConfig);
}



export function createMenu2({ title = 'Foo', body = 'BarDefault', buttonText = 'Baz', cancellable = true }: MenuConfig) {


    console.log("Inside: ", title);
}

