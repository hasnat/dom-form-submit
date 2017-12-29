require('jsdom-global')();
const test = require('tape');
const submit = require('./index.js');

const clearDOM = (html = '') => {
    document.body.innerHTML = html;
};

test('Creates form', (t) => {
    submit({}, {
        submit: () => {
            const forms = document.forms;
            t.equal(forms.length, 1);
            t.end();
        }
    })
});

test('Creates form by name', (t) => {
    submit({}, {
        name: 'testForm',
        submit: () => {
            const forms = document.getElementsByName('testForm');
            t.equal(forms.length, 1);
            t.end();
        }
    })
});

test('Creates form by id', (t) => {
    submit({}, {
        id: 'testForm',
        submit: () => {
            const elements = !!document.getElementById('testForm');
            t.equal(elements, true);
            t.end();
        }
    })
});


test('Created forms are display none', (t) => {
    clearDOM('<form id="existingForm" ><input name="a" value="testvalue" /></form>');
    submit({}, {
        id: 'newTestForm',
        submit: () => {
            t.equal(document.getElementById('existingForm').style.display, '');
            t.equal(document.getElementById('newTestForm').style.display, 'none');
            t.end();
        }
    })
});

test('Creates elements', (t) => {
    clearDOM();
    submit({a: '1', b: '2', c: '3'}, {
        submit: () => {
            const data = new FormData(document.forms[0]);
            t.equal(data.get('a'), '1');
            t.equal(data.get('b'), '2');
            t.equal(data.get('c'), '3');
            t.end();
        }
    })
});

test('Created elements are type hidden', (t) => {
    clearDOM('<form id="existingForm" ><input name="a" type="text" /></form>');
    submit({b: '2'}, {
        id: 'existingForm',
        submit: () => {
            const form = document.forms[0];
            t.equal(form.elements.namedItem('a').type, 'text');
            t.equal(form.elements.namedItem('b').type, 'hidden');
            t.end();
        }
    })
});

test('Reuse existing form', (t) => {
    clearDOM('<form id="testForm" ><input name="a" value="test" /></form>');
    submit({}, {
        id: 'testForm',
        submit: () => {
            const data = new FormData(document.forms[0]);
            t.equal(data.get('a'), 'test');
            t.end();
        }
    })
});

test('Add elements to existing form', (t) => {
    clearDOM('<form id="testForm" ><input name="a" value="testvalue" /></form>');
    submit({b: 'test2'}, {
        id: 'testForm',
        submit: () => {
            const data = new FormData(document.forms[0]);
            t.equal(data.get('a'), 'testvalue');
            t.equal(data.get('b'), 'test2');
            t.end();
        }
    });
});

test('Update existing elements value in form', (t) => {
    clearDOM('<form id="testForm" ><input name="a" value="testvalue" /></form>');
    submit({a: 'test1', b: 'test2'}, {
        id: 'testForm',
        submit: () => {
            const data = new FormData(document.forms[0]);
            t.equal(data.get('a'), 'test1');
            t.equal(data.get('b'), 'test2');
            t.end();
        }
    });
});

test('Add/Update multiple elements in form', (t) => {
    clearDOM(`
<form id="testForm" >
    <input name="a" value="testvalue1" />
    <input name="b" value="testvalue2" />
    <input name="c" value="testvalue3" />
</form>
`);
    submit({
        a: 'test1',
        b: 'test2',
        d: 'test4',
        e: 'test5',
        f: 'test6',
    }, {
        id: 'testForm',
        submit: () => {
            const data = new FormData(document.forms[0]);
            t.equal(data.get('a'), 'test1');
            t.equal(data.get('b'), 'test2');
            t.equal(data.get('c'), 'testvalue3');
            t.equal(data.get('d'), 'test4');
            t.equal(data.get('e'), 'test5');
            t.equal(data.get('f'), 'test6');
            t.end();
        }
    });
});

test('If radio box, set given value checked', (t) => {
    clearDOM(`
<form id="testForm" >
    <input name="a" value="testvalue1" type="radio" />
    <input name="a" value="testvalue2" type="radio" />
    <input name="a" value="testvalue3" type="radio" />
</form>
`);
    submit({
        a: 'testvalue2'
    }, {
        id: 'testForm',
        submit: () => {
            t.equal(document.forms[0].elements.namedItem('a').value, 'testvalue2');
            t.end();
        }
    });
});

test('If radio box, select checked as form value', (t) => {
    clearDOM(`
<form id="testForm" >
    <input name="a" value="testvalue1" type="radio" />
    <input name="a" value="testvalue2" type="radio" />
    <input name="a" value="testvalue3" type="radio" checked="checked"/>
</form>
`);
    submit({}, {
        id: 'testForm',
        submit: () => {
            const data = new FormData(document.forms[0]);
            t.equal(data.get('a'), 'testvalue3');
            t.end();
        }
    });
});

test('If radio box, select first if no checked or value provided', (t) => {
    clearDOM(`
<form id="testForm" >
    <input name="a" value="testvalue1" type="radio" />
    <input name="a" value="testvalue2" type="radio" />
    <input name="a" value="testvalue3" type="radio" />
</form>
`);
    submit({}, {
        id: 'testForm',
        submit: () => {
            t.equal(document.forms[0].elements.namedItem('a').value, 'testvalue1');
            t.end();
        }
    });
});

test('If radio box, update first radio if checked and no provided value match', (t) => {
    clearDOM(`
<form id="testForm" >
    <input name="a" value="testvalue1" type="radio" />
    <input name="a" value="testvalue2" type="radio" />
    <input name="a" value="testvalue3" type="radio" />
</form>
`);
    submit({a: 'updatedValue'}, {
        id: 'testForm',
        submit: () => {
            t.equal(document.forms[0].elements.namedItem('a').value, 'updatedValue');
            t.end();
        }
    });
});