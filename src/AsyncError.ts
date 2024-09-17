import {expect} from 'chai';

async function foo() {
  try {
    // remove the 'await' below to see a prod bug! :)
    return await waitAndMaybeReject();
  } catch (e) {
    return 'caught';
  }
}

async function waitAndMaybeReject() {
  await new Promise(resolve => setTimeout(resolve, 100));
  throw new Error();
}

describe('AsyncError', () =>
  it('should return caught', async () => {
    const result = await foo();
    expect(result).to.be.equal('caught');
  }));