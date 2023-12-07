
interface PotSiEu extends MenuConfig {// ia uite ce pot sa fac, mai aproape de Java
    iasi: string;
}
// vs 
type MenuConfigType = { // TIPIC pt obiectele interne, sau poate ramai doar cu interface
    title: string;
    body: string;
    cancellable?: boolean;
    image?: string;
};
// 😡:
type MenuConfigType2 = MenuConfigType & {iasi:string} // ia uite ce pot sa fac;
// 💖 vine eventu din JavraScript. cu atr 'selected' -> da tu pe TS nu vezi atr, da ti-l adaugi tu pe tip

// Cine formateaza datele pt UI: FE
// Cine agrega datele pt UI: BE < PERFORMANCE STRIKES

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
//  - nu vreau sa vad vreodata undefined venind pe param/atribute. 💖null, 😡undefined
// > undefined vine daca accesezi o prop care nu exista, sau un parametru care nu e dat, sau let x; < nu linteazea
// > null vine in Dto din Backend de exemplu: {a: null, b: null}

// {a: undefined, b: undefined} OMG!! vine din Adaptoarele de campuri

// dar initializam stateul cu  = undefined -@Adi ~redux

interface MenuConfig { // TIPIC: pt a mapa Dto de la BE
    title: string;
    body: string;
    cancellable?: boolean;
    image?: string;
}
export function createMenu({ title, body, cancellable = false, image = "na.jpg" }: MenuConfig) {// 💖💖💖 za best
    console.log("Inside: ", title, body, cancellable, image);
}

export function createMenu2(c: MenuConfig) {
    // c.cancellable = c.cancellable ?? false; // rau
    // c.image = c.image ?? "na.jpg";
    
    // c = Object.assign({cancellable: false, image: "na.jpg"}, c); //😡

    const { title, body, cancellable, image } = {cancellable: false, image: "na.jpg", ...c}; //💖 😉

    console.log("InsideX: ", title, body, cancellable, image);
}

// null e o valoare, vs undefined e nimicul
// export function createMenu2(title: string, body: string, cancellable?:boolean ) {
//     console.log("Inside1: ", title, body, cancellable || false); // pune false daca e undefined
//     // console.log("Inside2: ", title, body, cancellable ?? false); // pune false daca e undefined sau null
// }

