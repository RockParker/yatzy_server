//this should take the dice and convert the values into the scores those represent

class Calculator {
    calculateScores(dice) {
        let scores = []
        let tallies = [] //stores how many of each number there is in the dice
        let mode = 0 //the most that any number shows up
        for (let i = 0; i <= 5; i++) {
            tallies.push(0);
            for (let j = 0; j < dice.length; j++) {
                if (i+1 == dice[j]) {
                    tallies[i]++
                }
            }
            if (tallies[i] > mode)
                mode = tallies[i]
        }

        let sum = 0;
        for (let i = 0; i < tallies.length; i++) //calculates scores for ones ~ sixes
        {
            scores.push(tallies[i] * (i + 1))
            sum += scores[i]
        }

        if (mode >= 3)//three of a kind check
            scores.push(sum)
        else
            scores.push(0)


        if (mode >= 4)//four of a kind check
            scores.push(sum)
        else
            scores.push(0)

        if (tallies.includes(3) && tallies.includes(2))//full house
            scores.push(25)
        else
            scores.push(0);


        if (hasStraight(tallies, 4))
            scores.push(30)
        else
            scores.push(0)

        if (hasStraight(tallies, 5))
            scores.push(40)
        else
            scores.push(0)

        if (mode === 5) //yahtzee check
            scores.push(50)
        else
            scores.push(0)

        scores.push(sum) //this is chance
        return scores;//size should be 13
    }
}

    function hasStraight(tallies, straightSize) {
        let numPossibleStraights = 6 - straightSize + 1; //size:5 means there are 2 possible straights (1-5, 2-6)
        let hasStraight = true;
        for (let i = 0; i < numPossibleStraights; i++) {
            hasStraight = true;
            for (let j = 0; j < straightSize; j++) {
                if (tallies[i + j] == 0) {
                    hasStraight = false;
                }
            }
            if (hasStraight)
                break
        }
        return hasStraight;
    }

export default Calculator