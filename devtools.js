'use strict';
//Add extenstion panel to the DevTools
//NOTE: The extenstion panel load ONLY when you manually hit them first!

//chrome.devtools.panels.create("Network RAW", "", "build/production/NetworkRaw/index.html");
chrome.devtools.panels.create("Network RAW", "", "build/testing/NetworkRaw/index.html");
//chrome.devtools.panels.create("Network RAW", "", "http://localhost:1881/networkraw/");
