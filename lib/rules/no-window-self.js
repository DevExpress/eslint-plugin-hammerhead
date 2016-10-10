"use strict";

module.exports = {
    ERR_MSG: 'Do not use window.self',

    create: function(context) {
        return {
            Identifier: function(node) {
                if (node.name === 'self') {
                    var parent = context.getAncestors().pop();

                    if (parent && parent.type === "MemberExpression")
                        context.report(node, module.exports.ERR_MSG);
                }
            }
        };
    }
};
