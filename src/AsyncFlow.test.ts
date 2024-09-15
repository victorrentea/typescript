import {expect} from 'chai';
import {it, describe} from 'mocha';
import {suggestAttractions, Apis, POI, POIDetails, Attraction} from './AsyncFlow';

describe('suggestAttractions', () => {
  const attractions: Array<POIDetails> = [
    {id: 1, name: 'museum', ratingStars: 4, location: 'xy', type: 'museum'},
    {id: 2, name: 'park', ratingStars: 5, location: 'xy', type: 'park'}
  ]
  let weather = 'sunny';
  let call_delay_ms = 0;

  async function delay(ms: number) {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  const apis: Apis = {
    fetchAttractions: async (cityId: string) => {
      await delay(call_delay_ms);
      return attractions;
    },
    fetchAttractionDetails: async (id: number) => {
      await delay(call_delay_ms);
      return attractions.find(a => a.id === id)!;
    },
    fetchAttractionDetailsBatch: async (ids: number[]) => {
      await delay(call_delay_ms);
      return attractions.filter(a => ids.includes(a.id));
    },
    fetchWeather: async (cityId: string) => {
      await delay(call_delay_ms);
      return weather;
    }
  };

  it('when sunny', async () => {
    weather = 'sunny';
    const results = await suggestAttractions('city1', apis);

    expect(results.map(r => r.id)).to.eql([2, 1]);
  });

  it('when rainy', async () => {
    weather = 'rainy';
    const results = await suggestAttractions('city1', apis);

    expect(results.map(r => r.id)).to.eql([1]);
  });

  it('duration', async () => {
    weather = 'sunny';
    call_delay_ms = 100;

    const start = Date.now();
    const results = await suggestAttractions('city1', apis);
    const duration = Date.now() - start;

    console.log("Took " + duration);
    // TODO add time constraints as needed
    expect(results).to.have.length(2);
  });

});