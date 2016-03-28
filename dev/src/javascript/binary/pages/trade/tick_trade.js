var WSTickDisplay = Object.create(TickDisplay);
WSTickDisplay.plot = function(plot_from, plot_to) {
    var $self = this;
    $self.contract_start_moment = moment($self.contract_start_ms).utc();
    $self.counter = 0;
    $self.applicable_ticks = [];
};
WSTickDisplay.update_ui = function(final_price, pnl, contract_status) {
    var $self = this;
    updatePurchaseStatus(final_price, final_price - pnl, contract_status);
};

WSTickDisplay.updateChart = function(data) {
    var $self = this;

    var chart = document.getElementById('tick_chart');
    if (!chart || !isVisible(chart) || !data || !data.tick) {
        return;
    }

    var spots2 = Tick.spots();
    var epoches = Object.keys(spots2).sort(function(a, b) {
        return a - b;
    });
    if ($self.applicable_ticks.length >= $self.ticks_needed) {
        $self.evaluate_contract_outcome();
        return;
    } else {
        for (var d = 0; d < epoches.length; d++) {
            var tick = {
                epoch: parseInt(epoches[d]),
                quote: parseFloat(spots2[epoches[d]])
            };
            if (tick.epoch > $self.contract_start_moment.unix() && !$self.spots_list[tick.epoch]) {
                if (!$self.chart) return;
                if (!$self.chart.series) return;
                $self.chart.series[0].addPoint([$self.counter, tick.quote], true, false);
                $self.applicable_ticks.push(tick);
                $self.spots_list[tick.epoch] = tick.quote;
                var indicator_key = '_' + $self.counter;
                if (typeof $self.x_indicators[indicator_key] !== 'undefined') {
                    $self.x_indicators[indicator_key]['index'] = $self.counter;
                    $self.add($self.x_indicators[indicator_key]);
                }

                $self.add_barrier();
                $self.apply_chart_background_color(tick);
                $self.counter++;
            }
        }
    }
};
