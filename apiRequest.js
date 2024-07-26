
const displayedData = [
    id = "",
    title = "",
    desc = "",
    image = "",
];
        
const urlsToFetch = [
'https://api.artic.edu/api/v1/artworks/129883',
'https://api.artic.edu/api/v1/artworks/129884',
'https://api.artic.edu/api/v1/artworks/129885',
];

// Function to fetch all of the URLs in parallel
const fetchURLs = async (urls) => {
try {
const promises =
    urls.map(url => fetch(url));

// Wait for all of the promises to resolve
const responses =
    await Promise.all(promises);

// Extract JSON data from responses
const data = await
    Promise.all(responses.map(response => response.json()));

    return data
}
catch (error) {
    throw new Error(`Failed to fetch data: ${error}`)
}
}

fetchURLs(urlsToFetch)
    .then(data => {
        data.forEach(painting => {
            const markup = 
                `<ul class="api__container" >
                    <li><h3>${painting.data.title}</h3></li>
                    <li><img src="https://www.artic.edu/iiif/2/${painting.data.image_id}/full/843,/0/default.jpg" class="api-image" /></li>
                    <li>About: ${painting.data.thumbnail.alt_text}</li>
                    <li>Painting by: ${painting.data.artist_title}</li>
                </ul>`;
            document.querySelector("paintings").insertAdjacentHTML("beforeend", markup);
        })
    })    
    .catch(error => {
        console.error(`Error fetching data ${error}`)
    });