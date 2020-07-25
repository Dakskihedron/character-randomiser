const { join } = require('path')
const { app, BrowserWindow, Menu, shell } = require('electron')
const githubLink = require('./package.json')

function createWindow() {
  // Create the browser window
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Loads the index.html file
  win.loadFile(join(__dirname, 'src', 'index.html'))

  // Open the DevTools
  // win.webContents.openDevTools()

  // Handles the program's menu bar
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Import RPG',
          click() {
            shell.openPath(join(__dirname, 'resources', 'rpgs'))
          }
        },
        { role: 'quit'}
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Toggle DevTools',
          role: 'toggleDevTools'
        },
        {
          label: 'About',
          click() {
            shell.openExternal(githubLink.homepage)
          }
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  // Adds files in rpgs folder to select element
  win.webContents.once('dom-ready', () => {
    win.webContents.executeJavaScript(`
      const { readdir } = require('fs')
      readdir('resources/rpgs', (err, files) => {
        if (err) return console.error(err)
        files.forEach(file => { 
          if (!file.endsWith('.json')) return // Ignore files that don't end in specific extension
          let rpgName = file.split('.')[0]
          const rpgSelect = document.getElementById("rpg-selection")
          let option = document.createElement("option")
          option.text = rpgName
          rpgSelect.add(option)
          console.log(rpgName + " file loaded") // Dev Tools console log
        })
      })
    `)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.