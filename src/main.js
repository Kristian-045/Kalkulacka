"use sctrict";

const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		icon: path.join(__dirname, "src/img/icon.png"),
		width: 1000, // 500
		height: 900,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	const startUrl = url.format({
		pathname: path.join(__dirname, "index.html"),
		protocol: "file:",
		slashes: true,
	});

	mainWindow.loadURL(startUrl);
	mainWindow.setTitle("BUT Calculator");
	mainWindow.openDevTools();

	mainWindow.on("closed", function () {
		mainWindow = null;
	});
}

app.on("ready", function () {
	createWindow();

	const template = [
		{
			label: "Help",
			click: () => {
				const helpWindow = new BrowserWindow({
					width: 600,
					height: 400,
					parent: mainWindow,
					modal: true,
					webPreferences: {
						nodeIntegration: true,
					},
					autoHideMenuBar: true,
				});

				const startUrl = url.format({
					pathname: path.join(__dirname, "help.html"),
					protocol: "file:",
					slashes: true,
				});

				helpWindow.loadURL(startUrl);
				helpWindow.setTitle("Kalkulacka");
			},
		},
	];

	var menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

	if (process.env.NODE_ENV === "development") {
		// Development specific settings
	}
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
	if (mainWindow === null) createWindow();
});

try {
	require("electron-reloader")(module);
} catch (_) {}
