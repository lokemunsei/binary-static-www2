pjax_config_page("limitsws", function(){
    return {
        onLoad: function() {
            if (page.client.redirect_if_logout()) {
                return;
            }
            Content.populate();
            document.getElementById('client_message').setAttribute('style', 'display:none');

            BinarySocket.init({
                onmessage: function(msg){
                    var response = JSON.parse(msg.data);

                    if (TUser.get().is_virtual) {
                        LimitsWS.limitsError();
                    } else if (response) {
                        var type = response.msg_type;
                        var error = response.error;

                        if (type === 'authorize' && TUser.get().is_virtual){
                            LimitsWS.limitsError(response);
                        } else if (type === 'get_limits' && !error){
                            LimitsWS.limitsHandler(response);
                        } else if (error) {
                            LimitsWS.limitsError();
                        }
                    }
                }
            });

            BinarySocket.send({get_limits: 1});
        },
        onUnload: function(){
            LimitsWS.clean();
        }
    };
});
