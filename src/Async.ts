import { get } from 'request';

function downloadPage(url: string, saveTo: string, callback: (error: Error, content?: string) => void) {
    get(url, (error, response) => {
        if (error) {
            callback(error);
        } else {
            writeFile(saveTo, response.body, (error) => {
                if (error) {
                    callback(error);
                } else {
                    callback(null, response.body);
                }
            });
        }
    });
}

export function writeFile(path: string , data: string , callback: (error:Error) => void): void {

}
// TODO Promise<string>


downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html', (error, content) => {
    if (error) {
        console.error(error);
    } else {
        console.log(content);
    }
});

// Also thrown errors:
// function calculateTotal(items: Item[]): number {
//   throw new Error('Not implemented.');
// }


/////////// also errors: -----------
class User {
    email:string
}
async function getUser():Promise<User> {return new User();}
async function sendEmail(email:string, subject:string):Promise<void> {}

getUser()
    .then((user: User) => {
        return sendEmail(user.email, 'Welcome!');
    }) // TODO what here  ?
    ;
// TODO async await