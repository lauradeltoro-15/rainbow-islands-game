class Rainbow {
    constructor(ctx, playerPosition, playerSize, isPlayerFacingRight) {
        this.ctx = ctx
        this.playerPosition = playerPosition
        this.playerSize = playerSize
        this.rainbowPosition = {
            facingLeft: {
                x: this.playerPosition.x,
                y: this.playerPosition.y
            },
            facingRigth: {
                x: this.playerPosition.x + this.playerSize.w,
                y: this.playerPosition.y + 30
            }
        }
        this.rainbowSize = {
            w: 0,
            h: 30
        }
        this.growVel = 5
        this.isPlayerFacingRight = isPlayerFacingRight
        this.rainbowColors = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"]
    }
    drawRainbow() {
        if (this.rainbowSize.w >= 150) {
            this.rainbowColors.forEach((elm, i) => {
                this.ctx.fillStyle = elm
                this.ctx.fillRect(
                    this.rainbowPosition.facingRigth.x,
                    this.rainbowPosition.facingRigth.y + (this.rainbowSize.h / this.rainbowColors.length) * i,
                    this.rainbowSize.w,
                    this.rainbowSize.h / this.rainbowColors.length)
            });
            return
        }
        this.rainbowSize.w += this.growVel
        this.rainbowColors.forEach((elm, i) => {
            this.ctx.fillStyle = elm
            this.ctx.fillRect(
                this.rainbowPosition.facingRigth.x,
                this.rainbowPosition.facingRigth.y + (this.rainbowSize.h / this.rainbowColors.length) * i,
                this.rainbowSize.w,
                this.rainbowSize.h / this.rainbowColors.length)
        });
    }

}