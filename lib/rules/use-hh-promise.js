module.exports = function (context) {
    "use strict";

    var isPromiseDeclared = false;

    return {
        'VariableDeclarator': function (node) {
            if (node.id.name === 'Promise' && node.init.type === 'MemberExpression' &&
                node.init.object && node.init.object.name === 'hammerhead' &&
                node.init.property && node.init.property.name === 'Promise')
                isPromiseDeclared = true;

            else if (node.id.type === 'ObjectPattern' && node.init.type === 'Identifier' && node.init.name === 'hammerhead') {
                for (var property of node.id.properties) {
                    if (property.key.type === 'Identifier' && property.key.name === 'Promise') {
                        isPromiseDeclared = true;
                        return;
                    }
                }
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
