const yaml = require('js-yaml')

// Declare HTML elements
const genButton = document.getElementById('gen-button')
const output = document.getElementById('output')

genButton.addEventListener('click', () => {
    output.value = "Hello world!"
})