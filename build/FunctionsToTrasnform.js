"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CombineFunctionsIntoTransform {
    generateQRCode(code) {
        // Call External Service
        return "QR" + code;
    }
    getAddress(eventId) {
        // Call Repository
        return "Location Details of event " + eventId;
    }
    // ----------- a line -------------
    // TODO go through preserve Whole Object
    generateTicket(ticket) {
        let invoice = "Invoice for " + ticket.customerName + "\n";
        invoice += "QR Code: " + this.generateQRCode(ticket.code) + "\n";
        invoice += "Address: " + this.getAddress(ticket.eventId) + "\n";
        invoice += "Please arrive 20 minutes before the start of the event\n";
        invoice += "In case of emergency, call 0899898989\n";
        return invoice;
    }
}
exports.CombineFunctionsIntoTransform = CombineFunctionsIntoTransform;
// ----- SUPPORTING, DUMMY CODE ------
class Ticket {
}
