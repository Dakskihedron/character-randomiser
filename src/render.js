const { join } = require('path')

// Declare HTML elements
const genButton = document.getElementById('generate-button')
const rpgSelect = document.getElementById('rpg-select')
const output = document.getElementById('output-container')

// Handles the generate button
genButton.addEventListener('click', () => {
  const collapsible = document.createElement('button')
  collapsible.setAttribute('class', 'collapsible')
  const content = document.createElement('div')
  content.setAttribute('class', 'content')
  const text = document.createTextNode('Hello world!')
  content.appendChild(text)
  output.appendChild(collapsible)
  output.appendChild(content)
})

// Handles collapsible elements
var coll = document.getElementsByClassName("stat-collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

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