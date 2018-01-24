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
                input = input.filter(function (i) {
                    return i.value == data[el];
                }).pop() || input.filter(function (i) {
                    return i.checked;
                }).pop() || input[0];
                input.checked = true;
            }
            input.name = el;
            input.value = data[el];
        }
    }
};

module.exports = function (data, opts, cb) {
    data = data || {};
    opts = opts || {};
    cb = typeof cb === 'function' ? cb : function() {};
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
    cb(form);
};