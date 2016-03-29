var MyAccountWS = (function() {
    "use strict";

    var loginid,
        isReal,
        get_account_status,
        is_authenticated_payment_agent,
        terms_conditions_version,
        client_tnc_status;
    var hiddenClass,
        welcomeTextID,
        virtualTopupID,
        authButtonID;

    var init = function() {
        hiddenClass    = 'invisible';
        welcomeTextID  = '#welcome_text';
        virtualTopupID = '#VRT_topup_link';
        authButtonID   = '#authenticate_button';

        loginid = page.client.loginid || $.cookie('loginid');

        BinarySocket.send({"get_settings"      : 1});
        BinarySocket.send({"website_status"    : 1});
        BinarySocket.send({"get_account_status": 1});

        //checkDisabledAccount();
    };

    var responseGetSettings = function(response) {
        var get_settings = response.get_settings;

        client_tnc_status = get_settings.client_tnc_status || '-';
        is_authenticated_payment_agent = get_settings.is_authenticated_payment_agent;

        checkAll();

        addGTMDataLayer(get_settings);
    };

    var responseAccountStatus = function(response) {
        get_account_status = response.get_account_status;
        checkAll();
    };

    var checkAll = function() {
        if(!terms_conditions_version || !client_tnc_status || !get_account_status) {
            return;
        }

        if(isReal && terms_conditions_version !== client_tnc_status) {
            window.location.href = page.url.url_for('user/tnc_approvalws');
            return;
        }

        showWelcomeMessage();
        if(!isReal) {
            showTopUpLink();
        }
        else {
            if(is_authenticated_payment_agent) {
                $('#payment_agent').removeClass(hiddenClass);
            }
            showNoticeMsg();
        }

        if(get_account_status[0] === 'unwelcome'){
            $(authButtonID).removeClass(hiddenClass);
        }

        $('#cashier-portfolio, #profit-statement').removeClass(hiddenClass);
        $('#loading').remove();
    };

    var showWelcomeMessage = function() {
        var landing_company = page.client.get_storage_value('landing_company_name');
        $(welcomeTextID)
            .text(
                text.localize(
                    isReal ? 
                        'You are currently logged in to your real money account with [_1] ([_2]).' : 
                        'You are currently logged in to your virtual money account ([_2]).'
                )
                    .replace('[_1]', landing_company || '')
                    .replace('[_2]', loginid)
            )
            .removeClass(hiddenClass);
    };

    var showTopUpLink = function() {
        if(TUser.get().balance < 1000) {
            $(virtualTopupID + ' a')
                .text(
                    text.localize('Deposit [_1] [_2] virtual money into your account [_3]')
                        .replace('[_1]', TUser.get().currency)
                        .replace('[_2]', ' 10000')
                        .replace('[_3]', loginid)
                );
            $(virtualTopupID).removeClass(hiddenClass);
        }
    };

    var showNoticeMsg = function() {
        var loginid_list = $.cookie('loginid_list');
        var res = loginid_list.split('+');
        if(res.length === 2 && (/MLT/.test(res[0]) || /MLT/.test(res[1]))) {
            $('#investment_message').removeClass(hiddenClass);
        }
    };

    var addGTMDataLayer = function(get_settings) {
        if(page.url.param('login') || page.url.param('newaccounttype')) {
            var oldUrl = window.location.href;
            var newUrl = oldUrl.replace(/(login=true&|newaccounttype=real&|newaccounttype=virtual&)/gi, '');
            var title  = document.title;
            var name   = TUser.get().fullname.split(' ');
            var data   = {};
            var affiliateToken = $.cookie('affiliate_tracking');
            if (affiliateToken) {
                dataLayer.push({'bom_affiliate_token': affiliateToken});
            }
            data['bom_country'] = get_settings.country;
            data['bom_email']   = TUser.get().email;
            data['language']    = page.url.param('l');
            data['pageTitle']   = title;
            data['url']         = oldUrl;
            data['visitorID']   = TUser.get().loginid;
            data['bom_today']   = Math.floor(Date.now() / 1000);

            if(isReal) {
                data['bom_age']       = parseInt((moment(str).unix() - get_settings.date_of_birth) / 31557600);
                data['bom_firstname'] = name[1];
                data['bom_lastname']  = name[2];
                data['bom_phone']     = get_settings.phone;
            }

            data['event'] = 
                page.url.param('newaccounttype') ? 
                    'new_account' : 
                    page.url.param('login') ?
                        'log_in' :
                        'page_load';

            dataLayer.push(data);
            window.history.replaceState('My Account', title, newUrl);
        }
    };

    var checkDisabledAccount = function() {
        var disabledAccount = [];
        page.user.loginid_array.map(function(loginObj) {
            if (loginObj.disabled && loginObj.real) {
                disabledAccount.push(loginObj.id);
            }
        });

        if(disabledAccount.length > 0) {
            var msgSingular = text.localize('Your [_1] account is unavailable. For any questions please contact [_2].'),
                msgPlural   = text.localize('Your [_1] accounts are unavailable. For any questions please contact [_2].');
            $('<p/>', {class: 'notice-msg'})
                .html(
                    (disabledAccount.length === 1 ? msgSingular : msgPlural)
                        .replace('[_1]', disabledAccount.join(', '))
                        .replace('[_2]', $('<a/>', {class: 'pjaxload', href: page.url.url_for('contact'), text: text.localize('Customer Support')}).prop('outerHTML'))
                )
                .insertAfter($(welcomeTextID));
        }
    };

    var apiResponse = function(response) {
        if('error' in response){
            if('message' in response.error) {
                console.log(response.error.message);
            }
            return false;
        }

        isReal = !TUser.get().is_virtual;

        switch(response.msg_type) {
            case 'get_account_status':
                responseAccountStatus(response);
                break;
            case 'get_settings':
                responseGetSettings(response);
                break;
            case 'landing_company_details':
                showWelcomeMessage();
                break;
            case 'website_status':
                terms_conditions_version = response.website_status.terms_conditions_version;
                checkAll();
                break;
            default:
                break;
        }
    };

    return {
        init : init,
        apiResponse : apiResponse
    };
}());


pjax_config_page("user/my_accountws", function() {
    return {
        onLoad: function() {
            if (!getCookieItem('login')) {
                window.location.href = page.url.url_for('login');
                return;
            }

            showLoadingImage($('<div/>', {id: 'loading'}).insertAfter('#welcome'));

            if(page.url.param('login')) {
                page.client.clear_storage_values();
            }

            BinarySocket.init({
                onmessage: function(msg) {
                    var response = JSON.parse(msg.data);
                    if (response) {
                        MyAccountWS.apiResponse(response);
                    }
                }
            });

            Content.populate();
            MyAccountWS.init();
        }
    };
});
