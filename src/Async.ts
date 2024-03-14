import { get } from 'request';

function downloadPage(url: string, saveTo: string, callback: (error: Error|null, content?: string) => void) {
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



// valid examples:
// "test.email+alex@leetcode.com"
// "test.email.leet+alex@code.com"
// "example.email@localhost"
// "test.email@li.cunxin.com"
// "test@domain.com"
// "test_email@doc.com"
// "test.email+cool@chess.com"
// const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//
// const email: string = 'john@gmail.com';
// const result: boolean = expression.test(email); // true
//
// console.log('e-mail is ' + (result ? 'correct' : 'incorrect'));

/////////// also errors: -----------
interface User {
    email:string
}
async function getUser():Promise<User> {return {email:"a@b.com"};}
async function sendEmail(email:string, subject:string):Promise<void> {}

// getUser()
//     .then((user: User) => {
//         return sendEmail(user.email, 'Welcome!');
//     }).catch()


// try {
//     let user = await getUser();
//     let data = await sendEmail(user.email, 'Welcome!');
// } catch (e) {
// }
// TODO async await