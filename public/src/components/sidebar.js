import { sideBarScript } from "../scripts/components/sidebar.js";

//used for generating sidebare and importing script for it 
export function createSideBarElement() {
    let cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = './styles/sidebar.css';
    cssLink.type = 'text/css';
    
    // let jsScript = document.createElement('script');
    // jsScript.defer = true;
    // jsScript.src = '../src/scripts/components/sidebar.js';
    // jsScript.type = 'module';






    let sideBarElement = document.createElement('div');
    sideBarElement.innerHTML = 
        `
        <div class="page-sidebar">
        <div class="page-sidebar-opening">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="243" viewBox="0 0 35 243" fill="none">
                <path d="M0 243V0C0 0 34.365 33.5 34.365 57.0682V185.932C34.365 206.5 0 243 0 243Z" fill="D9D9D9"/>
            </svg>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="321" height="1359" viewBox="0 0 321 1359" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M287 0H0V1359H287V362.608C290.683 358.625 321 325.251 321 305.932V177.068C321 154.932 290.683 124.033 287 120.361V0Z" fill="#ECBEA3"/>
          <foreignObject x="0" y="0" width="287" height="1247"> 
                <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;"> 
                    <div class="big-font page-sidebar-title">
                        Page
                    </div>
                    <hr>
                    <div class="page-sidebar-section medium-font">
                        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                            <path d="M32.2695 25.8079L20.8121 16.2601C20.2911 15.8259 19.5 16.1964 19.5 16.8747V35.1253C19.5 35.8035 20.2911 36.1741 20.8121 35.7398L32.2695 26.192C32.3895 26.0921 32.3895 25.9079 32.2695 25.8079Z" fill="#222222"/>
                        </svg>
                        <div>Default</div>
                    </div>
                    <div class="page-sidebar-nav small-font">
                        <a class="sidebar-link" href="/today">Today</a>
                        <a class="sidebar-link" href="/longterm">Long-Term</a>
                        <a class="sidebar-link" href="/history">History</a>
                    </div>
                    
                </div> 
              </foreignObject> 
        </svg>
    </div>
        `;

    //add as the first child of middle section classed eleement
    let middleSectionElement = document.querySelector('.middle-section')
    middleSectionElement.firstElementChild.insertAdjacentElement('beforebegin', sideBarElement);
    console.log('dddd');
   
    document.head.appendChild(cssLink);
    // document.head.appendChild(jsScript);
   
    //script function
    sideBarScript();  

    return;
}