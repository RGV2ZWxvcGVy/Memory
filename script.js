document.addEventListener("DOMContentLoaded", function(event) {
    let cards = new Cards().generateCards();
});


class Cards
{
    constructor() {
        this.cards = [];
    }

    generateCards() {
        let letters = this.shuffleLetters();

        for (let i = 0; i < GameSettings.totalCards; i++) {
            let letter = letters.charAt(i);
            this.cards.push(new Card(letter));
            document.getElementById("playingField").innerHTML += "<div class=\"card closed\" data-value=\"" + letter + "\" onclick=\"this.open();\"><div>+</div></div>";
        }
    }

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

    getFoundCards() {
        return this.cards.filter(function(card) {
            return card.state.found === true;
        });
    }
}

class Card
{
    constructor(value) {
        this.value = value;
        this.state = new State();
    }

    open() {
        this.state.open = true;
        this.state.closed = false;

        // Check if one card is already open, if so check if the letter is the same

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
}

class State
{
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
