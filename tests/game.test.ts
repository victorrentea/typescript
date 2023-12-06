import {expect} from 'chai';
import {describe, it} from 'mocha';
import {TriviaRunner} from '../src/trivia-runner';

describe('The test environment', () => {
    it('should pass', () => {
        expect(true).to.be.true;
    });

    it("should access game", function () {
        expect(TriviaRunner).to.not.be.undefined;
    });

});
