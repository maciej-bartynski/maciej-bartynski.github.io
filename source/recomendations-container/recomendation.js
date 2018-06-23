'use strict';
document.addEventListener('DOMContentLoaded', function () {
    let redirToPersonalProfile=document.querySelector('#b-kotrys .recomendations_see-profile-or-see-organization .recomendations_see-profile-or-see-organization_svg-container.profile');
    let redirToOrganizationProfile=document.querySelector('#b-kotrys .recomendations_see-profile-or-see-organization .recomendations_see-profile-or-see-organization_svg-container.organization');
    redirToPersonalProfile.addEventListener('click', function(){
        redirectToPersonalOrInstitutionalProfile(0);
    })
    redirToOrganizationProfile.addEventListener('click', function(){
        redirectToPersonalOrInstitutionalProfile(1);
    })
});
function redirectToPersonalOrInstitutionalProfile(x){
    if(x===0){
        window.open('https://www.linkedin.com/in/bkotrys/');
    }else{
        window.open('http://dev-army.pl/');
    }
}