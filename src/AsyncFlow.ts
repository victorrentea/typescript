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

  const results = new Array<Attraction>();
  for (const attraction of attractions) {
    const details = await apis.fetchAttractionDetails(attraction.id);
    if (matchesWeather(await apis.fetchWeather(cityId), details)) {
      results.push({
        id: details.id,
        name: details.name,
        rating: details.ratingStars,
        location: details.location
      });
    }
  }
  results.sort(function (a, b) {
    return b.rating - a.rating;
  });
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
