module.exports = function (context) {
    "use strict";

    var illegalArrayFuncNames = ['filter', 'forEach', 'every', 'map', 'some', 'reduce', 'reduceRight'];

    return {
        'CallExpression': function (node) {
            var property = node.callee.property;

            if (property) {
                if (property.name === 'call' || property.name === 'apply') {
                    var childNode = node.callee.object.object;

                    if (childNode && childNode.property && childNode.property.name === 'prototype' &&
                        childNode.object && (childNode.object.name === 'Array' || childNode.object.name === 'Object'))
                        return context.report(node, module.exports.USING_PROTO_DIRECTLY_ERR_MSG);
                }

                if (illegalArrayFuncNames.indexOf(property.name) !== -1)
                    return context.report(node, module.exports.USING_ILLEGAL_ARRAY_FUNC_ERR_MSG.replace('%s', property.name));

                if (property.name === 'bind')
                    return context.report(node, module.exports.USING_BIND_FUNCTION_ERR_MSG);
            }
        }
    };
};

module.exports.USING_PROTO_DIRECTLY_ERR_MSG = 'Forbidden to call a function directly from the prototype Array or Object (GH-245)';
module.exports.USING_ILLEGAL_ARRAY_FUNC_ERR_MSG = 'Forbidden to use the "%s" function because it is slower than inline code and may be replaced by any framework (GH-245)';
module.exports.USING_BIND_FUNCTION_ERR_MSG = 'Forbidden to use the "bind" function because it is slower than "call" or "apply" (GH-359)';
