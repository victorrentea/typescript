// TODO set defaults to the params
//  - ||
//  - ??
//  - group {params} + defaults
//  - type
//  - config.title = config.title ||
//  - Object.assign(defaults, param)
//  - {defaults, ...spread}
//  - explore tuples: let marks:[number, number] = [1, 2]; // tuple of 2 number values

// CRED!
//  - punem tipul la return in semnatura doar daca nu e void
//  - parametrii cheie sunt primii
//  - nu vreau sa vad vreodata undefined venind pe param/atribute. ❤️null, 😡undefined
// > undefined vine daca accesezi o prop care nu exista, sau un parametru care nu e dat, sau let x; < nu linteazea
// > null vine in Dto din Backend de exemplu: {a: null, b: null}

// {a: undefined, b: undefined} OMG!! vine din Adaptoarele de campuri

// dar initializam stateul cu  = undefined -@Adi ~redux

export function createMenu(title: string, body: string, cancellable = false) {
    console.log("Inside: ", title, body, cancellable);
}

// null e o valoare, vs undefined e nimicul
// export function createMenu2(title: string, body: string, cancellable?:boolean ) {
//     console.log("Inside1: ", title, body, cancellable || false); // pune false daca e undefined
//     // console.log("Inside2: ", title, body, cancellable ?? false); // pune false daca e undefined sau null
// }

