import {settings as s} from './settings';
import {GameState} from './GameState';

const monkeyType = {
    displayCursor() {
        this.gameState.currentParagraph[this.gameState.currentWord].spanWordElement.classList.add(s.currentWordClass);

        this.gameState.currentParagraph[this.gameState.currentWord].letters[this.gameState.currentLetter].spanLetterElement.classList.add(s.currentClass);

    }, init() {
        this.pElement = document.querySelector(s.paragraphElementSelector);
        this.timerElement = document.getElementById(s.timerId);

        this.gameState = new GameState();

        this.intervalID = null;
        this.remainingTime = s.maxTime;

        this.generateParagraph();
        this.displayCursor();
        this.displayTime();

        window.addEventListener('keydown', (evt) => {
            this.type(evt);
        });

    }, type(event) {
        if (!s.isIgnorableKey(event)) {
            if (this.intervalID === null) {
                this.intervalID = setInterval(this.updateTime.bind(this), 1000);
            }

            this.gameState.currentParagraph[this.gameState.currentWord].letters[this.gameState.currentLetter].spanLetterElement.classList.remove(s.currentClass);

            this.gameState.currentLetter++;
            if (this.gameState.currentLetter === this.gameState.currentParagraph[this.gameState.currentWord].letters.length) {
                //
                this.gameState.currentParagraph[this.gameState.currentWord].spanWordElement.classList.add(s.typedClass);

                this.gameState.currentWord++;
                this.currentLetter = 0;
                this.displayCursor();

            } else {

                this.gameState.currentParagraph[this.gameState.currentWord].letters[this.gameState.currentLetter].spanLetterElement.classList.add(s.currentClass);
            }


        }

    }, updateTime() {
        this.remainingTime--;
        if (this.remainingTime === 0) {
            clearInterval(this.intervalID);
            // TODO.. terminer le jeu...
        }
        this.displayTime();

    }, displayTime() {
        this.timerElement.textContent = `${this.remainingTime}`;

    }, generateLetterElement(l, spanWordElement) {
        const spanLetterElement = document.createElement('span');
        spanLetterElement.textContent = l.letter;

        spanWordElement.insertAdjacentElement('beforeend', spanLetterElement);
        l.spanLetterElement = spanLetterElement;
    }, generateWordElement(word) {
        const spanWordElement = document.createElement('span');
        spanWordElement.className = s.wordClass;
        word.spanWordElement = spanWordElement;

        for (const l of word.letters) {
            this.generateLetterElement(l, spanWordElement);
        }
        this.pElement.insertAdjacentElement('beforeend', spanWordElement);
    }, generateWordElements() {
        for (const word of this.gameState.currentParagraph) {
            this.generateWordElement(word);
        }
    }, generateParagraph() {
        this.generateWordElements();
    },

};

monkeyType.init();