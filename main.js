const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

// Path to the icon
const iconPath = path.join(__dirname, 'assets', 'icon.ico');

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
        icon: iconPath // Add icon for splash window
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
        },
        icon: iconPath, // Add icon for main window
        maximizable: true
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
