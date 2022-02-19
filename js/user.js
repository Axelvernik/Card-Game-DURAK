
import {cards} from './cards.js'
import {gameTable} from './gameTable.js'
import {library} from './library.js'
import {bot} from './bot.js'
import {menu} from './menu.js'
import {cardSound, suffleCardsSound} from './audio.js'

export const user = {
    myMove: true,
    cards : [],
    
    addCards() {
        while (this.cards.length  < 6 && cards.layout.length > 0) {
            this.cards.push(cards.layout.pop())
        }
    },

    displayCards() {
            let player = document.querySelector('.player') //визуал, карты игрока
            player.innerHTML = ''
            this.cards.forEach ( i => {
            let handCard = document.createElement('img')
            handCard.src = i;
            player.append(handCard);
        })
    },

    move() {
            library.showMessage('Ваш ход!')
            let player = document.querySelector('.player')
            player.addEventListener('mousedown', function x(){
                event.preventDefault()
                let selectedCar = event.target;
                let droppable = selectedCar;
                let index = user.cards.indexOf(selectedCar.getAttribute('src'))
                let shiftX = event.clientX - selectedCar.getBoundingClientRect().left;
                let shiftY = event.clientY - selectedCar.getBoundingClientRect().top;
                selectedCar.style.position = 'absolute'
                moveAt(event.pageX, event.pageY);
                function moveAt(pageX, pageY) {
                    selectedCar.style.left = pageX - shiftX + 'px';
                    selectedCar.style.top = pageY - shiftY + 'px';
                  }
                  function onMouseMove(event) {
                    selectedCar.style.display = 'none';
                    droppable = document.elementFromPoint(event.clientX, event.clientY);
                    selectedCar.style.display = 'flex';
                    moveAt(event.pageX, event.pageY);
                  }
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', function y(){
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', y)
                    if(droppable.className === 'center') {
                                cardSound.play()
                                gameTable.cards.push(user.cards.splice(index, 1)[0])
                                player.removeEventListener('mousedown', x)
                                library.displayAll()
                                setTimeout(() => {
                                    if (cards.layout.length === 0 && user.cards.length === 0 && bot.cards.length > 1) {
                                        menu.showMessage('Вы победили! Ура!!!')
                                            }  else {
                                                bot.answerMove()
                                            }
                                },1500)
                    } else {
                        selectedCar.style.position = 'static'
                    }
                    
                })

            })
    },

    answerMove() {
        let player = document.querySelector('.player')
        player.addEventListener('mousedown', function x(){
            event.preventDefault()
            let selectedCar = event.target;
            let droppable = selectedCar;
            let index = user.cards.indexOf(selectedCar.getAttribute('src'))
            let shiftX = event.clientX - selectedCar.getBoundingClientRect().left;
            let shiftY = event.clientY - selectedCar.getBoundingClientRect().top;
            selectedCar.style.position = 'absolute'
            moveAt(event.pageX, event.pageY);
            function moveAt(pageX, pageY) {
                selectedCar.style.left = pageX - shiftX + 'px';
                selectedCar.style.top = pageY - shiftY + 'px';
              }
              function onMouseMove(event) {
                selectedCar.style.display = 'none';
                droppable = document.elementFromPoint(event.clientX, event.clientY);
                selectedCar.style.display = 'flex';
                moveAt(event.pageX, event.pageY);
              }
              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', function y(){
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', y)
                let conditions = (droppable.className === 'center' || droppable.parentElement.parentElement.className === 'center') && library.mayMove(user, gameTable.cards[0]).includes(event.target.getAttribute('src'))
                if(conditions) {
                    cardSound.play()
                    gameTable.cards.push(user.cards.splice(index, 1))
                        gameTable.message.innerHTML = ''
                        player.removeEventListener('mousedown', x)
                        library.displayAll()
                        setTimeout(() =>{
                            library.showMessage('Бито!')
                            if(cards.layout.length === 0 && bot.cards.length === 0 && user.cards.length === 0) {
                                menu.showMessage('Ничья!')
                            }
                            if(cards.layout.length === 0 && user.cards.length === 0 ) {
                                menu.showMessage('Вы победили! Ура!!!')
                            }
                            gameTable.cards = []
                            library.displayAll()
                            setTimeout(() => {
                                bot.addCards()
                                user.addCards()
                                library.displayAll()
                                user.myMove = true;
                                user.move()
                            },1500)
                        }, 1500 )
                } else {
                    selectedCar.style.position = 'static'
                }
              })
        })
    },   
}
 