//used to generate the login page
//uses the link/script util 

//!stopped here yst//


import { removeLinkTags, removeScriptTags } from "../utils/removetags.js";


export function createLoginElement(newState = true) {
    let newUrl = '/login';
    let state = {
        page: newUrl
    }
    
    history.replaceState(state, '', newUrl);
    
    removeLinkTags();
    removeScriptTags();

    let cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = './styles/login.css';
    cssLink.type = 'text/css';
    
    let jsScript = document.createElement('script');
    jsScript.src = './src/scripts/pages/login.js';
    jsScript.type = 'module';

    document.head.appendChild(cssLink);
    document.head.appendChild(jsScript);


    let loginElement = document.createElement('div');
    loginElement.innerHTML = 
        `
        <div class="background-container">
        <div class="title">
            TaskTracker
        </div>
        <div class="login-container">
            <div class="login-title">
                Login
            </div>
            <form id="loginForm">
            <div>
                <input type="text" id="login-username" placeholder="Enter Your Name" required>
            </div>
            <div>
                <input type="password" id="login-password" placeholder="Enter Your Password" required>
            </div>
            <div>
                <input type="password" id="login-password-reconfirm" placeholder="Re-Enter Your Password" required>
            </div>
            <div id="passwordText"> 
            Passwords do not match. 
            </div>
            <div>
                <button type='submit' id="submission-button" class="submit">
                    Login
                </button>
            </div>
            </form>
            <div id="errorText"> 
                Invalid Username or Password. 
            </div>
            <div class="create-or-login">Create an account</div>
            <div class="alt-login-text">
                Login with or sign up with
            </div>
            <hr>
            <div class="alt-login-method">
                <div class="google-login">
                    <img src="./assets/google.png">
                </div>
            </div>
        </div>
    </div>
        `;
    document.addEventListener('DOMContentLoaded', () => {
        document.body.innerHTML = '';
    });

    document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(loginElement);
    });

    
    return;
}