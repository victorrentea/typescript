import { MovieCategory } from "./MovieCategory";

export class Movie {
  constructor(
    public readonly title: string,
    public readonly category: MovieCategory) {
  }
}
