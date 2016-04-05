var PasswordMeter = (function(){
    'use strict';

    /**
     * attach password meter to DOM
     * @param $container       container for password meter, can be a p or div
     * @param id               optional id for meter element
     */
    function attach($container) {
        if (isIE()) return;
        var $meter = $('<meter></meter>', {min: 0, max: 50, high: 20, low: 10, optimum: 50});
        var $verdictTxt = $('<p></p>').text(text.localize('Password is weak'));
        $container
            .append($meter)
            .append($verdictTxt);
    }

    /**
     * Update password meter
     * @param $container        container for password meter, can be a p or div
     * @param newPW
     */
    function updateMeter($container, newPW) {
        var pwStrength = testPassword(newPW);
        var pwStrengthScore = pwStrength[0];
        var pwStrengthVerdict = pwStrength[1];

        $container.children('meter').val(pwStrengthScore);
        $container.children('p').text(pwStrengthVerdict);
    }

    return {
        attach: attach,
        updateMeter: updateMeter
    };
}());
