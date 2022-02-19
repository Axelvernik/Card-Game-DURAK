import {user} from './user.js'
import {cards} from './cards.js'
import {gameTable} from './gameTable.js'
import {library} from './library.js'
import {menu} from './menu.js'
import {cardSound, suffleCardsSound} from './audio.js'

export const bot = {
   cards : [],
   addCards() {
    while (this.cards.length  < 6 && cards.layout.length > 0) {
        this.cards.push(cards.layout.pop())
        }
   },

   displayCards() {
    let bot = document.querySelector('.bot') //визуал, карты игрока
    bot.innerHTML = ''
    this.cards.forEach ( i => {
    let handCard = document.createElement('img')
    handCard.src = '../cards/back.jpg';// можно заменить на i и видеть карты соперника(для отладки)!!!!!!!!!!!!!!
   
    bot.append(handCard);
   })
},

   move() {// логика хода бота
      library.showMessage('Ход соперника...')
      setTimeout(() => {
        
               let botTrumps = bot.cards.filter(i => library.cardSuit(i) === cards.trump)
               let botRests =  bot.cards.filter(i => library.cardSuit(i) !== cards.trump)
               let min;
               if(botRests.length > 0) {
                  min = botRests.sort((a,b) => library.cardValue(a)- library.cardValue(b))[0]
               } else {
                  min  = bot.cards.sort((a,b) => library.cardValue(a)- library.cardValue(b))[0]
               };
               let index = bot.cards.indexOf(min)
               gameTable.cards.push(bot.cards.splice(index, 1)[0])
               cardSound.play()
               if (cards.layout.length === 0 && bot.cards.length === 0 && user.cards.length > 1) {
                  library.displayAll()
                 setTimeout(() => menu.showMessage('Вы проиграли! Попробуйте еще...'), 0) 
                
               } else {
                  gameTable.addBtnTake();
                  library.displayAll()
                  user.answerMove()        
               }
      }, 1500)

   },

   answerMove() { 
        let bestMove;
        let mayMoves = library.mayMove(bot, gameTable.cards[0]) //возможные ходы
      if (mayMoves.length > 0) {//если есть возможные ходы
        bestMove = mayMoves[0];
        let index = bot.cards.indexOf(bestMove)
        cardSound.play()
        gameTable.cards.push(bot.cards.splice(index, 1)[0])
        library.displayAll()
        setTimeout(() =>{
         if(cards.layout.length === 0 && bot.cards.length === 0 && user.cards.length === 0) {
            menu.showMessage('Ничья!')
        }
               gameTable.cards = []
               library.displayAll()
               library.showMessage('Бито!')
               setTimeout(() => {
                  user.addCards()
                  bot.addCards()
                  bot.move()
                  library.displayAll()
                  user.myMove = false;
               }, 1500) 
            }, 1500 )
           } else { //если нет ходов (забрать)
        bot.cards.push(gameTable.cards.pop())
        library.displayAll()
     if(cards.layout.length === 0 && user.cards.length === 0 && bot.cards.length === 0) {
      menu.showMessage('Вы победили! Ура!!!')
      }
        library.showMessage('Забрал!')
        setTimeout(() =>{
               gameTable.cards = []
               user.addCards()
               user.move()
               library.displayAll()
           }, 1500)
      }
   }, 
}
