import express from 'express'
import GameStateHandler from './GameStateHandler.js'

const app = express()
app.set('etag', false)

app.listen(3000)
let gameState;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT')

    next();
})

app.put('/start-game/:isSinglePlayer', (req, res) => {
    gameState = null
    let isSinglePlayer = req.params.isSinglePlayer
    if (isSinglePlayer === 'false')
        gameState = new GameStateHandler(false)
    else gameState = new GameStateHandler(true)
    res.status(200)
    res.send(gameState.valuesToJson())
})

app.get('/roll-dice', (req, res) => {

    res.status(200)

    res.send(gameState.rollDice())
})

app.put('/reset-dice', (req, res) => {

    gameState.resetDice()
    res.sendStatus(200)
})

/**
 * requests should look like: http...../player/values/10
 * 10 is the index, 25 is the
 */
app.put('/cells/lock/:index', (req, res) => {
    let index = req.params.index
    let isLocked = gameState.cellClick(index, (index % 2 === 0))

    if (isLocked)
        res.status(200)
    else
        res.status(544)//custom code, so that the client doesn't show the user a successful click

    let response = null
    response = gameState.valuesToJson()
    res.send(response);
})

app.put('/dice/lock/:index', (req, res) => {
    let index = req.params.index
    gameState.lockDice(index)
})

app.get('/reset', (req, res) => {
    gameState.reset()

    res.sendStatus(200)
})


