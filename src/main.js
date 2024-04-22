"use sctrict";

const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		icon: path.join(__dirname, "src/img/icon.png"),
		width: 500,
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
					width: 620,
					height: 700,
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
