export default class FetchAPI {
  constructor() {
  }

  async get(url) {
    const response = await fetch(url);

    return response.json();
  }

  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    return response.json();
  }
}
