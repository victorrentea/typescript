export enum PriceCode {
    CHILDREN = "children",
    REGULAR = "regular",
    NEW_RELEASE = "new release",
}

type Rental = {
    movie: Movie;
    basePrice: number;
}

export class Movie {
    constructor(public readonly title: string,
                public readonly priceCode: PriceCode) {
    }
}

export class Customer {
    private rentals: Rental[] = [];

    constructor(private readonly name: string) {
    }

    public addRental(movie: Movie, basePrice: number) {
        this.rentals.push({basePrice, movie});
    }

    private getStatement = (rental: Rental) =>
        "\t" + rental.movie.title + "\t" + this.computePrice(rental).toFixed(1) + "\n";

    private getStatementLine = () =>
        "Rental Record for " +
        this.name +
        "\n" +
        this.rentals.map(this.getStatement).reduce((a, b) => a + b);


    public statement(): string {
        const totalPrice = this.rentals
            .map((rental) => this.computePrice(rental))
            .reduce(add, 0);

        const frequentRenterPoints = this.rentals.map(this.computeFrequentPoints).reduce((acc, point) => acc + point, 0);

        // add footer lines
        return (
            this.getStatementLine() +
            "Amount owed is " +
            totalPrice.toFixed(1) +
            "\n" +
            "You earned " +
            frequentRenterPoints +
            " frequent renter points"
        );
    }

    private computeFrequentPoints(rental: Rental) {

        const isNewRelease =
            rental.movie.priceCode != null &&
            rental.movie.priceCode == PriceCode.NEW_RELEASE;

        if (isNewRelease && rental.basePrice > 1) return 2;
        return 1;
    }

    private computePrice(rental: Rental) {
        const calcDiscount = (basePrice: number, discountNum: number) =>
            (basePrice - discountNum) * 1.5;

        switch (rental.movie.priceCode) {
            case PriceCode.REGULAR:
                if (rental.basePrice > 2) return 2 + calcDiscount(rental.basePrice, 2);
                return 2;

            case PriceCode.NEW_RELEASE:
                return rental.basePrice * 3;

            case PriceCode.CHILDREN:
                if (rental.basePrice > 3) return 1.5 + calcDiscount(rental.basePrice, 3);
                if (rental.basePrice > 6) return 1.5 + calcDiscount(rental.basePrice, 6);
                return 1.5; // magic number
        }
    }
}

const add = (a: number, b: number) => a + b;
