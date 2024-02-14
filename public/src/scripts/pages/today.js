import { completeButtonChange } from "../../utils/completebutton.js";
//1. dynamically gen page if got jwt (1)
//2. event listeners for both work & nonwork (Total-4 as shown below)
//-- input event listener for modifying input of desc and eta (2)
//-- submit event listener for deleteing and changing complete status(2)

let jwt = localStorage.getItem('jwt');
console.log(jwt);

//fetch default page
if (!jwt) {
    console.log('No JWT found in local storage');
    //will display the default pg 
} else {
    fetch('http://localhost:3000/today/jwt', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': jwt
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.text()
                    .then(message => {throw new Error(message)});
            }
            return response.json();
        })
        .then(data => {
            //eg. workData = [{task:...., eta:..., completed:..}, {task:...., eta:..., status:..}]
            const {workData, nonWorkData, username} = data;
            console.info(`JWT found. Welcome ${username}.`);
            console.info("Work data to be generated: ", workData);
            console.info("NonWork data to be generated: ", nonWorkData);
            
            //todo nonwork is not correct, cuz the class is wrong, only accurate for work note
        
           
            //display default for work 
            if (!workData) return console.log('IMPORTANT: work data dont exist, presenting default page');
 
            //display user's notes 
            workData.forEach((work) => {
                const noteContentElement = document.querySelector('.work-note-middle');
                const workNoteLineElement = document.createElement(('div'));
                workNoteLineElement.classList.add('work-note-line');

                console.log("work.completed: ", work.completed)
                workNoteLineElement.innerHTML =  
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
                `;
                
                const completedButton = workNoteLineElement.querySelector('.work-note-bullet-point');
                completeButtonChange(completedButton, true);

                noteContentElement.appendChild(workNoteLineElement);
            })


            //todo display default for nonwork, to be changed, cuz if this exist but work dont, it will still not run cuz exited function alr
            //todo change the format of noteline insertion, look above
            if (!nonWorkData) return console.log('IMPORTANT: nonwork data dont exist, presenting default page');
 
            nonWorkData.forEach((work) => {
                const noteContentElement = document.querySelector('.non-work-note-middle');
                noteContentElement.appendChild(noteLineHTML);
            })
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

//event listener for editing desc, eta elements for work
//using event delegation cuz im dynamically gen the notelines
let inputTimeOutId;
const workNoteElement = document.querySelector('.work-note-middle');

workNoteElement.addEventListener('input', (event) => {
    clearTimeout(inputTimeOutId);

    inputTimeOutId = setTimeout(() => {
        const completedValues = Array.from(document.querySelectorAll('.work-note-bullet-point'));
        completedValues.forEach((el, index, array) => {
            array[index] = JSON.parse(el.getAttribute('data-value'))
            console.info('sending to server sttus: ', array[index])
        });

        let  validated = true;
        const descInputValues = Array.from(document.querySelectorAll('.edit-work-desc-input'));
        descInputValues.forEach((el, index, array) => {
            el.style.borderStyle = 'none';

            if (el.value === '') {
                el.style.borderStyle = 'solid';
                el.style.borderColor = 'red';
                el.style.borderWidth = '1px';
                validated = false;
                console.log('Invalid desc input.');
            }
            array[index] = el.value
        });

        const etaInputValues = Array.from(document.querySelectorAll('.edit-work-eta-input'));
        etaInputValues.forEach((el, index, array) => {
            el.style.borderStyle = 'none';

            if (el.value === '') {
                el.style.borderStyle = 'solid';
                el.style.borderColor = 'red';
                el.style.borderWidth = '1px';
                validated = false;
                console.log('Invalid eta input.');
            }
            array[index] = el.value
        });
        
        if (validated) {
            let taskObjectArray = [];
            for (let i = 0; i < descInputValues.length; i++) {
                const taskObject = {
                    task: descInputValues[i],
                    eta: etaInputValues[i],
                    completed: completedValues[i]
                }

                taskObjectArray.push(taskObject);
            }

            fetch('http://localhost:3000/task/updatework', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": jwt
                },
                body: JSON.stringify(taskObjectArray)
            })
                .then(response => {
                    if (response.ok) {
                        //delete the classs that creates the red border when invalid data is inputted
                        let invalidDataElements = document.querySelectorAll('.invalid-input-border');
                        if (invalidDataElements) {
                            invalidDataElements.forEach((el) => {
                                el.classList.remove('invalid-input-border');
                                el.style.borderStyle = 'none';
                            })
                        };
                        console.log("Tasks updated")
                    }
                })
                .catch(error => {
                    console.log('Error: ', error)
                })
        }
    }, 5000)
})


//event listener for editing desc, eta elements for nonwork
const nonWorkNoteElement = document.querySelector('.non-work-note-middle');

nonWorkNoteElement.addEventListener('input', (event) => {
    const completedValues = Array.from(document.querySelectorAll('.non-work-note-bullet-point'));
    completedValues.forEach((el, index, array) => {
        array[index] = JSON.parse(el.getAttribute('data-value'))
    });

    const descInputValues = Array.from(document.querySelectorAll('.edit-non-work-desc-input'));
    descInputValues.forEach((el, index, array) => {
        array[index] = el.value
    });

    const etaInputValues = Array.from(document.querySelectorAll('.edit-non-work-eta-input'));
    etaInputValues.forEach((el, index, array) => {
        array[index] = el.value
    });

    let taskObjectArray;
    for (let i = 0; i < descInputValues.length; i++) {
        const taskObject = {
            task: descInputValues[i],
            eta: etaInputValues[i],
            completed: completedValues[i]
        }

        taskObjectArray.push(taskObject);
    }

    fetch('http://localhost:3000/tasks/updatenonwork', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": jwt
        },
        body: JSON.stringify(taskObjectArray)
    })
        .then(response => {
            if (response.ok) {
                console.log("Tasks updated")
            }
        })
        .catch(error => {
            console.log('Error: ', error)
        })
})


//first if is to change completed button's svg and status
//second if is to delete
//third if is to push tdy uncomplete task to tmr 
workNoteElement.addEventListener('click', (event) => {
    if (event.target && event.target.closest('div').matches('.work-note-bullet-point')) {
        const completedButton = event.target.closest('div')

        completeButtonChange(completedButton);

        const inputEvent = new Event('input', {bubbles: true})
        workNoteElement.dispatchEvent(inputEvent);
    } else if (event.target && event.target.closest('div').matches('.work-note-delete')) {
            const deleteElement = event.target.closest('div');
            const noteLineElement = deleteElement.parentNode;
            
            noteLineElement.remove();
    
            const inputEvent = new Event('input', {bubbles: true});
            workNoteElement.dispatchEvent(inputEvent);
            console.log('Task is deleted in html, wait for server deletion.')
    } else if (event.target && event.target.matches('.push-button')) {
        let workCompletedElement = Array.from(document.querySelectorAll('.work-note-bullet-point'));
        let workDescElement = Array.from(document.querySelectorAll('.edit-work-desc-input'));
        let workEtaElement = Array.from(document.querySelectorAll('.edit-work-eta-input'));

        let taskObjectArray = [];
        
        workCompletedElement.forEach((el, index, array) => {
            let completedValue = JSON.parse(el.getAttribute('data-value'));

            if (completedValue === true) {
                return;
            }

            let validated = true;
            if (workDescElement[index].value === "") {
                workDescElement[index].style.borderStyle = "solid";
                workDescElement[index].style.borderColor = "red";
                workDescElement[index].style.borderWidth = "1px";
                setTimeout(() => {
                    workDescElement[index].style.borderStyle = "none";
                }, 5000)
                validated = false;
            }

            if (workEtaElement[index].value === "") {
                workEtaElement[index].style.borderStyle = "solid";
                workEtaElement[index].style.borderColor = "red";
                workEtaElement[index].style.borderWidth = "1px";
                setTimeout(() => {
                    workEtaElement[index].style.borderStyle = "none";
                }, 5000)
                validated = false;
            }
            
            if (!validated) return;

            let taskObject = {
                task: workDescElement[index].value,
                eta: workEtaElement[index].value,
                Completed: completedValue
            };

            taskObjectArray.push(taskObject);

            fetch("http://localhost:3000/task/push", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token":  jwt
                },
                body: JSON.stringify(taskObjectArray)
            })
                .then((response) => {
                    if (response.ok) {
                        let pushButton = document.querySelector('.push-button');
                        pushButton.style.color = "green";
                        setTimeout(() => {
                            pushButton.style.color = "black";
                        }, 5000);
                        console.log('tasks has been pushed. Pushed tasks: ', taskObjectArray)
                    } else {
                        throw new Error("updating of task failed.")
                    }
                })
                .catch((error) => {
                    console.log("Error: ", error);
                })
        })
       
        

    }     
})

