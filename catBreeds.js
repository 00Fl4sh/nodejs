const axios = require('axios');
const fs = require('fs');

// Function to fetch data from the URL and write it to a text file
async function fetchDataAndWriteToFile() {
  try {
    const response = await axios.get('https://catfact.ninja/breeds');
    const responseData = JSON.stringify(response.data); // Convert to JSON string
    fs.writeFileSync('catBreeds.txt', responseData);

    // Parse the response to count the number of pages
    const totalPages = response.headers['x-total-pages'];
    console.log(`Number of pages of data available: ${totalPages}`);

    // Initialize an object to store cat breeds grouped by country
    const catBreedsByCountry = {};

    // Fetch data from all pages
    for (let page = 1; page <= totalPages; page++) {
      const pageResponse = await axios.get(`https://catfact.ninja/breeds?page=${page}`);
      const breeds = pageResponse.data.data;
      
      // Group cat breeds by country
      breeds.forEach((breed) => {
        const country = breed.origin || 'Unknown';
        if (!catBreedsByCountry[country]) {
          catBreedsByCountry[country] = [];
        }
        catBreedsByCountry[country].push({
          breed: breed.breed,
          origin: breed.origin || 'Unknown',
          coat: breed.coat,
          pattern: breed.pattern,
        });
      });
    }

    // Log the grouped cat breeds by country
    console.log(catBreedsByCountry);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to start the process
fetchDataAndWriteToFile();
