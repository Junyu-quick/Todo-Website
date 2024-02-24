//script for animation
//sending http req to server to store results of the sidebar stuff: quote, profile, etc
export function settingScript() {
    const  jwt = localStorage.getItem('jwt');

    // generate the default quotes on the page 
    fetch('http://localhost:3000/user/quote', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': jwt
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching Quotes.');
            }
            return response.json()
        })
        .then(data => {
            //data format [{quote, desc, checked},..]
            const quoteFormElement = document.querySelector('#quote-form');
            
            
            console.log(data)
        
            data.forEach((quote, index, array) => {
                const quoteNumberElement = document.querySelectorAll('.quote-number');
                const quoteContainer = document.createElement('div');
                quoteContainer.classList.add('quote-container');

                quoteContainer.innerHTML =
                `
                    <div class="quote-number">
                    Quote ${quoteNumberElement.length + 1}
                    </div>
                    <div class="quote-sentence-description">
                        <label for="quote-sentence">
                            Quote:
                        </label>
                        <input class="quote-sentence" type="text" value="${quote.quote}">
    
                        <label for="quote-description">
                                Description:
                        </label>
                        <input class="quote-description" type="text" value="${quote.description}">
                    </div>
                    <div class="quote-circle">
                        <input class="quote-radio" name="display-button" value="true" type="radio">
                    </div>
                `

                //make radio button checked
                const quoteRadioElement = quoteContainer.querySelector('.quote-radio');
                quoteRadioElement.checked = quote.checked;

                quoteFormElement.appendChild(quoteContainer);
            });

            
            console.log('Quote displayed successfully.')
        })
        .catch(error => {
            console.log('Error: ', error)
        })



    //create new html to add the quotes
    const addQuoteButton = document.querySelector('.add-quote-section');

    addQuoteButton.addEventListener('click', () => {
        console.log('quote button clicked.');

        const quoteFormElement = document.querySelector('#quote-form');
        const quoteNumberElement = document.querySelectorAll('.quote-number');
        
        const quoteContainer = document.createElement('div');
        quoteContainer.classList.add('quote-container');
        quoteContainer.innerHTML =
        `
            <div class="quote-number">
            Quote ${quoteNumberElement.length + 1}
            </div>
            <div class="quote-sentence-description">
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
                <input class="quote-radio" name="display-button" value="true" type="radio">
            </div>
        `

        quoteFormElement.appendChild(quoteContainer);
    })

    //listen for input and send fetch too save the new quote list 
    const quoteFormElement = document.querySelector('#quote-form');
    let timeOutId;
    quoteFormElement.addEventListener('input', () => {
        console.log('quote input')

        //quotes array: [{quote: ..., description:..., checked:...}, {quote: ..., description:...}]
        //req.body wil be same
        const quoteSentenceElements = Array.from(document.querySelectorAll('.quote-sentence'));
        const quoteDescriptionElements = Array.from(document.querySelectorAll('.quote-description'));
        const quoteCircleElements = Array.from(document.querySelectorAll('.quote-radio'));
        
        


        clearTimeout(timeOutId);

        timeOutId = setTimeout(() => {
            let quoteArray = [];
            let validated = true;
            quoteSentenceElements.forEach((quoteSetence, index, array) => {
                //reset invalid border
                quoteSentenceElements[index].style.border = 'none';
                quoteDescriptionElements[index].style.border = 'none';

                //validation
                if (!quoteSentenceElements[index].value) {
                    quoteSentenceElements[index].style.border = 'solid';
                    quoteSentenceElements[index].style.borderColor = 'red';
                    quoteSentenceElements[index].style.borderWidth = '1px';
                    validated = false;
                } 
                if (!quoteDescriptionElements[index].value) {
                    quoteDescriptionElements[index].style.border = 'solid';
                    quoteDescriptionElements[index].style.borderColor = 'red';
                    quoteDescriptionElements[index].style.borderWidth = '1px';
                    validated = false;
                }
                if (quoteSentenceElements[index].value.length >= 52) {
                    quoteSentenceElements[index].value += " (Character Limit Exceeded: Limit Of 52.)"
                    quoteSentenceElements[index].style.border = 'solid';
                    quoteSentenceElements[index].style.borderColor = 'red';
                    quoteSentenceElements[index].style.borderWidth = '1px';
                    validated = false;
                }
                if (quoteDescriptionElements[index].value.length >= 100) {
                    quoteDescriptionElements[index].value += " (Character Limit Exceeded: Limit Of 100.)"
                    quoteDescriptionElements[index].style.border = 'solid';
                    quoteDescriptionElements[index].style.color = 'red';
                    quoteDescriptionElements[index].style.borderWidth = '1px';
                    validated = false;
                }

                console.log(quoteCircleElements[index].checked)
                let quoteObject = {
                    quote: quoteSentenceElements[index].value,
                    description: quoteDescriptionElements[index].value,
                    checked: quoteCircleElements[index].checked
                }
                quoteArray.push(quoteObject);
            })

            if (!validated) return console.log('Invalid Input.');
        
            //if validated true, run this 
            fetch('http://localhost:3000/user/quote/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': jwt
                },
                body: JSON.stringify(quoteArray)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to save quotes to DB');
                    }
                    //update the page quote
                    updatePageQuote();
                    console.log('Quotes successfully saved to DB.');
                })
                .catch(error => {
                    console.log('Error: ', error);
                })
        }, 1000)
    })
    


    // settings sidebar event litener for animation
    let settingButtonElement = document.getElementById('settings');
    let settingMainElement = document.getElementById('setting-sidebar');
    let settingMenuElement = document.querySelectorAll('.settings-sidebar');
    let settingBackElement = document.querySelectorAll('.settings-back-button');
    let profileNavElement = document.querySelector('.profile-nav');
    let quoteNavElement = document.querySelector('.quote-nav');
    let aboutNavElement = document.querySelector('.about-nav');
    // let testElement = document.querySelector('.aaaa');

    // testElement.addEventListener('click', () => {
    //     return console.log('ddd')
    // })

    // opening setting sidebar by clicking setting icon
    settingButtonElement.addEventListener('click', e=>{
        settingMainElement.classList.remove('move-in-right');

        setTimeout(()=> {
            settingMainElement.classList.add('move-in-left');
        }, 1
    )
    });

    // animation class for closing setting sidebar
    let sidebarClassToggle = (el) => {
        el.classList.remove('move-in-left');

        setTimeout(()=> {
            el.classList.add('move-in-right');
            setTimeout(()=> {
                el.classList.remove('move-in-right');
            }, 710
        );
        }, 1)
    };

    // closing setting sidebar by clicking outside
    document.addEventListener('click', e=> {
        settingMenuElement.forEach((el) => {
        if (!el.contains(e.target) && el.classList.contains('move-in-left') && !settingButtonElement.contains(e.target)) {
            sidebarClassToggle(el);
        }
    })
    });

    // closing setting sidebar by clicking back button, add data attribute tho!!
    settingBackElement.forEach((el)=> {
        el.addEventListener('click', (e)=> {
            sidebarClassToggle(    
                document.getElementById(el.getAttribute('data-element-id')));
    });
    ;});

    // opening nav for the profile, quote, about section sidebar
    let navList = {profile: [profileNavElement, "profile-sidebar"],
        quote: [quoteNavElement, "quote-sidebar"],
        about: [aboutNavElement,"about-sidebar"]};
        
    for (let key in navList) {
        navList[key][0].addEventListener('click', ()=> {
            let el = document.getElementById(navList[key][1]);
            el.classList.remove('move-in-right');
        setTimeout(()=> {
            el.classList.add('move-in-left');
        }, 1)
        });
    }


    //to update the main page quote
    function updatePageQuote() {
        fetch('http://localhost:3000/user/quote', {
                methods: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': jwt
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error fetching Quotes.');
                    }
                    return response.json()
                })
                .then(data => {
                    //data format [{quote, desc, checked},..]
                    let quoteObject;
                    data.forEach((quote) => {
                        if (quote.checked === true) {
                            quoteObject = quote;
                        }
                    });

                    let quoteElement = document.querySelector('.today-quote');
                    let quoteDescriptionElement = document.querySelector('.today-centered-text');
                    
                    //if its history page use this instead
                    if (!quoteElement || !quoteDescriptionElement) {
                        quoteElement = document.querySelector('.history-quote');
                        quoteDescriptionElement = document.querySelector('.history-centered-text');
                    }

                    quoteElement.innerHTML = 
                    `
                    ${quoteObject.quote}
                    `

                    quoteDescriptionElement.innerHTML = 
                    `
                    ${quoteObject.description}
                    `
                    console.log('Quote displayed successfully on today page.')
                })
                .catch(error => {
                    console.log('Error: ', error)
                })
    }



    //fetch username and password 
    fetch('http://localhost:3000/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': jwt
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch the username.')
            }
            return response.json();
        })
        .then(data => {
            const userNameElement = document.getElementById('user-name');
            userNameElement.value = data.userName;
        })
    

    //evente listener for button
    const profileForm = document.querySelector('.settings-content');
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const passWordButton = document.getElementById('password-confirm');
        
        

        const newUserName = document.getElementById('user-name').value;
        const newPassword = document.getElementById('user-password').value;

        fetch('http://localhost:3000/user/change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwt
            },
            body: JSON.stringify({
                username: newUserName,
                password: newPassword
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fail to change password.');
                }

                passWordButton.style.borderColor = 'green';
                passWordButton.style.borderWidth = '3px';
                setTimeout(() => {
                    passWordButton.style.borderColor = 'black';
                    passWordButton.style.borderWidth = '1px';
                }, 3000);
            })
            .catch(error => {
                console.log('Error: ', error)
            })
    })
};

