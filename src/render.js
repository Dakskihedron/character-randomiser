const { join } = require('path')

// Declare HTML elements
const genButton = document.getElementById('generate-button')
const rpgSelect = document.getElementById('rpg-select')
const output = document.getElementById('output-container')

// Handles the generate button
genButton.addEventListener('click', () => {
  const collapsible = document.createElement('button')
  collapsible.setAttribute('class', "collapsible")
  const content = document.createElement('div')
  content.setAttribute('class', "content")
  const btext = document.createTextNode("Open collapsible")
  collapsible.appendChild(btext)
  const p = document.createElement('p')
  const text = document.createTextNode("Hello world!")
  p.appendChild(text)
  content.appendChild(p)
  output.appendChild(collapsible)
  output.appendChild(content)
})

// Handles collapsible elements
document.querySelector('#output-container').addEventListener('click', function(e) {
  if (e.target.classList.contains('collapsible')) {
    e.target.classList.toggle('active')
    let content = e.target.nextElementSibling
    if (content.style.display === 'block') {
      content.style.display = 'none'
    } else {
      content.style.display = 'block'
    }
  }
})

// genButton.addEventListener('click', () => {
//     let rpgName = rpgSelect.options[rpgSelect.selectedIndex].value
//     let rpgFile = require(join(__dirname, '../resources/rpgs', `${rpgName}.json`))
//     const newline = '\n'
//     let valuesList = []
//     Object.keys(rpgFile).forEach(function(k) {
//         valuesList.push(`${k}: ${Math.floor(Math.random() * rpgFile[k]) + 1}`)
//         output.value = valuesList.join(newline)
//     })
// })