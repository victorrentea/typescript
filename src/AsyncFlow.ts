export interface POI {
  id: number;
  name: string;
}

export interface POIDetails {
  id: number;
  name: string;
  ratingStars: number;
  description?: string;
  location: string;
  type: string; // one of: 'museum', 'park', 'restaurant', 'amusement'
}

export interface Attraction {
  id: number;
  name: string;
  rating: number;
  location: string;
}

export async function suggestAttractions(cityId: string, apis: Apis): Promise<Array<Attraction>> {
  const attractions = await apis.fetchAttractions(cityId);
  const details = await Promise.all(attractions.map(attraction => apis.fetchAttractionDetails(attraction.id)));
  const weather = await apis.fetchWeather(cityId);

  const results = details.filter(detail => matchesWeather(weather, detail))
    .sort((a, b) => b.ratingStars - a.ratingStars)
    .map((d) => ({
      id: d.id,
      name: d.name,
      rating: d.ratingStars,
      location: d.location
    }));
  console.log("Results: ", results);
  return results;
}

function matchesWeather(weather: string, attraction: POIDetails): boolean {
  if (attraction.type === 'museum') {
    return true;
  } else if (attraction.type === 'park') {
    return weather === 'sunny';
  } else if (attraction.type === 'restaurant') {
    return true;
  } else
    return weather === 'sunny';
}

export interface Apis {
  fetchAttractions: (cityId: string) => Promise<Array<POI>>;
  fetchAttractionDetails: (attractionId: number) => Promise<POIDetails>;
  fetchAttractionDetailsBatch: (attractionIds: number[]) => Promise<POIDetails[]>;
  fetchWeather: (cityId: string) => Promise<string>;
}
