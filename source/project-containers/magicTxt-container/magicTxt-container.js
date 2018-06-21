'use strict';

document.addEventListener('DOMContentLoaded', initializeAnimationMagicTextContainer);

function initializeAnimationMagicTextContainer() {
    let wrapper = document.querySelector('.container-for-two-project-containers');
    let container = document.querySelector('.project-container.magic-text');
    let iframePositioner = container.querySelector('.project-container_positioner');
    iframePositioner.addEventListener('click', prepareContainerForAnimation, true);
    let closingBtn = container.querySelector('.closingBtn');
    closingBtn.addEventListener('click', closeContainer);
    function prepareContainerForAnimation() {
        wrapper.classList.add('isActive');
        container.classList.add('isActive');
        iframePositioner.classList.add('isActive');
        let iframeDescription = container.querySelector('p');
        iframeDescription.classList.add('isActive');
        let iframeItself = container.querySelector('iframe');
        iframeItself.classList.add('isActive');
        let mainCorp = container.querySelector('main');
        mainCorp.classList.add('isActive');
        closingBtn.classList.add('isActive');
        function scrollToThis() {
            let scrollToThis = container.offsetTop;
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
        scrollToThis();
    }
}

function closeContainer() {
    let wrapper = document.querySelector('.container-for-two-project-containers');
    wrapper.classList.remove('isActive');
    let container = document.querySelector('.project-container.magic-text');
    container.classList.remove('isActive');
    let iframePositioner = container.querySelector('.project-container_positioner');
    iframePositioner.classList.remove('isActive');
    let iframeDescription = container.querySelector('p');
    iframeDescription.classList.remove('isActive');
    let iframeItself = container.querySelector('iframe');
    iframeItself.classList.remove('isActive');
    let mainCorp = container.querySelector('main');
    mainCorp.classList.remove('isActive');
    let closingBtn = container.querySelector('.closingBtn');
    closingBtn.classList.remove('isActive');
}
