import {expect} from 'chai';

async function wrong() {
  try {
    // return await awaitVoid(); // OK✅

    return awaitVoid() // BUG ☠️☠️☠️: you might forget to await on a function returning Promise<void>
      .catch(e => console.log("IN CATCH =>" + e)); // BAD

    // const n:number = await awaitReturning();//✅
  } catch (e) {
    console.log("IN CATCH BLOCK")
    return 'caught';
  }
}

async function awaitVoid() {
  const r = await callApi();
  console.log("after the IO call returned " + r);
  if (Math.random() < .5)
    throw new Error("Intentional");
  return 42;
}

async function awaitReturning() {
  const r = await callApi();
  console.log("after the IO call returned " + r);
  if (Math.random() < .5)
    throw new Error("Intentional");
  return 42;
}

describe('AsyncError', () =>
  it('should return caught', async () => {
    const result = await wrong();
    expect(result).to.be.equal('caught');
  }));


function waitAndMaybeRejectOldSchool() {
  callApi()
    .then(r => {
      console.log("after the IO call returned " + r)
      throw new Error();
    })
}

function callApi(): Promise<unknown> {
  return new Promise(resolve => setTimeout(resolve, 100))
    .then(x => "RESULT");
}

