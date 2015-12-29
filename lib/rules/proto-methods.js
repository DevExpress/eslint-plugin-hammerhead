module.exports = function (context) {
    "use strict";

    var PROTO_METHODS_NAME = [
        'charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf', 'match', 'replace', 'search',
        'slice', 'split', 'substr', 'substring', 'trim', 'toLowerCase', 'toUpperCase',
        'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'join',
        'filter', 'forEach', 'every', 'map', 'some', 'reduce', 'reduceRight',
        'toExponential', 'toFixed', 'toLocaleString', 'toPrecision',
        'apply', 'call', 'bind',
        'exec', 'test',
        'create', 'defineProperty', 'defineProperties', 'keys',
        'getPrototypeOf', 'getOwnPropertyDescriptor', 'getOwnPropertyNames',
        'preventExtensions', 'isExtensible', 'seal', 'isSealed', 'freeze', 'isFrozen', 'now'
    ];

    var ERR_MSG = 'You must use the native function';

    exports.ERR_MSG = ERR_MSG;

    var exportedProtoIdentifiers;

    return {
        'Program': function () {
            exportedProtoIdentifiers = [];
        },

        'ImportDeclaration': function (node) {
            if (node.source.value.lastIndexOf('/protos') !== -1) {
                node.specifiers.forEach(function (specifier) {
                    exportedProtoIdentifiers.push(specifier.local.name);
                });
            }
        },

        'CallExpression': function (node) {
            if (node.callee.property && PROTO_METHODS_NAME.indexOf(node.callee.property.name) != -1) {
                var obj = node.callee.object;

                do {
                    if (obj.type !== 'MemberExpression' && obj.type !== 'Identifier')
                        return context.report(node, ERR_MSG);

                    if (obj.type !== 'Identifier')
                        obj = obj.object
                } while (obj && obj.type !== 'Identifier');

                if (!obj || exportedProtoIdentifiers.indexOf(obj.name) == -1)
                    return context.report(node, ERR_MSG);
            }
        }
    };
};
