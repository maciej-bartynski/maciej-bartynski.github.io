'use strict';
document.addEventListener('DOMContentLoaded', init);

function init() {
    paralax();
    btnToAsideBar();
    dynamicTxt();
    dynamicTxtArticle();
    btnsInsideAsideBar();
}

function btnsInsideAsideBar(){
    let btns = document.querySelectorAll('.btnhead');
    let articles = document.querySelectorAll('.article');
    for (let i=0;i<2;i++){
        let iter=i;
        btns[iter].addEventListener('click', function(e){
            articles[iter].classList.toggle('isActive');
            if (iter===0){
                articles[1].classList.remove('isActive')
            }else{
                articles[0].classList.remove('isActive')
            }
        })
    }
}

function paralax() {
    window.addEventListener('mousemove', function (e) {
        let bg = document.querySelector('.bground');
        let initialTop = -10;
        let initialLeft = -10;
        
        let x = e.clientX;
        let y = e.clientY;
        let vw = window.innerWidth;
        let vh = window.innerHeight;
        let dividerX = vw / 100;
        let dividerY = vh / 100;
        let pointPosX = (Math.floor(x / dividerX)) / 10;
        let pointPosY = (Math.floor(y / dividerY)) / 10;
        
        bg.style.left = -10 - pointPosX + 'px';
        bg.style.top = -10 - pointPosY + 'px';
        infoAboutParalax(x, y, dividerX, dividerY, pointPosX, pointPosY);
        containerMoveOpposite(x, y, dividerX, dividerY, pointPosX, pointPosY);
    });
}
function containerMoveOpposite(x, y, dividerX, dividerY, pointPosX, pointPosY){
    let ct = document.querySelector('.container');
    ct.style.left = pointPosX + 'px';
    ct.style.top = pointPosY + 'px';
}
function infoAboutParalax(a, b, c, d, e, f) {
    let idX = document.querySelector('#x');
    let idY = document.querySelector('#y');
    let scaleX = document.querySelector('#scaleX');
    let scaleY = document.querySelector('#scaleY');
    let newLeft = document.querySelector('#newleft');
    let newTop = document.querySelector('#newtop');
    idX.innerText = a;
    idY.innerText = b;
    scaleX.innerText = c;
    scaleY.innerText = d;
    newLeft.innerText = (-10)-e + 'px';
    newTop.innerText = (-10)-f + 'px';
}

function btnToAsideBar() {
    let btn = document.querySelector('.button');
    let sidebar = document.querySelector('.sidebox');
    let fonticon = document.querySelector('.fonticon');
    let wrapper = document.querySelector('.wrapper');
    btn.addEventListener('click', function () {   
        btn.classList.toggle('isClicked');
        sidebar.classList.toggle('isHidden');
        fonticon.classList.toggle('rotation');
        wrapper.classList.toggle('mobile');
    });
}

function dynamicTxt() {
    let author = document.querySelector('#motto');
    let myname = [
        'T', 'r', 'y', 'i', 'n', 'g', ' t', 'o', ' l','e','a','r','n','<br />','h','o','w',' i','t' 
    ];
    let surname = [
        ' w', 'o', 'r', 'k', 's'
    ];
    let mynameiterator = 0;
    let surnameiterator = 0;
    let fullStop = false;

    function setTextToParagraph(string, i, el) {
        el.innerHTML = el.innerHTML + string[i];
        i++;
        if (i < string.length) {
            setTimeout(function () {
                setTextToParagraph(string, i, el)
            }, 100);
        } else if (i === string.length && fullStop === false) {
            setTimeout(function () {
                fullStop = true;
                let span = document.createElement('span');
                author.appendChild(span);
                setTextToParagraph(surname, surnameiterator, span);
            }, 100);
        }
    }
    setTextToParagraph(myname, mynameiterator, author);
}

function dynamicTxtArticle() {
    let button = document.querySelector('#domcontentload');
    button.addEventListener('click', dynamizeArticle);
}
function dynamizeArticle(){
    document.querySelector('#domcontentload').removeEventListener('click', dynamizeArticle);
    document.querySelector('#inn').classList.add('mainText');
    setTimeout(iteratorStep, 400);
    //iterator
    let i = 0;
    let array = ['m','y','t','e','x','t'];
    function iteratorStep(){
        let belt = document.querySelector('#a');
        let iter = belt.querySelector('#iterator');
        belt.classList.add('actualStep');
        iter.innerText=i;
        iter.classList.add('blink');
        setTimeout(arrayStep, 600);
    }
    //array step
    function arrayStep(){
        document.querySelector('#a').classList.remove('actualStep');
        document.querySelector('#a #iterator').classList.remove('blink');
        let belt = document.querySelector('#c');
        let char = belt.querySelector('#char');
        belt.classList.add('actualStep');
        char.innerText=array[i];
        char.classList.add('blink');
        setTimeout(innerTextStep, 600);
    }
    //innerTextStep
    function innerTextStep(){
        document.querySelector('#c').classList.remove('actualStep');
        document.querySelector('#c #char').classList.remove('blink');
        let belt = document.querySelector('#d');
        let inn = document.querySelector('#inn');
        belt.classList.add('actualStep');
        inn.innerText += array[i];
        setTimeout(iplusplusStep, 300);
    }
    //call i++
    function iplusplusStep(){
        document.querySelector('#d').classList.remove('actualStep');
        document.querySelector('#d #inn').classList.remove('blink'); 
        let belt = document.querySelector('#e');
        belt.classList.add('actualStep');
        belt.classList.add('blink');
        setTimeout(iteratorPlus, 300);
    }
    //do i++
    function iteratorPlus(){
        document.querySelector('#e').classList.remove('actualStep');
        document.querySelector('#e').classList.remove('blink');
        let belt = document.querySelector('#a');
        let iter = belt.querySelector('#iterator');
        belt.classList.add('actualStep');
        i++;
        iter.innerText = i;
        iter.classList.add('blink');
        setTimeout(recursiveStep, 600);
    }
    //recursive
    function recursiveStep(){
        document.querySelector('#a').classList.remove('actualStep');
        document.querySelector('#a').classList.remove('blink');
        let belt = document.querySelector('#f');
        belt.classList.add('actualStep');
        let timer = document.querySelector('#dynamictxt i');
        timer.classList.add('timerRotation');
        setTimeout(callingNext, 1000);
    }
    //call function
    function callingNext(){
        document.querySelector('#call').classList.add('blink');
        setTimeout(clearAll, 300);
    }
    function clearAll(){
        document.querySelector('#f').classList.remove('actualStep');
        document.querySelector('#f #call').classList.remove('blink');
        document.querySelector('#f i').classList.remove('timerRotation');
        if (i<6){
            iteratorStep(); 
        } else {
            document.querySelector('#inn').classList.remove('mainText');
            document.querySelector('#domcontentload').addEventListener('click', dynamizeArticle);
        }
    }
}