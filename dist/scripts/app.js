;(function($) {

    $('.tab-container').easytabs({
        animate: false,
        updateHash: false
    });

    /**
     * Countdowns
     */
    var kitchenCounter = $('#kitchen-counter').FlipClock({
        clockFace: 'DailyCounter',
        countdown: true,
        language: 'russian',
        autoStart: false
    });

    var bedRoomCounter = $('#bedroom-counter').FlipClock({
        clockFace: 'DailyCounter',
        countdown: true,
        language: 'russian',
        autoStart: false
    });

    var livingRoomCounter = $('#living-room-counter').FlipClock({
        clockFace: 'DailyCounter',
        countdown: true,
        language: 'russian',
        autoStart: false
    });

    kitchenCounter.setTime(60 * 60 * 24 * 20); // 20 days
    bedRoomCounter.setTime(60 * 60 * 24 * 20);
    livingRoomCounter.setTime(60 * 60 * 24 * 20);

    // start timers
    //kitchenCounter.start();
    //bedRoomCounter.start();
    //livingRoomCounter.start();


    /**
     * Ajax forms
     */
    var causeGagerForm = new AjaxForm('#cause-gager-form', {
        autoHelpBlock: true
    });

    causeGagerForm.onSubmited = function(data) {
        if (data.status === 'success') {
            swal("Выполнено!", data.message, "success");
        } else {
            swal("Ошибка", data.message, "error");
        }
    };

})(jQuery);