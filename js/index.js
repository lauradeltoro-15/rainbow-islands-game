const startButton = document.querySelector(".start-button")
const canvas = document.querySelector("#canvas")
const gameInstructions = document.querySelector(".game-instructions")
const introAudio = document.querySelector(".introAudio")
const levelAudio = document.querySelector(".levelAudio")
const insertCoins = document.querySelectorAll("#insert-coin")
const introScreen = document.querySelector(".game-instructions")
const endGames = document.querySelectorAll(".end-message")


// introAudio.addEventListener("load", () => {
//     introAudio.volume = 0.2
//     introAudio.play()

// })


insertCoins.forEach(elm => {
    elm.addEventListener("click", () => {
        endGames.forEach(elm => {
            location.reload();
        })
    })
})


startButton.addEventListener("click", () => {
    introAudio.pause()
    levelAudio.volume = 0.1
    // levelAudio.play()
    canvas.classList.add("start")
    gameInstructions.classList.add("inactive")
    Game.initGame('canvas')
})