export function completeButtonChange(completedButton, pageload=false) {
    let completedButtonValue = JSON.parse(completedButton.dataset.value);
    //page load is used so that u can use this function for 2 diff case     
    if (pageload ===true ) {
        completedButtonValue = !completedButtonValue;
        console.info('page load')
    }    

    if (completedButtonValue) {
            completedButton.dataset.value = "false";

            //false svg
            completedButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2"/>
            <path d="M7.5 12H16.5" stroke="#222222" stroke-width="1.2"/>
            </svg>
            `

        } else {
            completedButton.dataset.value = "true";

            completedButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" fill="#7E869E" fill-opacity="0.25"/>
            <path d="M9.5 12L11.3939 13.8939C11.4525 13.9525 11.5475 13.9525 11.6061 13.8939L15.5 10" stroke="#222222" stroke-width="1.2"/>
            </svg>
            `
        }
        console.info('Completebutton.js: Complete button state change.')
}