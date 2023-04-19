/* Contact
/*---------------------------------------------------- */
(function($) {
    "use strict";
    var testMobile,
        loadingError = '<p class="error">The Content cannot be loaded.</p>',
        nameError = 'Your name',
        emailError = 'Your email',
        invalidEmailError = 'Please enter a valid e-mail address',
        messageError = 'Your message',
        mailResult = $('#form-result');

        $('#form-result').on('click', '.close', function(){
            $('#alert-success').fadeOut();
        });

    $("#contact-form").submit(function() {
        var form = $(this);
        var formParams = form.serialize();
        $.ajax({
            url: 'contact.php',
            type: 'POST',
            traditional: true,
            data: formParams,
            success: function(data) {
                var response = jQuery.parseJSON(data);
                if (response.success) {
                    $('.contact-form .form-content').addClass('hide');
                    $('.contact-form .result-message .error').remove();
                    $('.contact-form .result-message').removeClass('hide');
                    $(document.getElementsByName("contact[name]")).val("");
                    $(document.getElementsByName("contact[email]")).val("");
                    $(document.getElementsByName("contact[message]")).val("");
                } else {
                    $('.contact-form .form-content').addClass('hide');
                    $('.contact-form .result-message .success').remove();
                    $('.contact-form .result-message').removeClass('hide');
                    $(document.getElementsByName("contact[name]")).val("");
                    $(document.getElementsByName("contact[email]")).val("");
                    $(document.getElementsByName("contact[message]")).val("");

                    for (var i = 0; i < response.errors.length; i++) {
                        if (response.errors[i].error == 'empty_name') {
                            $(document.getElementsByName("contact[name]")).addClass("error");
                            $(document.getElementsByName("contact[name]")).val(nameError);
                            error_("contact[name]");
                        }
                        if (response.errors[i].error == 'empty_email') {
                            $(document.getElementsByName("contact[email]")).addClass("error");
                            $(document.getElementsByName("contact[email]")).val(emailError);
                            error_("contact[email]");
                        }
                        if (response.errors[i].error == 'invalid') {
                            $(document.getElementsByName("contact[email]")).addClass("error");
                            $(document.getElementsByName("contact[email]")).val(invalidEmailError);
                            error_("contact[email]");
                        }
                    }
                }
            }
        });
        return false;
    });

    function error_(el) {
        var i = 0;
        var refreshId = setInterval(function() {
            $(document.getElementsByName(el)).css('color', 'transparent');
            setTimeout(function() {
                $(document.getElementsByName(el)).css('color', '#900200');
            }, 300);
            i++;
            if (i > 2) {
                clearInterval(refreshId);
                $(document.getElementsByName(el)).val("");
            }
        }, 500);
    }
})(jQuery);
