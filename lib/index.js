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
                    },
                    {
                        'property': 'cookie',
                        'message':  'Please use getters and setters for the document.cookie property from native methods instead.'
                    },
                    {
                        'property': 'activeElement',
                        'message':  'Please use the "documentActiveElementGetter" from native methods instead.'
                    },
                    {
                        'property': 'localStorage',
                        'message':  'Please use the "winLocalStorageGetter" from native methods instead.'
                    },
                    {
                        'property': 'sessionStorage',
                        'message':  'Please use the "winSessionStorageGetter" from native methods instead.'
                    },
                    {
                        'property': 'action',
                        'message':  'Please use getter and setter for form element from native methods instead.'
                    },
                    {
                        'property': 'autocomplete',
                        'message':  'Please use getter and setter for input element from native methods instead.'
                    },
                    {
                        'property': 'formAction',
                        'message':  'Please use getters and setters for input and button elements from native methods instead.'
                    },
                    {
                        'property': 'firstChild',
                        'message':  'Please use the "nodeFirstChildGetter" from native methods instead.'
                    },
                    {
                        'property': 'firstElementChild',
                        'message':  'Please use the "elementFirstElementChildGetter" from native methods instead.'
                    },
                    {
                        'property': 'lastChild',
                        'message':  'Please use the "nodeLastChildGetter" from native methods instead.'
                    },
                    {
                        'property': 'lastElementChild',
                        'message':  'Please use the "elementLastElementChildGetter" from native methods instead.'
                    },
                    {
                        'property': 'nextSibling',
                        'message':  'Please use the "nodeNextSiblingGetter" from native methods instead.'
                    },
                    {
                        'property': 'nextElementSibling',
                        'message':  'Please use the "elementNextElementSiblingGetter" from native methods instead.'
                    },
                    {
                        'property': 'innerHTML',
                        'message':  'Please use getter and setter from native methods instead.'
                    },
                    {
                        'property': 'outerHTML',
                        'message':  'Please use getter and setter from native methods instead.'
                    },
                    {
                        'property': 'innerText',
                        'message':  'Please use getter and setter from native methods instead.'
                    },
                    {
                        'property': 'text',
                        'message':  'Please use getter and setter for anchor and script elements from native methods instead.'
                    },
                    {
                        'property': 'textContent',
                        'message':  'Please use getter and setter from native methods instead.'
                    },
                    {
                        'property': 'attributes',
                        'message':  'Please use the "elementAttributesGetter" from native methods instead.'
                    }
                ]
            }
        }
    }
};
