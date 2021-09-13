"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRunner = void 0;
const game_1 = require("./game");
class GameRunner {
    static main() {
        const game = new game_1.Game();
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
exports.GameRunner = GameRunner;
GameRunner.main();
