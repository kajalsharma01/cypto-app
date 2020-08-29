require('electron-reload')(__dirname)

const { app, BrowserWindow, Menu, Notification } = require('electron')
const shell = require('electron').shell
const ipc = require('electron').ipcMain


function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        webPreferences: { nodeIntegration: true, enableRemoteModule: true},
         
        width: 800,
        height: 600,

        
    })

    // and load the index.html of the app.
    win.loadFile('./src/index.html')

    // Open the DevTools.
    win.webContents.openDevTools()

    ipc.on('update-notify-value', function( event ,arg){
        win.webContents.send('targetPriceVal', arg)
    })
}

var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
        submenu: [
            { label: 'Adjust Notification Value' },

            {
                label: 'CoinMarketCap',
                click() {
                    shell.openExternal('http://coinmarketcap.com')
                },
                accelerator: 'CmdOrCtrl+Shift+C'
            },

            { type: 'separator' },

            {
                label: 'Exit',
                click() {
                    app.quit()
                }
            }
        ]
    },
    {
        label: 'Info',
        submenu: [
            {
                label: 'About Us',
                click() {
                    shell.openExternal('https://coinmarketcap.com/about/')
                }
            }
        ]

    },

])
Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.setAppUserModelId('com.electron.crypto-app')
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

