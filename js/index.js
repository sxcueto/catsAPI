const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=6`;
const breedsUrl = "https://api.thecatapi.com/v1/breeds";
const apiKey ="live_3GnpeBrxnCyNIcmWhRS08rW8mk9bHlDtE2Z5S0h6Eg5IW4RkjCqWGwwO39kENZ4q";

//fetches url for cat images
async function fetchCatImages() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error("Network error.");
    }
    const images = await response.json();
    return images;
  } catch (error) {
    console.error("Error fetching cat images:", error);
  }
}

// display cat images in gallery
function displayResult(data) {
  const gallerySection = document.getElementById("gallery");
  gallerySection.innerHTML = ""; // Clear previous results
  const factsSection = document.getElementById("facts");
  factsSection.innerHTML = "";

  if (Array.isArray(data)) {
    data.forEach((item) => {
      const div = document.createElement("div");
      div.className = "gallery-item";

     //for cat pics
      if (item.url) {
        const img = document.createElement("img");
        img.src = item.url;
        img.alt = "Cat Image";
        img.loading = "lazy";

        img.onload = () =>{
          img.classList.add("loaded");
        }
        div.appendChild(img);
      }
       gallerySection.appendChild(div);
    });
  } else {
    const p = document.createElement("p");
    p.textContent = "Error fetching cat images.";
    gallerySection.appendChild(p);
  }
}

// fetch cat breed info
async function fetchCatFact(){
  const factsSection = document.getElementById("facts");
  factsSection.innerHTML = ""; //clear previous results
  const gallerySection = document.getElementById("gallery");
  gallerySection.innerHTML="";
 try {
    const response = await fetch(breedsUrl, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error("Network error.");
    }
    const breeds = await response.json();

    //pick random cat breed
    const randomData = Math.floor(Math.random() * breeds.length);
    const randomBreed = breeds[randomData];

    // create name, description, and origin of cat breed
    const breedInfo = document.createElement("div");
    breedInfo.className = "breed-info";

    const name = document.createElement("h3");
    name.textContent = randomBreed.name;

    const description = document.createElement("p");
    description.textContent = randomBreed.description;

    const origin = document.createElement("p");
    origin.textContent = "Origin: " + randomBreed.origin;

    breedInfo.appendChild(name);
    breedInfo.appendChild(description);
    breedInfo.appendChild(origin);

    factsSection.appendChild(breedInfo);

    setTimeout(() =>{
      breedInfo.classList.add("visible");
    })
  }catch (error) {
    const p = document.createElement("p");
    p.textContent = "Error fetching cat breeds: " + error.message;
    factsSection.appendChild(p);
  }
}

//radio buttons
document.addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll('input[name="button"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", async () => {
      if (radio.value === "images-btn") {
      const  data = await fetchCatImages();
      if (data){
         displayResult(data);
      }else{
        console.error("No data returned from fetchCatImages.")
      }
      } else if (radio.value === "breeds-btn") {
        await fetchCatFact();
      }
      
    });
  });
});
