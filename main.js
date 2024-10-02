const { app, BrowserWindow } = require('electron')

let mainWindow;
let splashWindow;

function createSplashWindow() {
    splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
        },
        autoHideMenuBar: true,
        title: false,
        titleBarOverlay: true
    });

    splashWindow.loadFile('splash.html');

    splashWindow.on('closed', () => {
        splashWindow = null;
    });
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
        },
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be',
            height: 30
        }
    });

    mainWindow.loadURL('https://discord.com/channels/@me');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createSplashWindow();

    setTimeout(() => {
        splashWindow.close();
        createMainWindow();
    }, 2000); // 2 seconds
});

app.on('window-all-closed', () => {
    app.quit();
});
