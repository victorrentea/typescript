export enum MOVIE_CATEGORY {
    CHILDREN,
    REGULAR,
    NEW_RELEASE
}

export class Movie {
    constructor(
        public readonly title: string,
        public readonly priceCode: number
    ) {
    }
}

export class Rental {
    constructor(
        public readonly movie: Movie,
        public readonly days: number
    ) {
    }

    public computePoints() {
        let frequentRenterPoints = 1;
        // add bonus for a two day new release rental
        if (this.days > 1 && this.movie.priceCode == MOVIE_CATEGORY.NEW_RELEASE)
            frequentRenterPoints++;
        return frequentRenterPoints;
    }

    public computePrice():number {
        let amount: number;
        switch (this.movie.priceCode) {
            case MOVIE_CATEGORY.REGULAR:
                amount = 2;
                if (this.days > 2)
                    amount += (this.days - 2) * 1.5;
                return amount;
            case MOVIE_CATEGORY.NEW_RELEASE:
                return this.days * 3;
            case MOVIE_CATEGORY.CHILDREN:
                amount = 1.5;
                if (this.days > 3)
                    amount += (this.days - 3) * 1.5;
                return amount;
            default: throw new Error("Unknown price code: "+this.movie.priceCode);
        }
    }
}

export class Customer {
    constructor(
        private readonly name: string,
        private readonly rentals: Array<Rental> = []) {
    }

    public addRental(movie: Movie, days: number) {
        this.rentals.push(new Rental(movie, days));
    }

    public createStatement = () => this.formatHeader() + this.formatBody() + this.formatFooter();

    private formatBody() {
        return this.rentals.map(rental => this.formatLine(rental)).join('');
    }

    private formatHeader() {
        return `Rental Record for ${this.name}\n`;
    }

    private formatFooter() {
        const totalAmount = this.computeTotalAmount();
        const frequentRenterPoints = this.computeTotalPoints();
        return `Amount owed is ${totalAmount.toFixed(1)}
You earned ${frequentRenterPoints} frequent renter points`;
    }

    private computeTotalPoints() {
        let frequentRenterPoints = 0;
        for (const rental of this.rentals) {
            frequentRenterPoints += rental.computePoints();
        }
        return frequentRenterPoints;
    }

    private computeTotalAmount = () => this.rentals
          .map(rental => rental.computePrice())
          .reduce((a, b) => a + b, 0);


    private formatLine(rental: Rental) {
        return `\t${rental.movie.title}\t${rental.computePrice().toFixed(1)}\n`;
    }


}
