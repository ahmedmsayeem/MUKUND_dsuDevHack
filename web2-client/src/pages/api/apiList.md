1. get patient data
2. set patient data



async function fetchData() {
  try {
    const response = await fetch('https://example.com/api/data', {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('GET request failed:', error);
  }
}



async function postData() {
  try {
    const response = await fetch('https://example.com/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key1: 'value1',
        key2: 'value2',
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('POST request failed:', error);
  }
}
