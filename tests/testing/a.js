// Cucumber and chai have been loaded in the browser
import * as Cucumber from "@cucumber/cucumber";

var setWorldConstructor = Cucumber.setWorldConstructor;
var Given = Cucumber.Given;
var When = Cucumber.When;
var Then = Cucumber.Then;
var expect = chai.expect;

///// World /////
//
// Call 'setWorldConstructor' with to your custom world (optional)
//

var CustomWorld = function() {
    this.variable = 0;
};

CustomWorld.prototype.setTo = function(number) {
    this.variable = parseInt(number);
};

CustomWorld.prototype.incrementBy = function(number) {
    this.variable += parseInt(number);
};

setWorldConstructor(CustomWorld);

///// Step definitions /////
//
// use 'Given', 'When' and 'Then' to declare step definitions
//

Given('Given1', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


When('I increment the variable by {int}', function(number) {
    this.incrementBy(number);
});

Then('the variable should contain {int}', function(number) {
    expect(this.variable).to.eql(number)
});
