'use strict';

var rule       = require('../../lib/rules/use-native-methods'),
    RuleTester = require('eslint').RuleTester;

new RuleTester().run('use-native-methods', rule, {
    valid: [
        {
            code: 'var nativeMethods = hammerhead.nativeMethods;' +
                  'nativeMethods.setInterval.call(function(){}, 30);',
            options: [['setInterval']]
        },
        {
            code: 'let nativeMethods = hammerhead.nativeMethods;' +
                  'nativeMethods.setTimeout.call(function(){}, 30);',
            options: [['setTimeout']],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: 'const nativeMethods = hammerhead.nativeMethods;' +
                  'nativeMethods.setInterval.call(function(){}, 30);',
            options: [['setInterval']],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: 'import { nativeMethods, something } from "deps/hammerhead";' +
                  'nativeMethods.setTimeout.call(function(){}, 30);',
            options: [['setTimeout']],
            parserOptions: { ecmaVersion: 6, sourceType: 'module' }
        },
        {
            code: 'var nativeMethods = hammerhead.nativeMethods;' +
                  'var img = new nativeMethods.Image();',
            options: [['Image']],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: 'const nativeMethods = hammerhead.nativeMethods;' +
                  'setTimeout(function(){}, 30);',
            options: [['setInterval']],
            parserOptions: { ecmaVersion: 6 }
        }
    ],

    invalid: [
        {
            code: 'var nativeMethods = hammerhead.something;' +
                  'nativeMethods.setInterval.call(function(){}, 30);',
            errors: [{ message: 'Please use the setInterval function from the hammerhead.nativeMethods' }],
            options: [['setInterval']]
        },
        {
            code: 'var nativeMethods = hh.nativeMethods;' +
                  'nativeMethods.setTimeout.call(function(){}, 30);',
            errors: [{ message: 'Please use the setTimeout function from the hammerhead.nativeMethods' }],
            options: [['setTimeout']]
        },
        {
            code: 'import { nativeMethods } from "deps/something";' +
                  'nativeMethods.setTimeout.call(function(){}, 30);',
            errors: [{ message: 'Please use the setTimeout function from the hammerhead.nativeMethods' }],
            options: [['setTimeout']],
            parserOptions: { ecmaVersion: 6, sourceType: 'module' }
        },
        {
            code: 'window.setInterval(function(){}, 30);',
            errors: [{ message: 'Please use the setInterval function from the hammerhead.nativeMethods' }],
            options: [['setInterval']]
        },
        {
            code: 'setInterval(function(){}, 30);',
            errors: [{ message: 'Please use the setInterval function from the hammerhead.nativeMethods' }],
            options: [['setInterval']]
        },
        {
            code: 'var img = new something.Image()',
            errors: [{ message: 'Please use the Image function from the hammerhead.nativeMethods' }],
            options: [['Image']]
        },
        {
            code: 'something.setInterval(function(){}, 30);' +
                  'something.fn().setTimeout(function(){}, 30);' +
                  'var img = new Image()',
            errors: [
                { message: 'Please use the setInterval function from the hammerhead.nativeMethods' },
                { message: 'Please use the setTimeout function from the hammerhead.nativeMethods' },
                { message: 'Please use the Image function from the hammerhead.nativeMethods' }
            ],
            options: [['setInterval', 'setTimeout', 'Image']]
        },
        {
            code: 'setInterval.call(window, function(){}, 30);',
            errors: [{ message: 'Please use the setInterval function from the hammerhead.nativeMethods' }],
            options: [['setInterval']]
        }
    ]
});
