import {expect} from "chai";


type Client = {
    name: string;
    address: string;
}
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]:  () => T[K];
};
type ClientGetters = Getters<Client>;
// type clientType = {
//     getName: () => string;
//     getAddress: () => string;
// }
function f(client: ClientGetters) {
    client.getName();
}

