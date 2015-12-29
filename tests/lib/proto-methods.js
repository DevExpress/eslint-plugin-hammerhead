'use strict';

var rule       = require('../../lib/rules/proto-methods'),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({ ecmaFeatures: { modules: true } });

var ruleTester = new RuleTester();

ruleTester.run('proto-methods', rule, {
    valid: [
        'import join, {forEach, bar as indexOf} from "../../protos";' +
        'join(array, "");' +
        'forEach(func);' +
        'indexOf(str, substr);' +
        'forEach.prop.join(array, "");' +
        'join.toUpperCase(str);',

        'import moduleName, * as unshift from "/protos";' +
        'unshift(array);' +
        'moduleName.prop.toLowerCase(str);' +
        'moduleName.toLowerCase(str);',

        'pop()'
    ],

    invalid: [
        {
            code:   'import join, {forEach, bar as indexOf} from "my-module0.js";' +
                    'arr.forEach(func);' +
                    'str.indexOf(substr);' +
                    'obj.join("");',
            errors: [
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG }
            ]
        },

        {
            code:   'import moduleName, * as unshift from "my-module1.js";' +
                    'moduleName.func().join("");' +
                    'obj.moduleName.join("");',
            errors: [
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG }
            ]
        },

        {
            code:   'Array.prototype.slice.call(arguments);',
            errors: [
                { message: rule.ERR_MSG }
            ]
        }
    ]
});
