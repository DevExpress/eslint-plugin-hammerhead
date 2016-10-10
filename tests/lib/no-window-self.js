'use strict';

var rule       = require('../../lib/rules/no-window-self'),
    RuleTester = require('eslint').RuleTester;

new RuleTester().run('no-window-self', rule, {
    valid: [
        {
            code: 'if (win === win.top) { }'
        }
    ],

    invalid: [
        {
            code: 'if (window.self) { }',
            errors: [{ message: rule.ERR_MSG }]
        },
        {
            code: 'if (win.self === win.top) { }',
            errors: [{ message: rule.ERR_MSG }]
        }
    ]
});
