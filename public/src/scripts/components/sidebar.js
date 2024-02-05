//for the actions of left sidebar
//and redirects when click the button

import { createHistoryElement } from "../../pages/history.js";
import { createLongTermElement } from "../../pages/longterm.js";
import { createTodayElement } from "../../pages/today.js";




export function sideBarScript() {
    // page sidebar
    let sidebarOpeningElement = document.querySelector('.page-sidebar-opening');
    let sidebarElement = document.querySelector('.page-sidebar');

    console.log(sidebarOpeningElement);
    sidebarOpeningElement.addEventListener('click',()=>{
        console.log('hi');
        sidebarElement.classList.remove('move-in-left-page');

        setTimeout(()=> {
            sidebarElement.classList.add('move-in-right-page');
        }, 1
    )
    });

    let sidebarClassTogglePage = (el) => {
        el.classList.remove('move-in-right-page');

        setTimeout(()=> {
            el.classList.add('move-in-left-page');
            setTimeout(()=> {
                el.classList.remove('move-in-left-page');
            }, 710
        );
        }, 1)
    };

    // closing setting sidebar by clicking outside
    document.addEventListener('click', e=> {
        let x = sidebarElement;
        if (!x.contains(e.target) && x.classList.contains('move-in-right-page') && !sidebarOpeningElement.contains(e.target)) {
            sidebarClassTogglePage(x);
        }
        
    });



    //history API for rendering new page according to the link pressed 
    const sideBarLinkElements = document.querySelectorAll(".sidebar-link");
    const createPage = {
        '/today': createTodayElement,
        '/longterm': createLongTermElement,
        '/history': createHistoryElement
    };



    sideBarLinkElements.forEach((element) => {

        function changePage (event) {
            let url;
            event.preventDefault();
            url = String(element.getAttribute('href'));
            console.log(url);
            history.pushState({}, '', url);
            createPage[url]();

            element.removeEventListener('click', changePage);
        };

        console.log(element);  
        element.addEventListener('click', changePage)
    });

    console.log("sidebar script")

};