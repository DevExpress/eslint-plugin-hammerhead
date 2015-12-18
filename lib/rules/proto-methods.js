module.exports = function (context) {
    "use strict";

    var PROTO_METHODS_NAME = [
        'charAt', 'charCodeAt', 'concat', 'contains', 'indexOf', 'lastIndexOf', 'match', 'quote', 'replace', 'search',
        'slice', 'split', 'substr', 'substring', 'trim', 'toLowerCase', 'toUpperCase',
        'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice',
        'indexOf', 'lastIndexOf', 'filter', 'forEach', 'every', 'map', 'some', 'reduce', 'reduceRight', 'contains',
        'toExponential', 'toFixed', 'toLocaleString', 'toPrecision',
        'apply', 'call', 'bind',
        'exec', 'test',
        'create', 'defineProperty', 'defineProperties', 'keys',
        'getPrototypeOf', 'getOwnPropertyDescriptor', 'getOwnPropertyNames',
        'preventExtensions', 'isExtensible', 'seal', 'isSealed', 'freeze', 'isFrozen', 'now'
    ];

    var ERR_MSG = 'You must use the native function';

    exports.ERR_MSG = ERR_MSG;


    var exportedIdentifiers;

    return {
        'Program': function () {
            exportedIdentifiers = [];
        },

        'ImportDeclaration': function (node) {
            node.specifiers.forEach(function (specifier) {
                exportedIdentifiers.push(specifier.local.name);
            });
        },

        'CallExpression': function (node) {
            if (!node.callee.property) {
                if (PROTO_METHODS_NAME.indexOf(node.callee.name) != -1 &&
                    exportedIdentifiers.indexOf(node.callee.name) == -1)
                    return context.report(node, ERR_MSG);
            }
            else if (PROTO_METHODS_NAME.indexOf(node.callee.property.name) != -1) {
                var obj = node.callee.object;

                do {
                    if (obj.type !== 'MemberExpression' && obj.type !== 'Identifier')
                        return context.report(node, ERR_MSG);

                    if (obj.type !== 'Identifier')
                        obj = obj.object
                } while (obj && obj.type !== 'Identifier');

                if (!obj || exportedIdentifiers.indexOf(obj.name) == -1)
                    return context.report(node, ERR_MSG);
            }
        }
    };
};
