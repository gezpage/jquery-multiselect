// jquery-multiselect.js
//
// https://github.com/gezpage/jquery-multiselect

(function($){
        $.fn.extend({
                multiselect: function() {
                        // Hover binding
                        $('.multiselect div').live({
                                mouseover: function() {
                                        $(this).children('label.sub').show();
                                },
                                mouseout: function() {
                                        if (!$(this).children('label.main').hasClass('on')) {
                                                $(this).children('label.sub').hide();
                                        }
                                }
                        });
                        // Click binding
                        $('.multiselect div label').live('click', function() {
                                change_state($(this));
                        });
                        return this.each(function() {
                                $div = $(this);
                                // Apply class
                                $div.addClass('multiselect');
                                // Replace checkboxes with hidded input
                                // And add classes for easy traversing
                                $div.find('div').each(function() {
                                        var display = ($(this).find('input:first').is(':checked')) ? true : false;
                                        // Add 'main' class to first element which will be the heading
                                        $(this).find('label:first').addClass('main');
                                        $(this).find('input').each(function() {
                                                var name = $(this).attr('name');
                                                var $label = $('label[for="' + name + '"]');
                                                if (!$label.hasClass('main')) {
                                                        if (display) {
                                                                $label.show();
                                                        }
                                                        else {
                                                                $label.hide();
                                                        }
                                                        $label.addClass('sub');
                                                }
                                                var value = $(this).is(':checked') ? 'on' : 'off';
                                                var new_input = '<input class="selector" type="hidden" name="' + name + '" id="' + name + '" value="' + value + '" /><br/>';
                                                $label.addClass(value);
                                                $(this).replaceWith(new_input);
                                        });
                                });
                        });
                }
        });
        function change_state($label) {
                if ($label.hasClass('on')) {
                        switch_off($label);
                        if ($label.hasClass('main')) {
                                $label.siblings('label.sub').each(function() {
                                        switch_off($(this));
                                });
                        }
                }
                else {
                        switch_on($label);
                        if ($label.hasClass('sub')) {
                                $label.siblings('label.main').each(function() {
                                        switch_on($(this));
                                });
                        }
                }
        }
        function switch_on($label) {
                $input = $('input[name="' + $label.attr('for') + '"]');
                $label.removeClass('off').addClass('on');
                $input.val('on');
        }
        function switch_off($label) {
                $input = $('input[name="' + $label.attr('for') + '"]');
                $label.removeClass('on').addClass('off');
                $input.val('off');
        }
})(jQuery);

