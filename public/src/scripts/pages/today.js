//stores the event listeners for the creating notes
//send http req to server to store it/update it 
//todo make into fxn n import into page/longterm.js like in history

let jwt = localStorage.getItem('jwt');

if (!jwt) {
    console.log('No JWT found in local storage');
    //will display the default pg 
} else {
    fetch('http://localhost/today/jwt', {
        method: 'POST',
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
            const {workData, nonWorkData} = data;
            const noteLineHTML = 
                `
                <div class="note-line">
                <div class="note-bullet-point">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5 10C18.5 11.1162 18.2801 12.2215 17.853 13.2528C17.4258 14.2841 16.7997 15.2211 16.0104 16.0104C15.2211 16.7997 14.2841 17.4258 13.2528 17.853C12.2215 18.2801 11.1162 18.5 10 18.5C8.88376 18.5 7.77846 18.2801 6.74719 17.853C5.71592 17.4258 4.77889 16.7997 3.98959 16.0104C3.20029 15.2211 2.57419 14.2841 2.14702 13.2528C1.71986 12.2215 1.5 11.1162 1.5 10C1.5 8.88376 1.71986 7.77846 2.14702 6.74719C2.57419 5.71592 3.20029 4.77889 3.98959 3.98959C4.77889 3.20029 5.71592 2.57419 6.74719 2.14702C7.77846 1.71986 8.88377 1.5 10 1.5C11.1162 1.5 12.2215 1.71986 13.2528 2.14702C14.2841 2.57419 15.2211 3.2003 16.0104 3.98959C16.7997 4.77889 17.4258 5.71592 17.853 6.74719C18.2801 7.77846 18.5 8.88377 18.5 10L18.5 10Z" stroke="#737373" stroke-width="3"/>
                    </svg>
                </div>
                <div class="note-content">
                    ${work.task}
                </div>
                <div class="note-timer">
                    ${work.eta}
                </div>
                <div class="note-mover">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.20837 7.29163H19.7917" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                        <path d="M5.20837 12.5H19.7917" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                        <path d="M5.20837 17.7084H19.7917" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
                `
            //display default
            if (workData === null && nonWorkData === null) return;

            //display user's notes 
            workData.forEach((work) => {
                const noteContentElement = document.querySelector('.work-note-middle');
                noteContentElement.appendChild(noteLineHTML);
            })

            nonWorkData.forEach((work) => {
                const noteContentElement = document.querySelector('.nonwork-note-middle');
                noteContentElement.appendChild(noteLineHTML);
            })
        })
        .catch(error => {
            console.log('Error:', error);
        })
}