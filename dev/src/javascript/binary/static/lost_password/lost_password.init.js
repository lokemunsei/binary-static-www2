var LostPassword = (function() {
    'use strict';

    var hiddenClass = 'invisible';

    function submitEmail() {
        var emailInput = $('#lp_email').val();

        if (emailInput === '') {
            $("#email_error").removeClass(hiddenClass);
        } else {
            BinarySocket.send({verify_email: emailInput, type: 'reset_password'});
        }
    }

    function onEmailInput(input) {
        if (input) {
            $("#email_error").addClass(hiddenClass);
        }
    }
    
    function lostPasswordWSHandler(msg) {
        var response = JSON.parse(msg.data);
        var type = response.msg_type;

        if (type === 'verify_email') {
            if (response.verify_email === 1) {
                load_with_pjax('reset_passwordws');
            } else if (response.error) {
                $("#email_error").removeClass(hiddenClass).text(text.localize('Invalid email format'));
            }
        }
    }

    function init() {
        $('#submit').click(function() {
            submitEmail();
        });

        $('#lp_email').keypress(function(ev) {
            if (ev.which === 13) {
                submitEmail();
            }
            onEmailInput(ev.target.value);
        });
    }

    return {
        lostPasswordWSHandler: lostPasswordWSHandler,
        init: init
    };
}());
