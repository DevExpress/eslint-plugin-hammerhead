"use strict";

module.exports = {
    rules:       {
        'proto-methods': require('./rules/proto-methods'),
        'use-hh-promise': require('./rules/use-hh-promise')
    },
    rulesConfig: {
        'proto-methods': 0,
        'use-hh-promise': 0
    }
};
