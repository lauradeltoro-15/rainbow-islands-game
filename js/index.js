const startButton = document.querySelector(".start-button")
const canvas = document.querySelector("#canvas")
const gameInstructions = document.querySelector(".game-instructions")
const introAudio = document.querySelector(".introAudio")
const levelAudio = document.querySelector(".levelAudio")
const mainPages = document.querySelectorAll("#main-page")
const insertCoins = document.querySelectorAll("#insert-coin")
const endGames = document.querySelectorAll(".end-message")
// window.addEventListener("load", () => {
// introAudio.play()
// })

mainPages.forEach(elm => {
    elm.addEventListener("click", () => {
        canvas.classList.add("start")
        gameInstructions.classList.remove("inactive")
        Game.initGame('canvas')
        endGames.forEach(elm => {
            elm.classList.add("inactive")
        })
    })

})



insertCoins.forEach(elm => {
    elm.addEventListener("click", () => {
        console.log("HEY")
        endGames.forEach(elm => {
            elm.classList.add("inactive")
            Game.initGame('canvas')
        })
    })
})


startButton.addEventListener("click", () => {
    // levelAudio.play()
    canvas.classList.add("start")
    gameInstructions.classList.add("inactive")
    Game.initGame('canvas')
})