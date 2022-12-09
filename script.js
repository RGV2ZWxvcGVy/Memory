document.addEventListener("DOMContentLoaded", function() {
    let allCards = new Cards();
    allCards.generateCards();
    allCards = allCards.cards;
    prepareCards(allCards);
});


function prepareCards(cards) {
    for (let i = 0; i < cards.length; i++) {
        let card = document.getElementById("card" + (i + 1));
        card.addEventListener("click", function() {
            cards[i].open();
        });
    }
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


class Cards
{
    constructor() {
        this.cards = [];
    }

    generateCards() {
        let letters = this.shuffleLetters();

        for (let i = 0; i < GameSettings.totalCards; i++) {
            let id = "card" + (i + 1);
            let letter = letters.charAt(i);
            let card = new Card(id, letter);
            this.cards.push(card);

            document.getElementById("playingField").innerHTML += "<div class=\"card closed\" id=\"" + id + "\" data-value=\"" + letter + "\"><div>+</div></div>";
        }
    }

    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript#:~:text=I%20think%20this%20will%20work%20for%20you%3A
    shuffleLetters() {
        let result = "";
        // Concat the letters with eachother to get the matching letters
        let characters = GameSettings.letters.concat(GameSettings.letters);

        for (let i = 0; i < GameSettings.totalCards; i++) {
            let rng = Math.floor(Math.random() * characters.length);
            result += characters.charAt(rng);
            // Remove the character we added to the result in order to use every character twice
            characters = characters.slice(0, rng) + characters.slice(rng + 1);
        }

        return result;
    }

    // https://stackoverflow.com/questions/2722159/how-to-filter-object-array-based-on-attributes#:~:text=You%20can%20use%20the%20Array.prototype.filter%20method%3A
    getFoundCards() {
        return this.cards.filter(function(card) {
            return card.state.found === true;
        });
    }
}

class Card
{
    constructor(id, value) {
        this.id = id
        this.value = value;
        this.state = new State();
    }

    open() {
        let cardDOM = this.getCardAsDOM(this.id);

        this.state.open = true;
        addClass(cardDOM, "open");
        cardDOM.innerHTML = cardDOM.innerHTML.replace(GameSettings.character, this.value);

        this.state.closed = false;
        removeClass(cardDOM, "closed");
    }

    close() {
        this.state.closed = true;
        this.state.open = false;
    }

    found() {
        this.state.found = true;
        this.state.open = true;
        this.state.closed = false;
    }

    checkMatch() {
        // Check if one card is already open, if so check if the value is the same
        if (State.clickedCardValue.length) {
            if (this.value === State.clickedCardValue) {
                // The card matched with the previous card

            }
            else {
                // The card did not match with the previous card

            }
        }
        else {
            this.open();
        }
    }

    getCardAsDOM(id) {
        return document.getElementById(id);
    }
}

class State
{
    static clickedCardValue = "";

    constructor() {
        this.open = false;
        this.closed = true;
        this.found = false;
    }
}

class GameSettings
{
    static letters = "ABCDEFGHIJKLMNOPQR";
    static character = "+";
    static fieldSize = 6;
    static totalCards = this.fieldSize * this.fieldSize;
    static openCardColor = "#357EC7";
    static closedCardColor = "#333333";
    static foundCardColor = "#197300";
}
