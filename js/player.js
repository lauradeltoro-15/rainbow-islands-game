  class Player {
      constructor(ctx, canvasSize, YBasePosition, playerImgSrc, playerImgFrames, keys, cameraVelocity) {
          this.ctx = ctx
          this.canvasSize = canvasSize
          this.keys = keys
          this.rainbowsConstructed = []
          this.isMoving = false
          this.isJumping = false
          this.jumpDirection = undefined
          this.isConstructing = false
          this.isFacingRight = true
          this.isFalling = false
          this.cameraVelocity = cameraVelocity
          this.basePosition = {
              y: YBasePosition
          }
          this.playerImg = {
              img: undefined,
              src: playerImgSrc,
              frames: playerImgFrames,
              framesIndex: 8,
              leftSideIndex: 7,
              rightSideIndex: 8
          }
          this.playerSize = {
              w: 100,
              h: 100,
          }
          this.range = {
              max: this.canvasSize.w - this.playerSize.w,
              min: 0
          }
          this.playerPosition = {
              x: this.canvasSize.w / 2,
              y: YBasePosition - this.playerSize.h
          }
          this.playerVelocity = {
              x: 15,
              y: 10
          }
          this.playerPhysics = {
              gravity: 0.2
          }
      }
      createImgPlayer() {
          this.setListeners()
          this.playerImg.img = new Image()
          this.playerImg.img.src = this.playerImg.src
          this.drawPlayer()
      }
      drawPlayer(framesCounter, higherPlayerPosition) {
          this.ctx.drawImage(
              this.playerImg.img,
              this.playerImg.framesIndex * Math.floor(this.playerImg.img.width / this.playerImg.frames),
              0,
              Math.floor(this.playerImg.img.width / this.playerImg.frames),
              this.playerImg.img.height,
              this.playerPosition.x,
              this.playerPosition.y,
              this.playerSize.w,
              this.playerSize.h
          )
          this.rainbowsConstructed.forEach(elm => {
              elm.drawRainbow(higherPlayerPosition, this, this.cameraVelocity)
          })
          this.isMoving ? this.animatePlayer(framesCounter) : null
          if (this.isJumping) {
              this.animatePlayer(framesCounter)
              this.applyJumpGravity()
          }
      }
      animatePlayer(framesCounter) {
          if (framesCounter % 3 === 0 && this.isFacingRight) {
              this.playerImg.framesIndex < this.playerImg.rightSideIndex - 1 || this.playerImg.framesIndex > this.playerImg.frames - 2 ? this.playerImg.framesIndex = this.playerImg.rightSideIndex + 1 : this.playerImg.framesIndex++
          } else if (framesCounter % 3 === 0 && !this.isFacingRight) {
              this.playerImg.framesIndex > this.playerImg.leftSideIndex || this.playerImg.framesIndex === 0 ? this.playerImg.framesIndex = 7 : this.playerImg.framesIndex--
          }
      }
      move(direction) {
          if (direction === "left") {
              this.playerPosition.x > this.range.min ? this.playerPosition.x -= this.playerVelocity.x : null
          }
          if (direction === "right") {
              this.playerPosition.x < this.range.max ? this.playerPosition.x += this.playerVelocity.x : null

          }
      }
      applyJumpGravity() {
          this.jumpDirection === "right" && this.playerPosition.x < this.range.max ? this.playerPosition.x += this.playerVelocity.x / 5 : null
          this.jumpDirection === "left" && this.playerPosition.x > this.range.min ? this.playerPosition.x -= this.playerVelocity.x / 5 : null
          this.playerPosition.y -= this.playerVelocity.y
          this.playerVelocity.y -= this.playerPhysics.gravity
          if (this.playerPosition.y + this.playerVelocity.y >= this.basePosition.y - this.playerSize.h) {
              this.playerPosition.y = this.basePosition.y - this.playerSize.h
              this.setPlayerToStaticPosition()
          }
      }

      setPlayerToStaticPosition() {
          this.playerImg.framesIndex = 0
          this.isJumping = false
          this.jumpDirection = undefined
          this.playerVelocity.y = 10
          this.playerVelocity.x = 15
          this.isFacingRight ? this.playerImg.framesIndex = 8 : this.playerImg.framesIndex = 7
      }
      setListeners() {
          document.addEventListener("keydown", e => {
              switch (e.keyCode) {
                  case this.keys.LEFT:
                      this.isFacingRight = false
                      this.isMoving = true
                      this.move("left")
                      break;
                  case this.keys.RIGHT:
                      this.isFacingRight = true
                      this.isMoving = true
                      this.move("right")
                      break;
                  case this.keys.SPACE:
                      if (this.isMoving && this.isFacingRight) {
                          this.jumpDirection = "right"
                      } else if (this.isMoving) {
                          this.jumpDirection = "left"
                      }
                      this.isJumping = true
                      break;
                  case this.keys.XKey:
                      this.isConstructing = true
                      this.rainbowsConstructed.push(new Rainbow(this.ctx, this.playerPosition, this.playerSize, this.isFacingRight))
                      break;
              }
          })
          document.addEventListener("keyup", e => {
              switch (e.keyCode) {
                  case this.keys.LEFT:
                      this.playerImg.framesIndex = this.playerImg.leftSideIndex
                      this.isMoving = false

                      break;
                  case this.keys.RIGHT:
                      this.playerImg.framesIndex = this.playerImg.rightSideIndex
                      this.isMoving = false
                      break;
                  case this.keys.XKey:
                      this.isConstructing = false
                      break;

              }

          })
      }

  }