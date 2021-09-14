enum OrderStatus {
    DRAFT="DRAFT", // in cart
    PLACED="PLACED",
    SHIPPED="SHIPPED",
}
export  class OrderBilling {
    constructor(
        public readonly name:string,
        public readonly address:string,
        public readonly country:string,
        public readonly VATCode:string ) {
    }

    get euVATCode() {
        return this.country + this.VATCode;
    }
}
interface Repo {}


export class Shipment { // Aggregate Root de sine statator.
    public orderId: string;
    // >>>20 campuri
}

export class ShipmentService {
    // @EventListener
    // public createShipmentOnOrderPlace(orderPlacedEvent: OrderPlacedEvent) {
        // log("Incep eventul")
        // try {
        //     let shipment = new Shipment();
        //     http.get-- > 500
        //     shipment.orderId = orderPlacedEvent.orderId;
        //     repo.save()
        // } catch (e) {
        //     //retry-uri multe, ca-s norocos in viata, ca cand eram mic am mancat
        //     email.send("cosmin@", "GHINION: Trezirea, orderId=" +
        //         orderPlacedEvent.orderId + "> success la log! sau correlationId="+headerVenitPeQueueMessage);
        // }
    // }
}

export class Order { // Aggregate Root ====== DDD
    public  id:number;
    private _orderLines: Array<OrderLine> = []; // 1M
    private _totalPrice: number = 0;
    private _status: OrderStatus;
    private _shipDate: Date;


    // @OneToOne
    // public billing: OrderBilling;

    // public setOrderLineCount(product:Product, newCount:number, repo:OrderLineRepo) { // okish
    //     if (status nu e bun) {
    //         throw
    //     }
    //     OrderLine orderLine = repo.findByProduct(product.id);
    //     repo.deleteBy..
    //     repo.save(new OrderLine())
    // }

    constructor(orderLines: Array<OrderLine>) {
        if (!orderLines || !orderLines.length) {
            throw new Error("Min 1 line");
        }

        // this._orderLines= new Array(...orderLines);
        // this._totalPrice = this.computeTotalPri// ce();

        // orderLines.forEach(line => this.addOrderLine(line));
        // orderLines.forEach(this.addOrderLine, this);
        for (const orderLine of orderLines) {
            this.addProduct(orderLine.productId, orderLine.price, orderLine.count); // Hint: putem reveni la addProduct(OrderLine) din nou; TODO :)
        }
    }
    get status(): OrderStatus {
        return this._status;
    }
    get shipDate(): Date {
        return this._shipDate;
    }

    public markAsShipped() { // incapsuleaza regula: poti face SHIP doar dupa PLACE, si date trebuie automat retinut
        if (this._status != OrderStatus.PLACED) {
            throw new Error("Can only ship a PLACED order");
        }
        this._status = OrderStatus.SHIPPED;
        this._shipDate = new Date();

        // TODO emit OrderPlacedEvent(id) > ce credeti ca urmeaza:
        // a)  (mai lightweight)
        // b) pui intr-un queue
        // this._shipment = new Shipment();
        // case study: eventurile raman asociate intr-o tabela cu agregatul,
        // si la un moment dat le dau drumul (fire)
        // apoi un dispatcher livreaza eventurile in aceeasi aplicatie.
        // in acelasi thread.
        // in aceeasi Tranzactie :
        // >>> ? handlingul eventului aruncat dintr-un agregat il procesezi in:
        // (A) in aceeasi TX --> NU pot aparea inconsistenta
        // (B) in alta TX sau
        // (C) nu aveai la inceput (auto-commit) ~= B
    }

    get orderLines(): ReadonlyArray<OrderLine> {
        return this._orderLines;
    }
    get totalPrice(): number {
        return this._totalPrice;
    }


    public addProduct(productId: ProductId, price:number, count: number) {
        if (this.status == OrderStatus.PLACED) throw new Error("Order is frozen");

        let existingLine = this._orderLines.find(line => line.productId === productId);
        if (existingLine) {
            this._orderLines.splice(this._orderLines.findIndex(line => line.equals(existingLine)), 1);
            let newCount = count + existingLine.count;
            this._orderLines.push(new OrderLine(productId, price, newCount));
        } else {
            this._orderLines.push(new OrderLine(productId, price, count));
        }
        this._totalPrice = this.computeTotalPrice();
    }

    private computeTotalPrice() {
        return this._orderLines.reduce((acc, line) => acc + line.price, 0);
    }

    public removeOrderLine(lineToRemove: OrderLine) {
        if (this._orderLines.length == 1) {
            throw new Error("Macar o linie sa ramana");
        }
        this._orderLines.splice(this._orderLines.findIndex(line => line.equals(lineToRemove)),1);
        this._totalPrice = this.computeTotalPrice();
    }

    // public place() {
    // TODO reevaluate prices. assign and freeze order.
    //     status =
    //     placeDate=
    //     publish(new OrdeRPlacedEvent(id));
    // }
}
class OrderCSVExporter {
    public export(line: OrderLine, productMap ) {
        // let productVO = productMap[line.productId]
        // let ol: OrderLine = new OrderLine();

        //solutia1: +1 call --> poate lovi performanta
        // let product = productService.getProduct(ol.productId);

        //solutia2: denormalizare (clonare de date) --> poate cauza inconsistente.
        // ol.product.name
        // let csvLine = ol.productId + ";" + ol.product.name + ";";
    }
}
class ProductVO {
    constructor(
        private readonly id: number,
        private readonly name: string,
        private readonly price: number,
                ) {
    }
}
export class ProductId { // ID type
    constructor(public readonly id?: string) {
        if (!id) {
            // id= newUUID
        }
    }
}
new ProductId();
export class OrderLine {// child Entity, part of the Order Aggregate
    // constructor(public readonly product: ProductVO,
    constructor(public readonly productId: ProductId,
                public readonly productPrice: number,
                // public readonly productName: number,
                public readonly count: number) {
        if (count <= 0) {
            throw new Error("Count must be > 0")
        }
        if (!productId) {
            throw new Error("Product must be set");
        }
    }

    get price() { // pure function
        return this.count * this.productPrice;
    }

    public equals(other: OrderLine) {
        return other.count === this.count &&
            other.productId === this.productId;
    }
}

// export class OrderLineVO {
//     constructor(public readonly product: Product, public readonly count: number) {
//     }
// }

export class Product {
    public name: string;
    public description: string;
    constructor(public id : string, public price: number) {
    }

    equals(other: Product) { // TODO
        return true;
    }
}


// to test:
function cancelOrder(order: Order)
{
    console.log("Sending email: order#"+order.id + " was cancelled");
}



class TestData { // Object Mother
    // public static aPlacedOrder(object: Object):Order {
    //     this.aValidOrder().place().ship();
    // }
    public static aValidOrder(object: Object):Order {
        let orderLine = new OrderLine(new ProductId("P1"),10,  2);
        return Object.assign(new Order([orderLine]), object);
    }
}

// TEST:
let order1 = TestData.aValidOrder({id:13/*, totalPrice:13*/});
cancelOrder(order1);
console.log(order1.totalPrice)



let orderLine = new OrderLine(new ProductId("P1"), 10, 2);
let order = new Order([orderLine]);


// orderLine = new  OrderLine("P2", 3, 3);
order.addProduct(new ProductId("P2"), 3, 3);

// order.orderLines[0].addCount(1);

order.addProduct(new ProductId("P2"),4,  1); // price is silently set to 4.



console.log(order.totalPrice)


interface OrderRepo {
    findById(orderId: number): Order;
}
interface PriceService {
    findPriceFor(productId: ProductId): number;
}


export class OrderController {
    constructor(private orderRepo:OrderRepo) {

    }

    // public getOrder(id:number):Order {
    //     return this.orderRepo.findById(id);
    // }
}
// stateless, nu au decat dependinte la alt ob stateless (Service,Repo..)
export class OrderApplicationService { // Application Service < AS // FACADE
    constructor(private readonly orderService:OrderService,
                private readonly orderRepo: OrderRepo,
                private readonly priceService: PriceService) {
    }

    public findOrderById(id:number): Order {
        // return this.orderService.findOrderById(id);
        return this.orderRepo.findById(id);
    }
    public addProductToOrder(orderId: number, productId: ProductId, count:number) { // api unic, fara pret!
        let order:Order = this.orderRepo.findById(orderId);

        let price = this.priceService.findPriceFor(productId); // REST call -- uneori facut degeaba // daca ai heavy caching nu-ti pasa.

        order.addProduct(productId, price, count);
    }
}

export class OrderService { // Domain Service < DS
    constructor(private orderRepo: OrderRepo, messageSender, emailSender,altServiciu) {
    }
    //Event Handler aka Fire and Forget
    public onOrderPlaced(orderPlacedEvent: OrderPlacedEvent):void {

    }
    public bizLogic(param) {

    }
    public placeOrder(order: Order) {
        // let date = alteServiciiExterne.call();
        // order.place(date);
        // repo.save(order);
    }
    //
    // findOrderById(id: number) {
    //     return this.orderRepo.findById(id);
    // }
}

class OrderPlacedEvent {
}


// order.orderLines.splice()

// orderRepo.save(order, tx);
// TX 1 COMMIT

 // eventul tau
// shipmentRepo.save(shipment, tx);