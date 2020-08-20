const { join } = require('path')

// Declare HTML elements
const genButton = document.getElementById('generate-button')
const rpgSelect = document.getElementById('rpg-select')
const output = document.getElementById('output-container')

// RPG collapsible class
class RPGCollapsible {
  constructor(parsedList, filename) {
    this.parsedList = parsedList
    this.filename = filename
  }
  present() {
    if (this.parsedList) {
      // Create collapsible
      const collapsible = document.createElement('button')
      collapsible.setAttribute('class', 'collapsible')
      // Create collapsible content container
      const content = document.createElement('div')
      content.setAttribute('class', 'content')
      // Set collapsible title
      let collTitle = document.createTextNode(this.filename)
      collapsible.appendChild(collTitle)
      // Create list element with the keys and values from the parsedList array
      const ul = document.createElement('ul')
      ul.setAttribute('class', 'list')
      this.parsedList.forEach((element) => {
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(element))
        ul.appendChild(li)
      })
      // Append the list element to the content container and append the collapsible and content container to the HTML document
      content.appendChild(ul)
      output.insertBefore(content, output.firstChild)
      output.insertBefore(collapsible, output.firstChild)
    } else {
      alert("ERROR: An exception has occurred!")
    }
  }
}

// When the generate button is clicked, read the selected RPG file and process the data
genButton.addEventListener('click', () => {
  let parsedList = []
  let filename = rpgSelect.options[rpgSelect.selectedIndex].value
  let file = require(join(__dirname, '../resources/rpgs', `${filename}.json`))
  Object.keys(file).forEach(function(k) {
    if (Array.isArray(file[k])) { // Checks if data is an array
      if (file[k].length) { // Checks if array is empty
        parsedList.push(`${k}: ${file[k][Math.floor(Math.random() * file[k].length)]}`)
      } else { // If the array is empty, throw an error message
        parsedList.push(`${k}: ERROR: The array is empty.`)
      }
    } else { // If data is not an array, then it is a number value
      if (Number.isInteger(file[k])) { // Checks if data is an integer
        parsedList.push(`${k}: ${Math.floor(Math.random() * file[k]) + 1}`)
      } else { // If the data is not an integer, throw an error message
        parsedList.push(`${k}: ERROR: A valid integer was not provided.`)
      }
    }
  })
  createColl = new RPGCollapsible(parsedList, filename)
  createColl.present()
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