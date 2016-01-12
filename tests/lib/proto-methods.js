'use strict';

var rule       = require('../../lib/rules/proto-methods'),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({ ecmaFeatures: { modules: true } });

var ruleTester = new RuleTester();

ruleTester.run('proto-methods', rule, {
    valid: [
        'savedArraySlice.call(arguments);',
        'savedObjectMethod.call(param);',
        'savedArraySlice.apply(arguments, []);',
        'savedObjectMethod.apply(x, [y]);'
    ],

    invalid: [
        {
            code:   'Array.prototype.slice.call(arguments);' +
                    'Array.prototype.slice.apply(arguments, []);' +
                    'Object.prototype.method.call(x);' +
                    'Object.prototype.method.apply(x, []);',
            errors: [
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG },
                { message: rule.ERR_MSG }
            ]
        }
    ]
});
