var ValidAccountOpening = (function(){
  var redirectCookie = function() {
    if (!$.cookie('login')) {
        window.location.href = page.url.url_for('login');
        return;
    }
    if (page.client.type !== 'virtual') {
      window.location.href = page.url.url_for('user/my_accountws');
      return;
    }
    for (i = 0; i < page.user.loginid_array.length; i++){
      if (page.user.loginid_array[i].real === true){
        window.location.href = page.url.url_for('user/my_accountws');
        return;
      }
    }
  };
  var handler = function(response, message) {
    if (response.error) {
      var errorMessage = response.error.message;
      if (document.getElementById('real-form')) {
        $('#real-form').remove();
      } else if (document.getElementById('japan-form')) {
        $('#japan-form').remove();
      }
      var error = document.getElementsByClassName('notice-msg')[0];
      error.innerHTML = (response.msg_type === 'sanity_check') ? text.localize('There was some invalid character in an input field.') : errorMessage;
      error.parentNode.parentNode.parentNode.setAttribute('style', 'display:block');
      return;
    } else {
      var loginid = message.client_id;
      //set cookies
      var oldCookieValue = $.cookie('loginid_list');
      var cookie_domain = '.' + document.domain.split('.').slice(-2).join('.');
      $.cookie('loginid_list', loginid + ':R:E+' + oldCookieValue, {domain: cookie_domain, path:'/'});
      $.cookie('loginid', loginid, {domain: cookie_domain, path:'/'});
      //push to gtm
      var gtmDataLayer = document.getElementsByClassName('gtm_data_layer')[0];
      var age = new Date().getFullYear() - document.getElementById('dobyy').value;
      document.getElementById('event').innerHTML = 'new_account';
      dataLayer.push({
        'language': page.language(),
        'event': 'new_account',
        'visitorID': loginid,
        'bom_age': age,
        'bom_country': $('#residence-disabled option[value="' + page.client.residence + '"]').html(),
        'bom_today': Math.floor(Date.now() / 1000),
        'bom_email': page.user.email,
        'bom_firstname': document.getElementById('fname').value,
        'bom_lastname': document.getElementById('lname').value,
        'bom_phone': document.getElementById('tel').value
      });
      var affiliateToken = $.cookie('affiliate_tracking');
      if (affiliateToken) {
        dataLayer.push({'bom_affiliate_token': JSON.parse($.cookie('affiliate_tracking')).t});
      }
      //generate dropdown list and switch
      page.client.clear_storage_values();
      var option = new Option('Real Account (' + loginid + ')', loginid);
      document.getElementById('client_loginid').appendChild(option);
      $('#client_loginid option[value="' + page.client.loginid + '"]').removeAttr('selected');
      option.setAttribute('selected', 'selected');
      $('#loginid-switch-form').submit();
    }
  };
  var letter, numbers, space, hyphen, period, apost;

  var initializeValues = function() {
    letters = Content.localize().textLetters;
    numbers = Content.localize().textNumbers;
    space   = Content.localize().textSpace;
    hyphen  = Content.localize().textHyphen;
    period  = Content.localize().textPeriod;
    apost   = Content.localize().textApost;
  };

  var checkFname = function(fname, errorFname) {
    if (Trim(fname.value).length < 2) {
      errorFname.innerHTML = Content.errorMessage('min', '2');
      Validate.displayErrorMessage(errorFname);
      window.accountErrorCounter++;
    } else if (!/^[a-zA-Z\s-.']+$/.test(fname.value)){
      initializeValues();
      errorFname.innerHTML = Content.errorMessage('reg', [letters, space, hyphen, period, apost]);
      Validate.displayErrorMessage(errorFname);
      window.accountErrorCounter++;
    }
    return;
  };
  var checkLname = function(lname, errorLname) {
    if (Trim(lname.value).length < 2) {
      errorLname.innerHTML = Content.errorMessage('min', '2');
      Validate.displayErrorMessage(errorLname);
      window.accountErrorCounter++;
    } else if (!/^[a-zA-Z\s-.']+$/.test(lname.value)){
      initializeValues();
      errorLname.innerHTML = Content.errorMessage('reg', [letters, space, hyphen, period, apost]);
      Validate.displayErrorMessage(errorLname);
      window.accountErrorCounter++;
    }
    return;
  };
  var checkDate = function(dobdd, dobmm, dobyy, errorDob) {
    if (!isValidDate(dobdd.value, dobmm.value, dobyy.value) || dobdd.value === '' || dobmm.value === '' || dobyy.value === '') {
      errorDob.innerHTML = Content.localize().textErrorBirthdate;
      Validate.displayErrorMessage(errorDob);
      window.accountErrorCounter++;
    }
    return;
  };
  var checkPostcode = function(postcode, errorPostcode) {
    if (postcode.value !== '' && !/^[a-zA-Z\d-]+$/.test(postcode.value)){
      initializeValues();
      errorPostcode.innerHTML = Content.errorMessage('reg', [letters, numbers, hyphen]);
      Validate.displayErrorMessage(errorPostcode);
      window.accountErrorCounter++;
    }
    return;
  };
  var checkTel = function(tel, errorTel) {
    if (tel.value.replace(/\+| /g,'').length < 6) {
      errorTel.innerHTML = Content.errorMessage('min', 6);
      Validate.displayErrorMessage(errorTel);
      window.accountErrorCounter++;
    } else if (!/^\+?[\d-\s]+$/.test(tel.value)){
      initializeValues();
      errorTel.innerHTML = Content.errorMessage('reg', [numbers, space, hyphen]);
      Validate.displayErrorMessage(errorTel);
      window.accountErrorCounter++;
    }
    return;
  };
  var checkAnswer = function(answer, errorAnswer) {
    if (answer.value.length < 4) {
      errorAnswer.innerHTML = Content.errorMessage('min', 4);
      Validate.displayErrorMessage(errorAnswer);
      window.accountErrorCounter++;
    }
    return;
  };
  return {
    redirectCookie: redirectCookie,
    handler: handler,
    checkFname: checkFname,
    checkLname: checkLname,
    checkDate: checkDate,
    checkPostcode: checkPostcode,
    checkTel: checkTel,
    checkAnswer: checkAnswer
  };
}());
