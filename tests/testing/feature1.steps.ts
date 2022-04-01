import {Before, Given, Then} from "@cucumber/cucumber";

Before(() => {
    console.log("ALOHA")
});

Given('Given1', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then(/^Stuff happens$/, function () {
    console.log("stuff");
});