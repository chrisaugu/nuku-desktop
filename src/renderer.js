// const { ipcRenderer } = require('electron')
  
// ipcRenderer.send('anything-asynchronous', 'ping')
// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//     console.log("Hiii",arg) // prints "Hiii pong"
// })

import './app.js';
import './styles.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');
