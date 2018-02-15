'use strict';

module.exports = {
    rules:       {
        'proto-methods':      require('./rules/proto-methods'),
        'use-hh-promise':     require('./rules/use-hh-promise'),
        'use-native-methods': require('./rules/use-native-methods'),
        'no-window-self':     require('./rules/no-window-self')
    },
    rulesConfig: {
        'proto-methods':      0,
        'use-hh-promise':     0,
        'use-native-methods': 0,
        'no-window-self':     0
    },
    configs:     {
        recommended: {
            rules: {
                'no-restricted-globals':    [2, 'Object', 'JSON'],
                'no-restricted-properties': [2,
                    {
                        'object':   'childNodes',
                        'property': 'length',
                        'message':  'Please use the "nodeListLengthGetter" from native methods instead.'
                    },
                    {
                        'object':   'children',
                        'property': 'length',
                        'message':  'Please use the "htmlCollectionLengthGetter" from native methods instead.'
                    },
                    {
                        'property': 'childElementCount',
                        'message':  'Please use the "elementChildElementCountGetter" from native methods instead.'
                    },
                    {
                        'property': 'files',
                        'message':  'Please use the "inputFilesGetter" from native methods instead.'
                    },
                    {
                        'property': 'value',
                        'message':  'Please use getters and setters for input and textarea elements from native methods instead.'
                    },
                    {
                        'property': 'src',
                        'message':  'Please use getters and setters from native methods instead.'
                    },
                    {
                        'property': 'href',
                        'message':  'Please use getters and setters from native methods instead.'
                    },
                    {
                        'property': 'host',
                        'message':  'Please use getters and setters for anchor element from native methods instead.'
                    },
                    {
                        'property': 'hostname',
                        'message':  'Please use getters and setters for anchor element from native methods instead.'
                    },
                    {
                        'property': 'origin',
                        'message':  'Please use getters and setters for anchor element from native methods instead.'
                    },
                    {
                        'property': 'pathname',
                        'message':  'Please use getters and setters for anchor element from native methods instead.'
                    },
                    {
                        'property': 'port',
                        'message':  'Please use getters and setters for anchor element from native methods instead.'
                    },
                    {
                        'property': 'protocol',
                        'message':  'Please use getters and setters for anchor element from native methods instead.'
                    },
                    {
                        'property': 'search',
                        'message':  'Please use getters and setters for anchor element from native methods instead.'
                    }
                ]
            }
        }
    }
};
