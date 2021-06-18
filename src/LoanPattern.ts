export class EmailContext {
    public send(email: Email) {
        console.log("Trying to send " + email);
        return Math.random() > 0.5;
    }
}

class Email {
    private readonly id = Math.floor(Math.random() * 600) + 1;
    public subject: string;
    public body: string;
    public sender: string;
    public replyTo: string;
    public to: string;
}

export class EmailService {

    public sendOrderReceivedEmail(emailAddress: string) {
        let context = new EmailContext(/*smtpConfig,etc*/);
        const MAX_RETRIES = 3;
        try {
            for (let i = 0; i < MAX_RETRIES; i++) {
                let email = new Email(); // constructor generates new unique ID
                email.sender = "noreply@corp.com";
                email.replyTo = "/dev/null";
                email.to = emailAddress;
                email.subject = "Order Received!";
                email.body = "Thank you for your order";

                let success = context.send(email);
                if (success) break;
            }
        } catch (e) {
            throw new Error("Can't send email");
        }
    }
}


function placeOrder() {
    // other logic
    new EmailService().sendOrderReceivedEmail("a@b.com");
}

function shipOrder() {
    // other logic
    // TODO send order shipped email 'similar to how send order received was implemented'
    // TODO URLEncoder.encode
}