//used to generate the history page
//uses the link/script util 
import { createSettingsElement } from "../components/settings.js";
import { createSideBarElement } from "../components/sidebar.js";
import { historyScript } from "../scripts/pages/history.js";
import { removeLinkTags, removeScriptTags } from "../utils/removetags.js";


export function createHistoryElement() {
    let newUrl = '/history';
    let state = {
        page: newUrl
    }

    history.replaceState(state, '', newUrl);


    //remove the prev page's body and script/link tag

    // document.addEventListener('DOMContentLoaded', () => {
        document.body.innerHTML = '';
    // });
    removeLinkTags();
    removeScriptTags();


    //add new page script/link tag for default page
    let cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = './styles/history.css';
    cssLink.type = 'text/css';
    
    
    // let jsScript = document.createElement('script');
    // jsScript.defer = true;
    // jsScript.src = './scripts/scripts/pages/history.js';
    // jsScript.type = 'module';

    
    let historyElement = document.createElement('div');

    historyElement.innerHTML = 
    `
    <div class="top-section">
        <div class="history-page-title">History Page</div>
        <div id="settings"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88" fill="none">
                <path  fill-rule="evenodd" clip-rule="evenodd" d="M51.0993 7.59192C51.385 7.85047 51.4278 8.27843 51.5134 9.13437L52.4897 18.8982C52.6531 20.5318 52.7348 21.3485 53.2876 21.5775C53.8404 21.8065 54.4757 21.2867 55.7463 20.2471L63.3407 14.0335C64.0065 13.4888 64.3394 13.2164 64.7242 13.2356C65.109 13.2548 65.4132 13.559 66.0214 14.1672L73.8326 21.9784C74.4409 22.5867 74.745 22.8908 74.7642 23.2756C74.7834 23.6605 74.511 23.9933 73.9663 24.6591L67.7526 32.2537C66.713 33.5242 66.1932 34.1595 66.4222 34.7124C66.6512 35.2652 67.468 35.3468 69.1015 35.5102L78.8656 36.4866C79.7215 36.5722 80.1495 36.615 80.408 36.9007C80.6666 37.1864 80.6666 37.6165 80.6666 38.4767V49.5234C80.6666 50.3836 80.6666 50.8137 80.408 51.0994C80.1495 51.3851 79.7215 51.4279 78.8656 51.5135L69.1029 52.4897C67.4694 52.6531 66.6526 52.7348 66.4236 53.2876C66.1946 53.8404 66.7144 54.4757 67.754 55.7463L73.9665 63.3394C74.5112 64.0051 74.7836 64.338 74.7644 64.7228C74.7452 65.1077 74.441 65.4118 73.8328 66.02L66.0216 73.8312C65.4133 74.4395 65.1092 74.7436 64.7244 74.7628C64.3395 74.782 64.0067 74.5097 63.3409 73.965L55.7464 67.7513C54.4759 66.7117 53.8406 66.192 53.2877 66.4209C52.7349 66.6499 52.6533 67.4667 52.4899 69.1002L51.5134 78.8657C51.4278 79.7216 51.385 80.1496 51.0993 80.4082C50.8136 80.6667 50.3835 80.6667 49.5233 80.6667H38.4766C37.6164 80.6667 37.1863 80.6667 36.9006 80.4082C36.6149 80.1496 36.5721 79.7216 36.4865 78.8657L35.5101 69.1017C35.3467 67.4681 35.2651 66.6514 34.7122 66.4224C34.1594 66.1934 33.5241 66.7132 32.2535 67.7528L24.6588 73.9666C23.9931 74.5113 23.6602 74.7837 23.2753 74.7645C22.8905 74.7453 22.5864 74.4412 21.9781 73.8329L14.1669 66.0217C13.5587 65.4135 13.2545 65.1093 13.2353 64.7245C13.2161 64.3397 13.4885 64.0068 14.0332 63.341L20.247 55.7464C21.2866 54.4758 21.8064 53.8405 21.5774 53.2877C21.3484 52.7349 20.5316 52.6532 18.8981 52.4899L9.13425 51.5135C8.27831 51.4279 7.85035 51.3851 7.5918 51.0994C7.33325 50.8137 7.33325 50.3836 7.33325 49.5234L7.33325 38.4767C7.33325 37.6165 7.33325 37.1864 7.5918 36.9007C7.85035 36.615 8.27831 36.5722 9.13425 36.4866L18.8995 35.5101C20.533 35.3467 21.3498 35.2651 21.5788 34.7122C21.8077 34.1594 21.2879 33.5241 20.2484 32.2535L14.0334 24.6574C13.4887 23.9917 13.2163 23.6588 13.2355 23.274C13.2547 22.8891 13.5588 22.585 14.1671 21.9768L21.9783 14.1655C22.5865 13.5573 22.8907 13.2532 23.2755 13.234C23.6603 13.2148 23.9932 13.4871 24.659 14.0318L32.2537 20.2457C33.5243 21.2853 34.1596 21.8051 34.7124 21.5761C35.2652 21.3471 35.3469 20.5303 35.5102 18.8968L36.4865 9.13437C36.5721 8.27843 36.6149 7.85047 36.9006 7.59192C37.1863 7.33337 37.6164 7.33337 38.4766 7.33337H49.5233C50.3835 7.33337 50.8136 7.33337 51.0993 7.59192ZM43.9999 58.6667C52.1001 58.6667 58.6666 52.1002 58.6666 44C58.6666 35.8999 52.1001 29.3334 43.9999 29.3334C35.8997 29.3334 29.3333 35.8999 29.3333 44C29.3333 52.1002 35.8997 58.6667 43.9999 58.6667Z" fill="#ECBEA3" fill-opacity="1"/>
                <path d="M51.5134 9.13437L52.1104 9.07466V9.07466L51.5134 9.13437ZM51.0993 7.59192L51.5019 7.14705V7.14705L51.0993 7.59192ZM52.4897 18.8982L53.0868 18.8385L52.4897 18.8982ZM55.7463 20.2471L55.3663 19.7828L55.7463 20.2471ZM63.3407 14.0335L62.9608 13.5691L63.3407 14.0335ZM64.7242 13.2356L64.6943 13.8349L64.7242 13.2356ZM66.0214 14.1672L65.5971 14.5915V14.5915L66.0214 14.1672ZM73.8326 21.9784L74.2569 21.5542L73.8326 21.9784ZM74.7642 23.2756L74.1649 23.3055V23.3055L74.7642 23.2756ZM73.9663 24.6591L74.4307 25.039V25.039L73.9663 24.6591ZM67.7526 32.2537L67.2882 31.8737L67.7526 32.2537ZM66.4222 34.7124L66.9766 34.4827L66.9766 34.4827L66.4222 34.7124ZM69.1015 35.5102L69.1612 34.9132L69.1015 35.5102ZM78.8656 36.4866L78.9253 35.8896L78.8656 36.4866ZM80.408 36.9007L80.8529 36.4981L80.8529 36.4981L80.408 36.9007ZM80.408 51.0994L80.8529 51.502L80.8529 51.502L80.408 51.0994ZM78.8656 51.5135L78.9253 52.1105L78.8656 51.5135ZM69.1029 52.4897L69.1626 53.0868L69.1029 52.4897ZM67.754 55.7463L67.2896 56.1262L67.754 55.7463ZM73.9665 63.3394L73.5021 63.7193V63.7193L73.9665 63.3394ZM74.7644 64.7228L74.1651 64.6929V64.6929L74.7644 64.7228ZM73.8328 66.02L73.4085 65.5958L73.8328 66.02ZM66.0216 73.8312L65.5973 73.407L66.0216 73.8312ZM64.7244 74.7628L64.6945 74.1636H64.6945L64.7244 74.7628ZM63.3409 73.965L62.9609 74.4293H62.961L63.3409 73.965ZM55.7464 67.7513L55.3665 68.2157V68.2157L55.7464 67.7513ZM52.4899 69.1002L53.0869 69.1599L52.4899 69.1002ZM51.5134 78.8657L52.1104 78.9254L51.5134 78.8657ZM51.0993 80.4082L51.5019 80.853L51.5019 80.853L51.0993 80.4082ZM36.9006 80.4082L36.498 80.853L36.498 80.853L36.9006 80.4082ZM36.4865 78.8657L35.8895 78.9254L36.4865 78.8657ZM35.5101 69.1017L34.9131 69.1614L35.5101 69.1017ZM34.7122 66.4224L34.4826 66.9767L34.4826 66.9767L34.7122 66.4224ZM32.2535 67.7528L31.8736 67.2884L32.2535 67.7528ZM24.6588 73.9666L24.2789 73.5022H24.2789L24.6588 73.9666ZM23.2753 74.7645L23.3052 74.1652H23.3052L23.2753 74.7645ZM21.9781 73.8329L21.5539 74.2572L21.9781 73.8329ZM14.1669 66.0217L14.5912 65.5974H14.5912L14.1669 66.0217ZM13.2353 64.7245L13.8346 64.6946V64.6946L13.2353 64.7245ZM14.0332 63.341L13.5688 62.9611H13.5688L14.0332 63.341ZM20.247 55.7464L19.7826 55.3665L20.247 55.7464ZM18.8981 52.4899L18.8384 53.0869L18.8981 52.4899ZM9.13425 51.5135L9.07454 52.1105H9.07454L9.13425 51.5135ZM7.5918 51.0994L7.14693 51.502H7.14693L7.5918 51.0994ZM7.33325 49.5234H6.73325H7.33325ZM7.33325 38.4767H7.93325H7.33325ZM9.13425 36.4866L9.07454 35.8896H9.07454L9.13425 36.4866ZM18.8995 35.5101L18.8398 34.9131L18.8995 35.5101ZM21.5788 34.7122L22.1331 34.9419L22.1331 34.9419L21.5788 34.7122ZM20.2484 32.2535L19.784 32.6335L20.2484 32.2535ZM14.0334 24.6574L13.569 25.0374V25.0374L14.0334 24.6574ZM13.2355 23.274L13.8348 23.3039V23.3039L13.2355 23.274ZM14.1671 21.9768L14.5914 22.401L14.1671 21.9768ZM21.9783 14.1655L21.554 13.7413V13.7413L21.9783 14.1655ZM23.2755 13.234L23.3054 13.8332H23.3054L23.2755 13.234ZM24.659 14.0318L24.279 14.4962V14.4962L24.659 14.0318ZM32.2537 20.2457L31.8738 20.7101V20.7101L32.2537 20.2457ZM35.5102 18.8968L34.9132 18.8371L35.5102 18.8968ZM36.4865 9.13437L35.8895 9.07466V9.07466L36.4865 9.13437ZM36.9006 7.59192L36.498 7.14705V7.14705L36.9006 7.59192ZM52.1104 9.07466C52.0692 8.66266 52.0337 8.29629 51.9658 8.0036C51.8941 7.69422 51.7705 7.39014 51.5019 7.14705L50.6967 8.03679C50.7137 8.05225 50.7544 8.09143 50.7969 8.27465C50.8432 8.47456 50.8719 8.75014 50.9163 9.19407L52.1104 9.07466ZM53.0868 18.8385L52.1104 9.07466L50.9163 9.19407L51.8927 18.9579L53.0868 18.8385ZM53.5172 21.0232C53.511 21.0206 53.4208 21.001 53.3245 20.6182C53.228 20.2345 53.1705 19.6756 53.0868 18.8385L51.8927 18.9579C51.9724 19.7544 52.0374 20.4206 52.1607 20.911C52.2843 21.4022 52.5114 21.9054 53.058 22.1318L53.5172 21.0232ZM55.3663 19.7828C54.7153 20.3155 54.2794 20.6701 53.9398 20.8731C53.6011 21.0757 53.5234 21.0258 53.5172 21.0232L53.058 22.1318C53.6046 22.3583 54.121 22.1629 54.5557 21.903C54.9897 21.6435 55.5067 21.2184 56.1262 20.7115L55.3663 19.7828ZM62.9608 13.5691L55.3663 19.7828L56.1262 20.7115L63.7207 14.4979L62.9608 13.5691ZM64.7541 12.6364C64.3923 12.6183 64.0898 12.7459 63.8203 12.914C63.5654 13.073 63.2812 13.3069 62.9608 13.5691L63.7207 14.4979C64.066 14.2154 64.2811 14.0408 64.4553 13.9322C64.6149 13.8327 64.6713 13.8337 64.6943 13.8349L64.7541 12.6364ZM66.4457 13.7429C66.1529 13.4502 65.8934 13.1891 65.6556 13.0055C65.4041 12.8115 65.1159 12.6544 64.7541 12.6364L64.6943 13.8349C64.7173 13.836 64.7736 13.8406 64.9225 13.9555C65.0849 14.0809 65.2817 14.276 65.5971 14.5915L66.4457 13.7429ZM74.2569 21.5542L66.4457 13.7429L65.5971 14.5915L73.4084 22.4027L74.2569 21.5542ZM75.3634 23.2458C75.3454 22.8839 75.1883 22.5957 74.9943 22.3443C74.8108 22.1064 74.5497 21.8469 74.2569 21.5542L73.4084 22.4027C73.7238 22.7182 73.9189 22.9149 74.0443 23.0774C74.1592 23.2263 74.1638 23.2825 74.1649 23.3055L75.3634 23.2458ZM74.4307 25.039C74.6929 24.7186 74.9269 24.4344 75.0859 24.1795C75.2539 23.91 75.3815 23.6076 75.3634 23.2457L74.1649 23.3055C74.1661 23.3285 74.1671 23.385 74.0676 23.5446C73.959 23.7187 73.7845 23.9339 73.502 24.2792L74.4307 25.039ZM68.217 32.6336L74.4307 25.039L73.502 24.2792L67.2882 31.8737L68.217 32.6336ZM66.9766 34.4827C66.974 34.4765 66.9241 34.3989 67.1267 34.0601C67.3297 33.7206 67.6843 33.2847 68.217 32.6336L67.2882 31.8737C66.7814 32.4932 66.3563 33.0103 66.0968 33.4442C65.8368 33.879 65.6415 34.3954 65.8679 34.942L66.9766 34.4827ZM69.1612 34.9132C68.3242 34.8295 67.7652 34.772 67.3815 34.6755C66.9987 34.5792 66.9791 34.489 66.9766 34.4827L65.8679 34.942C66.0943 35.4885 66.5976 35.7156 67.0888 35.8392C67.5791 35.9626 68.2453 36.0276 69.0418 36.1072L69.1612 34.9132ZM78.9253 35.8896L69.1612 34.9132L69.0418 36.1072L78.8059 37.0836L78.9253 35.8896ZM80.8529 36.4981C80.6098 36.2295 80.3057 36.1059 79.9964 36.0341C79.7037 35.9663 79.3373 35.9308 78.9253 35.8896L78.8059 37.0836C79.2498 37.128 79.5254 37.1568 79.7253 37.2031C79.9085 37.2456 79.9477 37.2862 79.9632 37.3033L80.8529 36.4981ZM81.2666 38.4767C81.2666 38.0626 81.2677 37.6945 81.2293 37.3966C81.1888 37.0816 81.096 36.7667 80.8529 36.4981L79.9632 37.3033C79.9786 37.3204 80.0151 37.3634 80.0392 37.5499C80.0654 37.7535 80.0666 38.0305 80.0666 38.4767H81.2666ZM81.2666 49.5234V38.4767H80.0666V49.5234H81.2666ZM80.8529 51.502C81.096 51.2334 81.1888 50.9185 81.2293 50.6035C81.2677 50.3055 81.2666 49.9375 81.2666 49.5234H80.0666C80.0666 49.9695 80.0654 50.2466 80.0392 50.4501C80.0151 50.6367 79.9786 50.6797 79.9632 50.6968L80.8529 51.502ZM78.9253 52.1105C79.3373 52.0693 79.7037 52.0338 79.9964 51.966C80.3057 51.8942 80.6098 51.7706 80.8529 51.502L79.9632 50.6968C79.9477 50.7139 79.9085 50.7545 79.7253 50.797C79.5254 50.8433 79.2498 50.8721 78.8059 50.9165L78.9253 52.1105ZM69.1626 53.0868L78.9253 52.1105L78.8059 50.9165L69.0432 51.8927L69.1626 53.0868ZM66.9779 53.5172C66.9805 53.511 67.0001 53.4208 67.3829 53.3245C67.7666 53.228 68.3255 53.1705 69.1626 53.0868L69.0432 51.8927C68.2467 51.9724 67.5805 52.0374 67.0902 52.1607C66.5989 52.2843 66.0957 52.5114 65.8693 53.058L66.9779 53.5172ZM68.2184 55.3663C67.6857 54.7153 67.3311 54.2794 67.128 53.9398C66.9254 53.6011 66.9753 53.5234 66.9779 53.5172L65.8693 53.058C65.6429 53.6046 65.8382 54.121 66.0981 54.5557C66.3576 54.9897 66.7827 55.5067 67.2896 56.1262L68.2184 55.3663ZM74.4309 62.9594L68.2184 55.3663L67.2896 56.1262L73.5021 63.7193L74.4309 62.9594ZM75.3636 64.7527C75.3817 64.3909 75.2541 64.0885 75.086 63.819C74.927 63.564 74.6931 63.2799 74.4309 62.9594L73.5021 63.7193C73.7846 64.0646 73.9592 64.2798 74.0678 64.4539C74.1673 64.6135 74.1663 64.6699 74.1651 64.6929L75.3636 64.7527ZM74.257 66.4443C74.5498 66.1515 74.8109 65.8921 74.9945 65.6542C75.1885 65.4028 75.3456 65.1145 75.3636 64.7527L74.1651 64.6929C74.164 64.716 74.1594 64.7722 74.0445 64.9211C73.9191 65.0836 73.724 65.2803 73.4085 65.5958L74.257 66.4443ZM66.4458 74.2555L74.2571 66.4443L73.4085 65.5958L65.5973 73.407L66.4458 74.2555ZM64.7542 75.3621C65.1161 75.344 65.4043 75.187 65.6557 74.993C65.8936 74.8094 66.1531 74.5483 66.4458 74.2555L65.5973 73.407C65.2818 73.7225 65.0851 73.9175 64.9226 74.0429C64.7737 74.1578 64.7175 74.1624 64.6945 74.1636L64.7542 75.3621ZM62.961 74.4293C63.2814 74.6915 63.5656 74.9255 63.8205 75.0845C64.09 75.2525 64.3924 75.3801 64.7543 75.3621L64.6945 74.1636C64.6715 74.1647 64.615 74.1657 64.4554 74.0662C64.2813 73.9576 64.0661 73.7831 63.7208 73.5006L62.961 74.4293ZM55.3665 68.2157L62.9609 74.4293L63.7208 73.5006L56.1264 67.2869L55.3665 68.2157ZM53.5173 66.9753C53.5236 66.9727 53.6012 66.9228 53.94 67.1254C54.2795 67.3284 54.7154 67.683 55.3665 68.2157L56.1264 67.2869C55.5069 66.7801 54.9898 66.355 54.5559 66.0955C54.1211 65.8355 53.6047 65.6402 53.0581 65.8666L53.5173 66.9753ZM53.0869 69.1599C53.1706 68.3229 53.2281 67.7639 53.3246 67.3803C53.4209 66.9974 53.5111 66.9778 53.5173 66.9753L53.0581 65.8666C52.5115 66.093 52.2845 66.5963 52.1609 67.0875C52.0375 67.5778 51.9725 68.244 51.8929 69.0405L53.0869 69.1599ZM52.1104 78.9254L53.0869 69.1599L51.8929 69.0405L50.9163 78.806L52.1104 78.9254ZM51.5019 80.853C51.7705 80.6099 51.8941 80.3059 51.9658 79.9965C52.0337 79.7038 52.0692 79.3374 52.1104 78.9254L50.9163 78.806C50.8719 79.2499 50.8432 79.5255 50.7969 79.7254C50.7544 79.9086 50.7137 79.9478 50.6967 79.9633L51.5019 80.853ZM49.5233 81.2667C49.9373 81.2667 50.3054 81.2679 50.6034 81.2295C50.9184 81.1889 51.2333 81.0961 51.5019 80.853L50.6967 79.9633C50.6796 79.9787 50.6366 80.0153 50.45 80.0393C50.2465 80.0655 49.9694 80.0667 49.5233 80.0667V81.2667ZM38.4766 81.2667H49.5233V80.0667H38.4766V81.2667ZM36.498 80.853C36.7666 81.0961 37.0814 81.1889 37.3964 81.2295C37.6944 81.2679 38.0625 81.2667 38.4766 81.2667V80.0667C38.0304 80.0667 37.7533 80.0655 37.5498 80.0393C37.3633 80.0153 37.3203 79.9787 37.3032 79.9633L36.498 80.853ZM35.8895 78.9254C35.9307 79.3374 35.9661 79.7038 36.034 79.9965C36.1057 80.3059 36.2294 80.6099 36.498 80.853L37.3032 79.9633C37.2861 79.9478 37.2455 79.9086 37.203 79.7254C37.1566 79.5255 37.1279 79.2499 37.0835 78.806L35.8895 78.9254ZM34.9131 69.1614L35.8895 78.9254L37.0835 78.806L36.1071 69.042L34.9131 69.1614ZM34.4826 66.9767C34.4889 66.9793 34.579 66.9989 34.6753 67.3817C34.7719 67.7654 34.8294 68.3243 34.9131 69.1614L36.1071 69.042C36.0275 68.2455 35.9624 67.5793 35.8391 67.0889C35.7155 66.5977 35.4884 66.0945 34.9418 65.8681L34.4826 66.9767ZM32.6335 68.2171C33.2845 67.6844 33.7205 67.3298 34.06 67.1268C34.3988 66.9242 34.4764 66.9741 34.4826 66.9767L34.9419 65.8681C34.3953 65.6416 33.8788 65.8369 33.4441 66.0969C33.0101 66.3564 32.4931 66.7815 31.8736 67.2884L32.6335 68.2171ZM25.0388 74.431L32.6335 68.2171L31.8736 67.2884L24.2789 73.5022L25.0388 74.431ZM23.2455 75.3637C23.6073 75.3818 23.9097 75.2542 24.1792 75.0862C24.4342 74.9272 24.7183 74.6932 25.0388 74.431L24.2789 73.5022C23.9336 73.7848 23.7184 73.9593 23.5443 74.0679C23.3847 74.1674 23.3282 74.1664 23.3052 74.1652L23.2455 75.3637ZM21.5539 74.2572C21.8466 74.55 22.1061 74.8111 22.344 74.9946C22.5954 75.1886 22.8836 75.3457 23.2455 75.3637L23.3052 74.1652C23.2822 74.1641 23.226 74.1595 23.0771 74.0446C22.9146 73.9192 22.7179 73.7241 22.4024 73.4087L21.5539 74.2572ZM13.7427 66.446L21.5539 74.2572L22.4024 73.4087L14.5912 65.5974L13.7427 66.446ZM12.6361 64.7544C12.6541 65.1162 12.8112 65.4044 13.0052 65.6559C13.1888 65.8937 13.4499 66.1532 13.7427 66.446L14.5912 65.5974C14.2757 65.282 14.0806 65.0852 13.9552 64.9228C13.8403 64.7739 13.8357 64.7176 13.8346 64.6946L12.6361 64.7544ZM13.5688 62.9611C13.3066 63.2815 13.0727 63.5657 12.9137 63.8206C12.7456 64.0901 12.618 64.3926 12.6361 64.7544L13.8346 64.6946C13.8335 64.6716 13.8324 64.6152 13.9319 64.4556C14.0405 64.2814 14.2151 64.0663 14.4976 63.721L13.5688 62.9611ZM19.7826 55.3665L13.5688 62.9611L14.4976 63.721L20.7114 56.1263L19.7826 55.3665ZM21.023 53.5173C21.0256 53.5235 21.0755 53.6012 20.8729 53.94C20.6699 54.2795 20.3153 54.7154 19.7826 55.3665L20.7114 56.1263C21.2182 55.5068 21.6433 54.9898 21.9028 54.5558C22.1628 54.1211 22.3581 53.6047 22.1317 53.0581L21.023 53.5173ZM18.8384 53.0869C19.6754 53.1706 20.2344 53.2281 20.6181 53.3246C21.0009 53.4209 21.0205 53.5111 21.023 53.5173L22.1317 53.0581C21.9053 52.5115 21.402 52.2844 20.9108 52.1609C20.4205 52.0375 19.7543 51.9725 18.9578 51.8928L18.8384 53.0869ZM9.07454 52.1105L18.8384 53.0869L18.9578 51.8928L9.19395 50.9165L9.07454 52.1105ZM7.14693 51.502C7.39002 51.7706 7.6941 51.8942 8.00348 51.966C8.29617 52.0338 8.66254 52.0693 9.07454 52.1105L9.19395 50.9165C8.75002 50.8721 8.47444 50.8433 8.27453 50.797C8.09131 50.7545 8.05213 50.7139 8.03667 50.6968L7.14693 51.502ZM6.73325 49.5234C6.73325 49.9375 6.73209 50.3055 6.77049 50.6035C6.81109 50.9185 6.90384 51.2334 7.14693 51.502L8.03667 50.6968C8.02121 50.6797 7.98469 50.6367 7.96065 50.4501C7.93442 50.2466 7.93325 49.9695 7.93325 49.5234H6.73325ZM6.73325 38.4767L6.73325 49.5234H7.93325L7.93325 38.4767H6.73325ZM7.14693 36.4981C6.90384 36.7667 6.81109 37.0816 6.77049 37.3965C6.73209 37.6945 6.73325 38.0626 6.73325 38.4767H7.93325C7.93325 38.0305 7.93442 37.7535 7.96065 37.5499C7.98469 37.3634 8.02121 37.3204 8.03667 37.3033L7.14693 36.4981ZM9.07454 35.8896C8.66254 35.9308 8.29617 35.9662 8.00348 36.0341C7.6941 36.1059 7.39002 36.2295 7.14693 36.4981L8.03667 37.3033C8.05213 37.2862 8.09131 37.2456 8.27453 37.2031C8.47444 37.1567 8.75002 37.128 9.19395 37.0836L9.07454 35.8896ZM18.8398 34.9131L9.07454 35.8896L9.19395 37.0836L18.9592 36.1071L18.8398 34.9131ZM21.0244 34.4826C21.0218 34.4889 21.0022 34.579 20.6194 34.6753C20.2358 34.7719 19.6768 34.8294 18.8398 34.9131L18.9592 36.1071C19.7557 36.0275 20.4218 35.9624 20.9122 35.8391C21.4034 35.7155 21.9067 35.4884 22.1331 34.9419L21.0244 34.4826ZM19.784 32.6335C20.3167 33.2845 20.6713 33.7205 20.8743 34.06C21.0769 34.3988 21.027 34.4764 21.0244 34.4826L22.1331 34.9419C22.3595 34.3953 22.1642 33.8788 21.9042 33.4441C21.6447 33.0102 21.2196 32.4931 20.7127 31.8736L19.784 32.6335ZM13.569 25.0374L19.784 32.6335L20.7127 31.8736L14.4978 24.2775L13.569 25.0374ZM12.6363 23.2441C12.6182 23.6059 12.7458 23.9083 12.9139 24.1778C13.0728 24.4328 13.3068 24.7169 13.569 25.0374L14.4978 24.2775C14.2152 23.9322 14.0407 23.717 13.9321 23.5429C13.8326 23.3833 13.8336 23.3269 13.8348 23.3039L12.6363 23.2441ZM13.7428 21.5525C13.45 21.8453 13.1889 22.1047 13.0054 22.3426C12.8114 22.594 12.6543 22.8823 12.6363 23.2441L13.8348 23.3039C13.8359 23.2808 13.8405 23.2246 13.9554 23.0757C14.0808 22.9132 14.2759 22.7165 14.5914 22.401L13.7428 21.5525ZM21.554 13.7413L13.7428 21.5525L14.5914 22.401L22.4026 14.5898L21.554 13.7413ZM23.2456 12.6347C22.8838 12.6528 22.5956 12.8098 22.3441 13.0038C22.1063 13.1874 21.8468 13.4485 21.554 13.7413L22.4026 14.5898C22.718 14.2743 22.9148 14.0792 23.0772 13.9539C23.2261 13.839 23.2824 13.8344 23.3054 13.8332L23.2456 12.6347ZM25.0389 13.5675C24.7185 13.3053 24.4343 13.0713 24.1794 12.9123C23.9099 12.7443 23.6074 12.6167 23.2456 12.6347L23.3054 13.8332C23.3284 13.8321 23.3848 13.8311 23.5444 13.9306C23.7186 14.0392 23.9337 14.2137 24.279 14.4962L25.0389 13.5675ZM32.6336 19.7813L25.0389 13.5675L24.279 14.4962L31.8738 20.7101L32.6336 19.7813ZM34.4828 21.0218C34.4766 21.0243 34.3989 21.0742 34.0602 20.8716C33.7206 20.6686 33.2847 20.314 32.6336 19.7813L31.8738 20.7101C32.4933 21.217 33.0103 21.642 33.4443 21.9016C33.879 22.1615 34.3954 22.3568 34.942 22.1304L34.4828 21.0218ZM34.9132 18.8371C34.8295 19.6741 34.772 20.2331 34.6755 20.6168C34.5792 20.9996 34.489 21.0192 34.4828 21.0218L34.942 22.1304C35.4886 21.904 35.7157 21.4007 35.8392 20.9095C35.9626 20.4192 36.0276 19.753 36.1073 18.9565L34.9132 18.8371ZM35.8895 9.07466L34.9132 18.8371L36.1073 18.9565L37.0835 9.19407L35.8895 9.07466ZM36.498 7.14705C36.2294 7.39014 36.1057 7.69422 36.034 8.0036C35.9661 8.29629 35.9307 8.66266 35.8895 9.07466L37.0835 9.19407C37.1279 8.75014 37.1566 8.47456 37.203 8.27465C37.2455 8.09143 37.2861 8.05225 37.3032 8.03679L36.498 7.14705ZM38.4766 6.73337C38.0625 6.73337 37.6944 6.73221 37.3964 6.77061C37.0814 6.81121 36.7666 6.90396 36.498 7.14705L37.3032 8.03679C37.3203 8.02133 37.3633 7.98481 37.5498 7.96077C37.7533 7.93454 38.0304 7.93337 38.4766 7.93337V6.73337ZM49.5233 6.73337H38.4766V7.93337H49.5233V6.73337ZM51.5019 7.14705C51.2333 6.90396 50.9184 6.81121 50.6034 6.77061C50.3054 6.73221 49.9373 6.73337 49.5233 6.73337V7.93337C49.9694 7.93337 50.2465 7.93454 50.45 7.96077C50.6366 7.98481 50.6796 8.02133 50.6967 8.03679L51.5019 7.14705ZM58.0666 44C58.0666 51.7688 51.7687 58.0667 43.9999 58.0667V59.2667C52.4315 59.2667 59.2666 52.4316 59.2666 44H58.0666ZM43.9999 29.9334C51.7687 29.9334 58.0666 36.2312 58.0666 44H59.2666C59.2666 35.5685 52.4315 28.7334 43.9999 28.7334V29.9334ZM29.9333 44C29.9333 36.2312 36.2311 29.9334 43.9999 29.9334V28.7334C35.5684 28.7334 28.7333 35.5685 28.7333 44H29.9333ZM43.9999 58.0667C36.2311 58.0667 29.9333 51.7688 29.9333 44H28.7333C28.7333 52.4316 35.5684 59.2667 43.9999 59.2667V58.0667Z" fill="#33363F"/>
            </svg>
        </div>
    </div>
    <div class="middle-section">
        <div class="history-quote">
        The Calm Rush 
        </div>
        <div class="history-quote-description">test
        </div>
    </div>
    <div class="bottom-section">
        <div class="format-change-container">
            <div id="format-button">Carousel</div>
        </div>
        <div class="work-container">
            <div class="work-container-scroll">

            </div>
        </div>

        <hr class="note-hr">

        <div class="non-work-container">
            <div class="non-work-container-scroll">
                
            </div>
        </div>
    </div> 
        `;

    // document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(historyElement);
    // });
    
    //create the setting element/script/link
    createSettingsElement();

    //add the sidebar element/script/link
    // document.addEventListener('DOMContentLoaded', () => {
    createSideBarElement();
        console.log('dfcdn');
    // });

    console.log('testt');

    document.head.appendChild(cssLink);
    historyScript();
    // document.head.appendChild(jsScript);
    
    return;
}