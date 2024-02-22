import { settingScript } from "../scripts/components/settings.js";

export function createSettingsElement() {
    let cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = './styles/settings.css';
    cssLink.type = 'text/css';
    
    // let jsScript = document.createElement('script');
    // jsScript.defer = true;
    // jsScript.src = './scripts/components/settings.js';
    // jsScript.type = 'module';




      
    
    
    let settingsElement = document.createElement('div');
    settingsElement.innerHTML = 
        `
        <div id="setting-sidebar" class="settings-sidebar">
            <div class="settings-back-button" data-element-id="setting-sidebar">
                <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
                    <path d="M33.125 13.25L19.875 26.5L33.125 39.75" stroke="#33363F" stroke-width="2"/>
                </svg>
            </div>
            <div class="settings-title">
                Settings
            </div>  
            <hr>
            <div class="profile-nav nav">Profile</div>
            <div class="quote-nav nav">Quotes</div>
            <div class="about-nav nav">About</div>
        </div>
        <div id="profile-sidebar" class="settings-sidebar">
            <div class="settings-back-button" data-element-id="profile-sidebar">
                <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
                    <path d="M33.125 13.25L19.875 26.5L33.125 39.75" stroke="#33363F" stroke-width="2"/>
                </svg>
            </div>
            <div class="settings-title">
                Profile
            </div>
            <hr>
            <div class="profile-pic "></div>
            <div class=".settings-content">
                <label>
                    Username
                    <input type="text">
                </label>
            </div>
            <div class=".settings-content">
                <label>
                    Password
                    <input type="password">
                </label>
            </div>  
        </div>     
        <div id="quote-sidebar" class="settings-sidebar">
            <div class="settings-back-button" data-element-id="quote-sidebar">
                <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
                    <path d="M33.125 13.25L19.875 26.5L33.125 39.75" stroke="#33363F" stroke-width="2"/>
                </svg>
            </div>
            <div class="settings-title">
                Quotes
            </div>
            <hr>
            <form id="quote-form">
                

            </form>
            
            <div class="add-quote-section">
                <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.375 14.875C7.375 12.9752 7.37606 11.6007 7.51699 10.5525C7.65598 9.51873 7.92272 8.87753 8.40013 8.40013C8.87753 7.92272 9.51873 7.65598 10.5525 7.51699C11.6007 7.37606 12.9752 7.375 14.875 7.375H40.125C42.0248 7.375 43.3993 7.37606 44.4475 7.51699C45.4813 7.65598 46.1225 7.92272 46.5999 8.40013C47.0773 8.87753 47.344 9.51872 47.483 10.5525C47.6239 11.6007 47.625 12.9752 47.625 14.875V40.125C47.625 42.0248 47.6239 43.3993 47.483 44.4475C47.344 45.4813 47.0773 46.1225 46.5999 46.5999C46.1225 47.0773 45.4813 47.344 44.4475 47.483C43.3993 47.6239 42.0248 47.625 40.125 47.625H14.875C12.9752 47.625 11.6007 47.6239 10.5525 47.483C9.51872 47.344 8.87753 47.0773 8.40013 46.5999C7.92272 46.1225 7.65598 45.4813 7.51699 44.4475C7.37606 43.3993 7.375 42.0248 7.375 40.125V14.875Z" stroke="#222222"/>
                    <path d="M27.5 18.3334L27.5 36.6667" stroke="#222222" stroke-linejoin="round"/>
                    <path d="M36.667 27.5L18.3337 27.5" stroke="#222222" stroke-linejoin="round"/>
                    </svg>
            </div>
        </div>
        <div id="about-sidebar" class="settings-sidebar"> 
            <div class="settings-back-button" data-element-id="about-sidebar">
                <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
                    <path d="M33.125 13.25L19.875 26.5L33.125 39.75" stroke="#33363F" stroke-width="2"/>
                </svg>
            </div>
            <div class="settings-title">
                About
            </div>
            <hr>
            <div class="about-text medium-font">
                This is an app built to enhance work productivity for those who use it.
                <div>Last-update: 10Dec2023</div>
            </div>
        </div>
        `;


    document.body.appendChild(settingsElement);

    document.head.appendChild(cssLink);
    //document.head.appendChild(jsScript);


    //settings script
    settingScript();
    
    return;
}