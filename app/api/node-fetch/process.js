const fetch = require('node-fetch');
const URL = 'https://example.com';

async function main() {
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    console.log(text);
  } catch (err) {
    console.error(err);
  }
}

main();