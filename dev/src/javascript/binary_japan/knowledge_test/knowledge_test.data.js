var KnowledgeTestData = (function() {
    "use strict";
    var questions = {
        section1:[
            {
                question: "An option holder must buy ( or sell ) the underlying asset at a predetermined price within a specified period ( or at a specific time ).",
                answer: false,
                id: 1,
            },
            {
                question: "A Currency Option confers the right to sell one currency in exchange for another currency as the underlying asset. For example, the right to sell Yen and buy Dollars is known as a Yen Put / Dollar Call Option, or just Yen Put for short; and the opposite right to buy Yen and sell Dollar is called a Yen Call / Dollar Put Option, or just Yen Call for short.",
                answer: true,
                id: 2
            },
            {
                question: "There are two types of option delivery: One requires exchanging the underlying asset, and the other requires a payment which depends on the difference between the fair market price and the exercise price. A Binary Option is the second type where if the fair market price meets certain conditions with respect to the exercise price, then an agreed fixed amount will be paid to the option buyer.",
                answer: true,
                id: 3
            },
            {
                question: "A  Net Settlement type of option is one where the underlying asset does not include yen, but the option fee and settlement are paid in yen; it therefore requires some definition of how the settlement amounts will be calculated and converted to yen.",
                answer: true,
                id: 4
            },
            {
                question: "A Binary Option contains the right for the buyer to receive a certain fixed amount if the market price reaches the exercise price by the exercise time, but it does not contain any rights to sell or buy the underlying asset.",
                answer: true,
                id: 5
            },
            {
                question: "There are some types of Binary Option, such as Range Binary Options, Touch or No-Touch Binary Options, that are exceptions to the general rule where payment is made at a known exercise time. For these types of option a payment is made automatically at Exit Time when certain conditions have been met.",
                answer: true,
                id: 6
            },
            {
                question: "There are many types of Binary Option, including some such as Range Binary Options and Touch or No-Touch Binary Options which do not always require automatic payment at Exercise Time and which will be settled earlier if certain conditions have been met. However, in all cases, for a payment to be required, the option must end In The Money.",
                answer: true,
                id: 7
            },
            {
                question: "A Currency Binary Option is one where there is a target for a particular currency pair, so a strike price for the exchange rate is agreed, and a payout will be due if the judgment price meets the conditions of being over or under the target strike price, depending on the option type, by the exercise time.",
                answer: true,
                id: 8
            },
            {
                question: "For a currency binary option which has the underlying exchange rate of dollars against yen, the right to receive a payout if the yen becomes weaker is known as a dollar-put binary option.",
                answer: false,
                id: 9
            },
            {
                question: "For a currency binary option with the underlying exchange rate of dollars against yen, the right to receive a payout if the yen becomes stronger is known as a dollar-put binary option",
                answer: true,
                id: 10
            },
            {
                question: "If you sell a currency binary call option at a price of 500 yen, with an underlying of dollar against yen, the payout is 1,000 yen, and the strike price is 100, then if the judgment price at exercise time is 99, you will need to payout 1,000 yen to the buyer of the option.",
                answer: false,
                id: 11
            },
            {
                question: "If you sell a currency binary put option at a price of 500 yen, with an underlying of dollar against yen, the payout is 1,000 yen, and the strike price is 100, then if the judgment price at exercise time is 99, you will need to payout 1,000 yen to the buyer of the option.",
                answer: true,
                id: 12
            },
            {
                question: "If you buy a currency binary call option at a price of 500 yen, with an underlying of dollar against yen, the payout is 1,000 yen, and the strike price is 100, then if the judgment price at exercise time is 99, you will receive a payout 1,000 yen from the seller of the option.",
                answer: false,
                id: 13
            },
            {
                question: "If you buy a currency binary put option at a price of 500 yen, with an underlying of dollar against yen, the payout is 1,000 yen, and the strike price is 100, then if the judgment price at exercise time is 99, you will receive a payout 1,000 yen from the seller of the option.",
                answer: true,
                id: 14
            },
            {
                question: "If you buy a currency binary option at a price of 500 yen, and the judgment price meets the conditions so you receive a payout of 1,000 yen, then your profit can be calculated 500 yen after subtracting the 500 yen that was paid as a fee to the option seller.",
                answer: true,
                id: 15
            },
            {
                question: "If you sell a currency binary option at a price of 500 yen, and the judgment price meets the conditions so you need to payout 1,000 yen, then your profit will be minus 500 yen after subtracting the 500 yen that was received as a fee from the option buyer.",
                answer: true,
                id: 16
            }
        ],
        section2:[
            {
                question: "To avoid or hedge the future price of an underlying asset which you hold, you should buy a call option",
                answer: false,
                id: 17
            },
            {
                question: "To compensate for any rise in the price of an underlying asset that you intend to buy in future, you should buy a call option",
                answer: true, id: 18
            },
            {
                question: "Predicted that the underlying asset price is largely up-dean and in order to obtain the benefit also moving in either direction of rising send falling, obtained both options of the call options that exercise price is higher than the underlying asset price and tie put option that exercise prize is lower than underlying asset price.",
                answer: true, id: 19
            },
            {
                question: "Predicts that width of up-down of underlying asset is small and  in order to obtain the benefit also moving in either direction of rising and falling, granted together both of the call option that exercise price is higher than underlying asset and the put option that exercise price is lower than underlying asset price.",
                answer: true, id: 20
            },
            {
                question: "Covered option is holding the underlying assets which like covering sell position of options and sell the it.",
                answer: true,
                id: 21,
            },
            {
                question: "Predicted the underlying asset price will decline than strike price at exit time and bought binary call options.",
                answer: false,
                id: 22
            },
            {
                question: "Predicted the underlying asset price will decline than strike price at exit time and bought binary put options.",
                answer: false,
                id: 23
            },
            {
                question: "Predicted the underlying asset price will raise than strike price at exit time and bought binary put options.",
                answer: false,
                id: 24
            },
            {
                question: "Predicted the underlying asset price will decline than strike price at exit time and bought binary call options.",
                answer: true,
                id: 25
            },
            {
                question: " At buying call option, break-even point is the price added option fee of a unit of the underlying asset to exercise price.",
                answer: true,
                id: 26
            },
            {
                question: " At buying put option, break-even point is the price minuses option fee of a unit of the underlying asset to exercise price.",
                answer: true,
                id: 27
            },
            {
                question: "Hedge you used for binary option is needed to be conducted as compensation part of loss of  the hedged asset because payout is fixed.",
                answer: true,
                id: 28
            },
            {
                question: "Using two options, if obtain  binary put option which exercise price is higher and binary call option which exercise price is lower, its possible to obtain profit in case that exit price is between the exercise prices of two options and its possible to invest range binary options which will be payout in case that exit price is in side of the predetermined price.",
                answer: true,
                id: 29
            },
            {
                question: "Using two options, if get  binary call option which exercise price is higher and binary put option which exercise price is lower, its possible to obtain profit in case that exit price is out side of the price range made by exercise prices of two options and its possible to invest range binary options which will be payout in case that exit price is out side of the predetermined price.",
                answer: true,
                id: 30
            },

        ],
        section3:[
            {
                question: "Trading period (expiration) of binary option is 2 hours and more. All of the transactions are established at the start of the trading period and the established position will be settled only by judge.",
                answer: false,
                id: 31
            },
            {
                question: "A bought or sold binary option may be closed-out before exercise time by selling or buying-back the option, or alternatively by cancelling.",
                answer: true,
                id: 32
            },
            {
                question: "Short positions of currency-related binary options, unlike the short positions of the other currency-related option, will not be loss cut because it is not a financial instruments subjected to loss cut regulation.",
                answer: false,
                id: 33
            },
            {
                question: "Short positions of currency-related binary option is conducted transactions by depositing necessary margin requirement to trader in advance. If the margin shortage after the transaction established, it is necessary to deposit the additional margin to the trader?",
                answer: true,
                id: 34
            },
            {
                question: "Although each traders determined the limit amount to deal with the customer, even if customer's transaction amount, loss with a certain period and open interest a customer held exceeds the reference, the transaction with the customer will not be discontinued or cancelled.",
                answer: false,
                id: 35
            },
            {
                question: "Options may be either European or American style of exercise, and the one which can be exercised at only one expiry time is the European style option.",
                answer: true,
                id: 36
            },
            {
                question: "For a call option, if the price of the underlying asset is higher than the option exercise price, it is know as an in-the-money option.",
                answer: true,
                id: 37
            },
            {
                question: "For a call option, if the price of the underlying asset is higher than the option exercise price, it is know as an out-of-the-money option.",
                answer: false,
                id: 38
            },
            {
                question: "For both call and put options, if the underlying asset price is the same as the exercise price, it is known as an at-the-money option.",
                answer: true,
                id: 39
            },
            {
                question: "For a put option, if the underlying asset price is lower than the option exercise price, it is known as an out-of-the-money option.",
                answer: false,
                id: 40
            },
            {
                question: "For a put option, if the underlying asset price is higher than the option exercise price, it is known as an in-the-money option.",
                answer: false,
                id: 41,
            },
            {
                question: "Exercise price is the price which buy and sell underlying asset by exercise the right and in case of binary option, it is basic price to judge the presence (exist) of payout.",
                answer: true,
                id: 42
            },
            {
                question: "Exit price is the underlying asset price at exercise time and it's the price to judge the presence (exist) of payout by comparing with exercise price.",
                answer: true,
                id: 43
            },
            {
                question: "The payout is the amount that seller of the option paid to the buyer as a result of exercising the right, when the predetermined exercise conditions meet and the amount paid like that called payout amount.",
                answer: true,
                id: 44
            },
            {
                question: "In the OTC currency binary options trading, if the exchange rate during the trading period move to one direction more than expected, that there is no exercise price which can continue appropriate trading around at-the-money, there is possible to add the exercise price on the way. However, even if the exercise price has been added, do the exercise price will continue trading using up to it, also the transaction price will not be affected by the additional impact of the exercise price.",
                answer: true,
                id: 45
            },
            {
                question: "The exit price is important in binary options. In case of handling the OTC currency-related binary options trading for personal, company inspects if mistakes and intentional operation has not been performed inspection for exit price the company determined and also checking whether there is an error in the data in case that the company use the rate data provided by third company.",
                answer: true,
                id: 46
            },
            {
                question: "About OTC currency for binary options trading, summarizes the profit and loss result of all transactions that have been made between the customer, to publish the information in the company's home page, at any time while the customer is doing the transaction before the start, or the transaction, the information Make sure, for that you're willing to trade under the calm judgment, we are committed to a variety of environmental improvement.",
                answer: true,
                id: 47
            },
            {
                question: "For an individual investor, all profits from OTC currency options trading are tax-free?",
                answer: false,
                id: 48
            },
            {
                question: "For an individual investor, profits and losses from OTC currency options traing cannot be combined with profits and losses from margin FX and securities-related OTC options.",
                answer: false,
                id: 49
            },
            {
                question: "Unless special arrangements are made, cooling-off will not be available after OTC binary options trading contract has been made.",
                answer: true,
                id: 50
            }
        ],
        section4:[
            {
                question: "If the buyer of an option does not exercise the option rights, there will be no fee payable to the option seller.",
                answer: false,
                id: 51
            },
            {
                question: "If the buyer of an option waives his right to exercise, a transaction in the underlying asset will not be dealt between the seller and the buyer.",
                answer: true, id: 52
            },
            {
                question: "The seller of an option should receive the option premium from the buyer, even if the buyer waives the right to exercise the option.",
                answer: true, id: 53
            },
            {
                question: "If an option buyer wishes to exercise the option rights, the seller may still reject the deal.",
                answer: false, id: 54
            },
            {
                question: "The option of the leverage effect, the buyer is likely to be obtained several times profit compared to the option fee, but the loss is limited to the option fee, when it comes to seller, profit is limited to the option fee, but loss will be likely to be doubled of option fee.",
                answer: true, id: 55
            },
            {
                question: "The buyer of the plane option can waiver when incriminating, so the maximum loss of buyer is option fee and maximum earning is the amount subtracted by the difference of underlying asset price and exercise price from option fee. Therefore, when the underlying asset price is infinite, the profit will be infinite.",
                answer: true, id: 56
            },
            {
                question: "While seller of plan options is limited the earnings is the option fee, the difference of the underlying asset price and the strike price is a loss, if the underlying asset price is infinite, the loss will be infinite.",
                answer: true, id: 57
            },
            {
                question: "Exercise deadline is coming, but the option to exercise is not carried out and disappear, option premium the seller received will be as it is that of the seller.",
                answer: true, id: 58
            },
            {
                question: "Although the options which is not be exercised will disappear at the exercise period, the option fee which seller received will remain for sellers.",
                answer: true, id: 59
            },
            {
                question: "Maximum loss of buyer at binary options is an optional fee, maximum loss of the seller will be the amount subtracted the option fee from the payout amount.",
                answer: true, id: 60
            },
            {
                question: "Based on the probability of profit is obtained by the exercise, it can not be said that cheaper options is advantageous unconditionally.",
                answer: true,
                id: 61,
            },
            {
                question: "Binary options is lower risks and higher returns than plan options because loss of sellers is limited at binary options.",
                answer: false,
                id: 62
            },
            {
                question: "Although binary option loss is limited, based on the assets of the investors, so as not to become excessive speculative trading, it is necessary to bear in mind the moderation in transactions.",
                answer: true,
                id: 63
            },
            {
                question: "In case probability to receive the payout is 50% and magnification of payout for the investment is less than a 2-fold lower, than the expected rate will be  1 times lower and forecast recovery amount is less than the investment.",
                answer: true,
                id: 64
            },
            {
                question: "It can not be said that binary option is unconditionally advantageous because the reason why investors will lose the full amount of investment at binary option, on the other hand part of investment will remain at FX.",
                answer: true,
                id: 65
            },
            {
                question: "The contents of the financial instruments of the OTC binary options are the same even transactions dealers handling financial instruments business are different.",
                answer: false,
                id: 66
            },
            {
                question: "The price of OTC binary options of the same conditions, (sometimes) the price varies depending on transactions dealers handling financial instruments business.",
                answer: true,
                id: 67
            },
            {
                question: "Price of OTC currency option is the calculated value based on multiple elements and is determined by relative trading basically.",
                answer: true,
                id: 68
            },
            {
                question: "Regarding to the OTC price of financial instruments, in case that financial instruments business operator suggests both of  bid and ask price (or trading price and cancellation price), generally there is a difference of them. This option will be wider as the expiration approaches.",
                answer: true,
                id: 69
            },
            {
                question: "Price of the option, the price of the underlying asset, price fluctuation rate of the underlying assets, the time until the exercise date, subject to any of the impact of interest rates.",
                answer: true, id: 70
            },

        ],
        section5:[
            {
                question: "The price of an option can be affected by the underlying asset price, by the volatility rate of the underlying asset, or by the time remaining to the exercise time.",
                answer: true, id: 71
            },
            {
                question: "Price of call option will be lower interest rates of the underlying assets is low, but the price of the put option, go up when the interest rates of the underlying assets is low.",
                answer: true, id: 72
            },
            {
                question: "If the exercise prices and exercise times are the same for an American style and European style option, then the American style option will have a higher price.",
                answer: true, id: 73
            },
            {
                question: "In case of the right to buy the underlying asset (call option), when the underlying asset price falls, the option price will increase.",
                answer: false, id: 74
            },
            {
                question: "In case of the right to sell the underlying asset (put option), when the underlying asset price rises, the option price will increase.",
                answer: false, id: 75
            },
            {
                question: "For an out-of-the-money option, the further away from the underlying asset price that the option exercise price is, the lower the price of the option will be.",
                answer: true, id: 76
            },
            {
                question: "For an in-the-money option, the further away from the underlying asset price that the option exercise price is, the lower the price of the option will be.",
                answer: false, id: 77
            },
            {
                question: "If implied volatility increases then the prices of both call and put types of plain vanilla options will increase.",
                answer: true, id: 78
            },
            {
                question: "As the expected volatility of the underlying asset increases, a plain vanilla option price will move higher.",
                answer: true, id: 79
            },
            {
                question: "For a plain vanilla option, as the time to the exercise point shortens, the price of the option will decrease.",
                answer: true, id: 80
            },
            {
                question: "An option price is the sum of the intrinsic-value and the time-value.",
                answer: true,
                id: 81,
            },
            {
                question: "If the underlying asset price is 100 yen, the exercise price is 80 yen, and the call option price is 45 yen, then it can be said that the option's intrinsic-value is 20 yen, and its time-value is 25 yen.",
                answer: true,
                id: 82
            },
            {
                question: "The time-value of an option represents the expected value of the option at the exercise point, and may be positive, even when the intrinsic-value is zero.",
                answer: true,
                id: 83
            },
            {
                question: "As the time to the exercise point shortens, the time-value of a plain vanilla option decreases.",
                answer: true,
                id: 84
            },
            {
                question: "A binary option price cannot exceed the payout amount.",
                answer: true,
                id: 85
            },
            {
                question: "In general a binary option price will not exceed the payout amount.",
                answer: true,
                id: 86
            },
            {
                question: "Unlike a plain vanilla option, an in-the-money binary option will have a lower price, the further away it is from the exercise point.",
                answer: true,
                id: 87
            },
            {
                question: "In general the price of a binary option will be lower than the price of a plain vanilla option because the payout amount is fixed.",
                answer: false,
                id: 88
            },
            {
                question: "A binary option which is out-of-the-money will have a lower price than an option which is in-the-money because the probability of receiving the payout amount is lower.",
                answer: true,
                id: 89
            },
            {
                question: "A binary option which is in-the-money will have a higher value than an option that is out-of-the-money because there will be a higher probability of receiving the payout amount.",
                answer: true, id: 90
            },
            {
                question: "As the exercise deadline approaches, the price of an in-the-money binary option will move towards the payout amount.",
                answer: true, id: 91
            },
            {
                question: "As the exercise deadline approaches, the price of an out-of-the-money binary option will move towards zero.",
                answer: true, id: 92
            },
            {
                question: "The price of a binary option is affected by not only the change in the underlying asset price, but also the change in remaining time to the exercise point.",
                answer: true, id: 93
            },
            {
                question: "Implied volatility is a prediction of the future rate of change in the underlying asset?",
                answer: true, id: 94
            },
            {
                question: "Historical volatility is a prediction of the future rate of change in the underlying asset?",
                answer: false, id: 95
            },
            {
                question: "Delta refers to  a percentage change of the option price with respect to the change in the underlying asset price.",
                answer: true, id: 96
            },
            {
                question: "Option prices are normally dependant on elements such as the underlying asset price, the exercise price, the length of time until the exercise point, volatility, and interest rates. Apart from the fixed exercise price, all other elements are changing constantly, so an understanding of the relationships between each element and changes in the options price is necessary for the management of options trading risk.",
                answer: true, id: 97
            },
            {
                question: "Option prices are normally dependant on elements such as the underlying asset price, the exercise price, the length of time until the exercise point, volatility, and interest rates. However, when the remaining time to the exercise point is very short, there is no need to consider these when managing option trading risk, as all these elements are constant.",
                answer: false, id: 98
            },
            {
                question: "The Black-Scholes model is widely used to calculate theoretical option prices.",
                answer: true, id: 99
            },
            {
                question: "A modified version of the Black-Scholes model is widely used to calculate the theoretical prices of binary options.",
                answer: true, id: 100
            },
        ],
    };

    function randomPick4(questions) {
        var availables = Object.keys(questions);

        var randomPicks = [];
        for (var i = 0 ; i < 4 ; i ++) {
            var randomIndex = Math.floor(Math.random() * 100) % availables.length;
            var randomQid = availables[randomIndex];
            var randomPick = questions[randomQid];
            randomPicks.push(randomPick);
            availables.splice(randomIndex, 1);
        }

        return randomPicks;
    }

    function randomPick20() {
        var qFromSection1 = randomPick4(questions.section1);
        var qFromSection2 = randomPick4(questions.section2);
        var qFromSection3 = randomPick4(questions.section3);
        var qFromSection4 = randomPick4(questions.section4);
        var qFromSection5 = randomPick4(questions.section5);

        return [
            qFromSection1,
            qFromSection2,
            qFromSection3,
            qFromSection4,
            qFromSection5
        ];
    }

    function sendResult(results) {
        var status = results >= 14 ? 'pass' : 'fail';
        BinarySocket.send({jp_knowledge_test: 1, score: results, status: status});
    }

    return {
        questions: questions,
        randomPick20: randomPick20,
        sendResult: sendResult
    };
}());

