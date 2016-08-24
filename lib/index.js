"use strict";

module.exports = {
    rules:       {
        'proto-methods': require('./rules/proto-methods'),
        'use-hh-promise': require('./rules/use-hh-promise'),
        'use-native-methods': require('./rules/use-native-methods')
    },
    rulesConfig: {
        'proto-methods': 0,
        'use-hh-promise': 0,
        'use-native-methods': 0
    }
};
