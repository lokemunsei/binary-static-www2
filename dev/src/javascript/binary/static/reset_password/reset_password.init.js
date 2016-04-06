var ResetPassword = (function () {
    'use strict';

    var hiddenClass = 'invisible';

    var dob;

    function submitResetPassword() {
        var token = $('#verification-code').val();
        var pw1 = $('#reset-password1').val();
        var pw2 = $('#reset-password2').val();

        if (token.length < 48) {
            $('#verification-error').removeClass(hiddenClass).text(text.localize('Verification code format incorrect.'));
            return;
        }

        // use regex to validate password

        if (!passwordValid(pw1)) {
            $('#password-error1')
                .removeClass(hiddenClass)
                .text(text.localize('Password should have lower and uppercase letters with numbers.'));
            return;
        }

        if (pw1 !== pw2) {
            $('#password-error2')
                .removeClass(hiddenClass)
                .text(Content.localize().textPasswordsNotMatching);
            return;
        }

        var dobDate = new Date(dob);
        var isVirtual = page.client.is_virtual();
        var dateValid = !(dob === '' || dobDate === 'Invalid Date');
        if (!isVirtual && !dateValid) {
            $('#dob-error').removeClass(hiddenClass).text(text.localize('Invalid date of birth.'));
            return;
        }

        if (isVirtual) {
            BinarySocket.send({
                reset_password: 1,
                verification_code: token,
                new_password: pw1
            });
        } else {
            BinarySocket.send({
                reset_password: 1,
                verification_code: token,
                new_password: pw1,
                date_of_birth: dob
            });
        }
    }

    function onInput() {
        $('.errorfield').addClass(hiddenClass);
    }

    function resetPasswordWSHandler(msg) {
        var response = JSON.parse(msg.data);
        var type = response.msg_type;

        if (type === 'reset_password') {
            if (response.error) {
                $('#reset-error').removeClass(hiddenClass).text(response.error.message);
            } else {
                $('#reset-form').addClass(hiddenClass);
                $('p.notice-msg')
                    .text(text.localize('Your password has been successfully reset. ' +
                        'Please log into your account using your new password.'));
            }
        }
    }

    function haveRealAccountHandler() {
        var isChecked = $('#have-real-account').is(':checked');
        if (isChecked) {
            $('#dob-field').removeClass(hiddenClass);
        } else {
            $('#dob-field').addClass(hiddenClass);
        }
    }

    function onDOBChange() {
        var dd = $('#dobdd').val();
        var mm = $('#dobmm').val();
        var yy = $('#dobyy').val();

        dob = yy + '-' + mm + '-' + dd;
    }

    function init() {
        Content.populate();
        generateBirthDate();
        var $pmContainer = $('#password-meter-container');

        $('input').keydown(function () {
            onInput();
        });

        $('#reset-password1').keyup(function (ev) {
            PasswordMeter.updateMeter($pmContainer, ev.target.value);
        });

        $('#reset').click(function () {
            submitResetPassword();
        });

        $('#have-real-account').click(function () {
            haveRealAccountHandler();
        });

        $('select').change(function () {
            onDOBChange();
        });

        PasswordMeter.attach($pmContainer);
    }

    return {
        resetPasswordWSHandler: resetPasswordWSHandler,
        init: init
    };
}());
