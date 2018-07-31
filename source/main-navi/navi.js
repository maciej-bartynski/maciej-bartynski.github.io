'use strict';
document.addEventListener('DOMContentLoaded', function(){
    mainNavigationInitialize();
    scrollingEngine();
});
function mainNavigationInitialize(){
    let toggleBtn = document.querySelector('#hide-menu');
    let ulist = document.querySelector('.main-nav ul');
    toggleBtn.addEventListener('click', function(){
        ulist.classList.toggle('isActive');
    });
}
function scrollingEngine(){
    let btnCvEng=document.querySelector('#cv-eng');
    let btnCvPl=document.querySelector('#cv-pol');
    let btnProj=document.querySelector('#portfolio-projects');
    let btnReco=document.querySelector('#recomendations');
    let btnLinked=document.querySelector('#linkedin');
    let btnGithub=document.querySelector('#github');
    btnCvEng.addEventListener('click', function(){
        scrollToCv(1);
    });
    btnCvPl.addEventListener('click', function(){
        scrollToCv(0);
    });
    btnProj.addEventListener('click', function(){
        scrollToProj();
    });
    btnReco.addEventListener('click', function(){
        scrollToReco();
    });
    btnLinked.addEventListener('click', function(){
        openLinkedIn();
    });
    btnGithub.addEventListener('click', function(){
        openGithub();
    });
}
function scrollToCv(x){
    let cvSection=document.querySelector('.main-container');
    let scrollToThis=cvSection.offsetTop;
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
    setCvLanguage(x);
}
function setCvLanguage(x){
    let langEvnt = document.createEvent('Event');
    langEvnt.initEvent('click', false, false);
    let btnPL = document.querySelector('.language-nav #PLBtn');
    let btnENG = document.querySelector('.language-nav #ENGBtn');
    if(x===1){
        btnENG.dispatchEvent(langEvnt);
    }else if(x===0){
        btnPL.dispatchEvent(langEvnt);
    }
}
function scrollToProj(){
    let cvSection=document.querySelector('.project-container.converters');
    let scrollToThis=cvSection.offsetTop;
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
function scrollToReco(){
    let cvSection=document.querySelector('.recomendations-temporary-positioner');
    let scrollToThis=cvSection.offsetTop;
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
function openGithub(){
    window.open('https://github.com/maciej-bartynski');
}
function openLinkedIn(){
    window.open('https://www.linkedin.com/in/maciej-bartynski/');
}