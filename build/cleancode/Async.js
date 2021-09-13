"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const request_1 = require("request");
function downloadPage(url, saveTo, callback) {
    request_1.get(url, (error, response) => {
        if (error) {
            callback(error);
        }
        else {
            writeFile(saveTo, response.body, (error) => {
                if (error) {
                    callback(error);
                }
                else {
                    callback(null, response.body);
                }
            });
        }
    });
}
function writeFile(path, data, callback) {
}
exports.writeFile = writeFile;
// TODO Promise<string>
downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html', (error, content) => {
    if (error) {
        console.error(error);
    }
    else {
        console.log(content);
    }
});
// Also thrown errors:
// function calculateTotal(items: Item[]): number {
//   throw new Error('Not implemented.');
// }
/////////// also errors: -----------
class User {
}
function getUser() {
    return __awaiter(this, void 0, void 0, function* () { return new User(); });
}
function sendEmail(email, subject) {
    return __awaiter(this, void 0, void 0, function* () { });
}
// getUser()
//     .then((user: User) => {
//         return sendEmail(user.email, 'Welcome!');
//     }).catch()
;
// try {
//     let user = await getUser();
//     let data = await sendEmail(user.email, 'Welcome!');
// } catch (e) {
// }
// TODO async await
