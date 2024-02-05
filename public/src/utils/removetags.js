//checks if the link tag of head element contains the main css file, remove rest
//used before using another js module to generate html for index.js
export function removeLinkTags() {
    let linkTags = document.head.querySelectorAll('link');

    linkTags.forEach((linkTag) => {
        let href = linkTag.getAttribute('href');
        if (href && !href.includes('index.css')) {
            linkTag.parentNode.removeChild(linkTag);
        };
    });
};

 
//checks if the script tag of head element contains the main js file, remove rest
//used before using another js module to generate html for index.js
export function removeScriptTags() {
    let scriptTags = document.head.querySelectorAll('script');

    scriptTags.forEach((scriptTag) => {
        let src = scriptTag.getAttribute('src');
        if (src && !src.includes('index.js')) {
            scriptTag.parentNode.removeChild(scriptTag);
        };
    });
};
