jQuery(document).ready(function ($) {
    $.fn.KalimahKeys = function (options) {
        var vars = $.fn.KalimahKeys.Vars;

        var inputMethods = {
            getInputSelector: function (object) {
                var o;
                if (vars.settings.disable_original_input) o = (object) ? $("#" + vars.id + " .kalimah-field")[0] : "#" + vars.id + " .kalimah-field";
                else o = (object) ? $(vars.selector)[0] : vars.selector;

                return o;
            },
            insertAtCaret: function (d) {
                var c = this.getInputSelector(true);
                var f = this.getSelectionStart(c);
                var b = this.getSelectionEnd(c);
                var a = c.value.length;
                c.value = c.value.substring(0, f) + d + c.value.substring(b, a);
                this.setCaretPosition(c, f + d.length, 0)
            },
            deleteAtCaret: function (c, g) {
                var d = this.getInputSelector(true);
                var h = this.getSelectionStart(d);
                var b = this.getSelectionEnd(d);
                var a = d.value.length;
                if (c > h) {
                    c = h
                }
                if (b + g > a) {
                    g = a - b
                }
                var f = d.value.substring(h - c, b + g);
                d.value = d.value.substring(0, h - c) + d.value.substring(b + g);
                this.setCaretPosition(d, h - c, 0);
                return f
            },
            getSelectionStart: function (d) {
                d.focus();
                if (d.selectionStart !== undefined) {
                    return d.selectionStart
                } else {
                    if (document.selection) {
                        var b = document.selection.createRange();
                        if (b == null) {
                            return 0
                        }
                        var a = d.createTextRange();
                        var c = a.duplicate();
                        a.moveToBookmark(b.getBookmark());
                        c.setEndPoint("EndToStart", a);
                        return c.text.length
                    }
                }
                return 0
            },
            adjustDualInput: function () {
                if (vars.settings.disable_original_input) $(vars.selector).val($("#" + vars.id + " .kalimah-field").val());
            },
            getSelectionEnd: function (d) {
                d.focus();
                if (d.selectionEnd !== undefined) {
                    return d.selectionEnd
                } else {
                    if (document.selection) {
                        var b = document.selection.createRange();
                        if (b == null) {
                            return 0
                        }
                        var a = d.createTextRange();
                        var c = a.duplicate();
                        a.moveToBookmark(b.getBookmark());
                        c.setEndPoint("EndToStart", a);
                        return c.text.length + b.text.length
                    }
                }
                return d.value.length
            },
            setCaretPosition: function (d, f, c) {
                var a = d.value.length;
                if (f > a) {
                    f = a
                }
                if (f + c > a) {
                    c = a - c
                }
                d.focus();
                if (d.setSelectionRange) {
                    d.setSelectionRange(f, f + c)
                } else {
                    if (d.createTextRange) {
                        var b = d.createTextRange();
                        b.collapse(true);
                        b.moveEnd("character", f + c);
                        b.moveStart("character", f);
                        b.select()
                    }
                }
                d.focus()
            },
            selectAll: function (a) {
                this.setCaretPosition(a, 0, a.value.length)
            }
        };

        var elements = {
            selector: $(this),
            wrapper: '<div class="kalimah-keys clearfix"></div>',
            keyboard: '<div onselectstart="return false;" class="kalimah-keys-keyboard clearfix"></div>',
            row: '<ul class="kalimah-keys-row clearfix"></ul>',
            key: '<li class="kalimah-keys-key clearfix"><div class="key"></div><div class="keyTop"></div><div class="altKey"></div></li>',
            alt: '<ul class="kalimah-keys-alt clearfix"></ul>',
            altKey: '<li class="kalimah-keys-alt-key"></li>',
            altKeyList: '<li class="kalimah-keys-alt-keylist"></li>',
            altKeyListRemove: '<li class="kalimah-keys-alt-keylist-remove"> x </li>',
            inputField: '<div class="kalimah-field-wrapper"><input type="text" name="kalimah-alt-input" class="kalimah-alt-input kalimah-field" /></div>',
            inputTextarea: '<div class="kalimah-field-wrapper"><textarea cols="1" class="kalimah-alt-textarea kalimah-field"></textarea> </div>',
            msgBox: '<div class="kalimah-msg-box"></div>',
            icon: '<div class="kalimah-keyboard-icon"></div>',
            close: '<div class"kalimah-close-icon">Close</div>'
        }

        /* This function is to modify settings before initiating the plugin */
        this.applyAction = function () {
            // Get the type of action
            var action = arguments[0];

            // if it is change settings
            if (action == "changeSettings") {
                // Get related arguments
                var elements = arguments[1].split(",");
                var options = arguments[2];

                $("body").on(action, function (e, selector, wrapper, settings) {
				  // Loop through each element provided by user
                    $(elements).each(function (index, elem) {
						// Loop through object array (in case the object is an array)
                        $(elem).each(function (i, el) {
                            // Change only of elements match
                            if ($(selector)[0] == el) {
                                var newSettings = $.extend({}, settings, options);
                                wrapper.data("settings", newSettings);
                                vars.settings = newSettings;
                            }
                        })
                    })
                })
				// This is to change elements style (such as space, keyboard or other keys style)
            } else if (action == "changeStyle") {
                // Get related arguments
                var elements = arguments[1].split(",");
                var item = arguments[2];
                var css = arguments[3];
				
				
                $("body").on(action, function (e, selector, keyboard, style) {
					 // Loop through each element provided by user
					 $(elements).each(function (index, elem) {
					
						// Loop through object array (in case the object is an array)
						 $(elem).each(function (i, el) {
							 if ($(selector)[0] == el) {
								 $(keyboard).find(item).css(css);
							 }
						 })
					 })
				 })
            }
            return false;
        }

        // run through options and initialise settings
        this.init = function () {
            keyboardMisc.checkMobile();

            var settings = $.extend({}, $.fn.KalimahKeys.Defaults, options);

            // Loop through each selector
            $.each(elements.selector, function (index, element) {

                vars.settings = settings;
                var wrapper = $(elements.wrapper);
                var keyboard = $(elements.keyboard);
                var id = keyboardMisc.uniqeId();

                // Set wrapper attr
                wrapper.attr({
                    'id': id,
                    'data-caps': false,
                    'data-alt': false
                })

                // Store settings to use it later (or overwrite it)
                wrapper.data("settings", vars.settings);

                // Wrap the element 
                $(element).wrap(wrapper);

                // Trigger changeSettings for every element to be able to use a callback function
                $("body").trigger("changeSettings", [element, wrapper, vars.settings]);

                // Add class needed for 
                $("#" + id).addClass(vars.settings.style);

                // Add keyboard html to element
                keyboard.insertAfter($(element));

				// Hide keyboard
                keyboard.hide();
				
                // Process keyboard rows and keys
                keyboardAppearence.processKeyboard(keyboard);

                // Process keyboard icon
                keyboardAppearence.processKeyboardIcon(element);

                // Trigger changeStyle for every element to be able to use a callback function
                $("body").trigger("changeStyle", [element, keyboard, vars.settings.style]);

                // Link focus event to each element
                $(element).focus(function () {
                    // Retrieve settings
                    vars.settings = wrapper.data("settings");

                    // only process if it has not been processed
                    if (vars.selector != element) {
                        // Add keyboard id to vars object
                        vars.id = id;
                        vars.selector = element;

                        vars.caps = ($("#" + id).attr('data-caps')) == "false" ? false : true;
                        vars.alt = ($("#" + id).attr('data-alt')) == "false" ? false : true;

                        // Get keyboard initial height
                        var height = keyboard.height();
						
                        // Hide all keyboards on the page except for the focused one
                        $(".kalimah-keys .kalimah-keys-keyboard:not(#" + id + " .kalimah-keys-keyboard)").fadeOut().promise().done(function () {
                            // Show selected keyboard
                            if (vars.settings.keyboard_location == "bottom") {
                                keyboard.css("bottom", "-" + height + "px");
                                keyboard.css("display", "block");
                                keyboard.animate({
                                    bottom: 0
                                }, 700, function () {
                                    // Trigger event for any callback
                                    $(document).trigger("keyboardOpened", keyboard);
                                });
                            } else {
                                keyboard.fadeIn(function () {
                                    // Trigger event for use to add callback functions
                                    $(document).trigger("keyboardOpened", keyboard);
                                });
                            }
                        });

                        keyboardAppearence.positionKeyboard(keyboard);
                        keyboardEvents.processKeyType();
                        keyboardEvents.pressLongKey();
                        keyboardMisc.proccessRightclick();
                        keyboardMisc.proccessCutcopypaste();
                    }

                    // Copy original element's value to alt field value
                    if (vars.settings.disable_original_input) {
                        $("#" + vars.id + " .kalimah-field").focus();
                        $("#" + vars.id + " .kalimah-field").val($(vars.selector).val());
                    }
                })

                keyboardAppearence.proccessInput(keyboard, element);

                // Append message box
                $(keyboard).prepend(elements.msgBox);

                // other functions
                keyboardEvents.processBlur(keyboard);
            });

            // Process key when it is pressed
            keyboardEvents.pressLongKey();
            keyboardEvents.clickKey();
        };
        var keyboardMisc = {
            uniqeId: function () {
                var c = 1;
                var d = new Date(),
                    m = d.getMilliseconds() + "",
                    u = ++d + m + (++c === 10000 ? (c = 1) : c);

                return u;
            },
            showMessage: function (message) {

                time = vars.settings.msg_time;

                if (!vars.settings.msg_time || vars.settings.msg_time == '') time = 2000;

                // Get msgbox
                var msgBoxElem = $("#" + vars.id + " .kalimah-msg-box");

                // First add text 
                msgBoxElem.text(message);

                // Get msg width
                var width = msgBoxElem.outerWidth();

                // Get height
                var height = msgBoxElem.outerHeight();

                // Set margin-left
                msgBoxElem.css('margin-left', "-" + (width / 2) + "px").fadeIn();
                msgBoxElem.css('margin-top', "-" + (height / 2) + "px").fadeIn();

                setTimeout(function () {
                    $("#" + vars.id + " .kalimah-msg-box").fadeOut();
                }, time);
                return false;
            },
            // Add the necessary keyboard style to position keyboard
            checkMobile: function () {
                var width = $(window).width();
                var height = $(window).height();

                if (height <= 480) vars.mobile = true;
                else vars.mobile = false;
                return false;
            },

            /* Get keyboard type */
            getKeyboard: function () {
                var keyboard = (vars.settings.custom_layout != null) ? vars.settings.custom_layout : vars.settings.keyboard_layout;
                return keyboard;
            },
            // Process right-click option
            proccessRightclick: function (element) {
                if (vars.settings.disable_right_click) {
                    $(inputMethods.getInputSelector()).on('contextmenu', function (e) {
                        keyboardMisc.showMessage(vars.settings.right_click_msg);
                        return false;
                    });
                }
            },

            // Process cut copy past events
            proccessCutcopypaste: function (element) {
                if (vars.settings.disable_right_click) {
                    $(inputMethods.getInputSelector()).on("cut copy paste", function (e) {
                        keyboardMisc.showMessage(vars.settings.copy_cut_paste_msg);
                        e.preventDefault();
                        return false;
                    });
                }
            }



        }
        var keyboardAppearence = {
            positionKeyboard: function (keyboard) {
                if (vars.settings.keyboard_location == "bottom") {
                    var width = keyboard.width();

                    keyboard.width("100%");

                    var innerWrap = keyboard.has('.keyboard-inner-wrap');
                    if (innerWrap.length == 0) {
                        keyboard.wrapInner("<div class='keyboard-inner-wrap'></div>");
                        keyboard.children('.keyboard-inner-wrap').css("margin-left", "-" + width / 2 + "px");
                        keyboard.children('.keyboard-inner-wrap').css("left", "50%");
                    }

                    keyboard.css({
                        "position": "fixed",
                        "bottom": 0,
                        "top": "auto"
                    })
                } else {
                    if (vars.settings.disable_original_input) {
                        keyboard.css('margin-top', 0);
                    } else {
                        keyboard.css('margin-top', $(vars.selector).outerHeight());
                    }
                }
            },
            // Create keyboard elements
            processKeyboard: function (keyboard) {
                var keyboardType = keyboardMisc.getKeyboard();
                for (i = 0; i < keyboardType.length; ++i) {
                    var row = $(elements.row);
                    keyboard.append(row);


                    // Loop through each key
                    for (j = 0; j < keyboardType[i].length; ++j) {
                        keyElement = $(elements.key);
                        row.append(keyElement);
                        keyboardAppearence.processKey(keyboardType[i][j], keyElement);
                    }
                }
            },
            //		Process each key
            processKey: function (key, keyElement) {
                var text, alt;

                // is key an object
                if (typeof key == 'object') {
                    // Add necessary class names
                    if (key.className) keyElement.addClass(key.className);
                    else keyElement.addClass(key.name);

                    // Add key attributes to created div
                    if (key.text) keyElement.data('text', key.text);

                    if (key.keycode) {
                        keyElement.attr('keycode', key.keycode);

                    }
                    if (key.name) keyElement.data('name', key.name);

                    if (key.alt) keyElement.data('alt', key.alt);

                    if (key.action) keyElement.data('action', key.action);

                    if (key.className) keyElement.addClass(key.className);

                    var altKey = key.alt;
                    if (altKey) alt = altKey[0];

                    keyElement.find('.key').text(key.text);
                    if (vars.settings.hide_alt_keys) keyElement.find('.keyTop').text(alt).addClass('hide');
                    else keyElement.find('.keyTop').text(alt);

                    keyElement.find('.altKey').text(alt).addClass('hide');
                } else {
                    text = key;
                    keyElement.data('text', text);

                    // Add text
                    keyElement.text(text);
                }
            },
            // Process input field
            proccessInput: function (keyboard, element) {
                if (vars.mobile == true) $(element).attr("readonly", true);

                // Check if hide original is set
                if (vars.settings.disable_original_input) {
                    if ($(element)[0].nodeName == "INPUT") {
                        var inputField = $(elements.inputField);
                        keyboard.prepend(inputField);
                    } else {
                        keyboard.prepend(elements.inputTextarea);
                    }

                    $(element).attr("readonly", true);

                    // Check if original input is password type and add to the secondary input
                    if ($(element).attr('type') == "password") inputField.find(".kalimah-alt-input").attr('type', "password")
                }
            },
            processKeyboardIcon: function (element) {
                // Check if keyboard icon is to be displayed
                if (vars.settings.show_on_icon_click) {
                    $(element).after(elements.icon);
                }

                $(element).siblings(".kalimah-keyboard-icon").click(function () {
                    if ($(element).is(":focus")) $("html").mouseup();
                    else $(element).focus();

                })
            }
        }
        var keyboard_methods = {
            // Process caps 
            processCaps: function () {
                // Get id of parent element
                var id = vars.id;

                // Get the current state of caps values
                var caps = $("#" + id).attr('data-caps');

                // Check caps state and change buttons accordingly
                if (caps == "true") {
                    $("#" + id + " .kalimah-keys-key:not(.tab, .left-shift, .backSpace, .capsLock, .return, .right-shift)").removeClass('caps');

                    if ((vars.settings.enable_keypress) && (vars.click == true)) $("#" + id + " .capsLock").removeClass('active');

                    caps = "false";
                    vars.caps = false;
                } else {
                    $("#" + id + " .kalimah-keys-key:not(.tab, .left-shift, .backSpace, .capsLock, .return, .right-shift)").addClass('caps');

                    if ((vars.settings.enable_keypress) && (vars.click == true)) $("#" + id + " .capsLock").addClass('active');

                    caps = "true";
                    vars.caps = true;
                }

                // Set the new caps state
                $("#" + id).attr('data-caps', caps);
            },
            processAlt: function () {
                // Get id of parent element
                var id = vars.id;

                // Get the current state of alt
                var alt = $("#" + id).attr('data-alt');

                // Is the flag on?
                if (alt == "true") {
                    $("#" + id + " .kalimah-keys-key").each(function (index) {
                        if ($(this).data('alt') != null) {
                            var alt = $(this).data('alt');
                            $(this).children(".key").removeClass('hide');
                            if (vars.settings.hide_alt_keys == false) {
                                $(this).children(".keyTop").removeClass('hide');
                            }

                            $(this).children(".altKey").addClass('hide');
                        }
                        $("#" + id + " .kalimah-keys-key:not(.tab, .left-shift, .backSpace, .capsLock, .return, .right-shift)").removeClass('caps');
                    })
                    // Remove active class
                    $("#" + id + " .capsLock, #" + id + " .right-shift, #" + id + " .left-shift").removeClass('active');

                    // Set flags to false
                    alt = "false";
                    caps = "false";
                    vars.alt = false;
                    vars.caps = false;
                    // Is alt off
                } else {
                    $("#" + id + " .kalimah-keys-key").each(function (index) {
                        // Are there any other keys available?
                        if ($(this).data('alt') != null) {
                            var alt = $(this).data('alt');
                            if (vars.settings.hide_alt_keys == false) {
                                $(this).children(".keyTop").addClass('hide');
                            }

                            $(this).children(".key").addClass('hide');
                            $(this).children(".altKey").removeClass('hide');
                        }
                        $("#" + id + " .kalimah-keys-key:not(.tab, .left-shift, .backSpace, .capsLock, .return, .right-shift)").addClass('caps');
                    })

                    $("#" + id + " .capsLock, #" + id + " .right-shift, #" + id + " .left-shift").addClass('active');

                    // Set flags to true
                    alt = "true";
                    caps = "true";
                    vars.alt = true;
                    vars.caps = true;
                }

                // Set the new alt state
                $("#" + id).attr('data-alt', alt);

                // Set the new caps state
                $("#" + id).attr('data-caps', caps);
            },
            closeKeyboard: function () {
                $("#" + vars.id + " .kalimah-keys-keyboard").fadeOut();
                vars.selector = null;
            }
        }
        var keyboardEvents = {
            // hide keyboard when clicked outside it.
            processBlur: function (keyboard) {
                $(document).on("mouseup", "html", function (e) {
                    var container = $(".kalimah-keys");

                    if (!container.is(e.target) // if the target of the click isn't the container...
                        && container.has(e.target).length === 0) // ... nor a descendant of the container
                    {
                        keyboard.fadeOut(function () {
							// Show selected keyboard
                            if (vars.settings.keyboard_location == "bottom") {
								// Trigger event for any callback after the keyboard closes
								$(document).trigger("keyboardClosed", keyboard);
							}
                        });
                        vars.selector = null;
                    }
                });
            },
            // Process mouse clicks on keys
            clickKey: function () {
                // Process mouse clicks for keylist
                $(".kalimah-keys-keyboard").on('mouseup', '.kalimah-keys-alt-keylist, .kalimah-keys-alt-keylist-remove', function (e) {
                    // Is it remove button
                    if ($(this).hasClass("kalimah-keys-alt-keylist-remove")) {
                        $('.kalimah-keys-alt').fadeOut(function () {
                            $(this).remove();
                        })
                    } else {
                        if (vars.caps == true) {
                            text = $(this).data('text').toUpperCase();
                        } else {
                            text = $(this).data('text');
                        }
                        inputMethods.insertAtCaret(text);
                        inputMethods.adjustDualInput();

                        $('.kalimah-keys-alt').remove();
                    }
                })

                // Process mouse clicks for keys
                $(".kalimah-keys-key").on('mousedown', function (e) {
                    if (vars.settings.input_method != 'mouse') {
                        keyboardMisc.showMessage(vars.settings.keyboard_only_msg);
                        return false;
                    }

                    // Set this value to use it later for keypress settings
                    vars.click = true;

                    //add class
                    $(this).not(".left-shift, .capsLock, .right-shift").addClass("active");
                })

                // Process mouse clicks for keys
                $(".kalimah-keys-key").on('mouseup', function (e) {
                    if (vars.settings.input_method != 'mouse') {
                        // Info message is already displayed on mousedown, so return false
                        return false;
                    }

                    // Set values
                    var alt = $(this).data('alt');
                    var action = $(this).data('action');

                    //add class
                    $(this).not(".left-shift, .capsLock,.right-shift").removeClass("active");

                    // Check if action is function
                    if (typeof action == 'function') {
                        action.call(this, keyboard_methods, inputMethods);
                    } else {
                        // if alternative keys are active then use them
                        if ((vars.alt == true) && (alt != null)) text = alt[0];
                        else
                        // if caps lock is active then use uppercase letters
                        if (vars.caps == true) {
                            text = $(this).data('text').toUpperCase();
                        } else {
                            text = $(this).data('text');
                        }
                        inputMethods.insertAtCaret(text);
                        inputMethods.adjustDualInput();
                    }
                    // Set this value to use it later for keypress settings
                    vars.click = false;
                })
            },

            processKeyType: function () {
                var lastEvent;
                var heldKeys = {};

                var keycode = null;
                var id = vars.id;

                // Add keydown event for the selected input
                $(inputMethods.getInputSelector()).keydown(function (event) {
                    if (vars.settings.input_method != 'keyboard') {
                        if ((event.which < 112) && ((event.which != 33) || (event.which != 34)) || (event.which > 186)) keyboardMisc.showMessage(vars.settings.mouse_only_msg);
                        return false;
                    }

                    // We want the key to be pressed once
                    if (lastEvent && lastEvent.keyCode == event.keyCode) {
                        return;
                    }
                    lastEvent = event;
                    heldKeys[event.which] = true;

                    keycode = event.which;

                    // Add highlight to the pressed key if keypress is enabled
                    if (vars.settings.enable_keypress) $("#" + vars.id + " .kalimah-keys-key[keycode~='" + event.which + "']").addClass("active");

                    // Check if shift or caps lock
                    if (keycode == 16) keyboard_methods.processAlt();
                    else if (keycode == 20) keyboard_methods.processCaps();
                })

                // when key is pressed
                $(inputMethods.getInputSelector()).keyup(function (event) {
                    if (vars.settings.input_method != 'keyboard') {
                        if ((event.which < 112) && ((event.which != 33) || (event.which != 34)) || (event.which > 186)) return false;
                    }

                    lastEvent = null;
                    delete heldKeys[event.which];

                    keycode = event.which;

                    if (vars.settings.enable_keypress) $("#" + vars.id + " .kalimah-keys-key[keycode~='" + event.which + "']").removeClass("active");

                    if (keycode == 16) keyboard_methods.processAlt();

                    inputMethods.adjustDualInput();
                })
            },
            // on long press
            pressLongKey: function () {
                if (vars.settings.input_method == 'mouse') {
                    // Set varaibales
                    var timer;
                    var isDown = false;
                    var altElement;
                    var clickedElement;
                    // Check if element is clicked on
                    $("#" + vars.id + " .kalimah-keys-key").on("mousedown", function () {
                        isDown = true;
                        clickedElement = $(this);
                        var alt = $(this).data('alt');

                        // Get the alternate keys
                        altElement = $(elements.alt);

                        // Set timer to check for long click
                        timer = setTimeout(function () {

                            // Check if alternate data is available
                            if (alt && vars.alt == false) {
                                // Append element to main div
                                clickedElement.parents(".kalimah-keys-keyboard").append(altElement);

                                // Map every element in the alt array to a function that displays the key
                                jQuery.map(alt, function (index) {
                                    keyElement = $(elements.altKeyList);
                                    altElement.append(keyElement);
                                    keyboardAppearence.processKey(index, keyElement);
                                })

                                // Add remove button
                                var removeElement = $(elements.altKeyListRemove);
                                altElement.append(removeElement);

                                // Get clicked element parent position from the main element
                                var parentTop = clickedElement.parent().position().top;
                                var left = (clickedElement.offset().left) - (altElement.width() / 2);
                                var top = clickedElement.position().top - (altElement.height() / 2);

                                // Position element
                                altElement.css('left', (left > 0) ? left : "0px");
                                altElement.css('top', top + parentTop);
                            }
                        }, vars.settings.alt_speed);
                    });

                    $(document).on("mouseup", function (e) {
                        if (isDown) {
                            clickedElement.not(".tab, .left-shift, .backSpace, .capsLock, .return, .right-shift").removeClass("active");
                            clearTimeout(timer);
                            //   altElement.remove();
                            isDown = false;
                        }
                    })
                }
            }
        }

        return this;
    }

    $.fn.KalimahKeys.Defaults = {
        keyboard_layout: $.keyboards.qwerty,
        input_method: "mouse",
        disable_original_input: true,
        hide_alt_keys: false,
        style: "apple",
        keyboard_location: "bottom",
        custom_layout: null,
        alt_speed: 400,
        enable_keypress: true,
        show_on_icon_click: true,
        disable_right_click: true,
        disable_cut_copy_paste: true,
		msg_time: 1500,
		keyboard_only_msg: "Only keyboard input is allowed",
        mouse_only_msg: "Only mouse input is allowed",
        right_click_msg: "Right click is disabled",
        copy_cut_paste_msg: "Copying and pasting is disabled",
    };

    $.fn.KalimahKeys.Vars = {
        id: null,
        alt: false,
        caps: false,
        selector: null,
        settings: null,
        mobile: false,
        click: false
    };
});