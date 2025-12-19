import {paragraphs} from './paragraphs';
import {settings} from './settings';

const monkeyType = {
    generateLetters(letterObj, spanWordElement) {
        const spanLetterElement = document.createElement('span');
        spanLetterElement.textContent = letterObj.letter;
        letterObj.spanLetterElement = spanLetterElement;
        spanWordElement.appendChild(spanLetterElement);
    }, generateWord(wordObj) {
        const spanWordElement = document.createElement('span');
        spanWordElement.className = settings.wordClass;
        wordObj.spanWordElement = spanWordElement;
        for (const letterObj of wordObj.letters) {
            this.generateLetters(letterObj, spanWordElement);
        }
        return spanWordElement;
    }, generateWords() {
        for (const wordObj of this.currentParagraph) {
            const spanWordElement = this.generateWord(wordObj);
            this.paragraphElement.appendChild(spanWordElement);
        }
    }, generateParagraph() {
        this.generateWords();
    }, init() {

        this.paragraphElement = document.querySelector(settings.paragraphElementSelector);

        this.currentParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];

        this.generateParagraph();

    },
};

monkeyType.init();