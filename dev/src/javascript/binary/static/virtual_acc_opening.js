pjax_config_page("new_account/virtualws", function(){
  return {
    onLoad: function() {
      if (getCookieItem('login')) {
          window.location.href = page.url.url_for('user/my_accountws');
          return;
      }
      Content.populate();
      var virtualForm = $('#virtual-form');
      if ($.cookie('verify_token')) {
        handle_residence_state_ws();
        BinarySocket.send({residence_list:1});
        var form = document.getElementById('virtual-form');
        var errorEmail = document.getElementById('error-email'),
            errorPassword = document.getElementById('error-password'),
            errorRPassword = document.getElementById('error-r-password'),
            errorResidence = document.getElementById('error-residence'),
            errorAccount = document.getElementById('error-account-opening');

        if (isIE() === false) {
          $('#password').on('input', function() {
            $('#password-meter').attr('value', testPassword($('#password').val())[0]);
          });
        } else {
          $('#password-meter').remove();
        }

        if (form) {
          virtualForm.submit( function(evt) {
            evt.preventDefault();

            var email = document.getElementById('email').value,
                residence = document.getElementById('residence').value,
                password = document.getElementById('password').value,
                rPassword = document.getElementById('r-password').value;

            Validate.errorMessageResidence(residence, errorResidence);
            Validate.errorMessageEmail(email, errorEmail);
            Validate.hideErrorMessage(errorAccount);

            if (Validate.errorMessagePassword(password, rPassword, errorPassword, errorRPassword) && !Validate.errorMessageEmail(email, errorEmail) && !Validate.errorMessageResidence(residence, errorResidence)){
              BinarySocket.init({
                onmessage: function(msg){
                  var response = JSON.parse(msg.data);
                  if (response) {
                    var type = response.msg_type;
                    var error = response.error;

                    if (type === 'new_account_virtual' && !error){
                      // set a flag to push to gtm in my_account
                      localStorage.setItem('new_account', '1');

                      form.setAttribute('action', '/login');
                      form.setAttribute('method', 'POST');
                      virtualForm.unbind('submit');
                      form.submit();
                    } else if (type === 'error' || error) {
                      if (error.code === 'InvalidAccount') {
                        errorAccount.textContent = error.message;
                        Validate.displayErrorMessage(errorAccount);
                        return;
                      } else if (error.code === 'InsufficientAccountDetails') {
                        errorAccount.textContent = error.message;
                        Validate.displayErrorMessage(errorAccount);
                        return;
                      } else if (error.code === 'duplicate email') {
                        errorEmail.textContent = Content.localize().textDuplicatedEmail;
                      } else if (error.code === 'InvalidToken' || error.code === 'InvalidEmail') {
                        virtualForm.empty();
                        var errorText = '',
                            noticeText = '<p>' + text.localize('Your token has been invalidated. Please click <a class="pjaxload" href="[_1]">here</a> to restart the verification process.').replace('[_1]', page.url.url_for('')) + '</p>';
                        if (error.code === 'InvalidEmail') {
                            errorText = '<p class="errorfield">' + text.localize('The re-entered email address is incorrect.') + '</p>';
                        }
                        virtualForm.html(errorText + noticeText);
                        return;
                      } else if (error.code === 'PasswordError') {
                        errorEmail.textContent = text.localize('Password is not strong enough.');
                      } else if (error.details && error.details.verification_code && /required/.test(error.details.verification_code)) {
                        errorEmail.textContent = Content.localize().textTokenMissing;
                      } else if (error.message) {
                        errorEmail.textContent = error.message;
                      }
                      Validate.displayErrorMessage(errorEmail);
                    }
                  }
                }
              });
              VirtualAccOpeningData.getDetails(email, password, residence);
            }
          });
        }
      } else {
        virtualForm.empty();
        var errorText = '<p class="errorfield">' + Content.localize().textTokenMissing + '</p>',
            noticeText = '<p>' + Content.localize().textClickHereToRestart.replace('[_1]', page.url.url_for('')) + '</p>';
        virtualForm.html(errorText + noticeText);
      }
    }
  };
});
