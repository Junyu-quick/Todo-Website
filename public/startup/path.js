import { createHistoryElement } from "../src/pages/history.js";
import { createLoginElement } from "../src/pages/login.js";
import { createLongTermElement } from "../src/pages/longterm.js";
import { createTodayElement } from "../src/pages/today.js";


//for navigating back and forth w browser button
export function pathChange() {
    const createPage = {
        '/login': createLoginElement,
        '/today': createTodayElement,
        '/history': createHistoryElement
    };
    
    window.addEventListener('popstate', function(event) {
        this.setTimeout(() => {
            let newState = event.state;
            createPage[newState.page]();
        }, 10)
    });
};


//!this doesnt work when u type ..index.html/today
//!bcuz by default typing in address bar wil send a get req to fetch actual html
//!need use history.pushstate instead, but u can also intercept the GET req, but former is gd enough
// export function pathChange() {
//     //change path when u learn how use webpackserverdev
//     let allPaths = {
//         '/client/public/index.html/login': createLoginElement,
//         '/client/public/index.html/today': createTodayElement,
//         '/client/public/index.html/longterm': createLongTermElement,
//         '/client/public/index.html/history': createHistoryElement
//     }

//     let newPath = window.location.pathname;
//     let currentPath = '';
//     if ((newPath !== '/client/public/index.html') && (newPath !== currentPath)) {
//         //create new page
//         console.log(newPath);
//         allPaths[newPath]();
//     }
//     currentPath = newPath;
// };