import {Trivia} from "./trivia";
import {expect, jest, test} from '@jest/globals';
import {describe} from "mocha";


// it('should filter car models', () => {
//     jest.spyOn
//     console.log(models);
//     expect(models).to.contain(fordFocusMk2);
// });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function runIt(game: any): void {
    game.add("Chet");
    game.add("Pat");
    game.add("Sue");

    let notAWinner;
    do {
        game.roll(Math.floor(Math.random() * 6) + 1);

        if (Math.floor(Math.random() * 10) == 7) {
            notAWinner = game.wrongAnswer();
        } else {
            notAWinner = game.wasCorrectlyAnswered();
        }

    } while (notAWinner);
}


function someComplexFunction() {
    console.log("some important message");
    console.log("some other message");

    return 42;
}

// test case for someComplexFunction()
describe('Test someComplexFunction', () => {
    test('Console log should have been called', () => {
        const logSpy = jest.spyOn(global.console, 'log');

        someComplexFunction();

        const output = logSpy.mock.calls.map(param => param[0]).join("\n");
        console.log(output);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('some important message');
        expect(logSpy.mock.calls).toContainEqual(['some other message']);

        logSpy.mockRestore();
    });
});
