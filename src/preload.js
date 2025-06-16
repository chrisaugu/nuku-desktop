const { contextBridge } = require("electron");
const Backbone = require("backbone");
const jQuery = require("jquery");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions

  Backbone: Backbone,
  jQuery: jQuery,
});
