const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let score = 0

const brickRowCount = 9
const brickColumnCount = 5

// create ball props
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

// create paddle props 
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80, 
    h: 10, 
    speed: 8,
    dx: 0
}

// create brick props 
 const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// create bricks 
const bricks = []
for(let i = 0; i < brickRowCount; i++){
    bricks[i] =  []
    for(let j = 0; j < brickColumnCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY

        bricks[i][j] = {x , y, ...brickInfo }
    }
}

// draw ball on canvas 
drawBall = () => {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

// draw paddle on canvas 
drawPaddle = () => {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}



drawScore = () => {
    ctx.font = '20px Arial',
    ctx.fillText(`Score:${score}`, canvas.width - 100, 30)
}

console.log(bricks)

// draw brick on canvas 
drawBricks = () => {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent'
            ctx.fill()
            ctx.closePath()
        })
    })
}

// move paddle on canvas 

movePaddle = () => {
    paddle.x += paddle.dx

    // wall detection 
    if(paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }
    if(paddle.x < 0) {
        paddle.x = 0
    }
}



function draw(){
    // clear canvas 
    ctx.clearRect(0,0, canvas.width, canvas.height)

    drawBall()
    drawPaddle()
    drawScore()
    drawBricks()
}

// update canvas 
function update() {
    movePaddle()

    draw()

    requestAnimationFrame(update)
}

update()

function keyDown(e){
    if(e.key === 'Right' || e.key === 'ArrowRight'){
        paddle.dx = paddle.speed
    } else if (e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx = -paddle.speed
    }
}

function keyUp(e){
    if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = 0
    }
}

// keyborad event 
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)


rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})