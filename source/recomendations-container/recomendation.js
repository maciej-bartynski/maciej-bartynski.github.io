'use strict';
document.addEventListener('DOMContentLoaded', function () {
    let redirToPersonalProfileBK = document.querySelector('#b-kotrys .recomendations_see-profile-or-see-organization .recomendations_see-profile-or-see-organization_svg-container.profile');
    let redirToPersonalProfileGD = document.querySelector('#g-dawidko .recomendations_see-profile-or-see-organization .recomendations_see-profile-or-see-organization_svg-container.profile');
    let redirToOrganizationProfileBK = document.querySelector('#b-kotrys .recomendations_see-profile-or-see-organization .recomendations_see-profile-or-see-organization_svg-container.organization');
    let redirToOrganizationProfileGD = document.querySelector('#g-dawidko .recomendations_see-profile-or-see-organization .recomendations_see-profile-or-see-organization_svg-container.organization');
    redirToPersonalProfileBK.addEventListener('click', function () {
        redirectToPersonalOrInstitutionalProfile(0, 'bkot');
    });
    redirToPersonalProfileGD.addEventListener('click', function () {
        redirectToPersonalOrInstitutionalProfile(0, 'gdaw');
    });
    redirToOrganizationProfileBK.addEventListener('click', function () {
        redirectToPersonalOrInstitutionalProfile(1);
    });
    redirToOrganizationProfileGD.addEventListener('click', function () {
        redirectToPersonalOrInstitutionalProfile(1);
    });
});

function redirectToPersonalOrInstitutionalProfile(x, who) {
    if (x === 0) {
        if (who === 'bkot') {
            window.open('https://www.linkedin.com/in/bkotrys/');
        } else if (who === 'gdaw') {
            window.open('https://www.linkedin.com/in/grzegorz-dawidko-a0552b107/');
        }
    } else if (x === 1) {
        window.open('http://dev-army.pl/');
    }
}