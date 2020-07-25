const { join } = require('path')

// Declare HTML elements
const genButton = document.getElementById('gen-button')
const rpgSelect = document.getElementById('rpg-selection')
const output = document.getElementById('output')

genButton.addEventListener('click', () => {
    let rpgName = rpgSelect.options[rpgSelect.selectedIndex].value
    let rpgFile = require(join(__dirname, '../resources/rpgs', `${rpgName}.json`))
    const newline = '\n'
    let valuesList = []
    Object.keys(rpgFile).forEach(function(k) {
        valuesList.push(`${k}: ${Math.floor(Math.random() * rpgFile[k]) + 1}`)
        output.value = valuesList.join(newline)
    })
})