"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailContext {
    send(email) {
        console.log("Trying to send " + email);
        return Math.random() > 0.5;
    }
}
exports.EmailContext = EmailContext;
class Email {
    constructor() {
        this.id = Math.floor(Math.random() * 600) + 1;
    }
}
class EmailService {
    sendOrderReceivedEmail(emailAddress) {
        const composer = (email) => {
            email.subject = "Order Received!";
            email.body = "Thank you for your order";
        };
        this.sendEmail(emailAddress, composer);
    }
    sendOrderShippedEmail(emailAddress) {
        const composer = (email) => {
            email.subject = "Order Shipped!";
            email.body = "V-amTrimisComanda";
        };
        this.sendEmail(emailAddress, composer);
    }
    sendEmail(emailAddress, composer) {
        let context = new EmailContext( /*smtpConfig,etc*/);
        const MAX_RETRIES = 3;
        try {
            for (let i = 0; i < MAX_RETRIES; i++) {
                let email = new Email(); // constructor generates new unique ID
                email.sender = "noreply@corp.com";
                email.replyTo = "/dev/null";
                email.to = emailAddress;
                // EmailService.composeEmail(email);
                composer(email);
                let success = context.send(email);
                if (success)
                    break;
            }
        }
        catch (e) {
            throw new Error("Can't send email");
        }
    }
}
exports.EmailService = EmailService;
function placeOrder() {
    // other logic
    new EmailService().sendOrderReceivedEmail("a@b.com");
}
function shipOrder() {
    // other logic
    new EmailService().sendOrderShippedEmail("a@b.com");
    // TODO send order shipped email 'similar to how send order received was implemented'
    // TODO URLEncoder.encode
}
