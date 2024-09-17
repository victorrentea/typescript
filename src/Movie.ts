export class Movie {
    constructor(public readonly title: string, public readonly priceCode: number) {
        this.title = title;
        this.priceCode = priceCode;
    }
}