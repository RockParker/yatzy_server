
class DiceHandler
{
    dice = []
    NUM_DICE

    constructor(numDice)
    {
        this.NUM_DICE = numDice
        for(let i = 0; i < numDice; i++)
        {
            this.dice.push(new Dice());
        }
    }

    /**
     * locks/unlocks the die at position index
     * @param index
     */
    lock(index)
    {
        this.dice[index].setActive(!this.dice[index].getActive())
    }

    /**
     * generates new values for the dice
     * @returns {Number[NUMBER_DICE]}
     */
    rollDice()
    {
        for(let i = 0; i < this.NUM_DICE; i++)
        {
            this.dice[i].roll()
        }

        return this.getDice()
    }

    /**
     * doesn't re-roll the dice
     * @returns {Number[NUMBER_DICE]}
     */
    getDice()
    {
        let die = []
        for(let i = 0; i < this.dice.length; i++)
        {
            die.push(this.dice[i].getValue())
        }
        return die;
    }

    /**
     * sets the dice to a ready state to be rolled
     * also sets them back to all ones
     */
    reset() {
        for (let i = 0; i < this.dice.length; i++)
        {
            this.dice[i].reset()
        }
    }

}

/**
 * Holds the values relative to one die, and hides some stuff away
 */
class Dice
{
    constructor() {
        this.value = 0
        this.isActive = true
    }

    getValue()
    {return this.value}
    getActive()
    {return this.isActive}
    setActive(value)
    {
        this.isActive = value
    }
    roll()
    {
        if(this.isActive)
            this.value = Math.floor(Math.random()*6)+1
    }

    reset()
    {
        this.value = 0
        this.isActive = true
    }
}
export default DiceHandler