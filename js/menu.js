
import {gameTable} from './gameTable.js'

export const menu = {
    showMessage(text) { // вывод сообщения
        
        let mess = document.createElement('p');
        mess.textContent = text;
        gameTable.menu.append(mess)
       
    },
}