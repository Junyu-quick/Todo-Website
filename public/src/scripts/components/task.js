// event listener for creating new task for work and non work
export function createTaskElement() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
        console.log('No jwt found in local storage.')
        //todo next time return to the login page, but for now no
        
        return 
    }

    const workFormElement = document.querySelector('#work-note-form');
    const nonWorkFormElement = document.querySelector('#non-work-note-form');

    //event listener for submmiting work task
    workFormElement.addEventListener('submit', (event) => {
        event.preventDefault();

        const workDescValue = document.querySelector('#work-note-desc-input').value;
        const workEtaValue = document.querySelector('#work-note-eta-input').value;

        const workData = {
            task: workDescValue,
            eta: workEtaValue
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
                            <input class="edit-work-desc-input" type="text" value="${workDescValue}" required>
                        </div>
                        <div class="work-note-eta">
                            <input class="edit-work-eta-input" type="text" value="${workEtaValue}" required>
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
    nonWorkFormElement.addEventListener('submit', (event) => {
        event.preventDefault;

        const nonWorkDescValue = document.querySelector('#non-work-note-desc-input').value;
        const nonWorkEtaValue = document.querySelector('non-work-note-eta-input').value;

        const nonWorkData = {
            task: nonWorkDescValue,
            eta: nonWorkEtaValue
        };

        fetch('http://localhost:3000/task/nonwork', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwt,
            },
            body: JSON.stringify(workData)
        })
            .then(response => {
                if (response.ok) {
                    const noteLineHTML = 
                        `
                    <div class="note-line">
                    <div class="note-bullet-point">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5 10C18.5 11.1162 18.2801 12.2215 17.853 13.2528C17.4258 14.2841 16.7997 15.2211 16.0104 16.0104C15.2211 16.7997 14.2841 17.4258 13.2528 17.853C12.2215 18.2801 11.1162 18.5 10 18.5C8.88376 18.5 7.77846 18.2801 6.74719 17.853C5.71592 17.4258 4.77889 16.7997 3.98959 16.0104C3.20029 15.2211 2.57419 14.2841 2.14702 13.2528C1.71986 12.2215 1.5 11.1162 1.5 10C1.5 8.88376 1.71986 7.77846 2.14702 6.74719C2.57419 5.71592 3.20029 4.77889 3.98959 3.98959C4.77889 3.20029 5.71592 2.57419 6.74719 2.14702C7.77846 1.71986 8.88377 1.5 10 1.5C11.1162 1.5 12.2215 1.71986 13.2528 2.14702C14.2841 2.57419 15.2211 3.2003 16.0104 3.98959C16.7997 4.77889 17.4258 5.71592 17.853 6.74719C18.2801 7.77846 18.5 8.88377 18.5 10L18.5 10Z" stroke="#737373" stroke-width="3"/>
                        </svg>
                    </div>
                    <div class="note-content">
                        ${nonWorkData.task}
                    </div>
                    <div class="note-timer">
                        ${nonWorkData.eta}
                    </div>
                    <div class="note-mover">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.20837 7.29163H19.7917" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                            <path d="M5.20837 12.5H19.7917" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                            <path d="M5.20837 17.7084H19.7917" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                        `;

                    const noteContentElement = document.querySelector('.non-work-note-middle');
                    noteContentElement.appendChild(noteLineHTML);
                }
                return response.text()
                    .then(message => {throw new Error(message)});
            })
            .catch(error => {
                console.log('Error: ', error);
            })
    })



};