const startButton = document.querySelector(".start-button")
const canvas = document.querySelector("#canvas")
const gameInstructions = document.querySelector(".game-instructions")
const introAudio = document.querySelector(".introAudio")
const levelAudio = document.querySelector(".levelAudio")
const insertCoins = document.querySelectorAll("#insert-coin")
const endGames = document.querySelectorAll(".end-message")
// window.addEventListener("load", () => {
// introAudio.play()
// })





insertCoins.forEach(elm => {
    elm.addEventListener("click", () => {
        endGames.forEach(elm => {
            location.reload();
        })
    })
})


startButton.addEventListener("click", () => {
    // levelAudio.play()
    canvas.classList.add("start")
    gameInstructions.classList.add("inactive")
    Game.initGame('canvas')
})