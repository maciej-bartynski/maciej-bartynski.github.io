'use strict';
document.addEventListener('DOMContentLoaded', initializeLanguageNavigation);

function initializeLanguageNavigation() {
    let PLBtn = document.querySelector('#PLBtn');
    let ENGBtn = document.querySelector('#ENGBtn');
    PLBtn.addEventListener('click', function () {
        showCVinOtherLanguage('pl');
        highlightActiveLanguage(PLBtn, ENGBtn);
    });
    ENGBtn.addEventListener('click', function () {
        showCVinOtherLanguage('eng');
        highlightActiveLanguage(ENGBtn, PLBtn);
    });
}

function highlightActiveLanguage(activeBtn, otherBtn) {
    activeBtn.classList.add('active');
    otherBtn.classList.remove('active');
}

function showCVinOtherLanguage(lang) {
    if (lang === 'pl') {
        changeLangInLeftCol(0);
        changeLangInRightCol(0);
        changeLangInRightColParagraphs(0);
    } else {
        changeLangInLeftCol(1);
        changeLangInRightCol(1);
        changeLangInRightColParagraphs(1);
    }
}

function changeLangInLeftCol(x) {
    //title[first]
    let titles = ['O', 'ABOUT'];
    let titlesSpans = [' MNIE', ' ME'];
    let firstTitle = document.querySelector('.left-column_article.about-me h2');
    firstTitle.innerText = titles[x];
    let span = document.createElement('span');
    span.innerText = titlesSpans[x];
    span.style.fontWeight = "bold";
    firstTitle.appendChild(span);
    //title[second]
    let secondTitles = ['MÓJ', 'MY'];
    let secondTitlesSpans = [' CEL', ' GOAL'];
    let secondTitle = document.querySelector('.left-column_article.my-goals h2');
    secondTitle.innerText = secondTitles[x];
    let span2 = document.createElement('span');
    span2.innerText = secondTitlesSpans[x];
    span2.style.fontWeight = "bold";
    secondTitle.appendChild(span2);
    //article[first]
    let partsOfText = [
        ['Jestem samoukiem zdeterminowanymby postawić pierwsze kroki w IT, jako', 'I am a self-taught'],
        [' Front-End Developer', ' Front-End Developer'],
        [' Zajmując się dotąd grafiką komputerową i UX designem, zetknąłem się z CSS i HTML. Technologie webowe zafascynowały mnie - to one kształtują świat i chcę w tym uczestniczyć, albo przynajmniej rozumieć ich procesy. Samodzielnie poznaję',
            ' determined to get into the tech industry. While working with graphic and UX design I came across CSS and HTML. I found web technologies extremely fascinating because they shape the world. And I want to understand the process or even more – participate in it. I am learning'
        ],
        [' JavaScript', ' JavaScript'],
        [' i inne narzędzia. Szukam praktyki, żeby móc rozwijać się pod okiem specjalisty.',
            ' and other different tools on my own. I am looking for an internship to develop my skills under the guidance of a specialist.'
        ]
    ];
    let firstArticle = document.querySelector('.left-column_article.about-me p');
    let currPart = partsOfText[0]
    firstArticle.innerText = currPart[x];
    for (let i = 1; i < 5; i++) {
        let nextPartOfText = document.createElement('span');
        let currentPartOfText = partsOfText[i];
        nextPartOfText.innerText = currentPartOfText[x];
        if (i === 1 || i === 3) {
            nextPartOfText.classList.add('strong');
        }
        firstArticle.appendChild(nextPartOfText);
    }
    //article[second]
    let partsOfSecondText = [
        ['Chcę rozwijać się przez wszystkie etapy ścieżki kariery', 'I want to develop my skills throughout the'],
        [' Front-End Developera', ' Front-End Developer carrier'],
        [' równocześnie poznając technologie Back-Endowe. Za 10 lat chcę posiadać rzetelną wiedzę', ' and at the same time learn new Back-End technologies. In 10 years I want to be a skilled'],
        [' Full-Stack Developera.', ' Full-Stack Developer.']
    ];
    let secondArticle = document.querySelector('.left-column_article.my-goals p');
    let currPartOfSecondText = partsOfSecondText[0];
    secondArticle.innerText = currPartOfSecondText[x];
    for (let j = 1; j < 4; j++) {
        let nextPartOfSecondText = document.createElement('span');
        let currentPartOfSecondText = partsOfSecondText[j];
        nextPartOfSecondText.innerText = currentPartOfSecondText[x];
        if (j === 1 || j === 3) {
            nextPartOfSecondText.classList.add('strong');
        }
        secondArticle.appendChild(nextPartOfSecondText);
    }
}

function changeLangInRightCol(x) {
    //maintitles
    let mainTitlesTxt = [
        ['wykształcenie', 'education'],
        ['doświadczenie', 'experience'],
        ['języki programowania i front-endu', 'front-end and programming languages'],
        ['główne narzędzia', 'main tools'],
        ['inne narzędzia, które obsługuję', 'other tools'],
    ];
    let allTitles = document.querySelectorAll('.right-column_article_title h3');
    for (let i = 0; i < 5; i++) {
        let singleTitle = allTitles[i];
        if (i !== 1 || i !== 3) {
            let arr = mainTitlesTxt[i];
            singleTitle.innerText = arr[x];
        }
    }
    //maintitles
    let secondaryTitlesTxt = [
        ['studia: communication design na uniwersytecie wrocławskim', 'FACULTY OF COMMUNICATION DESIGN AT UNIVERSITY OF WROCLAW'],
        ['angielski: b2+', 'english: b2+, polish: native'],
        ['kurs front-endu w dev army', 'front-end dev army course'],
    ];
    let secondaryTitles = document.querySelectorAll('.right-column_article h4');
    for (let i = 0; i < 3; i++) {
        let secondarySingleTitle = secondaryTitles[i];
        let arr = secondaryTitlesTxt[i];
        secondarySingleTitle.innerText = arr[x];
    }
    //special header: languages
    let languageTitleTxt = ['język obcy', 'languages'];
    let languageTitle = document.querySelector('#languages');
    languageTitle.innerText=languageTitleTxt[x];
    //list headers:
    let listTitleTxt = [
        [false],
        ['do kodu', 'coding'],
        [false],
        ['do designu', 'designing'],
        [false],
        ['do testów', 'testing'],
    ];
    let listHeaders = document.querySelectorAll('.code-tools_head div');
    for (let j=0; j<listHeaders.length; j++){
        let item = listHeaders[j];
        if (j!==0&&j!==2&&j!==4){
            let currentArray = listTitleTxt[j]
            item.innerText=currentArray[x]
        }
    }
}
function changeLangInRightColParagraphs(x){
    //paragraphs[all]
    let paragraphs = document.querySelectorAll('.right-column p');
    let availableTxts = [
        ['Dyplom magisterski z zakresu pseudokodu w grach planszowych nominowany do nagrody ‘Dyplom Roku’.', 'Master\'s degree in the field of pseudocode in boardgames. The project nominated for the award “Dyplom Roku”.'],
        ['Główne technologie nauczane na kierunku:', 'Technologies learnt during studies:'],
        ['Intensywny kurs programowania w JavaScript.', 'An intensive course in JavaScript programming and front-end technologies.'],
        ['Obsługa zleceń dla sieci wrocławskich klubów i instytucji rozrywki: Alive, Alive Stage, Stary Klasztor, Stara Piwnica. Materiały do druku i do sieci.', 'Making graphic designs for clubs, pubs and entertaining companies in Wrocław: Alive, Alive Stage, Stary Klasztor, Stara Piwnica. Materials for print and online usage.'],
        ['Zarządzanie projektami graficzno-wizerunkowymi i ich wykonywanie.', 'Managing and creating graphic and identity projects.'],
    ]
    for (let k=0; k<paragraphs.length; k++){
        let currentParagraph = paragraphs[k];
        let currentTextesArray = availableTxts[k];
        currentParagraph.innerText = currentTextesArray[x];
    }
    //list items semantically in paragraphs [all]
    let listItems = document.querySelectorAll('.right-column li');
    let availableStrings = [
        ['projektowanie graficzne',
        'graphic design'],
        ['identyfikacja wizualna', 
        'corporate identity design'],
        ['HTML CSS',
        'HTML, CSS'],
        ['XAMPP, CMS (Wordpress)',
        'XAMPP, CMS (Wordpress)'],
        ['Prototypowanie aplikacji i stron www w Axure',
        'Axure framework'],
        ['nauka HTML5 + CSS3.',
        'learning HTML5 + CSS3.'],
        ['poznawanie flexboxa i media query',
        'learning flexbox and media query technique'],
        ['Budowa projektu z NPM (w tym z Babel i Rollup)',
        'Carrying out a project based on NPM (including: Babel, Rollup)'],
        [false],
        [false],
        [false],
        [false],
        [false],
        ['Tagi semantyczne', 'Semantic tags'],
        ['Iframe', 'Iframes'],
        ['Formularze i tabele', 'Forms and tables'],
        ['Operacje na DOM', 'Working with DOM'],
        ['Funkcje rekurencyjne', 'Recursive functions'],
        ['Rozumienie pętli', 'Understanding loops'],
        [false],
        ['Konsola Bash', 'Bash (basics)'],
    ] //21 items
    for (let m=0; m<21; m++){
        let currentItem = listItems[m];
        if (m<21&&(m>=8&&m<=12)===false&&m!==19){
            let currentStrings = availableStrings[m];
            currentItem.innerText = currentStrings[x];
        }
    }
}