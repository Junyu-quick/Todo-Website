// event listener for creating new task for work and non work
export function createTaskElement() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
        console.log('No jwt found in local storage.')
        //todo next time return to the login page, but for now no
        
        return 
    }

    const workFormElement = document.querySelector('#work-note-form');

    //event listener for submmiting work task
    workFormElement.addEventListener('submit', (event) => {
        event.preventDefault();

        const workDescElement = document.querySelector('#work-note-desc-input');
        const workEtaElement = document.querySelector('#work-note-eta-input');

        let validated = true;
        //check if field is empty
        for (const el of [workDescElement, workEtaElement]) {
            //remove red border style for invalid field 
            el.style.borderStyle = "none";

            if (el.value === "") {
                el.style.borderStyle = "solid";
                el.style.borderWidth = "1px";
                el.style.borderColor = "red";
                validated = false
            }
        }
        //exit listener callback if input not validated 
        if (!validated) return;


        const workData = {
            task: workDescElement.value,
            eta: workEtaElement.value
        };

        fetch('http://localhost:3000/task/work', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwt,
            },
            body: JSON.stringify(workData)
        })
            .then(response => {
                if (response.ok) {
                    const noteContentElement = document.querySelector('.work-note-middle');
                    const workNoteLineElement = document.createElement(('div'));
                    workNoteLineElement.classList.add('work-note-line');
                    workNoteLineElement.innerHTML =  
                    `
                        <div class="work-note-bullet-point" data-value="false">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="9" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2"/>
                            <path d="M7.5 12H16.5" stroke="#222222" stroke-width="1.2"/>
                            </svg>
                        </div>
                        <div class="work-note-content">
                            <input class="edit-work-desc-input" type="text" value="${workDescElement.value}" required>
                        </div>
                        <div class="work-note-eta">
                            <input class="edit-work-eta-input" type="text" value="${workEtaElement.value}" required>
                        </div>
                        <div class="work-note-delete">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 14.5L9.5 11.5" stroke="#222222" stroke-linecap="round"/>
                            <path d="M14.5 14.5L14.5 11.5" stroke="#222222" stroke-linecap="round"/>
                            <path d="M3 6.5H21V6.5C19.5955 6.5 18.8933 6.5 18.3889 6.83706C18.1705 6.98298 17.983 7.17048 17.8371 7.38886C17.5 7.89331 17.5 8.59554 17.5 10V15.5C17.5 17.3856 17.5 18.3284 16.9142 18.9142C16.3284 19.5 15.3856 19.5 13.5 19.5H10.5C8.61438 19.5 7.67157 19.5 7.08579 18.9142C6.5 18.3284 6.5 17.3856 6.5 15.5V10C6.5 8.59554 6.5 7.89331 6.16294 7.38886C6.01702 7.17048 5.82952 6.98298 5.61114 6.83706C5.10669 6.5 4.40446 6.5 3 6.5V6.5Z" stroke="#222222" stroke-linecap="round"/>
                            <path d="M9.5 3.50024C9.5 3.50024 10 2.5 12 2.5C14 2.5 14.5 3.5 14.5 3.5" stroke="#222222" stroke-linecap="round"/>
                            </svg>
                        </div>
                    `;

                    noteContentElement.appendChild(workNoteLineElement);
                    workDescElement.value = "";
                    workEtaElement.value = "";
                    return;
                }
                return response.text()
                    .then(message => {throw new Error(message)});
            })
            .catch(error => {
                console.log('Error: ', error);
            })
    })



    //event listener for submmiting nonwork task
    const nonWorkFormElement = document.querySelector('#non-work-note-form');

    //event listener for submmiting nonwork task
    nonWorkFormElement.addEventListener('submit', (event) => {
        console.info('subvmitting nonwork')
        event.preventDefault();

        const nonWorkDescElement = document.querySelector('#non-work-note-desc-input');
        const nonWorkEtaElement = document.querySelector('#non-work-note-eta-input');

        let validated = true;
        //check if field is empty
        for (const el of [nonWorkDescElement, nonWorkEtaElement]) {
            //remove red border style for invalid field 
            el.style.borderStyle = "none";

            if (el.value === "") {
                el.style.borderStyle = "solid";
                el.style.borderWidth = "1px";
                el.style.borderColor = "red";
                validated = false
            }
        }
        //exit listener callback if input not validated 
        if (!validated) return;


        const nonWorkData = {
            task: nonWorkDescElement.value,
            eta: nonWorkEtaElement.value
        };

        fetch('http://localhost:3000/task/nonwork', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwt,
            },
            body: JSON.stringify(nonWorkData)
        })
            .then(response => {
                if (response.ok) {
                    const noteContentElement = document.querySelector('.non-work-note-middle');
                    const nonWorkNoteLineElement = document.createElement(('div'));
                    nonWorkNoteLineElement.classList.add('non-work-note-line');
                    nonWorkNoteLineElement.innerHTML =  
                    `
                        <div class="non-work-note-bullet-point" data-value="false">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="9" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2"/>
                            <path d="M7.5 12H16.5" stroke="#222222" stroke-width="1.2"/>
                            </svg>
                        </div>
                        <div class="non-work-note-content">
                            <input class="edit-non-work-desc-input" type="text" value="${nonWorkDescElement.value}" required>
                        </div>
                        <div class="non-work-note-eta">
                            <input class="edit-non-work-eta-input" type="text" value="${nonWorkEtaElement.value}" required>
                        </div>
                        <div class="non-work-note-delete">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 14.5L9.5 11.5" stroke="#222222" stroke-linecap="round"/>
                            <path d="M14.5 14.5L14.5 11.5" stroke="#222222" stroke-linecap="round"/>
                            <path d="M3 6.5H21V6.5C19.5955 6.5 18.8933 6.5 18.3889 6.83706C18.1705 6.98298 17.983 7.17048 17.8371 7.38886C17.5 7.89331 17.5 8.59554 17.5 10V15.5C17.5 17.3856 17.5 18.3284 16.9142 18.9142C16.3284 19.5 15.3856 19.5 13.5 19.5H10.5C8.61438 19.5 7.67157 19.5 7.08579 18.9142C6.5 18.3284 6.5 17.3856 6.5 15.5V10C6.5 8.59554 6.5 7.89331 6.16294 7.38886C6.01702 7.17048 5.82952 6.98298 5.61114 6.83706C5.10669 6.5 4.40446 6.5 3 6.5V6.5Z" stroke="#222222" stroke-linecap="round"/>
                            <path d="M9.5 3.50024C9.5 3.50024 10 2.5 12 2.5C14 2.5 14.5 3.5 14.5 3.5" stroke="#222222" stroke-linecap="round"/>
                            </svg>
                        </div>
                    `;

                    noteContentElement.appendChild(nonWorkNoteLineElement);
                    nonWorkDescElement.value = "";
                    nonWorkEtaElement.value = "";
                    console.info('nonwork submitted.')
                    return;
                }
                return response.text()
                    .then(message => {throw new Error(message)});
            })
            .catch(error => {
                console.log('Error: ', error);
            })
    })



};