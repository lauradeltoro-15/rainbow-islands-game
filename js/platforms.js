class Platform {
    constructor(ctx, canvasSize, platformImgSrc, platformPositionx, platformPositiony) {
        
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformImg = {
            img : undefined,
            src : platformImgSrc
        }
        this.platformPosition = {
            x: platformPositionx,
            y: platformPositiony
        }
        this.platformSize = {
            w: undefined,
            h: undefined 
            
        }

    }
    
}