import {expect} from 'chai';
import {describe, it} from 'mocha';
import {TennisGame} from '../../src/testing/TennisGame';
import {Given, Then} from "@cucumber/cucumber";

interface MockContext {
    service: TennisGame;
}

let context: MockContext = {
    service: null
};

describe('The test environment', () => {
    it('should pass', () => {
        expect(true).to.be.true;
    });

    it("should access game", function () {
        expect(TennisGame).to.not.be.undefined;
    });

});
