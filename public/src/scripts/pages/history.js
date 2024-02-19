import { completeButtonChange } from "../../utils/completebutton.js";
import { formatDate } from "../../utils/date.js";

export function historyScript() {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
        console.log("No JWT found in local storage.");
    } else {
        fetch('http://localhost:3000/history/jwt', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': jwt
            }
        })
            .then(response => {
                if (!response.ok) {
                    response.text().then(error => {throw new Error(error)})
                }
                
                return response.json();
            })
            .then(data => {
                //data format {work: date(Model) obj, nonWork: date obj}
                //date obj format [{date: ..., toDo: [{task: ..., eta:..., completed:...}]}, {..}]
                const workDate = data.work;
                const nonWorkDate = data.nonWork;

                //generating history for work docs
                const workContainerElement = document.querySelector('.work-container-scroll');
                for (let date of workDate) {
                    console.log(date)
                    let formattedDate = formatDate(date.date);
                    let workNoteElement = document.createElement('div');
                    workNoteElement.classList.add('work-note');
                    workNoteElement.innerHTML = 
                    `
                    <svg width="440" height="625" xmlns="http://www.w3.org/2000/svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="437" height="625" viewBox="0 0 437 623" fill="none">
                        <path d="M363.991 1H1V622H436V71.0548M363.991 1L436 71.0548M363.991 1V71.0548H436" stroke="black"/>
                    </svg>
                    <foreignObject x="0" y="0" width="437" height="620">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;">
                        <div class="work-note-header">
                            <div class="note-date">${formattedDate}</div>
                            <div class="work-note-title">Work</div>
                        </div>
                        <div class="work-note-middle">
                        </div>
                    </div>
                    </foreignObject>
                    </svg>
                    `
                    workContainerElement.appendChild(workNoteElement)

                    let noteMiddleElement = workNoteElement.querySelector('.work-note-middle');
                    let toDos = date.toDo
                    
                    for (let work of toDos) {

                        let noteLineElement = document.createElement('div');
                        noteLineElement.classList.add('work-note-line');

                        noteLineElement.innerHTML =
                        `
                        <div class="work-note-bullet-point" data-value="${work.completed}">
                            
                        </div>
                        <div class="work-note-content">
                            <input class="edit-work-desc-input" type="text" value="${work.task}" required>
                        </div>
                        <div class="work-note-eta">
                            <input class="edit-work-eta-input" type="text" value="${work.eta}" required>
                        </div>
                        <div class="work-note-delete">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 14.5L9.5 11.5" stroke="#222222" stroke-linecap="round"/>
                            <path d="M14.5 14.5L14.5 11.5" stroke="#222222" stroke-linecap="round"/>
                            <path d="M3 6.5H21V6.5C19.5955 6.5 18.8933 6.5 18.3889 6.83706C18.1705 6.98298 17.983 7.17048 17.8371 7.38886C17.5 7.89331 17.5 8.59554 17.5 10V15.5C17.5 17.3856 17.5 18.3284 16.9142 18.9142C16.3284 19.5 15.3856 19.5 13.5 19.5H10.5C8.61438 19.5 7.67157 19.5 7.08579 18.9142C6.5 18.3284 6.5 17.3856 6.5 15.5V10C6.5 8.59554 6.5 7.89331 6.16294 7.38886C6.01702 7.17048 5.82952 6.98298 5.61114 6.83706C5.10669 6.5 4.40446 6.5 3 6.5V6.5Z" stroke="#222222" stroke-linecap="round"/>
                            <path d="M9.5 3.50024C9.5 3.50024 10 2.5 12 2.5C14 2.5 14.5 3.5 14.5 3.5" stroke="#222222" stroke-linecap="round"/>
                            </svg>
                        </div>
                        `
                        let completedButton = noteLineElement.querySelector('.work-note-bullet-point');
                        completeButtonChange(completedButton);

                        noteMiddleElement.appendChild(noteLineElement);
                    }
                }

                //generating history for nonwork docs
                const nonWorkContainerElement = document.querySelector('.non-work-container-scroll');
                for (let date of nonWorkDate) {
                    console.log(date)
                    let formattedDate = formatDate(date.date);
                    let nonWorkNoteElement = document.createElement('div');
                    nonWorkNoteElement.classList.add('non-work-note');
                    nonWorkNoteElement.innerHTML = 
                    `
                    <svg width="440" height="625" xmlns="http://www.w3.org/2000/svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="437" height="625" viewBox="0 0 437 623" fill="none">
                        <path d="M363.991 1H1V622H436V71.0548M363.991 1L436 71.0548M363.991 1V71.0548H436" stroke="black"/>
                    </svg>
                    <foreignObject x="0" y="0" width="437" height="620">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;">
                        <div class="non-work-note-header">
                            <div class="note-date">${formattedDate}</div>
                            <div class="non-work-note-title">Non-Work</div>
                        </div>
                        <div class="non-work-note-middle">
                        </div>
                    </div>
                    </foreignObject>
                    </svg>
                    `
                    nonWorkContainerElement.appendChild(nonWorkNoteElement)

                    let noteMiddleElement = nonWorkNoteElement.querySelector('.non-work-note-middle');
                    let toDos = date.toDo
                    
                    for (let nonWork of toDos) {

                        let noteLineElement = document.createElement('div');
                        noteLineElement.classList.add('non-work-note-line');

                        noteLineElement.innerHTML =
                        `
                        <div class="non-work-note-bullet-point" data-value="${nonWork.completed}">
                            
                        </div>
                        <div class="non-work-note-content">
                            <input class="edit-non-work-desc-input" type="text" value="${nonWork.task}" required>
                        </div>
                        <div class="non-work-note-eta">
                            <input class="edit-non-work-eta-input" type="text" value="${nonWork.eta}" required>
                        </div>
                        <div class="non-work-note-delete">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 14.5L9.5 11.5" stroke="#222222" stroke-linecap="round"/>
                            <path d="M14.5 14.5L14.5 11.5" stroke="#222222" stroke-linecap="round"/>
                            <path d="M3 6.5H21V6.5C19.5955 6.5 18.8933 6.5 18.3889 6.83706C18.1705 6.98298 17.983 7.17048 17.8371 7.38886C17.5 7.89331 17.5 8.59554 17.5 10V15.5C17.5 17.3856 17.5 18.3284 16.9142 18.9142C16.3284 19.5 15.3856 19.5 13.5 19.5H10.5C8.61438 19.5 7.67157 19.5 7.08579 18.9142C6.5 18.3284 6.5 17.3856 6.5 15.5V10C6.5 8.59554 6.5 7.89331 6.16294 7.38886C6.01702 7.17048 5.82952 6.98298 5.61114 6.83706C5.10669 6.5 4.40446 6.5 3 6.5V6.5Z" stroke="#222222" stroke-linecap="round"/>
                            <path d="M9.5 3.50024C9.5 3.50024 10 2.5 12 2.5C14 2.5 14.5 3.5 14.5 3.5" stroke="#222222" stroke-linecap="round"/>
                            </svg>
                        </div>
                        `
                        let completedButton = noteLineElement.querySelector('.non-work-note-bullet-point');
                        completeButtonChange(completedButton);

                        noteMiddleElement.appendChild(noteLineElement);
                    }
                }
                
                
            })
            .catch(error => {
                console.error('Error: ', error );
            })
    };

    let formatButtonElement = document.getElementById("format-button");

    formatButtonElement.addEventListener('click', function() {
        if (formatButtonElement.innerHTML == 'Carousel') {
            formatButtonElement.innerHTML = 'Table'; 
        } else if (formatButtonElement.innerHTML == 'Table') {
            formatButtonElement.innerHTML = 'Carousel'; 
        }
        
    }); 

};