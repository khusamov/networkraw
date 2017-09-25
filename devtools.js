'use strict';
//Add extenstion panel to the DevTools
//NOTE: The extenstion panel load ONLY when you manually hit them first!
chrome.devtools.panels.create("Network RAW", "", "build/production/NetworkRaw/index.html");