'use strict';

var rule       = require('../../../lib/rules/proto-methods'),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({ ecmaFeatures: { modules: true } });

var ruleTester = new RuleTester();

ruleTester.run('proto-methods', rule, {
    valid: [
        [
            'import join, {forEach, bar as indexOf} from "my-module0.js";',
            'import "my-module1.js";',
            'import moduleName, * as unshift from "my-module2.js";',

            'join(array, "");',
            'forEach(func);',
            'indexOf(str, substr);',
            'unshift(array);',
            'moduleName.prop.toLowerCase(str);',
            'moduleName.toLowerCase(str);',
            'forEach.prop.join(array, "");',
            'join.toUpperCase(str);'
        ].join('\n')
    ],

    invalid: [
        {
            code: [
                      'import join, {forEach, bar as indexOf} from "my-module0.js";',
                      'import "my-module1.js";',
                      'import moduleName, * as unshift from "my-module2.js";',

                      'arr.forEach(func);',
                      'str.indexOf(substr);',
                      'shift();',
                      'Array.prototype.slice.call(arguments);',
                      'obj.join("");',
                      'obj.moduleName.join("");',
                      'moduleName.func().join("");'
                  ].join('\n'),

            errors: [
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG }
            ]
        }
    ]
});
