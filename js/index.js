const apiUrl = `https://api.thecatapi.com/v1/`;
const apiKey = 'live_3GnpeBrxnCyNIcmWhRS08rW8mk9bHlDtE2Z5S0h6Eg5IW4RkjCqWGwwO39kENZ4q'



//fetches url for cat images
 fetch('https://api.thecatapi.com/v1/images')
.then((response) => {
    if (!response.ok){
        throw new Error ("Network error.");
    }
    const catImages =  response.json();
    return catImages;
})
.catch((error) => {
    console.error("Error fetching cat data:",error);
});

// fetches url for cat breeds
try{

 fetch('https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}')

if (!response.ok){
        throw new Error ("Network error."); //ss
    }
    const catBreeds =  response.json();
    return catBreeds;
}
catch(error) {
    console.error("Error fetching cat breeds:",error);
}

   const radioButtons = document.querySelectorAll('input[name="button"]:checked').value; 
   let data;

   if (radioButtons === 'images'){
    data =  fetchCatImages(apiUrl);
   }else if (radioButtons === 'breeds'){
    data = fetchCatBreeds(apiUrl);
   }
   displayResult(data);

// display images in gallery
const gallerySection = document.getElementById('gallery');
gallerySection.innerHTML='';

function displayResult(data) {
    const galleryDiv = document.getElementById('gallery');
    galleryDiv.innerHTML = ''; // Clear previous results

    if (Array.isArray(data)) {
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';

            if (item.image) { // Assuming the image URL is in item.image
                const img = document.createElement('img');
                img.src = item.image; // Adjust based on your API response structure
                img.alt = 'Cat Image';
                div.appendChild(img);
            }

            if (item.breed) { // Assuming breed name is in item.breed
                const p = document.createElement('p');
                p.textContent = item.breed; // Adjust based on your API response structure
                div.appendChild(p);
            }

            galleryDiv.appendChild(div);
        });
    } else {
        const p = document.createElement('p');
        p.textContent = 'No data found.';
        galleryDiv.appendChild(p);
    }
}






