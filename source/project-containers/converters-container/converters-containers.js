'use strict';
document.addEventListener('DOMContentLoaded', enableActiveLinksToConverters);
function enableActiveLinksToConverters(){
    let converterPositioners=document.querySelectorAll('.project-container.converters .project-container_positioner');
    for (let i=0; i<converterPositioners.length;i++){
        let item = converterPositioners[i];
        let links = ['./iframes/converters/1st/index.html', './iframes/converters/2nd/index.html', './iframes/converters/3rd/converter.html', './iframes/converters/4th/index.html']
        let link =links[i];
        item.addEventListener('click', function(){
            window.open(link);
        })
    }
}
