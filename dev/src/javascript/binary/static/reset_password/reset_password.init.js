var ResetPassword = (function () {
    'use strict';

    var hiddenClass = 'invisible';
    var resetErrorTemplate = 'Failed to reset password. [error] Please retry.';
    var dob;

    function submitResetPassword() {
        var token = $('#verification-code').val();
        var pw1 = $('#reset-password1').val();
        var pw2 = $('#reset-password2').val();

        if (token.length < 48) {
            $('#verification-error').removeClass(hiddenClass).text(text.localize('Verification code format incorrect.'));
            return;
        }

        if (!pw1) {                                         // password not entered
            $('#password-error1').empty();
            $('#password-error1').append('<p></p>', {class: 'errorfield'}).text(Content.localize().textMessageRequired);
            $('#password-error1').removeClass(hiddenClass);
            return;
        } else if (!passwordValid(pw1)) {                   // password failed validation
            var errMsgs = showPasswordError(pw1);
            $('#password-error1').empty();
            errMsgs.forEach(function(msg){
                var $errP = $('<p></p>', {class: 'errorfield'}).text(msg);
                $('#password-error1').append($errP);
            });

            $('#password-error1').removeClass(hiddenClass);
            return;
        }

        if (pw1 !== pw2) {
            if (!pw2) {
                $('#password-error2')
                    .removeClass(hiddenClass)
                    .text(Content.localize().textMessageRequired);
            } else {
                $('#password-error2')
                    .removeClass(hiddenClass)
                    .text(Content.localize().textPasswordsNotMatching);
            }

            return;
        }

        var dobDate = new Date(dob);
        var dateValid = !(dob === '' || dobDate === 'Invalid Date');
        if (!dateValid) {
            $('#dob-error').removeClass(hiddenClass).text(text.localize('Invalid format for date of birth.'));
            return;
        }

        if (!dob || dob === '') {
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
            $('#reset-form').addClass(hiddenClass);
            if (response.error) {
                $('p.notice-msg').addClass(hiddenClass);
                $('#reset-error').removeClass(hiddenClass);

                // special handling as backend return inconsistent format
                var errMsg;
                if (response.error.code === 'InputValidationFailed') {
                    errMsg = resetErrorTemplate.replace('[error]', text.localize('Token has expired.'));
                } else {
                    errMsg = resetErrorTemplate.replace('[error]', text.localize(response.error.message));
                }

                $('#reset-error-msg').text(errMsg);
            } else {
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

    function onEnterKey(e) {
        if (e.which === 13) {
            submitResetPassword();
        }
    }

    function init() {
        Content.populate();
        generateBirthDate();
        var $pmContainer = $('#password-meter-container');

        $('input').keypress(function (e) {
            onInput();
            onEnterKey(e);
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
