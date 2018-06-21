/*'use strict';
document.addEventListener('DOMContentLoaded', enableActiveLinksToConverters);
function enableActiveLinksToConverters(){
    let converterPositioners=document.querySelectorAll('.project-container.converters .project-container_positioner');
    for (let i=0; i<converterPositioners.length;i++){
        let item = converterPositioners[i];
        let links = ['./iframes/converters/first/index.html', './iframes/converters/second/index.html', './iframes/converters/third/index.html', './iframes/converters/fourth/index.html']
        let link =links[i];
        item.addEventListener('click', function(){
            window.open(link);
        })
    }
}*/
