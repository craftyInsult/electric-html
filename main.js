// Modules to control application life and create native browser window
const {app, BrowserWindow } = require('electron');
const { fork } = require('child_process');
const serverProcess = fork(`${__dirname}/server.js`);

function bootApplication () { 
  const mainWindow = new BrowserWindow({
    width: 0,
    height: 0,
    show: false
  }); 
  
  serverProcess.on("message", (data) => {
      console.log("Reached main thread for -> " , data.url);
      const childWindow = new BrowserWindow({parent: mainWindow});
      childWindow.loadURL(data.url,  {userAgent: "googlebot"});  

      childWindow.webContents.on("dom-ready", function() {
        childWindow.webContents.executeJavaScript(`document.documentElement.outerHTML`, true).then(function(html) {
          serverProcess.send(html);
          childWindow.destroy();
        });
      });
  });
}


app.whenReady().then(() => {
  bootApplication();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }

  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.disableHardwareAcceleration();

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
