//navi
import './main-navi/navi.scss';
import './main-navi/navi.js';
//cv
import './styles.scss';
import './left-column/left-column_main-style.scss';
import './left-column/header/header.scss';
import './left-column/aside/aside.scss';
import './left-column/language-nav/language-nav.js';
import './left-column/language-nav/language-nav.scss';
import './right-column/right-column_main-style.scss';
//project-container
import './project-containers/project-containers_main-style.scss';
import './project-containers/converters-container/converters-container.scss';
import './project-containers/converters-container/converters-containers.js';
import './project-containers/keyframes-container/keyframes-container.scss';
import './project-containers/keyframes-container/keyframes-container.js';
import './project-containers/magicTxt-container/magicTxt-container.scss';
import './project-containers/magicTxt-container/magicTxt-container.js';
import './project-containers/photoFade-container/photoFade-container.scss';
import './project-containers/photoFade-container/photoFade-container.js';
import './project-containers/cvPlusPlus-container/cvPlusPlus-container.scss';
import './project-containers/cvPlusPlus-container/cvPlusPlus-container.js';
//reccomend
import './recomendations-container/recomendations.scss';
//footer
import './footer/footer.scss';
'use strict';
document.addEventListener('DOMContentLoaded', temporaryJumpPrevntion);
let iter=0;
function temporaryJumpPrevntion(){
    document.addEventListener('click', iterPlus);
    function iterPlus(){
        iter=1;
    }
    setTimeout(checkIfScroolingIsNeeded,2000);
}
function checkIfScroolingIsNeeded(){
    var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
    if (iter===0){
        if (isSmoothScrollSupported === true) {
            window.scrollTo({
                'behavior': 'smooth',
                'left': 0,
                'top': 0
            });
        } else {
            window.scrollTo(0, 0);
        }
    }
}