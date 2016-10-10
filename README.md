# eslint-plugin-hammerhead

Specific rules for the hammerhead.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-hammerhead`:

```
$ npm install eslint-plugin-hammerhead --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-hammerhead` globally.

## Usage

Add `hammerhead` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "hammerhead"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "hammerhead/rule-name": 2
    }
}
```

## Supported Rules

* proto-methods
* use-hh-promise
* use-native-methods
* no-window-self
