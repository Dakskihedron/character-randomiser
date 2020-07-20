const { join } = require('path')

// Declare HTML elements
const genButton = document.getElementById('gen-button')
const rpgSelect = document.getElementById('rpg-selection')
const output = document.getElementById('output')

genButton.addEventListener('click', () => {
    let rpgName = rpgSelect.options[rpgSelect.selectedIndex].value
    let rpgFile = require(join(__dirname, '../rpgs', `${rpgName}.json`))
    output.value = rpgFile['strength']
})