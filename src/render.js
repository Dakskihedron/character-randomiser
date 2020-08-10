const { join } = require('path')
const { unlink } = require('fs')

// Declare HTML elements
const genButton = document.getElementById('generate-button')
const rpgSelect = document.getElementById('rpg-select')
const output = document.getElementById('output-container')

// Handles the generate button
genButton.addEventListener('click', () => {
  const nl = '\n'
  let parsedList = []
  let filename = rpgSelect.options[rpgSelect.selectedIndex].value
  let file = require(join(__dirname, '../resources/rpgs', `${filename}.json`))
  Object.keys(file).forEach(function(k) {
    if (Array.isArray(file[k])) { // Checks if data is an array
      parsedList.push(`${k}: ${file[k][Math.floor(Math.random() * file[k].length)]}`)
    } else {
      parsedList.push(`${k}: ${Math.floor(Math.random() * file[k]) + 1}`)
    }
  })
  if (parsedList) {
    // Create collapsible
    const collapsible = document.createElement('button')
    collapsible.setAttribute('class', 'collapsible')
    // Create collapsible content container
    const content = document.createElement('div')
    content.setAttribute('class', 'content')
    // Set collapsible title
    let collTitle = document.createTextNode(filename)
    collapsible.appendChild(collTitle)
    // Create collapsible content
    const ul = document.createElement('ul')
    ul.setAttribute('class', 'list')
    parsedList.forEach((element) => {
      const li = document.createElement('li')
      li.appendChild(document.createTextNode(element))
      ul.appendChild(li)
    })
    // Append stuff
    content.appendChild(ul)
    output.appendChild(collapsible)
    output.appendChild(content)
  } else {
    alert("ERROR: An exception has occurred!")
  }
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