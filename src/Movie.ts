export abstract class Movie {

    protected constructor(
        public readonly title: string) {
    }

    abstract calculateAmount(rentalDays: number): number;
    abstract calculateFrequentRenterPoints(frequentRenterPoints: number, rentalDays: number): number;
}
