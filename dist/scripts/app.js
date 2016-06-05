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
    kitchenCounter.start();
    bedRoomCounter.start();
    livingRoomCounter.start();


    /**
     * Ajax forms
     */
    var submitedSuccessHandler = function(data) {
        if (data.status === 'success') {
            this.reset();
            return swal("Выполнено!", data.message, "success");
        }

        return swal("Ошибка", data.message, "error");
    };

    var causeGagerForm = new AjaxForm('#cause-gager-form', {
        autoHelpBlock: true
    });

    var recordForm = new AjaxForm('#record-form', {
        autoHelpBlock: true
    });

    var customPopulationErrorHandler = function(ajaxForm, errorsJson) {
        $.each(errorsJson, function(field, errors)
        {
            var $formGroup = ajaxForm.$form.find('[name=' + field + ']').closest(ajaxForm.config.controlWrapper),
                $helpBlock = $formGroup.find(ajaxForm.config.controlErrorBlock);

            if ( ! $formGroup.length)
            {
                return;
            }

            if ( ! $helpBlock.length && ajaxForm.config.autoHelpBlock)
            {
                $helpBlock = $('<div class="' + ajaxForm.config.controlErrorBlock.replace('.', '') + '"></div>');
                $formGroup.append($helpBlock);
            }

            $formGroup.addClass(ajaxForm.config.controlErrorClass);

            $helpBlock.attr('title', errors.shift());
        });
    };

    var recordFormFooter = new AjaxForm('#record-form-footer', {
        autoHelpBlock: true,
    });

    var questionForm = new AjaxForm('#question-form', {
        autoHelpBlock: true
    });

    var modalForm = new AjaxForm('#modal-form', {
        autoHelpBlock: true
    });

    // custom population handlers
    recordFormFooter.populateErrors = customPopulationErrorHandler;
    questionForm.populateErrors = customPopulationErrorHandler;

    // form submit handlers
    causeGagerForm.onSubmited = submitedSuccessHandler;
    recordForm.onSubmited = submitedSuccessHandler;
    recordFormFooter.onSubmited = submitedSuccessHandler;
    questionForm.onSubmited = submitedSuccessHandler;
    modalForm.onSubmited = submitedSuccessHandler;


    $('body').on('click', 'a[data-modal]', function(event) {
        var $this = $(this),
            title = $this.data('title'),
            content = $this.data('content'),
            formName = $this.data('form-name');

        var $modal = $('#modal');

        $modal.addClass('show');

        if (title) {
            $modal.find('.modal-header').html(title);
            $modal.find('[name="title"]').val(title);
        }

        if (content) {
            $modal.find('.modal-text').html(content);
            $modal.find('[name="content"]').val(content);
        }

        formName ? $modal.find('[name="form_name"]').val(formName) : null;

        event.preventDefault();
    });

    $('#modal').on('click', '.modal-close', function(event) {
        $('#modal').removeClass('show');
        event.preventDefault();
    });

})(jQuery);