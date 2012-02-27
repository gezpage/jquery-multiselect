// jquery-multiselect.js
//
// https://github.com/gezpage/jquery-multiselect

(function($){
        $.fn.extend({
                multiselect: function() {
                        return this.each(function() {
                                $div = $(this);
                                // Apply class
                                $div.addClass('multiselect');
                                // Replace checkboxes with hidded input
                                // And add classes for easy traversing
                                $div.find('div').each(function() {
                                        $(this).addClass('multiselect_container');
                                        var display = ($(this).find('input:first').is(':checked')) ? true : false;
                                        // Add 'main' class to first element which will be the heading
                                        $(this).find('label:first').addClass('main');
                                        $(this).find('input').each(function() {
                                                var name = $(this).attr('name');
                                                var $label = $('label[for="' + name + '"]');
                                                var label = $label.text();
                                                var $div = $('<div>').text(label).attr('for', name);
                                                if (!$label.hasClass('main')) {
                                                        $div.addClass('sub');
                                                        if (display) {
                                                                $div.show();
                                                        }
                                                        else {
                                                                $div.hide();
                                                        }
                                                }
                                                else {
                                                        $div.addClass('main');
                                                }
                                                var value = $(this).is(':checked') ? 'on' : 'off';
                                                var $input = $('<input type="hidden" name="' + name + '" id="' + name + '" value="' + value + '" />');
                                                $div.addClass(value);
                                                $div.on({
                                                        click: function() {
                                                                change_state($(this));
                                                        }
                                                });
                                                $label.replaceWith($div);
                                                $(this).replaceWith($input);
                                        });
                                        $(this).on({
                                                mouseover: function() {
                                                        $(this).children('div.sub').show();
                                                },
                                                mouseout: function() {
                                                        if (!$(this).children('div.main').hasClass('on')) {
                                                                $(this).children('div.sub').hide();
                                                        }
                                                }
                                        });
                                });
                        });
                }
        });
        function change_state($div) {
                if ($div.hasClass('on')) {
                        switch_off($div);
                        if ($div.hasClass('main')) {
                                $div.siblings('div.sub').each(function() {
                                        switch_off($(this));
                                });
                        }
                }
                else {
                        switch_on($div);
                        if ($div.hasClass('sub')) {
                                $div.siblings('div.main').each(function() {
                                        switch_on($(this));
                                });
                        }
                }
        }
        function switch_on($div) {
                $input = $('input[name="' + $div.attr('for') + '"]');
                $div.removeClass('off').addClass('on');
                $input.val('on');
        }
        function switch_off($div) {
                $input = $('input[name="' + $div.attr('for') + '"]');
                $div.removeClass('on').addClass('off');
                $input.val('off');
        }
})(jQuery);

