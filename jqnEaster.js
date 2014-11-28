/**
 * jqnEaster v0.1.1 Plugin for jQuery
 * Created by nquocnghia
 *
 * Allows the programmer to hide some easter eggs, e.g. Konami code, on the website.
 *
 * The plugin's default behavior can be configured with the parameters:
 *
 * - keySequence (Array of Strings): The sequence of input key that triggers the callback
 * - callback (Function)
 *
 * Released under the terms of the MIT license.
 */

(function ($) {
    $.fn.jqnEaster = function (options) {
        /** Main code **/
        options = options || {};

        /** Default values */
        var DEFAULT_KEY_SEQUENCE = ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "B", "A"];
        var DEFAULT_CALLBACK = function () {
            alert("Callback triggered!");
        };

        var keySequence, keyCodeSequence, callback, counter, isTriggered;

        keySequence = (typeof options.keySequence != "undefined" && $.isArray(options.keySequence)) ? options.keySequence : DEFAULT_KEY_SEQUENCE;
        callback = (typeof options.callback == "function") ? options.callback : DEFAULT_CALLBACK;
        counter = 0;
        isTriggered = false;

        /** Convert every key in the seq to its keyCode **/
        keyCodeSequence = [];
        for (var i = 0; i < keySequence.length; i++) {
            var code = 65; //'A' by default
            var key = keySequence[i].toUpperCase();
            switch (key) {
                case "UP":
                    code = 38;
                    break;
                case "DOWN":
                    code = 40;
                    break;
                case "LEFT":
                    code = 37;
                    break;
                case "RIGHT":
                    code = 39;
                    break;
                case "ENTER":
                    code = 13
                    break;
                default :
                    code = key.charCodeAt(0) || 65;
                    break;
            }
            keyCodeSequence.push(code);
        }
        if (keyCodeSequence.length < 1) {
            return false;
        }

        /** For each selected element**/
        this.each(function(i, el){

            /** Event binding **/
            $(el).on("keyup", function (e) {
                //if the code is already activated
                if (isTriggered) return false;

                var code = e.keyCode || e.which;
                if (keyCodeSequence[counter] == code) {
                    counter++
                } else {
                    counter = 0;
                }

                if (counter == keyCodeSequence.length) {
                    counter = 0;
                    isTriggered = true;
                    callback.call(this); //trigger callback
                }
            });
        });

        /** Ready to capture **/
        $(document).focus();
    };
})
(jQuery);