'use strict';

var rule       = require('../../lib/rules/use-hh-promise'),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
    env:          { es6: true },
    ecmaFeatures: { modules: true }
});

var ruleTester = new RuleTester();

ruleTester.run('use-hh-promise', rule, {
    valid: [
        [
            'var Promise = hammerhead.Promise;',
            'var promise = new Promise(function(resolve, reject) {});'
        ].join('\n'),
        [
            'let Promise = hammerhead.Promise;',
            'Promise.all([',
            '"something"',
            ']);'
        ].join('\n'),
        [
            'const Promise = hammerhead.Promise;',
            'Promise.race([',
            '"something"',
            ']);'
        ].join('\n'),
        [
            'import { Promise, something } from "deps/hammerhead";',
            'Promise.race([',
            '"something"',
            ']);'
        ].join('\n')
    ],

    invalid: [
        {
            code:   'var Promise = hammerhead.something;' +
                    'var promise = new Promise(function(resolve, reject) {});',
            errors: [
                { message: rule.USE_HAMMERHEAD_PROMISE_ERR_MSG }
            ]
        },
        {
            code:   'var Promise = hh.Promise;' +
                    'var promise = new Promise(function(resolve, reject) {});',
            errors: [
                { message: rule.USE_HAMMERHEAD_PROMISE_ERR_MSG }
            ]
        },
        {
            code:   'var promise = new Promise(function(resolve, reject) {});',
            errors: [
                { message: rule.USE_HAMMERHEAD_PROMISE_ERR_MSG }
            ]
        },
        {
            code:   'Promise.all([' +
                    '"something"' +
                    ']);',
            errors: [
                { message: rule.USE_HAMMERHEAD_PROMISE_ERR_MSG }
            ]
        }
    ]
});
