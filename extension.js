"use strict";
var panels = chrome.devtools.panels;
panels.create("Check State management", "", "panel.html", function (panel) { console.log(panel); });
