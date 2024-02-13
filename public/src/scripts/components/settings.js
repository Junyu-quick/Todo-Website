//script for animation
//sending http req to server to store results of the sidebar stuff: quote, profile, etc
export function settingScript() {
    // settings sidebar
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

};