import {user} from './user.js'
import {cards} from './cards.js'
import {gameTable} from './gameTable.js'
import {library} from './library.js'
import {bot} from './bot.js'
import {cardSound, suffleCardsSound} from './audio.js'

const menuBtn =  document.createElement('button')
menuBtn.classList.add('btnMenu')
gameTable.mainBtn.addEventListener('click', function x() {

    document.body.className = 'opacityAnimation'
    setTimeout(() => {
            document.body.className = ''
    },3000)

    setTimeout(() => {
        document.body.style.opacity = '1'
        const h1 = document.querySelector('#gif')
        const mainDiv = document.querySelector('.main')
        gameTable.mainBtn.removeEventListener('click', x)
        h1.remove()
        mainDiv.remove()

        const linkSelf = document.createElement('a')
        linkSelf.setAttribute('href', 'index.html')
        linkSelf.textContent = 'Back to Main'
        menuBtn.append(linkSelf)
        gameTable.menu.append(menuBtn)
        suffleCardsSound.play()
        cards.getNewlayout()

        bot.addCards()
        user.addCards()
        library.displayAll()
        if (library.checkFirstMove()) {
            user.move()
        } else {
            bot.move()
        }

    },1500)

})
