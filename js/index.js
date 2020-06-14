const startButton = document.querySelector(".start-button")
const canvas = document.querySelector("#canvas")
const gameInstructions = document.querySelector(".game-instructions")
const introAudio = document.querySelector(".introAudio")
const levelAudio = document.querySelector(".levelAudio")

// window.addEventListener("load", () => {
// introAudio.play()
// })
startButton.addEventListener("click", () => {
    canvas.classList.add("start")
    introAudio.pause()
    // levelAudio.play()
    gameInstructions.classList.add("inactive")
    Game.initGame('canvas')
})