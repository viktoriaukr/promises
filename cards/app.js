// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

$.getJSON("https://deckofcardsapi.com/api/deck/new/draw").then((data) => {
  let value = data.cards[0].value;
  let suit = data.cards[0].suit;
  console.log(`"${value.toLowerCase()} of ${suit.toLowerCase()}"`);
});

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

$.getJSON("https://deckofcardsapi.com/api/deck/new/draw")
  .then((data) => {
    let firstCard = data.cards[0];
    console.log(
      `"${firstCard.value.toLowerCase()} of ${firstCard.suit.toLowerCase()}"`
    );
    let id = data.deck_id;
    return $.getJSON(`https://deckofcardsapi.com/api/deck/${id}/draw/`);
  })
  .then((data) => {
    let secondCard = data.cards[0];
    console.log(
      `"${secondCard.value.toLowerCase()} of ${secondCard.suit.toLowerCase()}"`
    );
  });

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let deck_id = null;
$.getJSON(`https://deckofcardsapi.com/api/deck/new/shuffle/`).then((data) => {
  deck_id = data.deck_id;
});

$("#btn").on("click", function () {
  $.getJSON(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/`).then(
    (data) => {
      if (data.remaining === 0) {
        $("#btn").remove();
        alert("There are no cards left in the deck");
      }

      $("#img-container").append(
        $("<img>", {
          src: data.cards[0].image,
        })
      );
    }
  );
});
