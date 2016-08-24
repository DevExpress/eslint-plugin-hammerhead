'use strict';

var rule       = require('../../lib/rules/use-hh-promise'),
    RuleTester = require('eslint').RuleTester;

new RuleTester().run('use-hh-promise', rule, {
    valid: [
        {
            code: 'var Promise = hammerhead.Promise;' +
                  'var promise = new Promise(function(resolve, reject) {});'
        },
        {
            code: 'let Promise = hammerhead.Promise;' +
                  'Promise.all([' +
                  '"something"' +
                  ']);',
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: 'const Promise = hammerhead.Promise;' +
                  'Promise.race([' +
                  '"something"' +
                  ']);',
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: 'import { Promise, something } from "deps/hammerhead";' +
                  'Promise.race([' +
                  '"something"' +
                  ']);',
            parserOptions: { ecmaVersion: 6, sourceType: 'module' }
        }
    ],

    invalid: [
        {
            code: 'var Promise = hammerhead.something;' +
                  'var promise = new Promise(function(resolve, reject) {});',
            errors: [{ message: rule.USE_HAMMERHEAD_PROMISE_ERR_MSG }]
        },
        {
            code: 'var Promise = hh.Promise;' +
                  'var promise = new Promise(function(resolve, reject) {});',
            errors: [{ message: rule.USE_HAMMERHEAD_PROMISE_ERR_MSG }]
        },
        {
            code: 'var promise = new Promise(function(resolve, reject) {});',
            errors: [{ message: rule.USE_HAMMERHEAD_PROMISE_ERR_MSG }]
        },
        {
            code: 'Promise.all([' +
                  '"something"' +
                  ']);',
            errors: [{ message: rule.USE_HAMMERHEAD_PROMISE_ERR_MSG }]
        }
    ]
});
