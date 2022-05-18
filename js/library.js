import {user} from './user.js'
import {cards} from './cards.js'
import {gameTable} from './gameTable.js'
import {bot} from './bot.js'
import {menu} from './menu.js'

export  const library = {
    cardValue(str) {
        return parseInt(str.split('/')[2].split('.')[0])
    },

    cardSuit(str) { //масть
        return str.split('/')[2].split('.')[0].slice(-1)
    },

    checkFirstMove() {
        let botTrumps = bot.cards.filter(i => library.cardSuit(i) === cards.trump)
        let userTrumps = user.cards.filter(i => library.cardSuit(i) === cards.trump)
        let botMin = botTrumps.map(i => library.cardValue(i)).sort((a,b) => a-b)[0]
        let userMin = userTrumps.map(i => library.cardValue(i)).sort((a,b) => a-b)[0]
            if(botTrumps.length === 0 && userTrumps.length !== 0 ) {
            user.myMove = true;
        } else if(userTrumps.length === 0 && botTrumps.length !== 0 ) {
            user.myMove = false;
        } else if (botMin > userMin ) {
            user.myMove = true;
            } else {
            user.myMove = false;
        } return user.myMove;

    },

    mayMove(person, tableCard) {
        let mayMoveArr = []
        let personTrumps = person.cards.filter(i => this.cardSuit(i) === cards.trump)
        .sort((a,b) => this.cardValue(a) - this.cardValue(b))
        let rests = person.cards.filter(i => this.cardSuit(i) !== cards.trump)
        if (this.cardSuit(tableCard) === cards.trump) {
            mayMoveArr = personTrumps.filter(i => this.cardValue(i) > this.cardValue(tableCard))
            .sort((a,b) => this.cardValue(a) - this.cardValue(b))
        } else {
            for (let i of rests) {
                if (library.cardSuit(i) === library.cardSuit(tableCard)) {
                    mayMoveArr.push(i)
                }
            }

        mayMoveArr = mayMoveArr.filter(i => this.cardValue(i) > this.cardValue(tableCard))
        .sort((a,b) => this.cardValue(a) - this.cardValue(b))
        mayMoveArr = [...mayMoveArr, ...personTrumps]
        }
        return mayMoveArr;
    },

    displayAll() {
        cards.displayCards();
        gameTable.displayCards()
        user.displayCards()
        bot.displayCards()
        },

    showMessage(text) { // вывод сообщения
        let mess = document.createElement('p');
        mess.textContent = text;
        gameTable.message.append(mess)
        setTimeout (() => {
            gameTable.message.innerHTML = ''
        },1450)
        },

    trumpText() {
        switch (cards.trump) {
            case 'p':
                menu.showMessage('Trump spades')
                break;
            case 'h':
                menu.showMessage('Trump hearts')
                break;
            case 't':
                menu.showMessage('Trump clubs')
                break;
            case 'b':
                menu.showMessage('Trump diamonds')
                break;
            default:
                menu.showMessage('Козырь не определен! Ошибка!')
        }
    }
}
