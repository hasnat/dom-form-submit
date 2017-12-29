# DOM-Form-Submit
Utility build or use form and submit using provided data.
This library will intelegently reuse the same form and perform minimal manipulations for optimum performance.

[![Build Status](https://travis-ci.org/hasnat/dom-form-submit.svg)](https://travis-ci.org/hasnat/dom-form-submit)

[![NPM](https://nodei.co/npm/dom-form-submit.png)](https://nodei.co/npm/dom-form-submit/)

# Installation

#### Npm
```console
npm install dom-form-submit
```

# Example

```javascript
var submit = require('dom-form-submit');

// Submit form with data (create or use existing form)
submit({a: 'b', c: 'd'}, {
    id: 'my-form-id',
    name: 'my-form-name'
});

// Submit an existing form.
submit({a: 'b', c: 'd'}, {
    method: 'POST',
    form: document.getElementById('my-form')
});

// Basically empty form submit
submit();

```

# API Options / Defaults.

```javascript
{
    method: 'GET',
    enctype: 'application/x-www-form-urlencoded',
    target: '_self'
}
```

Please feel free to create a PR!

### Thanks to

https://github.com/gillstrom/submitform

https://github.com/DylanPiercey/submit-form
