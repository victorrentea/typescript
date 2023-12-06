"use strict";
// TODO set defaults to the params
//  - ||
//  - ??
//  - group {params} + defaults
//  - type
//  - config.title = config.title ||
//  - Object.assign(defaults, param)
//  - {defaults, ...spread}
Object.defineProperty(exports, "__esModule", { value: true });
function createMenu(title, body, cancellable) {
    console.log("Inside: ", title, body, cancellable);
}
exports.createMenu = createMenu;
