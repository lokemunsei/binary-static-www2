var SettingsWS = (function() {
    "use strict";

    var init = function() {
        var classHidden = 'invisible',
            classReal   = '.real';

        if(page.client.is_real) {
            $(classReal).removeClass(classHidden);
        }
        else {
            $(classReal).addClass(classHidden);
        }

        $('#settingsContainer').removeClass(classHidden);
    };

    return {
        init: init
    };
}());


pjax_config_page("settingsws", function() {
    return {
        onLoad: function() {
            if (!page.client.is_logged_in) {
                window.location.href = page.url.url_for('login');
                return;
            }

            SettingsWS.init();
        }
    };
});
