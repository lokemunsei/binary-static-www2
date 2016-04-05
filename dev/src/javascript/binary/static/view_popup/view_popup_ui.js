var ViewPopupUI = (function() {
    var _container = null;
    var _diff_end_start_time = 300; // we show point markers if end time start time difference is <= than this (5 minutes default)
    return {
        _init: function () {
            _container = null;
        },
        container: function (refresh) {
            if (refresh) {
                if (this._container) {
                    this._container.remove();
                }
                this._container = null;
            }
            if (!this._container) {
                var that = this;
                var con = $('<div class="inpage_popup_container inpage_popup_container_ws" id="sell_popup_container"><a class="close">x</a><div class="inpage_popup_content"></div></div>');
                con.hide();
                var _on_close = function () {
                    that.cleanup(true);
                };
                con.find('a.close').on('click', function () { _on_close(); } );
                $(document).on('keydown', function(e) {
                     if (e.which === 27) _on_close();
                });
                this._container = con;
            }
            return this._container;
        },
        cleanup: function () {
            this.forget_streams();
            this.clear_timer();
            this.close_container();
            this._init();
        },
        forget_streams: function() {
            while(window.stream_ids && window.stream_ids.length > 0) {
                var id = window.stream_ids.pop();
                if(id && id.length > 0) {
                    BinarySocket.send({"forget": id});
                }
            }
        },
        clear_timer: function() {
            if(window.ViewPopupTimerInterval) {
                clearInterval(window.ViewPopupTimerInterval);
                window.ViewPopupTimerInterval = undefined;
            }
        },
        close_container: function () {
            if (live_chart && typeof live_chart !== "undefined") {
                live_chart.close_chart();
            }
            if (this._container) {
                this._container.hide().remove();
                $('.popup_page_overlay').hide().remove();
                this._container = null;
            }
        },
        server_data: function () {
            var data = {};
            var field = $('#sell_extra_info_data');
            if (field) {
                data['barrier']             = field.attr('barrier');
                data['barrier2']            = field.attr('barrier2');
                data['is_immediate']        = field.attr('is_immediate');
                data['is_negative']         = field.attr('is_negative');
                data['is_forward_starting'] = field.attr('is_forward_starting');
                data['trade_feed_delay']    = field.attr('trade_feed_delay');
                data['currency']            = field.attr('currency');
                data['purchase_price']      = field.attr('purchase_price');
                data['shortcode']           = field.attr('shortcode');
                data['payout']              = field.attr('payout');
                data['contract_id']         = field.attr('contract_id');
            }
            return data;
        },
        disable_button: function (button) {
            button.attr('disabled', 'disabled');
            button.fadeTo(0, 0.5);
        },
        enable_button: function (button) {
            button.removeAttr('disabled');
            button.fadeTo(0, 1);
        },
        show_inpage_popup: function (data, containerClass, dragHandle) {
            var that = this;
            var con = this.container(true);
            if(containerClass) {
                con.addClass(containerClass);
            }
            if (data) {
                $('.inpage_popup_content', con).html(data);
            }
            var body = $(document.body);
            con.css('position', 'fixed').css('z-index', get_highest_zindex() + 100);
            body.append(con);
            con.show();
            $(document.body).append($('<div/>', {class: 'popup_page_overlay'}));
            $('.popup_page_overlay').click(function(){that.cleanup();});
            con.draggable({
                stop: function() {
                    that.reposition_confirmation_ondrag();
                },
                handle: dragHandle,
                scroll: false,
            });
            $(dragHandle).disableSelection();
            this.reposition_confirmation();
            return con;
        },
        reposition_confirmation_ondrag: function () {
            var con    = this.container();
            var offset = con.offset();
            var win_   = $(window);
            // top
            if(offset.top < win_.scrollTop()) {con.offset({top: win_.scrollTop()});}
            // left
            if(offset.left < 0) {con.offset({left: 0});}
            // right
            if(offset.left > win_.width() - con.width()) {con.offset({left: win_.width() - con.width()});}
        },
        reposition_confirmation: function (x, y) {
            var con = this.container();
            var win_ = $(window);
            var x_min = 50;
            var y_min = 500;
            if(win_.width() < 767) { //To be responsive, on mobiles and phablets we show popup as full screen.
                x_min = 0;
                y_min = 0;
            }
            if (x === undefined) {
                x = Math.max(Math.floor((win_.width() - win_.scrollLeft() - con.width()) / 2), x_min) + win_.scrollLeft();
            }
            if (y === undefined) {
                y = Math.min(Math.floor((win_.height() - con.height()) / 2), y_min) + win_.scrollTop();
                if(y < win_.scrollTop()) {y = win_.scrollTop();}
            }
            con.offset({left: x, top: y});
        },
        show_chart: function (con, symbol) {
            var that = this;
            var server_data = that.server_data();
            var liveChartConfig = new LiveChartConfig({ renderTo: 'analysis_live_chart', symbol: symbol, with_trades: 0, shift: 0});
            var time_obj = that.get_time_interval();
            if(time_obj['is_live'] && time_obj['is_live'] === 1) {
                 liveChartConfig.update( {
                     live: '10min'
                 });
            } else {
                var from_date, to_date;
                if (server_data.is_forward_starting > 0) {
                    if(server_data.trade_feed_delay > 0) {
                        from_date = that.get_date_from_seconds(time_obj['from_time'] - parseInt(server_data.trade_feed_delay));
                        to_date = that.get_date_from_seconds(time_obj['to_time'] + parseInt(server_data.trade_feed_delay));
                    }
                } else {
                    from_date = that.get_date_from_seconds(time_obj['from_time'] - 5);
                    to_date = that.get_date_from_seconds(time_obj['to_time']);
                }
 
                var display_marker = false;
                if(time_obj['to_time'] - time_obj['from_time'] <= _diff_end_start_time) {
                    display_marker = true;
                }
 
                if(time_obj['force_tick']) {
                    liveChartConfig.update({
                        force_tick: true,
                    });
                }
 
                liveChartConfig.update({
                    interval: {
                        from: from_date,
                        to: to_date
                    },
                    with_markers: display_marker,
                });
            }
            configure_livechart();
            updateLiveChart(liveChartConfig);
            var barrier,
                purchase_time = $('#trade_details_purchase_date').attr('epoch_time');
            if (!purchase_time) { // dont add barrier if its forward starting
                if(server_data.barrier && server_data.barrier2) {
                    if (liveChartConfig.has_indicator('high')) {
                        live_chart.remove_indicator('high');
                    }
                    barrier = new LiveChartIndicator.Barrier({ name: "high", value: server_data.barrier, color: 'green', label: text.localize('High Barrier')});
                    live_chart.add_indicator(barrier);
 
                    if (liveChartConfig.has_indicator('low')) {
                        live_chart.remove_indicator('low');
                    }
                    barrier = new LiveChartIndicator.Barrier({ name: "low", value: server_data.barrier2, color: 'red', label: text.localize('Low Barrier')});
                    live_chart.add_indicator(barrier);
 
                } else {
                    if (liveChartConfig.has_indicator('barrier')) {
                        live_chart.remove_indicator('barrier');
                    }
                    barrier = new LiveChartIndicator.Barrier({ name: "barrier", value: server_data.barrier, color: 'green', label: text.localize('Barrier')});
                    live_chart.add_indicator(barrier);
                }
            }
            that.add_time_indicators(liveChartConfig);
            that.reposition_confirmation();
        },
        get_date_from_seconds: function(seconds) {
            var date = new Date(seconds*1000);
            return date;
        },
        get_epoch: function(elementID) {
            return $('#' + elementID).attr('epoch_time');
        },
        get_time_interval: function() {
            var time_obj = {};
            var start_time    = this.get_epoch('trade_details_start_date');
            var purchase_time = this.get_epoch('trade_details_purchase_date');
            var now_time      = this.get_epoch('trade_details_now_date');
            var end_time      = this.get_epoch('trade_details_end_date');
            if(purchase_time) { // forward starting
                time_obj['from_time'] = parseInt(purchase_time);
                time_obj['to_time'] = parseInt(start_time);
            } else if(start_time && now_time) {
                if (now_time > start_time) {
                    if (((parseInt(end_time) - parseInt(start_time)) > 3600) && ((parseInt(now_time) - parseInt(start_time)) < 3600)) {
                        // check if end date is more than 1 hours and now time - start time is less than 1 hours
                        // in this case we switch back to tick chart rather than ohlc
                        time_obj['from_time'] = parseInt(start_time);
                        time_obj['to_time'] = parseInt(start_time) + 3595;
                    } else if ((parseInt(end_time) - parseInt(start_time)) === 3600) {
                        time_obj['from_time'] = parseInt(start_time);
                        time_obj['to_time'] = parseInt(end_time);
                        time_obj['force_tick'] = 1;
                    } else {
                        time_obj['from_time'] = parseInt(start_time);
                        time_obj['to_time'] = parseInt(end_time);
                    }
                }
            } else if (!now_time && start_time && end_time) { // bet has expired
                time_obj['from_time'] = parseInt(start_time);
                time_obj['to_time'] = parseInt(end_time);
            } else {
                time_obj['is_live'] = 1;
            }
            return time_obj;
        },
        add_time_indicators: function(liveChartConfig) {
            var that = this,
                indicator;
            var start_time      = that.get_epoch('trade_details_start_date');
            var purchase_time   = that.get_epoch('trade_details_purchase_date');
            var sold_time       = that.get_epoch('trade_details_sold_date');
            var end_time        = that.get_epoch('trade_details_end_date');
            var entry_spot_time = that.get_epoch('trade_details_entry_spot_time');
            if(purchase_time) {
                if (liveChartConfig.has_indicator('purchase_time')) {
                    live_chart.remove_indicator('purchase_time');
                }
                indicator = new LiveChartIndicator.Barrier({ name: "purchase_time", label: 'Purchase Time', value: that.get_date_from_seconds(parseInt(purchase_time)), color: '#e98024', axis: 'x'});
                live_chart.add_indicator(indicator);
            }

            if(start_time) {
                if (liveChartConfig.has_indicator('start_time')) {
                    live_chart.remove_indicator('start_time');
                }
                indicator = new LiveChartIndicator.Barrier({ name: "start_time", label: 'Start Time', value: that.get_date_from_seconds(parseInt(start_time)), color: '#e98024', axis: 'x'});
                live_chart.add_indicator(indicator);
            }

            if(entry_spot_time && entry_spot_time != start_time) {
                if (liveChartConfig.has_indicator('entry_spot_time')) {
                    live_chart.remove_indicator('entry_spot_time');
                }

                if (start_time && entry_spot_time < start_time) {
                    indicator = new LiveChartIndicator.Barrier({ name: "entry_spot_time", label: 'Entry Spot', value: that.get_date_from_seconds(parseInt(entry_spot_time)), color: '#e98024', axis: 'x'});
                } else {
                    indicator = new LiveChartIndicator.Barrier({ name: "entry_spot_time", label: 'Entry Spot', value: that.get_date_from_seconds(parseInt(entry_spot_time)), color: '#e98024', axis: 'x', nomargin: true});
                }
                live_chart.add_indicator(indicator);
            }

            if(end_time) {
                if (liveChartConfig.has_indicator('end_time')) {
                    live_chart.remove_indicator('end_time');
                }

                indicator = new LiveChartIndicator.Barrier({ name: "end_time", label: 'End Time', value: that.get_date_from_seconds(parseInt(end_time)), color: '#e98024', axis: 'x'});
                live_chart.add_indicator(indicator);
            }
            if(sold_time) {
                if (liveChartConfig.has_indicator('sold_time')) {
                    live_chart.remove_indicator('sold_time');
                }

                indicator = new LiveChartIndicator.Barrier({ name: "sold_time", label: 'Sell Time', value: that.get_date_from_seconds(parseInt(sold_time)), color: '#e98024', axis: 'x'});
                live_chart.add_indicator(indicator);
            }
        },
    };
}());
