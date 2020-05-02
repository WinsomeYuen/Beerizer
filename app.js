
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
          const tagline = data[0].tagline
          const description = data[0].description
          const abv = data[0].abv
          const ibu = data[0].ibu
          const hops = data[0].ingredients.hops
          const food = data[0].food_pairing
          const image = data[0].image_url

          beerName.innerHTML = name
          beerDescription.innerHTML = description
          beerAbv.innerHTML = abv
          beerIbu.innerHTML = ibu
          beerTagline.innerHTML = '"'+tagline+'"'

          //formatting the hops into a single line string
          var beerHopsArray = []
          console.log(hops)
          for (var i = 0; i < hops.length; i++) {
            var hopName = hops[i].name
            if(!(beerHopsArray.indexOf(hopName) > -1)){
              beerHopsArray.push(hopName)
            }
          }

          var hopsNames = ''
          for(var i = 0; i < beerHopsArray.length; i++){
            hopsNames += beerHopsArray[i] + ", "
          }
          beerHops.innerHTML = (hopsNames.substring(0, hopsNames.length - 2))

          //creating a list for food pairing
          var foodPairing = '<ul>'
          for (var i = 0; i < food.length; i++) {
            foodPairing += '<li>'+ food[i] +'</li>'
          }
          foodPairing += '</ul>'
          beerPairing.innerHTML = foodPairing

          //checking if image exists
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
