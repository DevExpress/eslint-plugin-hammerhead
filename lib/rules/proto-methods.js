module.exports = function (context) {
    "use strict";

    exports.ERR_MSG = 'You must use the native function';

    return {
        'CallExpression': function (node) {
            var property = node.callee.property;

            if (property && (property.name === 'call' || property.name === 'apply')) {
                var childNode = node.callee.object.object;

                if (childNode && childNode.property && childNode.property.name === 'prototype' &&
                    childNode.object && (childNode.object.name === 'Array' || childNode.object.name === 'Object'))
                    return context.report(node, exports.ERR_MSG);
            }
        }
    };
};
