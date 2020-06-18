const startButton = document.querySelector(".start-button")
const canvas = document.querySelector("#canvas")
const gameInstructions = document.querySelector(".game-instructions")
const introAudio = document.querySelector(".introAudio")
const levelAudio = document.querySelector(".levelAudio")
const insertCoins = document.querySelectorAll("#insert-coin")
const introScreen = document.querySelector(".game-instructions")
const endGames = document.querySelectorAll(".end-message")
const mainPageSoundOn = document.querySelector(".sound-on.main-page")
const mainPageSoundOff = document.querySelector(".sound-off.main-page")
const levelGameSoundOn = document.querySelector(".game .sound-on")
const levelGameSoundOff = document.querySelector(".game .sound-off")


mainPageSoundOn.addEventListener("click", () => {
    introAudio.volume = 0.1
    introAudio.play()
    mainPageSoundOn.classList.add("inactive")
    mainPageSoundOff.classList.remove("inactive")
})
mainPageSoundOff.addEventListener("click", () => {
    introAudio.pause()
    mainPageSoundOn.classList.remove("inactive")
    mainPageSoundOff.classList.add("inactive")
})


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
    levelAudio.play()
    canvas.classList.add("start")
    levelGameSoundOff.classList.remove("inactive")

    gameInstructions.classList.add("inactive")
    Game.initGame('canvas')
})