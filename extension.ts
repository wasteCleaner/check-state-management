declare const chrome: any;
const panels = chrome.devtools.panels;

panels.create("CheckState", "", "panel.html", (panel: any) => {console.log(panel)});