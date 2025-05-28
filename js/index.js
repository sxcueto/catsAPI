const apiUrl = `https://api.thecatapi.com/v1/`;
const apiKey = 'live_3GnpeBrxnCyNIcmWhRS08rW8mk9bHlDtE2Z5S0h6Eg5IW4RkjCqWGwwO39kENZ4q'

//fetches url for cat images
 async function fetchCatImages(){
    try {
        const response = await fetch(`${apiUrl}images/search?limit=10`, {
            headers: {
                'x-api-key': apiKey
            }
        });
         if (!response.ok) {
            throw new Error("Network error.");
        }const images = await response.json();
        return images;
    } catch (error) {
        console.error("Error fetching cat images:", error);
    }
}

// fetches url for cat breeds
async function fetchCatBreeds() {
    try{ const response = await fetch(`${apiUrl}breeds`, {
            headers: {
                'x-api-key': apiKey
            }
        });
if (!response.ok){
        throw new Error ("Network error.");
    }
    const catBreeds = await response.json();
    return catBreeds;
}
catch(error) {
    console.error("Error fetching cat breeds:",error);
}

//radio buttons
document.addEventListener('DOMContentLoaded', ()=>{
   const radioButtons = document.querySelector('input[name="button"]'); 
   radioButtons.forEach(radio => {
    radio.addEventListener('change', async () => {
        let data;
if (radio.value === 'images'){
    data =  await fetchCatImages();
   }else if (radio.value === 'breeds'){
    data = await fetchCatBreeds(apiUrl);
   }
   displayResult(data);
   });
});
});
   
// display images in gallery
function displayResult(data) {
    const gallerySection = document.getElementById('gallery');
    gallerySection.innerHTML = ''; // Clear previous results

    if (Array.isArray(data)) {
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
//for cat pics
            if (item.url) { 
                const img = document.createElement('img');
                img.src = item.image; 
                img.alt = 'Cat Image';
                div.appendChild(img);
            }
//for cat breeds
            if (item.breed) { 
                const p = document.createElement('p');
                p.textContent = item.breed; 
                div.appendChild(p);
            }

            gallerySection.appendChild(div);
        });
    } else {
        const p = document.createElement('p');
        p.textContent = 'No data found.';
        galleryDiv.appendChild(p);
    }
}

}




