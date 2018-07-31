'use strict';
document.addEventListener('DOMContentLoaded', initializeThisSection);

function initializeThisSection() {
    let butt = [document.querySelector('.project-container_main_container.coders-camp'), document.querySelector('.project-container_main_container.fantasy-form')];
    let cont = [document.querySelector('.project-container_main_container_bottom-side'), document.querySelectorAll('.project-container_main_container_bottom-side')[1]];
    butt.forEach(function (btn, idx) {
        btn.addEventListener('click', function () {
            btn.classList.toggle('itIsFocused');
            cont[idx].classList.toggle('itIsClicked');
        });
    });
    cont.forEach(function (el, idx) {
        let cod = el.querySelector('#code');
        let web = el.querySelector('#web');
        cod.addEventListener('click', function () {
            if (idx === 0) {
                window.open('https://github.com/maciej-bartynski/CodersCamp2018', '_blank');
            } else {
                window.open('https://github.com/maciej-bartynski/fantasy-forms',
                    '_blank');
            }
        });
        web.addEventListener('click', function () {
            if (idx === 0) {
                window.open('https://maciej-bartynski.github.io/iframes/CodersCamp-zad1/wizytowka.html', '_blank'); //coders pror
            } else {
                window.open('https://maciej-bartynski.github.io/iframes/FantasyForm/avatar.html', '_blank'); //fantasy pror
            }
        });
    });
}