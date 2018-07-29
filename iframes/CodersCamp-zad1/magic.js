'use strict';
document.addEventListener('DOMContentLoaded', initMagic);

function initMagic() {
    let links = document.querySelectorAll('.icon-positioner i');
    let iter = links.length;
    for (let i = 0; i < iter; i++) {
        let link = links[i];
        link.addEventListener('click', function (e) {
            doMagicRotation(link);
        });
    }
}

function doMagicRotation(link) {
    let linkID = link.getAttribute('id');
    let addres;
    if (linkID === 'git') {
        addres = 'https://www.github.com/maciej-bartynski/CodersCamp2018/';
    } else if (linkID === 'lin') {
        addres = 'https://www.linkedin.com/in/maciej-bartynski';
    } else if (linkID === 'por') {
        addres = 'https://maciej-bartynski.github.io/';
    };
    if (link.classList.contains('left') === true) {
        rotateOneStep(addres);
    } else if (link.classList.contains('right') === true) {
        rotateOneStep(addres);
    } else if (link.classList.contains('top') === true) {
        rotateOneStep(addres);
    }
}

function rotateOneStep(link) {
    let nodes = [document.querySelector('.left'), document.querySelector('.top'), document.querySelector('.right')];
    let arr = ['left', 'top', 'right', 'left'];
    for (let j = 0; j < 3; j++) {
        nodes[j].classList.remove(arr[j]);
        nodes[j].classList.add(arr[j + 1]);
    }
    setTimeout(function () {
        window.open(link, '_blank');
    }, 400);
}