//  1.Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API

let favoriteNumber = 23;

$.getJSON(`http://numbersapi.com/${favoriteNumber}?json`)
  .then((data) => {
    console.log(data.text);
  })
  .catch((err) => {
    console.log(err);
  });

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

let multipleNumbers = [23, 45, 19];
for (let num of multipleNumbers) {
  $.getJSON(`http://numbersapi.com/${num}?json`)
    .then((data) => {
      console.log(data.text);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
let num = 17;
let numberOfFacts = 4;
let promises = [];
for (let i = 0; i < numberOfFacts; i++) {
  promises.push($.getJSON(`http://numbersapi.com/${num}?json`));
}

Promise.all(promises)
  .then((facts) => {
    facts.forEach((fact) => {
      console.log(fact.text);
    });
  })
  .catch((err) => console.log(err));
