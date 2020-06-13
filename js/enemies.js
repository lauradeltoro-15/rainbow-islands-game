class Character {
    constructor(ctx, characterImgSrc, characterImgFrames, framesCounter, characterSizeW, characterSizeH, characterVelX, characterVelY) {
        this.ctx = ctx
        this.characterPosition = {
            x: characterPositionx,
            y: characterPositiony
        }
        this.basePosition = {
            y: this.playerPosition.y
        }
        this.characterImg = {
            img: undefined,
            src: characterImgSrc,
            frames: characterImgFrames,
            framesIndex: 0
        }
        this.characterSize = {
            w: characterSizeW,
            h: characterSizeH,
        }
        this.characterVelocity = {
            x: characterVelX,
            y: characterVelY
        }

    }
    createImgCharacter() {
        this.characterImg.img = new Image
        this.characterImg.img.src = this.characterImg.src
        this.drawCharacter()
    }
    drawCharacter(framesCounter) {

        this.ctx.drawImage(
            this.characterImg.img,
            this.characterImg.framesIndex * Math.floor(this.characterImg.img.width / this.characterImg.frames),
            0,
            Math.floor(this.characterImg.img.width / this.characterImg.frames),
            this.characterImg.img.height,
            this.characterPosition.x,
            this.characterPosition.y,
            this.characterSize.w,
            this.characterSize.h
        )
    }
    animateCharacter(framesCounter) {
        framesCounter % 3 === 0 ? this.characterImg.framesIndex++ : null
        this.characterImg.framesIndex > this.characterImg.frames - 1 ? this.characterImg.framesIndex = 0 : null
    }
}

class Enemie extends Character {
    constructor(ctx, characterImgSrc, characterImgFrames, framesCounter, characterSizeW, characterSizeH, characterVelX, characterVelY) {
        super(ctx, characterImgSrc, characterImgFrames, framesCounter, characterSizeW, characterSizeH, characterVelX, characterVelY)



    }
}