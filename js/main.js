let movementDisplay = document.querySelector('#movement')
let game = document.querySelector('#game')

const computedStyle = getComputedStyle(game)
const height = computedStyle.height
const width = computedStyle.width
game.height = height.replace('px', '')
game.width = width.replace('px', '')

const ctx = game.getContext('2d')
ctx.fillStyle = 'white';
ctx.strokeStyle = 'red'
ctx.lineWidth = 5

// ctx.fillRect(10, 10, 100, 100);
// ctx.strokeRect(10, 10, 100, 100,);


// function drawBox(x, y, size, color) {
//     ctx.fillStyle = color
//     ctx.fillRect(x, y, size, size)
// }

// drawBox(200, 200, 50, 'pink');



//   var hero = {
    //     x: 0,
    //     y: 0,
    //     color: "hotpink",
    //     width: 20,
    //     height: 20,
    //     alive: true,
    //     render: function () {
        //       ctx.fillStyle = this.color
        //       ctx.fillRect(this.x, this.y, this.width, this.height)
        //     }
        //   }
        
class Crawler {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color 
        this.width = width
        this.height = height
        this.alive = true
    }
    
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    
}

const ogre = new Crawler(10, 10, '#BADA55', 100, 100)
const hero = new Crawler(300, 300,'hotpink', 100, 100)

// console.log(ogre);
// console.log(hero);

document.getElementById('status').addEventListener('click', function() {
    hero.render()
    ogre.render()
})


document.addEventListener('keyup', function(evt) {
    if (evt.key === 'w') {
        hero.y -= 10
    } else if (evt.key === 'a') {
        hero.x -= 10
    } else if (evt.key === 's') {
        hero.y += 10
    } else if (evt.key === 'd') {
        hero.x += 10
    }

    // console.log(hero)

    movementDisplay.textContent = `X: ${hero.x},  Y: ${hero.y}`
})


function detectHit() {
    if (hero.x < ogre.x + ogre.width 
        && hero.x + hero.width > ogre.x
        && hero.y < ogre.y + ogre.height
        && hero.y + hero.height > ogre.y) {
            ogre.alive = false
        }            
    }

function rePaint() {
    //clear off entire canvas 
    ctx.clearRect(0, 0, game.width, game.height)
    // render the hero and ogre
    hero.render()
    if (ogre.alive) {
        ogre.render()
    }
    detectHit()
}

setInterval(rePaint, 1000/ 60)