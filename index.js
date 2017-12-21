'use strict';
var addInputs = function(data, form) {
    for (var el in data) {
        if (data.hasOwnProperty(el)) {
            var input = form.elements[el];
            if (!input) {
                input = document.createElement('input');
                input.type = 'hidden';
                form.appendChild(input);
            }
            if (Array.isArray(input)) {
                var valueFound = false;
                for (var i = 0, len = input.length; i < len; i++) {
                    if (input[i].value == data[el]) {
                        input = input[i];
                        valueFound = true;
                        break;
                    }
                }
                if (!valueFound) {
                    input = input[0];
                }
                input.checked = true;
            }
            input.name = el;
            input.value = data[el];
        }
    }
};

module.exports = function (data, opts) {
    data = data || {};
    opts = opts || {};
    var form = opts.form || (opts.id && document.getElementById(opts.id)) || (opts.name && document[opts.name]);
    if (!form) {
        form = document.createElement('form');
        form.style.display = 'none';
        document.body.appendChild(form);
    }
    delete opts.form;
    for (var el in opts) {
        if (opts.hasOwnProperty(el)) {
            form[el] = opts[el];
        }
    }
    addInputs(data, form);
    form.submit();
};