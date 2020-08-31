const { join } = require('path')
const rpgFiles = join(process.env.APPDATA, '/character-randomiser/Local Storage/rpgs/')

// Reference HTML elements
const genButton = document.getElementById('generate-button')
const rpgSelect = document.getElementById('rpg-select')
const collTracker = document.getElementById('coll-tracker')
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
      const collDiv = document.createElement('div')
      collDiv.setAttribute('class', 'coll-div')
      const collapsible = document.createElement('button')
      collapsible.setAttribute('class', 'collapsible')
      // Create collapsible content container
      const content = document.createElement('div')
      content.setAttribute('class', 'content')
      // Set collapsible title
      const collHyper = document.createElement('a')
      collHyper.setAttribute('class', 'coll-a')
      let collTitle = document.createTextNode(this.filename)
      collHyper.appendChild(collTitle)
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
      collapsible.appendChild(collHyper)
      collDiv.appendChild(collapsible)
      output.insertBefore(content, output.firstChild)
      output.insertBefore(collDiv, output.firstChild)
      collTracker.textContent = `RPGs: ${document.getElementsByClassName('coll-div').length}/10`
    } else {
      alert("ERROR: An exception has occurred!")
    }
  }
}

// When the generate button is clicked, read the selected RPG file and process the data, call RPG collapsible class preset() function
genButton.addEventListener('click', () => {
  if (document.getElementsByClassName('coll-div').length == 10) {
    alert(`The RPG limit has been reached. RPGs can be deleted by clicking on their collapsible's titles.`)
    return
  } else {
    let parsedList = []
    let filename = rpgSelect.options[rpgSelect.selectedIndex].value
    let file = require(join(rpgFiles, `${filename}.json`))
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
  }
})

// Handles opening and closing of collapsible elements
document.querySelector('#output-container').addEventListener('click', function(e) {
  if (e.target.classList.contains('collapsible')) {
    e.target.classList.toggle('active')
    let content = e.target.parentElement.nextElementSibling
    if (content.style.display === 'block') {
      content.style.display = 'none'
      e.target.parentElement.style.marginBottom = '10px'
    } else {
      content.style.display = 'block'
      e.target.parentElement.style.marginBottom = '0px'
    }
  }
})

// Handles deleting collapsible elements
document.querySelector('#output-container').addEventListener('click', function(e) {
  let coll = e.target.parentElement.parentElement
  if (coll.classList.contains('coll-div')) {
    coll.nextElementSibling.remove()
    coll.remove()
    collTracker.textContent = `RPGs: ${document.getElementsByClassName('coll-div').length}/10`
  }
})