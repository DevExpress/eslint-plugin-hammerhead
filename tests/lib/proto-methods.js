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
        'savedObjectMethod.apply(x, [y]);',
        'filter();'
    ],

    invalid: [
        {
            code: 'Array.prototype.slice.call(arguments);',
            errors: [{ message: rule.USING_ARRAY_PROTO_DIRECTLY_ERR_MSG }]
        },
        {
            code: 'Array.prototype.slice.apply(arguments, []);',
            errors: [{ message: rule.USING_ARRAY_PROTO_DIRECTLY_ERR_MSG }]
        },
        {
            code: 'Object.prototype.method.call(x);',
            errors: [{ message: rule.USING_OBJECT_PROTO_DIRECTLY_ERR_MSG }]
        },
        {
            code: 'Object.prototype.method.apply(x, []);',
            errors: [{ message: rule.USING_OBJECT_PROTO_DIRECTLY_ERR_MSG }]
        },
        {
            code: 'arr.filter()',
            errors: [{ message: rule.USING_ILLEGAL_ARRAY_FUNC_ERR_MSG.replace('%s', 'filter') }]
        },
        {
            code: 'variable.forEach()',
            errors: [{ message: rule.USING_ILLEGAL_ARRAY_FUNC_ERR_MSG.replace('%s', 'forEach') }]
        },
        {
            code: 's.every()',
            errors: [{ message: rule.USING_ILLEGAL_ARRAY_FUNC_ERR_MSG.replace('%s', 'every') }]
        },
        {
            code: 'q1.map()',
            errors: [{ message: rule.USING_ILLEGAL_ARRAY_FUNC_ERR_MSG.replace('%s', 'map') }]
        },
        {
            code: '[2,3].some()',
            errors: [{ message: rule.USING_ILLEGAL_ARRAY_FUNC_ERR_MSG.replace('%s', 'some') }]
        },
        {
            code: 'x().reduce()',
            errors: [{ message: rule.USING_ILLEGAL_ARRAY_FUNC_ERR_MSG.replace('%s', 'reduce') }]
        },
        {
            code: 'sk.reduceRight()',
            errors: [{ message: rule.USING_ILLEGAL_ARRAY_FUNC_ERR_MSG.replace('%s', 'reduceRight') }]
        },
        {
            code: 'func.bind(x)',
            errors: [{ message: rule.USING_BIND_FUNCTION_ERR_MSG }]
        }
    ]
});
