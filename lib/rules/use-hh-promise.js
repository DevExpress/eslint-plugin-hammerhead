module.exports = function (context) {
    "use strict";

    var isPromiseDeclared = false;

    return {
        'VariableDeclaration': function (node) {
            for (var i = 0; i < node.declarations.length; i++) {
                var declaration = node.declarations[i];

                if (declaration.id.name === 'Promise' && declaration.init.type === 'MemberExpression' &&
                    declaration.init.object && declaration.init.object.name === 'hammerhead' &&
                    declaration.init.property && declaration.init.property.name === 'Promise')
                    isPromiseDeclared = true;
            }
        },

        'ImportDeclaration': function (node) {
            if (node.source && node.source.type === 'Literal' && typeof node.source.value === 'string' &&
                node.source.value.substr(node.source.value.length - 10, 10) === 'hammerhead') {
                for (var i = 0; i < node.specifiers.length; i++) {
                    var specifier = node.specifiers[i];

                    if (specifier.imported && specifier.imported.name === 'Promise')
                        isPromiseDeclared = true;
                }
            }
        },

        'MemberExpression': function (node) {
            if (node.object && node.object.type === 'Identifier' &&
                node.object.name === 'Promise' && !isPromiseDeclared)
                return context.report(node, module.exports.USE_HAMMERHEAD_PROMISE_ERR_MSG);
        },

        'NewExpression': function (node) {
            if (node.callee && node.callee.type === 'Identifier' &&
                node.callee.name === 'Promise' && !isPromiseDeclared)
                return context.report(node, module.exports.USE_HAMMERHEAD_PROMISE_ERR_MSG);
        }
    };
};

module.exports.USE_HAMMERHEAD_PROMISE_ERR_MSG = 'Please use Promise from hammerhead';
