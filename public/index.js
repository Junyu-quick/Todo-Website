import { createHistoryElement } from "./src/pages/history.js";
import { createLoginElement } from "./src/pages/login.js";
import { createLongTermElement } from "./src/pages/longterm.js";
import { createTodayElement } from "./src/pages/today.js";
import { pathChange } from "./startup/path.js";

//!before production, check if local storage jwt exist, before redirectiing to non-login page from addressbar 

const pathList = {
    '/': createLoginElement,
    '/login': createLoginElement,
    '/today': createTodayElement,
    '/longterm': createLongTermElement,
    '/history': createHistoryElement
};

const currentPath = window.location.pathname;

//delete aft, next time my domain will be starting point 
history.pushState({}, '', '/test');
pathList[currentPath]();

pathChange();
//this app wont rely on back and forth navigation button, just like mobile app