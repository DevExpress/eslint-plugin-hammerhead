'use strict';

var util = require('util');

module.exports = {
    meta: {
        schema: [
            {
                "type": "array",
                "items": {
                    "type": "string"
                },
                "minItems": 1,
                "uniqueItems": true
            }
        ]
    },

    create: function (context) {
        var USE_NATIVE_METHODS_ERR_MSG = 'Please use the %s function from the hammerhead.nativeMethods';

        var testableMethods = context.options[0].slice();
        var isNativesMethodsDeclared = false;

        return {
            'VariableDeclaration': function (node) {
                for (var i = 0; i < node.declarations.length; i++) {
                    var declaration = node.declarations[i];

                    if (declaration.id.name === 'nativeMethods' && declaration.init.type === 'MemberExpression' &&
                        declaration.init.object && declaration.init.object.name === 'hammerhead' &&
                        declaration.init.property && declaration.init.property.name === 'nativeMethods')
                        isNativesMethodsDeclared = true;
                }
            },

            'ImportDeclaration': function (node) {
                if (node.source && node.source.type === 'Literal' && typeof node.source.value === 'string' &&
                    node.source.value.substr(node.source.value.length - 10, 10) === 'hammerhead') {
                    for (var i = 0; i < node.specifiers.length; i++) {
                        var specifier = node.specifiers[i];

                        if (specifier.imported && specifier.imported.name === 'nativeMethods')
                            isNativesMethodsDeclared = true;
                    }
                }
            },

            'MemberExpression': function (node) {
                if (node.object && node.object.type === 'Identifier' && node.object.name === 'nativeMethods' &&
                    node.property && testableMethods.indexOf(node.property.name) !== -1 && !isNativesMethodsDeclared)
                    return context.report(node, util.format(USE_NATIVE_METHODS_ERR_MSG, node.property.name));
            },

            'NewExpression': function (node) {
                if (node.callee && node.callee.object && node.callee.object.name !== 'nativeMethods' &&
                    node.callee.property && testableMethods.indexOf(node.callee.property.name) !== -1 && !isNativesMethodsDeclared)
                    return context.report(node, util.format(USE_NATIVE_METHODS_ERR_MSG, node.callee.property.name));
                else if (node.callee && node.callee.type === 'Identifier' &&
                         testableMethods.indexOf(node.callee.name) !== -1 && !isNativesMethodsDeclared)
                    return context.report(node, util.format(USE_NATIVE_METHODS_ERR_MSG, node.callee.name));
            },

            'CallExpression': function (node) {
                if (node.callee && node.callee.object && node.callee.object.name !== 'nativeMethods' &&
                    node.callee.property && testableMethods.indexOf(node.callee.property.name) !== -1 && !isNativesMethodsDeclared)
                    return context.report(node, util.format(USE_NATIVE_METHODS_ERR_MSG, node.callee.property.name));
                else if (node.callee && node.callee.object && testableMethods.indexOf(node.callee.object.name) !== -1 &&
                    !isNativesMethodsDeclared)
                    return context.report(node, util.format(USE_NATIVE_METHODS_ERR_MSG, node.callee.object.name));
                else if (node.callee && node.callee.type === 'Identifier' &&
                         testableMethods.indexOf(node.callee.name) !== -1 && !isNativesMethodsDeclared)
                     return context.report(node, util.format(USE_NATIVE_METHODS_ERR_MSG, node.callee.name));
            }
        };
    }
};
