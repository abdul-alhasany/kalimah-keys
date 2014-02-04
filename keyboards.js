jQuery(document).ready(function ($) {
  
  $.keyboards = {
        arabic: [
            [{
                text: 'ذ',
                alt: ['~'],
                keycode: 192
            }, {
                text: '1',
                alt: ['!'],
                keycode: 49
            }, {
                text: '2',
                alt: ['@'],
                keycode: 50
            }, {
                text: '3',
                alt: ['#'],
                keycode: 51
            }, {
                text: '4',
                alt: ['$'],
                keycode: 52
            }, {
                text: '5',
                alt: ['%'],
                keycode: 53
            }, {
                text: '6',
                alt: ['^'],
                keycode: 54
            }, {
                text: '7',
                alt: ['&'],
                keycode: 55
            }, {
                text: '8',
                alt: ['*'],
                keycode: 56
            }, {
                text: '9',
                alt: ['('],
                keycode: 57
            }, {
                text: '0',
                alt: [')'],
                keycode: 48
            }, {
                text: '-',
                alt: ['_'],
                keycode: "189 173"
            }, {
                text: '=',
                alt: ['+'],
                keycode: "187 61"
            }, {
                text: 'Backspace',
                name: 'backSpace',
                keycode: 8,
                action: function (keyboard_methods, inputMethods) {
                    inputMethods.deleteAtCaret(1, 0);
                    inputMethods.adjustDualInput();
					
                    return false;
                }
            }],
            [{
                text: 'TAB',
                name: 'tab',
                keycode: 9,
                action: function (km, im) {
                    var $x = $(':input');
                    var $next = $x.eq($x.index($(im.getInputSelector())) + 1);
                    $next.focus();
                    return false;
                }
            }, {
                text: 'ض',
                alt: ['َ'],
                keycode: 81
            }, {
                text: 'ص',
                alt: ['ً'],
                keycode: 87
            }, {
                text: 'ث',
                alt: ['ُ'],
                keycode: 69
            }, {
                text: 'ق',
                alt: ['ٌ'],
                keycode: 82
            }, {
                text: 'ف',
                alt: ['لإ'],
                keycode: 84
            }, {
                text: 'غ',
                alt: ['إ'],
                keycode: 89
            }, {
                text: 'ع',
                alt: ['‘'],
                keycode: 85
            }, {
                text: 'ه',
                alt: ['÷'],
                keycode: 73
            }, {
                text: 'خ',
                alt: ['×'],
                keycode: 79
            }, {
                text: 'ح',
                alt: ['؛'],
                keycode: 80
            }, {
                text: 'ج',
                alt: ['<'],
                keycode: 219
            }, {
                text: 'د',
                alt: ['>'],
                keycode: 221
            }, {
                text: '\\',
                alt: ['|'],
                keycode: 220
            }],
            [{
                text: 'Caps Lock',
                name: 'capsLock',
                action: function (km) {
                    km.processCaps(this);
                    return false;
                },
                keycode: 20
            }, {
                text: 'ش',
                alt: ['ِ'],
                keycode: 65
            }, {
                text: 'س',
                alt: ['ٍ'],
                keycode: 83
            }, {
                text: 'ي',
                alt: [']'],
                keycode: 68
            }, {
                text: 'ب',
                alt: ['['],
                keycode: 70
            }, {
                text: 'ل',
                alt: ["لا"],
                keycode: 71
            }, {
                text: 'ا',
                alt: ['أ'],
                keycode: 72
            }, {
                text: 'ت',
                alt: ['ـ'],
                keycode: 74
            }, {
                text: 'ن',
                alt: ['،'],
                keycode: 75
            }, {
                text: ['م'],
                alt: ['/'],
                keycode: 76
            }, {
                text: ['ك'],
                alt: [':'],
                keycode: "59 186"
            }, {
                text: ['ط'],
                alt: ['"'],
                keycode: 222
            }, {
                text: 'Return',
                name: 'return',
                action: function (keyboard_methods, inputMethods) {
                    $(inputMethods.getInputSelector()).val($(inputMethods.getInputSelector()).val() + "\n");
                    return false;
                },
                keycode: 13
            }],
            [{
                text: 'Shift',
                name: 'leftShift',
                action: function (keyboard_methods) {
                    keyboard_methods.processAlt();
                    return false;
                },
                className: 'left-shift',
                keycode: 16
            }, {
                text: 'ئ',
                alt: ['~'],
                keycode: 90
            }, {
                text: 'ء',
                alt: ['ْ'],
                keycode: 88
            }, {
                text: 'ؤ',
                alt: ['}'],
                keycode: 67
            }, {
                text: 'ر',
                alt: ['{'],
                keycode: 86
            }, {
                text: 'لا',
                alt: ['لآ'],
                keycode: 66
            }, {
                text: 'ى',
                alt: ['آ'],
                keycode: 78
            }, {
                text: 'ة',
                alt: ['’'],
                keycode: 77
            }, {
                text: 'و',
                alt: [','],
                keycode: 188
            }, {
                text: 'ز',
                alt: ['.'],
                keycode: 190
            }, {
                text: 'ظ',
                alt: ['؟'],
                keycode: 191
            }, {
                text: 'Shift',
                name: 'rightShift',
                action: function (keyboard_methods) {
                    keyboard_methods.processAlt();
                    return false;
                },
                keycode: 16,
                className: 'right-shift'
            }],
            [{
                text: ' ',
                name: 'space',
                keycode: 32
            }, {
                text: ' Close ',
                name: 'close',
                action: function (km) {
                    km.closeKeyboard();
                    return false;
                }
            }]
        ],
        mobile: [
            [{
                text: '1',
                alt: ['!'],
                keycode: 49
            }, {
                text: '2',
                alt: ['@'],
                keycode: 50
            }, {
                text: '3',
                alt: ['#'],
                keycode: 51
            }, {
                text: '4',
                alt: ['$'],
                keycode: 52
            }, {
                text: '5',
                alt: ['%'],
                keycode: 53
            }, {
                text: '6',
                alt: ['^'],
                keycode: 54
            }, {
                text: '7',
                alt: ['&'],
                keycode: 55
            }, {
                text: '8',
                alt: ['*'],
                keycode: 56
            }, {
                text: '9',
                alt: ['('],
                keycode: 57
            }, {
                text: '0',
                alt: [')'],
                keycode: 48
            }, {
                text: '⌫',
                name: 'backSpace',
                keycode: 8,
                action: function (keyboard_methods, inputMethods) {
                    inputMethods.deleteAtCaret(1, 0);
					inputMethods.adjustDualInput();
                    return false;
                }
            }],
            [{
                text: 'TAB',
                name: 'tab',
                keycode: 9,
                action: function (km, im) {
                    var $x = $(':input');
                    var $next = $x.eq($x.index($(im.getInputSelector())) + 1);
                    $next.focus();
                    return false;
                }
            }, {
                text: 'q',
                keycode: 81
            }, {
                text: 'w',
                keycode: 87
            }, {
                text: 'e',
                keycode: 69
            }, {
                text: 'r',
                keycode: 82
            }, {
                text: 't',
                keycode: 84
            }, {
                text: 'y',
                keycode: 89
            }, {
                text: 'u',
                keycode: 85
            }, {
                text: 'i',
                keycode: 73
            }, {
                text: 'o',
                keycode: 79
            }, {
                text: 'p',
                keycode: 80
            }],
            [{
                text: '⇪',
                name: 'capsLock',
                action: function (km) {
                    km.processCaps(this);
                    return false;
                },
                keycode: 20
            }, {
                text: 'a',
                keycode: 65
            }, {
                text: 's',
                keycode: 83
            }, {
                text: 'd',
                keycode: 68
            }, {
                text: 'f',
                keycode: 70
            }, {
                text: 'g',
                keycode: 71
            }, {
                text: 'h',
                keycode: 72
            }, {
                text: 'j',
                keycode: 74
            }, {
                text: 'k',
                keycode: 75
            }, {
                text: 'l',
                keycode: 76
            }, {
                text: '⏎',
                name: 'return',
                action: function (keyboard_methods, inputMethods) {
                    e = $.Event('keyup');
                    e.keyCode = 13; // enter
                    $(inputMethods.getInputSelector()).val($(inputMethods.getInputSelector()).val() + "\n");
                    return false;
                },
                keycode: 13
            }],
            [{
                text: '⇧',
                name: 'leftShift',
                action: function (keyboard_methods) {
                    keyboard_methods.processAlt(this);

                    return false;
                },
                className: 'left-shift',
                keycode: 16
            }, {
                text: 'z',
                keycode: 90
            }, {
                text: 'x',
                keycode: 88
            }, {
                text: 'c',
                keycode: 67
            }, {
                text: 'v',
                keycode: 86
            }, {
                text: 'b',
                keycode: 66
            }, {
                text: 'n',
                keycode: 78
            }, {
                text: 'm',
                keycode: 77
            }, {
                text: ',',
                alt: ['<', '>', '/', '?'],
                keycode: 188
            }, {
                text: '⇧',
                name: 'rightShift',
                action: function (keyboard_methods, inputMethods) {
                    keyboard_methods.processAlt(this);

                    return false;
                },
                keycode: 16,
                className: 'right-shift'
            }],
            [{
                text: ' ',
                name: 'space',
                keycode: 32
            }]
        ],

        qwerty: [
            [{
                text: '`',
                alt: ['~'],
                keycode: 192
            }, {
                text: '1',
                alt: ['!'],
                keycode: 49
            }, {
                text: '2',
                alt: ['@'],
                keycode: 50
            }, {
                text: '3',
                alt: ['#'],
                keycode: 51
            }, {
                text: '4',
                alt: ['$'],
                keycode: 52
            }, {
                text: '5',
                alt: ['%'],
                keycode: 53
            }, {
                text: '6',
                alt: ['^'],
                keycode: 54
            }, {
                text: '7',
                alt: ['&'],
                keycode: 55
            }, {
                text: '8',
                alt: ['*'],
                keycode: 56
            }, {
                text: '9',
                alt: ['('],
                keycode: 57
            }, {
                text: '0',
                alt: [')'],
                keycode: 48
            }, {
                text: '-',
                alt: ['_'],
                keycode: "189 173"
            }, {
                text: '=',
                alt: ['+'],
                keycode: "187 61"
            }, {
                text: 'Backspace',
                name: 'backSpace',
                keycode: 8,
                action: function (keyboard_methods, inputMethods) {
                    inputMethods.deleteAtCaret(1, 0);
					inputMethods.adjustDualInput();
                    return false;
                }
            }],
            [{
                text: 'TAB',
                name: 'tab',
                keycode: 9,
                action: function (km, im) {
                    var $x = $(':input');
                    var $next = $x.eq($x.index($(im.getInputSelector())) + 1);
                    $next.focus();
                    return false;
                }
            }, {
                text: 'q',
                keycode: 81
            }, {
                text: 'w',
                keycode: 87
            }, {
                text: 'e',
                keycode: 69
            }, {
                text: 'r',
                keycode: 82
            }, {
                text: 't',
                keycode: 84
            }, {
                text: 'y',
                keycode: 89
            }, {
                text: 'u',
                keycode: 85
            }, {
                text: 'i',
                keycode: 73
            }, {
                text: 'o',
                keycode: 79
            }, {
                text: 'p',
                keycode: 80
            }, {
                text: '[',
                alt: ['}'],
                keycode: 219
            }, {
                text: ']',
                alt: ['{'],
                keycode: 221
            }, {
                text: '\\',
                alt: ['|'],
                keycode: 220
            }],
            [{
                text: 'Caps Lock',
                name: 'capsLock',
                action: function (km) {
                    km.processCaps(this);
                    return false;
                },
                keycode: 20
            }, {
                text: 'a',
                keycode: 65
            }, {
                text: 's',
                keycode: 83
            }, {
                text: 'd',
                keycode: 68
            }, {
                text: 'f',
                keycode: 70
            }, {
                text: 'g',
                keycode: 71
            }, {
                text: 'h',
                keycode: 72
            }, {
                text: 'j',
                keycode: 74
            }, {
                text: 'k',
                keycode: 75
            }, {
                text: 'l',
                keycode: 76
            }, {
                text: ':',
                alt: [';'],
                keycode: "59 186"
            }, {
                text: '\'',
                alt: ['"'],
                keycode: 222
            }, {
                text: 'Return',
                name: 'return',
                action: function (keyboard_methods, inputMethods) {
                    e = $.Event('keyup');
                    e.keyCode = 13; // enter
                    $(inputMethods.getInputSelector()).val($(inputMethods.getInputSelector()).val() + "\n");
                    return false;
                },
                keycode: 13
            }],
            [{
                text: 'Shift',
                name: 'leftShift',
                action: function (keyboard_methods) {
                    keyboard_methods.processAlt();
                    return false;
                },
                className: 'left-shift',
                keycode: 16
            }, {
                text: 'z',
                keycode: 90
            }, {
                text: 'x',
                keycode: 88
            }, {
                text: 'c',
                keycode: 67
            }, {
                text: 'v',
                keycode: 86
            }, {
                text: 'b',
                keycode: 66
            }, {
                text: 'n',
                keycode: 78
            }, {
                text: 'm',
                keycode: 77
            }, {
                text: ',',
                alt: ['<'],
                keycode: 188
            }, {
                text: '.',
                alt: ['>'],
                keycode: 190
            }, {
                text: '/',
                alt: ['?'],
                keycode: 191
            }, {
                text: 'Shift',
                name: 'rightShift',
                action: function (keyboard_methods) {
                    keyboard_methods.processAlt();
                    return false;
                },
                keycode: 16,
                className: 'right-shift'
            }],
            [{
                text: ' ',
                name: 'space',
                keycode: 32
            }]
        ],

        emotions: [
            [':p', ':D<3', '=D', '>.<', ':-$', '<:)>', ';)', ';-P', '>:)', ':---)'],
            ['>:D<', '=">', '=((', ':-c', '</3', 'B-)', ':-|', ':-/', ':(:)', ':-P'],
            [';^)', ';-)', '}:-)']
        ],

        greekAlphabet: [
            ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ'],
            ['λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ'],
            ['φ', 'χ', 'ψ', {
                text: '⌫',
                name: 'backSpace',
                keycode: 8,
                action: function (keyboard_methods, inputMethods) {
                    inputMethods.deleteAtCaret(1, 0);
					inputMethods.adjustDualInput();
                    return false;
                }
            }, {
                text: '⇧',
                name: 'rightShift',
                action: function (keyboard_methods, inputMethods) {
                    keyboard_methods.processAlt(this);

                    return false;
                },
                keycode: 16,
                className: 'right-shift'
            }]
        ],
        keypad: [
            [{
                text: '1',
                alt: ['!'],
                keycode: "49 97"
            }, {
                text: '2',
                alt: ['@'],
                keycode: "50 98"
            }, {
                text: '3',
                alt: ['#'],
                keycode: "51 99"
            }],
            [{
                text: '4',
                alt: ['$'],
                keycode: "52 100"
            }, {
                text: '5',
                alt: ['%'],
                keycode: "53 101"
            }, {
                text: '6',
                alt: ['^'],
                keycode: "54 102"
            }],
            [{
                text: '7',
                alt: ['&'],
                keycode: "55 103"
            }, {
                text: '8',
                alt: ['*'],
                keycode: "56 104"
            }, {
                text: '9',
                alt: ['('],
                keycode: "57 105"
            }],
            [{
                text: '0',
                alt: [')'],
                keycode: "48 96"
            }, {
                text: '⌫',
                name: 'backSpace',
                keycode: 8,
                action: function (keyboard_methods, inputMethods) {
                    inputMethods.deleteAtCaret(1, 0);
					inputMethods.adjustDualInput();
                    return false;
                }
            }]
        ]
    }
})