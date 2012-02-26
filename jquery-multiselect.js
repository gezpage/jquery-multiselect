// jquery-multiselect.js
//
// https://github.com/gezpage/jquery-multiselect

(function($){
        $.fn.extend({
                multiselect: function() {
                        //Iterate over the current set of matched elements
                        this.find('div label').live('hover', function() {
                                console.log('hover')
                                $(this).parent().children('label.sub').show();
                        }, function() {
                                var show = $(this).parent().children('label.main').hasClass('on') ? true : false;
                                if (!show) {
                                        $(this).parent().children('label.sub').hide();
                                }
                        });

                        return this.each(function() {
                                $(this).find('div label').live('click', function() {
                                        var name = $(this).attr('for');
                                        var $input = $('input[name="' + name + '"]');
                                        var new_value = ($input.val() == 'on') ? 'off' : 'on';
                                        var old_value = (new_value == 'on') ? 'off' : 'on';
                                        $input.val(new_value);
                                        $(this).addClass(new_value).removeClass(old_value);
                                });
                                $(this).find('div').each(function() {
                                        var display = ($(this).find('input:first').is(':checked')) ? true : false;
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

        //pass jQuery to the function, 
        //So that we will able to use any valid Javascript variable name 
        //to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )       
})(jQuery);
