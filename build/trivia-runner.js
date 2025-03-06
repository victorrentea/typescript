"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trivia_1 = require("./trivia");
class TriviaRunner {
    static main() {
        const game = new trivia_1.Trivia();
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");
        let notAWinner;
        do {
            game.roll(Math.floor(Math.random() * 6) + 1);
            if (Math.floor(Math.random() * 10) == 7) {
                notAWinner = game.wrongAnswer();

                
            }
            else {
                notAWinner = game.wasCorrectlyAnswered();
            }
        } while (notAWinner);
    }
}
exports.TriviaRunner = TriviaRunner;
TriviaRunner.main();
