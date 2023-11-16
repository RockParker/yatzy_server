/**
 * This will store the state of the game
 * */

class Game{

    constructor(numScores)
    {
        this.NUM_VALUES = numScores
        this.reset()

    }

    /**
     * resets the player and enemy values
     */
    reset()
    {
        this.playerValues = [];
        this.enemyValues = [];

        for(let i = 0; i < this.NUM_VALUES; i++)
        {
            this.playerValues.push(new CellValue());
            this.enemyValues.push(new CellValue());
        }
    }

    /**
     * locks and index, doesn't allow unlocking
     * @param index
     */
    lockPlayerValue(index)
    {
        this.playerValues[index].setActive(false)

        if(this.isRangeComplete(this.playerValues, 0, 6) ||
            this.isRangeComplete(this.playerValues, 8, 14))
        {
            this.setPlayerValues(this.getPlayerValues())
        }
    }

    /**
     * locks and index, doesn't allow unlocking
     *  @param index
     */
    lockEnemyValue(index)
    {
        this.enemyValues[index].setActive(false)
        if(this.isRangeComplete(this.enemyValues, 0, 6) ||
            this.isRangeComplete(this.enemyValues, 8,14))
        {
            //forces the totals to calculate before returning the values to the client if the ranges are completed
            this.setEnemyValues(this.getEnemyValues())
        }
    }

    /**
     * converts list of custom class into numbers to send to client
     * @returns {Number[]}
     */
    getPlayerValues()
    {
        let numbers=[];
        for (let i = 0; i < this.playerValues.length; i++)
        {
            numbers.push(this.playerValues[i].getValue())
        }

        return numbers;
    }

    /**
     * converts list of custom class into numbers to send to client
     * @returns {Number[]}
     */
    getEnemyValues()
    {
        let numbers=[];
        for (let i = 0; i < this.enemyValues.length; i++)
        {
            numbers.push(this.enemyValues[i].getValue())
        }

        return numbers;
    }

    /**
     * middle-man method to make calling easier, while still allowing code to remain "DRY"
     * @param scores
     * @returns {*}
     */
    setPlayerValues(scores)
    {
        return this.playerValues = this.#setValues(scores, true)
    }

    /**
     * middle-man method to make calling easier, while still allowing code to remain "DRY"
     * @param scores
     * @returns {*}
     */
    setEnemyValues(scores)
    {
        return this.enemyValues = this.#setValues(scores, false)
    }


    /**
     * ensures that a range is completed in the list that is provided
     * @param list the list to check
     * @param startIndex inclusive
     * @param endIndex exclusive
     * @returns {boolean}
     */
    isRangeComplete(list, startIndex, endIndex)
    {
        for(let i = startIndex; i < endIndex; i++)
        {
            if(list[i].getActive() == true)
            {
                return false
            }
        }
        return true
    }


    /**
     * sets the values in the player/enemy values
     * @param scores
     * @param isPlayer
     * @returns {*}
     */
    #setValues(scores, isPlayer)
    {
        let list
        if(isPlayer) list = this.playerValues
        else list = this.enemyValues
        let sum = 0
        for(let i = 0; i < 6; i++)
        {
           list[i].update(scores[i])

            sum+=list[i].getValue()
        }

        if(this.isRangeComplete(list, 0, 6))
        {

            list[6].setValue(sum)

            if (sum >= 63) list[7].setValue(35)
            else list[7].setValue(0)
            list[7].isActive = false

        }
        let sum2 = 0;
        for(let i = 8; i < 15; i++)
        {
            list[i].update(scores[i-2])
            sum2+=list[i].getValue()
        }

        if(this.isRangeComplete(list, 8, 14)) {
            list[15].setValue(sum2)
            list[16].setValue(sum + sum2)
        }//totals don't update from 0 unless the range is finished

        return list
    }
}

/**
 * class used to hold a number, and a boolean
 * number is the score
 * boolean is whether the number is locked or not
 */
class CellValue
{
    value = 0;
    isActive = true;
    constructor() {
    }
    update(number)
    {
        if(this.isActive)
            this.value = number;

        return this.isActive
    }
    setValue(number)//final
    {
        if(this.isActive)
            this.value = number
        this.isActive = false
    }
    setActive(value)
    {this.isActive = value}
    getActive()
    {return this.isActive}
    getValue()
    {
        return this.value
    }
}


export default Game
