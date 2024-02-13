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
            <div id="quote-interval"  class="medium-font">
                Interval: 7days
            </div>
            <div class="quote-container">
                <div class="quote-number medium-font">
                    Quote 1
                </div>
                <div class="quote-sentence-description small-font">
                    <label for="quote-sentence">
                        Quote:
                    </label>
                    <input class="quote-sentence" type="text">
                    
                    <label for="quote-description">
                        Description:
                    </label>
                    <input class="quote-description" type="text">
                </div>
                <div class="quote-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M28.5 15C28.5 16.7728 28.1508 18.5283 27.4724 20.1662C26.7939 21.8041 25.7995 23.2924 24.5459 24.5459C23.2924 25.7995 21.8041 26.7939 20.1662 27.4724C18.5283 28.1508 16.7728 28.5 15 28.5C13.2272 28.5 11.4717 28.1508 9.83377 27.4724C8.19588 26.7939 6.70765 25.7995 5.45406 24.5459C4.20047 23.2923 3.20606 21.8041 2.52763 20.1662C1.84919 18.5283 1.5 16.7728 1.5 15C1.5 13.2272 1.84919 11.4717 2.52763 9.83377C3.20607 8.19588 4.20047 6.70765 5.45406 5.45406C6.70765 4.20047 8.19588 3.20606 9.83378 2.52763C11.4717 1.84919 13.2272 1.5 15 1.5C16.7728 1.5 18.5283 1.84919 20.1662 2.52763C21.8041 3.20607 23.2924 4.20047 24.5459 5.45406C25.7995 6.70765 26.7939 8.19588 27.4724 9.83378C28.1508 11.4717 28.5 13.2272 28.5 15L28.5 15Z" stroke="#737373" stroke-width="3"/>
                      </svg>
                </div>
            </div>
            <div class="quote-container">
                <div class="quote-number medium-font">
                    Quote 1
                </div>
                <div class="quote-sentence-description small-font">
                    <label for="quote-sentence">
                        Quote:
                    </label>
                    <input class="quote-sentence" type="text">
                    
                    <label for="quote-description">
                        Description:
                    </label>
                    <input class="quote-description" type="text">
                </div>
                <div class="quote-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M28.5 15C28.5 16.7728 28.1508 18.5283 27.4724 20.1662C26.7939 21.8041 25.7995 23.2924 24.5459 24.5459C23.2924 25.7995 21.8041 26.7939 20.1662 27.4724C18.5283 28.1508 16.7728 28.5 15 28.5C13.2272 28.5 11.4717 28.1508 9.83377 27.4724C8.19588 26.7939 6.70765 25.7995 5.45406 24.5459C4.20047 23.2923 3.20606 21.8041 2.52763 20.1662C1.84919 18.5283 1.5 16.7728 1.5 15C1.5 13.2272 1.84919 11.4717 2.52763 9.83377C3.20607 8.19588 4.20047 6.70765 5.45406 5.45406C6.70765 4.20047 8.19588 3.20606 9.83378 2.52763C11.4717 1.84919 13.2272 1.5 15 1.5C16.7728 1.5 18.5283 1.84919 20.1662 2.52763C21.8041 3.20607 23.2924 4.20047 24.5459 5.45406C25.7995 6.70765 26.7939 8.19588 27.4724 9.83378C28.1508 11.4717 28.5 13.2272 28.5 15L28.5 15Z" stroke="#737373" stroke-width="3"/>
                      </svg>
                </div>
            </div>
            <div class="add-quote-button">
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