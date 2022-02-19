import {library} from './library.js'

 export const cards = {
    deck : [ //колода
        '../cards/6ch.jpg',
        '../cards/7ch.jpg',
        '../cards/8ch.jpg',
        '../cards/9ch.jpg',
        '../cards/10ch.jpg',
        '../cards/11ch.jpg',
        '../cards/12ch.jpg',
        '../cards/13ch.jpg',
        '../cards/14ch.jpg',
        '../cards/6b.jpg',
        '../cards/7b.jpg',
        '../cards/8b.jpg',
        '../cards/9b.jpg',
        '../cards/10b.jpg',
        '../cards/11b.jpg',
        '../cards/12b.jpg',
        '../cards/13b.jpg',
        '../cards/14b.jpg',
        '../cards/6t.jpg',
        '../cards/7t.jpg',
        '../cards/8t.jpg',
        '../cards/9t.jpg',
        '../cards/10t.jpg',
        '../cards/11t.jpg',
        '../cards/12t.jpg',
        '../cards/13t.jpg',
        '../cards/14t.jpg',
        '../cards/6p.jpg',
        '../cards/7p.jpg',
        '../cards/8p.jpg',
        '../cards/9p.jpg',
        '../cards/10p.jpg',
        '../cards/11p.jpg',
        '../cards/12p.jpg',
        '../cards/13p.jpg',
        '../cards/14p.jpg',
    ],
    layout: [], // расклад
    trump: undefined, // козырь
    
    getNewlayout() {   // перетасовка колоды, новая игра!!!!
        do {
            this.layout = this.deck
            .sort(i => Math.random() - 0.5);
        } while (library.cardValue(this.layout[0]) === 14)  // проверка на Козырный туз "туз колоду не тянет)))"
        this.trump = library.cardSuit(this.layout[0])
        library.trumpText()
        return this.layout;
    },

    displayCards(){   //показать колоду
        
        let trump = document.querySelector('.trump')// козырная карта и колода
        let trumpCard = document.createElement('img')
        trump.innerHTML = ''
        trumpCard.innerHTML = ''
        if (cards.layout.length > 0 ) {
        trumpCard.src = cards.layout[0];
        trumpCard.style.transform = 'rotate(90deg)'
            trump.append(trumpCard) 
        }
        
        for(let i = 0; i < cards.layout.length - 1; i++) {
            let tableCard = document.createElement('img') 
            tableCard.src = '../cards/back.jpg';
            tableCard.zIndex = 50 + i;
            tableCard.style.marginTop = '-127.2px'
            tableCard.style.marginLeft = '-50px'
            if ( cards.layout.length > 0 ) {
                trump.append(tableCard)
            } 
        }
    }
}
Object.defineProperty(cards, "deck", {"writable": false}) //защита от случайного изменения колоды карт

