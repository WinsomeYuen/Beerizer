
document.addEventListener('DOMContentLoaded', () => {
  function getBeer() {
    fetch('https://api.punkapi.com/v2/beers/random')
      .then(response => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status)
            return;
        }

        response.json().then(data => {
          const name = data[0].name
          const description = data[0].description
          const food = data[0].food_pairing
          const image = data[0].image_url

          beerName.innerHTML = name
          beerDescription.innerHTML = description

          if(image != null){
            document.getElementById('beerImage').src = image
          } else {
            document.getElementById('beerImage').src = ""
          }
        });
      })
    .catch(function(err) {
      console.log('Fetch Error 😞', err)
    });
  }

  document.getElementById('generate').addEventListener('click', getBeer);
})
