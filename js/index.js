const startButton = document.querySelector(".start-button")
const canvas = document.querySelector("#canvas")
const gameInstructions = document.querySelector(".game-instructions")
const introAudio = document.querySelector(".introAudio")
const levelAudio = document.querySelector(".levelAudio")
const mainPage = document.querySelector("#insert-coin")
const insertCoin = document.querySelector("#main-page")
const endGame = document.querySelector(".end-message")
// window.addEventListener("load", () => {
// introAudio.play()
// })

insertCoin.addEventListener("click", () => {
    canvas.classList.add("start")
    gameInstructions.classList.remove("inactive")
    Game.initGame('canvas')
    endGame.classList.add("inactive")
    

})


mainPage.addEventListener("click", () => {
    endGame.classList.add("inactive")
    Game.initGame('canvas')
})


startButton.addEventListener("click", () => {
    // levelAudio.play()
    canvas.classList.add("start")
    gameInstructions.classList.add("inactive")
    Game.initGame('canvas')
})