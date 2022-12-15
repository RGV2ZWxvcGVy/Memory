document.addEventListener("DOMContentLoaded", function() {
    let allCards = new Cards();
    // Generate the cards
    allCards.generateCards();
    // Prepare the click event of the cards
    allCards.prepareCards();
});


function updateFoundCardPairs(foundCardPairs) {
    document.getElementById("foundCardPairs").innerHTML = foundCardPairs;
}

function addClass(element, className) {
    if (!element.classList.contains(className)) {
        element.classList.add(className);
    }
}

function removeClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
}


// Represents the deck of cards in the memory game
class Cards
{
    constructor() {
        this.cards = [];
    }

    // Adds an event listener to each card, so the card knows what to do when it receives a click
    prepareCards() {
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            let cardDOM = card.getCardAsDOM(card.id);
            cardDOM.addEventListener("click", function() {
                card.handleClick();
            });
        }
    }

    // Generates the cards based on the provided settings
    generateCards() {
        let letters = this.shuffleLetters();

        for (let i = 0; i < GameSettings.totalCards; i++) {
            let id = "card" + (i + 1);
            let letter = letters.charAt(i);
            let card = new Card(id, letter);
            this.cards.push(card);

            // Uncomment for debugging purposes
            // document.getElementById("playingField").innerHTML += "<div class=\"card closed\" id=\"" + id + "\"><div>" + letter + "</div></div>";
            document.getElementById("playingField").innerHTML += "<div class=\"card closed\" id=\"" + id + "\"><div>+</div></div>";
        }
    }

    shuffleLetters() {
        let result = "";
        // Concat the letters with eachother to get the matching letters
        let characters = GameSettings.letters.concat(GameSettings.letters);

        for (let i = 0; i < GameSettings.totalCards; i++) {
            let rng = Math.floor(Math.random() * characters.length);
            result += characters.charAt(rng);
            // Create a new array with all of the characters excluding the (random) one that has been added to the result in order to use every character twice
            characters = characters.slice(0, rng) + characters.slice(rng + 1);
        }

        return result;
    }
}

// Represents a card of the deck of cards in the memory game
class Card
{
    constructor(id, value) {
        this.id = id
        this.value = value;
        this.state = new State();
    }

    open(cardDOM) {
        cardDOM.innerHTML = cardDOM.innerHTML.replace(GameSettings.character, this.value);
    }

    close(cardDOM) {
        cardDOM.innerHTML = cardDOM.innerHTML.replace(this.value, GameSettings.character);
    }

    // Handles most of the logic when opening, closing, and finding matches of cards to prevent duplicate code
    switchCardState(state) {
        let cardDOM = this.getCardAsDOM(this.id);

        // Assign the current state to the card
        this.state.open = state === CardState.OPEN;
        this.state.closed = state === CardState.CLOSED;
        this.state.found = state === CardState.FOUND;

        // Add or remove classes depending on the current state
        for (let i = 0; i < CardState.stateCollection.length; i++) {
            if (CardState.stateCollection[i] === state) {
                addClass(cardDOM, CardState.stateCollection[i]);
            }
            else {
                removeClass(cardDOM, CardState.stateCollection[i]);
            }
        }

        // Simulate a card flip by changing the inner HTML of the card
        if (state === CardState.OPEN) {
            this.open(cardDOM);
        }
        else if (state === CardState.CLOSED) {
            this.close(cardDOM);
        }
    }

    // Handles the logic when a card has been clicked
    handleClick() {
        // If the same card has been clicked, or the card has already been found, do not continue
        if (GameState.clickInProgress ||
            GameState.firstFlippedCard?.id === this.id ||
            GameState.lastFlippedCard?.id === this.id ||
            this.state.found) {
            return;
        }

        // If two cards are flipped, close them, reset some state values, and execute handleClick again
        if (GameState.maxCardsFlipped) {
            GameState.firstFlippedCard.switchCardState(CardState.CLOSED);
            GameState.lastFlippedCard.switchCardState(CardState.CLOSED);

            // Empty the clicked state
            GameState.firstFlippedCard = null;
            GameState.lastFlippedCard = null;
            GameState.maxCardsFlipped = false;
            return this.handleClick();
        }

        // Currently no cards are flipped, open the first one
        if (GameState.firstFlippedCard === null) {
            this.switchCardState(CardState.OPEN);
            GameState.firstFlippedCard = this;
        }
        else {
            // Check if one card is already open, if so check if the value matches with the one clicked
            GameState.clickInProgress = true;

            // If the card matched with the previous card
            if (this.value === GameState.firstFlippedCard.value) {
                this.switchCardState(CardState.OPEN);
                this.switchCardState(CardState.FOUND);

                GameState.firstFlippedCard.switchCardState(CardState.FOUND);
                GameState.firstFlippedCard = null;
                // Add the found card pair to the total found card pairs
                GameState.foundCardPairs++;

                // Update the found card pairs HTML
                updateFoundCardPairs(GameState.foundCardPairs);

                // Check if all of the cards are found
                if (GameState.foundCardPairs === (GameSettings.totalCards / 2)) {
                    alert("Gefeliciteerd! Je hebt het spel uitgespeeld!");
                }
            }
            else {
                // Open the card so the user can see the value
                this.switchCardState(CardState.OPEN);
                GameState.lastFlippedCard = this;
                GameState.maxCardsFlipped = true;
            }

            GameState.clickInProgress = false;
        }
    }

    // Get the card with the provided id as Document Object Model
    getCardAsDOM(id) {
        return document.getElementById(id);
    }
}

// The state of a card object
class State
{
    constructor() {
        this.open = false;
        this.closed = true;
        this.found = false;
    }
}

// The possible states that a card can contain
class CardState
{
    // Write in uppercase to indicate that these properties should be constant
    static OPEN = "open";
    static CLOSED = "closed";
    static FOUND = "found";

    static stateCollection = [this.OPEN, this.CLOSED, this.FOUND];
}

// Contains the current state of the game
class GameState
{
    static firstFlippedCard = null;
    static lastFlippedCard = null;
    static clickInProgress = false;
    static maxCardsFlipped = false;
    static foundCardPairs = 0;
}

// Represents all the dynamic settings in the memory game
class GameSettings
{
    static letters = "ABCDEFGHIJKLMNOPQR";
    static character = "+";
    static fieldSize = 6;
    static totalCards = this.fieldSize * this.fieldSize;
}
