console.clear()
let i = 0
let points = 0
const boxes = []

update()

function update() {
  i++
  i % 20 || createBox()

  boxes.forEach((box, index) => {
    box.speed *= box.acceleration
    box.x += box.speed
    box.el.style.background = `hsl(${Math.round(box.counter % 360)}, 70%, 70%)`
    box.y += Math.sin(box.counter++ / 20) * 4
    box.el.style.width = box.size + 'px'
    box.el.style.height = box.size + 'px'
    box.el.style.left = box.x + 'px'
    box.el.style.top = box.y + 'px'
    if (box.x > window.innerWidth) {
      boxes.splice(index, 1)
      box.el.remove()
    }
  })
  requestAnimationFrame(update)
}

function createBox() {
  const el = document.createElement('div')
  el.className = 'box'
  el.style.background = `hsl(${Math.round(20 + Math.random() * 200)}, 70%, 70%)`

  document.body.appendChild(el)

  const box = {
    el,
    counter: Math.round(Math.random() * 360),
    x: -el.getBoundingClientRect().width,
    y: Math.random() * window.innerHeight - el.getBoundingClientRect().height,
    size: 30 + Math.random() * 100,
    speed: 1,
    acceleration: 1.01
  }

  el.addEventListener('click', () => {
    const index = boxes.indexOf(box)
    boxes.splice(index, 1)
    el.remove()
    addPoint()
  })

  boxes.push(box)
}

function addPoint() {
  points++
  const output = document.querySelector('output')
  output.textContent = points
}
