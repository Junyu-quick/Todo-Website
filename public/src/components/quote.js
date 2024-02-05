//used to generate template for quote and importing script for quote 
export function createQuoteElement() {
    let cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = './styles/quote.css';
    cssLink.type = 'text/css';
    
    let jsScript = document.createElement('script');
    jsScript.defer = true;
    jsScript.src = './src/scripts/components/quote.js';
    jsScript.type = 'module';


    document.head.appendChild(cssLink);
    document.head.appendChild(jsScript);


    let quoteElement = document.createElement('div');
    quoteElement.innerHTML = 
        `
        <div class="today-quote">
            The Calm Rush 
            </div>
        `;

    document.body.appendChild(quoteElement);
    return;
}