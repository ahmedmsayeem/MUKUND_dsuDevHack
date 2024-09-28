// async function fetchData() {
//     try {
//       const response = await fetch('https://example.com/api/data', {
//         method: 'GET',
//       });
      
//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('GET request failed:', error);
//     }
//   }