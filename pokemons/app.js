// 1. Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.
// $.getJSON(`https://pokeapi.co/api/v2/pokemon?limit=1500`).then((data) => {
//   data.results.forEach((pokemon) => {
//     console.log(pokemon.name);
//   });
// });

// 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.

// $.getJSON(`https://pokeapi.co/api/v2/pokemon?limit=1500`)
//   .then((data) => {
//     let randomPokemon = [];
//     for (let i = 0; i < 3; i++) {
//       let random = Math.floor(Math.random() * data.results.length);
//       let name = data.results.splice(random, 1)[0].url;
//       randomPokemon.push(name);
//     }
//     return Promise.all(randomPokemon.map((pokemon) => $.getJSON(pokemon)));
//   })
//   .then((data) => {
//     data.forEach((pokemon) => {
//       console.log(pokemon);
//     });
//   });

// 3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data). Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.

// let names = null;
// $.getJSON(`https://pokeapi.co/api/v2/pokemon?limit=1500`)
//   .then((data) => {
//     let randomPokemon = [];
//     for (let i = 0; i < 3; i++) {
//       let random = Math.floor(Math.random() * data.results.length);
//       let name = data.results.splice(random, 1)[0].url;
//       randomPokemon.push(name);
//     }
//     return Promise.all(randomPokemon.map((pokemon) => $.getJSON(pokemon)));
//   })
//   .then((data) => {
//     names = data.map((name) => name.name);
//     return Promise.all(
//       data.map((pokemon) => $.getJSON(pokemon.species.url))
//     ).then((data) => {
//       let description = data.map((data) => {
//         let obj = data.flavor_text_entries.find((entry) => {
//           return entry.language.name === "en";
//         });
//         return obj ? obj.flavor_text : "None";
//       });
//       description.forEach((text, index) => {
//         console.log(`"${names[index]} : ${text}"`);
//       });
//     });
//   });

// 4.BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.

$("#btn").on("click", function () {
  let info = null;
  $("#card").empty();
  $.getJSON(`https://pokeapi.co/api/v2/pokemon?limit=1500`)
    .then((data) => {
      let randomPokemon = [];
      for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * data.results.length);
        let name = data.results.splice(random, 1)[0].url;
        randomPokemon.push(name);
      }
      return Promise.all(randomPokemon.map((pokemon) => $.getJSON(pokemon)));
    })
    .then((data) => {
      info = data.map((d) => ({
        name: d.name,
        src: d.sprites.front_default,
      }));
      return Promise.all(
        data.map((pokemon) => $.getJSON(pokemon.species.url))
      ).then((data) => {
        data.forEach((data, i) => {
          let obj = data.flavor_text_entries.find((entry) => {
            return entry.language.name === "en";
          });
          let description = obj ? obj.flavor_text : "";
          let { name, src } = info[i];
          $("#card").append(pokemon(name, src, description));
        });
      });
    });
});

function pokemon(name, src, description) {
  return `
  <div class="pokemon">
    <h1>${name}</h1>
    <img src=${src} />
    <p>${description}</p>
  </div>
`;
}
