import Game from "./Game.js"
import Calculator from './Calculator.js'
import DiceHandler from './DiceHandler.js'

class GameStateHandler {
    NUMBER_OF_DICE = 5;
    NUM_VALUES = 17; //represents 13 player selected scores, and 4 calculated scores

    constructor(isSinglePlayer) {
        this.game = new Game(this.NUM_VALUES)
        this.diceHandler = new DiceHandler(this.NUMBER_OF_DICE)
        this.calculator = new Calculator()
        this.isGameOver = false

        this.rollsSinceClick = 0;

        this.isPlayersTurn = true
        this.isSinglePlayer = isSinglePlayer
    }

    /**
     * Things that can happen b/c of player:
     * Dice roll, locking a value, end game, reset
     */

    rollDice() {
        if (this.rollsSinceClick >= 3)
            return this.valuesToJson()

        this.rollsSinceClick++

        this.getValues(this.diceHandler.rollDice())

        return this.valuesToJson()

    }

    lockDice(index) {

        this.diceHandler.lock(index)
    }

    endGame() {
        this.isGameOver = true

    }// will do more
    reset() {
        this.rollsSinceClick = 0
        this.isGameOver = false
        this.resetDice()
        this.game.reset()
    }

    resetDice() {
        this.rollsSinceClick = 0
        this.diceHandler.reset()
    }

    cellClick(cellIndex, isPlayer) {
        /**
         * maps the index, based on isPlayer (increments by 2)
         * for player, it ranges from 0 - 28
         * for enemy, it ranges from 1 - 29
         */
        if (!isPlayer) cellIndex -= 1 //processing the cellIndex to fit in the range of the playerValues/enemyValues lists
        cellIndex = Math.ceil(cellIndex / 2)


        if (!this.#isValidCell(cellIndex, isPlayer)) //filters inValid requests
            return false;

        //locking the cell and then setting the game up for the other players turn
        (isPlayer) ? this.game.lockPlayerValue(cellIndex) : this.game.lockEnemyValue(cellIndex)
        this.rollsSinceClick = 0
        this.diceHandler.reset();
        this.isPlayersTurn = (this.isSinglePlayer) ? this.isPlayersTurn : !this.isPlayersTurn

        return true
    }

    /**
     * cellIndex should be processed to the size of the score lists
     */
    #isValidCell(cellIndex, isPlayer) {
        if (this.isPlayersTurn && (!isPlayer) ||
            !this.isPlayersTurn && isPlayer) return false

        //if the desired cell is set to inActive
        if(!(isPlayer ? this.game.playerValues : this.game.enemyValues)[cellIndex].getActive())
            return false


        return true
    }

    getValues(diceValues) {
        let calcValues = this.calculator.calculateScores(diceValues)

        if (this.isPlayersTurn || this.isSinglePlayer)
            return this.game.setPlayerValues(calcValues)

        else return this.game.setEnemyValues(calcValues)
    }

    valuesToJson() {
        let dict =
            {
                "dice": this.diceHandler.getDice(),
                "playerValues": this.game.getPlayerValues(),
                "enemyValues": this.game.getEnemyValues()
            };

        return JSON.stringify(dict)
    }
}


export default GameStateHandler