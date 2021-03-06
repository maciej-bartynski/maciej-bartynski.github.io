//footer
import './background-fixed/background.scss';
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
import './project-containers/pending-projects/pending.scss';
import './project-containers/pending-projects/pending.js';
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
import './recomendations-container/recomendation.js';
//footer
import './footer/footer.scss';
'use strict';
document.addEventListener('DOMContentLoaded', function () {
    preventJumpingBackgroundInIe();
    seeNewProj();
});

function preventJumpingBackgroundInIe() {
    if (navigator.userAgent.match(/Trident\/7\./)) {
        let docBody = document.querySelector('body');
        docBody.addEventListener("mousewheel", function () {
            event.preventDefault();
            var wheelDelta = event.wheelDelta;
            var currentScrollPosition = window.pageYOffset;
            window.scrollTo(0, currentScrollPosition - wheelDelta);
        });
    }
}

function seeNewProj() {
    let btn = document.querySelector('#go-see-new');
    btn.addEventListener('click', scrollToNewPro);

    function scrollToNewPro() {

        let newPro = document.querySelector('.project-container.pending-projects');
        let scrollToThis = newPro.offsetTop;
        var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
        if (isSmoothScrollSupported === true) {
            window.scrollTo({
                'behavior': 'smooth',
                'left': 0,
                'top': scrollToThis
            });
        } else {
            window.scrollTo(0, scrollToThis);
        }

    }
}