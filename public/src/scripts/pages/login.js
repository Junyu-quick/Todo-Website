//does 4 main thing:
//1. if jwt present then verify 
//2. if jwt not present, or if jwt invalid, then login or create acc
//3. button for changing between loggin and creating
//4. submitting form for either login or creating
//todo make into fxn n import into page/login.js like in history

import { createTodayElement } from "../../pages/today.js";


//1. if jwt present then verify 
let jwt = localStorage.getItem('jwt');
if (!jwt) {
    console.log('No JWT found in local storage');
} else {
    fetch('http://localhost:3000/login/jwt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': jwt
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('JWT is valid.')
                
                history.pushState({}, '', '/today');
                createTodayElement();

            } else {
                //catches when res is not status 200
                console.log('JWT is invalid.');
                
            }
        })
        .catch(error => {
            //next time learn how andle this error 
            //this catches the error when sending req fail, or if above then block ecounter error  not if res is error status
            console.log('Error:', error)
        })
}



//2. if jwt not present, or if jwt invalid, then login or create acc
const changeModeElement = document.querySelector('.create-or-login');
const formElement = document.querySelector('#loginForm');



//3. button for changing between loggin and creating
changeModeElement.addEventListener('click', function () {
    if (changeModeElement.textContent === 'Create an account') {
        //create acc page
        changeModeElement.textContent = 'Login here';

        const titleElement = document.querySelector('.login-title');
        titleElement.textContent = 'Create Account'

        const submissionElement = document.querySelector('#submission-button');
        submissionElement.textContent = 'Create';

        const incorrectPasswordTextElement = document.querySelector('#passwordText');
        incorrectPasswordTextElement.style.display = 'none';

        const errorText = document.getElementById('errorText');
        errorText.style.display = 'none';

        const reconfirmPasswordElement = document.querySelector('#login-password-reconfirm');
        reconfirmPasswordElement.style.display = 'block';

    } else if (changeModeElement.textContent === 'Login here') {
        //login page
        changeModeElement.textContent = 'Create an account';

        const titleElement = document.querySelector('.login-title');
        titleElement.textContent = 'Login';

        const submissionElement = document.querySelector('#submission-button');
        submissionElement.textContent = 'Login';

        const incorrectPasswordTextElement = document.querySelector('#passwordText');
        incorrectPasswordTextElement.style.display = 'none';

        const errorText = document.getElementById('errorText');
        errorText.style.display = 'none';

        const reconfirmPasswordElement = document.querySelector('#login-password-reconfirm');
        reconfirmPasswordElement.style.display = 'none';
    }
});


//4. submitting form for either login or creating
formElement.addEventListener('submit', function (event) {
    event.preventDefault();

    //remove errror messages
    const errorText = document.getElementById('errorText');
    errorText.style.display = 'none';


    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');

    const loginData = {
        username: usernameInput.value,
        password: passwordInput.value
    };
    console.log('check');
    if (changeModeElement.textContent === 'Create an account') {
        //login, submit to server
        console.log('check');
        fetch('http://localhost:3000/login/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': ''
            },
            //cuz data must alw be transferreed as JSON, convention 
            body: JSON.stringify(loginData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Username and Password are valid.')
                    //server returns jwt and save it in locacl storage
                    const jwt = response.headers.get('x-auth-token');
                    localStorage.setItem('jwt', jwt );

                    //redirect to /today, then index.js will send a get req based on the path to retrieve info of client
                    history.pushState({}, '', '/today');
                    createTodayElement();

                } else {
                    errorText.style.display = 'block';
                    errorText.textContent = "Username or password is incorrect."
                    console.log('logging in');
                    throw new Error('Username or Password is incorrect')
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        
        usernameInput.value = '';
        passwordInput.value = '';
    } else if (changeModeElement.textContent === 'Login here') {
        //check if password entered is same 
        const reconfirmPasswordInput = document.querySelector('#login-password-reconfirm');

        if (passwordInput.value !== reconfirmPasswordInput.value) {
            const incorrectPasswordTextElement = document.querySelector('#passwordText');
            incorrectPasswordTextElement.style.display = 'block';
            return;
        } else {
            const incorrectPasswordTextElement = document.querySelector('#passwordText');
            incorrectPasswordTextElement.style.display = 'none';
        };

        //create acc 
        fetch('http://localhost:3000/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Username and password are valid.');
                    const jwt = response.headers.get('x-auth-token');
                    localStorage.setItem('jwt', jwt);

                    history.pushState({}, '', '/today');
                    createTodayElement();
                } else {
                    errorText.style.display = 'block';
                    errorText.textContent = "Username is taken or password is invalid."
                    throw new Error('Username is taken or password is invalid.')
                }
            })
            .catch(error => console.log('Error: ', error));
    };
});





