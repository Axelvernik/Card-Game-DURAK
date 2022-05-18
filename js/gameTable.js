import {user} from './user.js'
import {cards} from './cards.js'
import {library} from './library.js'
import {bot} from './bot.js'
import {menu} from './menu.js'
 export const gameTable = {
    cards : [],
    menu: document.querySelector('.menu'),
    mainBtn : document.querySelector('.mainButton'), // начальная кнопка
    message : document.querySelector('.console'), //Сообщение внизу, когда ход игрока

    displayCards() {
        let table = document.querySelector('.table') //Стол с картами
        table.innerHTML = ''
        this.cards.forEach ( i => {
        let handCard = document.createElement('img')
        handCard.src = i;
        table.append(handCard);
       })
    },

    addBtnTake() {
        let btnTake = document.createElement('button')
        btnTake.classList = 'btn'
        btnTake.textContent = 'Take'
        btnTake.style.opacity = '0'
        btnTake.style.transition = '0.75s opacity linear;'
        this.message.append(btnTake)
        setTimeout(() => {
            btnTake.style.opacity = '1'
        }, 750)
        btnTake.addEventListener('click', function x(){
            if (cards.layout.length === 0 && bot.cards.length === 0) {
              setTimeout(() => menu.showMessage('Вы проиграли! Попробуйте еще...'), 0)
            } else {
                user.cards.push(gameTable.cards.pop())
                btnTake.remove()
                library.displayAll()
                    setTimeout(() => {
                        bot.addCards()
                        library.displayAll()
                            bot.move()
                    }, 1500)
            }
        })
    },
}
