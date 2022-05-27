console.log('%c HI', 'color: firebrick')

// use imgUrl to fetch images on page load
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

// get all dog breeds using breedUrl and add breeds to ul "#dog-breeds"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

// const breeds = []   // so that this "container" is available inside all functions
// const li = document.createElement("li")

// page load event listener
document.addEventListener('DOMContentLoaded', () => {
    // fetch images from imgUrl
    // parse response w/ JSON
    // append image elements to DOM for each image - use .forEach() to iterate?

    fetch(imgUrl)
    .then(resp => resp.json())
    .then(data => {
        // use .message to grab the actual array within the returned promise object (yeah?)
        //console.log(data.message);         
        const dogImgContainer = document.querySelector("#dog-image-container")
        data.message.forEach(url => {
            const img = document.createElement("img")
            img.src = url
            dogImgContainer.append(img)
        })
    })
    
    // fetch dog breeds from breedUrl
    // add breeds to "#dog-breeds" ul
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(resp => {
        //console.log(resp)
        // data.message.forEach(breed => {
        //     const type = document.createElement("li")
        //     type.innerText = breed
        //     dogBreeds.append(type)
        // })
        const breeds = Object.keys(resp.message)
        //console.log(breeds)
        //const ul = document.querySelector("#dog-breeds")
        putBreedsOnDOM(breeds)
        // breeds.map(breed => {           // reminder: unlike forEach, .map() returns an array
        //     const li = document.createElement("li")
        //     li.textContent = breed
        //     ul.append(li)
        // })
    })

    //const li = document.createElement("li")

    const breeds = []  // **got stuck at scoping this array, cuz i did something different than the teacher in structuring my code

    function putBreedsOnDOM(breeds) {
        const ul = document.querySelector("#dog-breeds")
        breeds.map(breed => {           // reminder: unlike forEach, .map() returns an array
            const li = document.createElement("li")
            li.textContent = breed
            ul.append(li)
        })
    }

    // add click event to change color of breed name when any li is clicked
    document.addEventListener('click', e => {
        if(e.target.matches('li')) {
            e.target.style.color = "red"
        }
    })

    document.addEventListener('change', e => {
        if(e.target.matches('#breed-dropdown')) {
            const ul = document.querySelector("#dog-breeds");
            ul.innerHTML = "";         // takes current breed list off the DOM
            //console.log(e)   // find value in object properties
            // got stuck here, console.log(filteredBreeds) was returning an empty array only, and the ul was emptied but not refilled
            const filteredBreeds = breeds.filter(dog => dog[0] === e.target.value);
            debugger;
            //console.log(filteredBreeds);
            //console.log(breeds.filter(dog => dog[0] === e.target.value)) // no log output
            putBreedsOnDOM(filteredBreeds)
        }
    })

    })

   