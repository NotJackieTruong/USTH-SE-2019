var test = require('tape');
var Photos = require('..');

test('setup', function (t) {
    t.plan(2);
    document.body.innerHTML = '<ul class="photos"><li class="item"><img src="https://farm6.staticflickr.com/5104/5644860063_d78c2bc279_b.jpg"></li><li class="item"><img src="https://farm6.staticflickr.com/5226/5645456042_26c86c428d_b.jpg"></li><li class="item"><img src="https://farm6.staticflickr.com/5149/5645460440_550cc6ae7c_b.jpg"></li><li class="item"><img src="https://farm6.staticflickr.com/5270/5645464484_ce5207db9b_b.jpg"></li></ul>';
    t.ok(document.body, 'Check `document.body` is ok');
    t.ok(Photos, 'Check `photos` is ok');
});

test('basic', function (t) {
    t.plan(2);
    t.equal(document.body.innerHTML, '<ul class="photos"><li class="item"><img src="https://farm6.staticflickr.com/5104/5644860063_d78c2bc279_b.jpg"></li><li class="item"><img src="https://farm6.staticflickr.com/5226/5645456042_26c86c428d_b.jpg"></li><li class="item"><img src="https://farm6.staticflickr.com/5149/5645460440_550cc6ae7c_b.jpg"></li><li class="item"><img src="https://farm6.staticflickr.com/5270/5645464484_ce5207db9b_b.jpg"></li></ul>');
    var g = new Photos('.photos');
    var items = document.querySelectorAll('.item');
    var firstItem = items.item(0);
    var secondItem = items.item(1);
    var firstImg = firstItem.querySelector('img');

    t.equal(secondItem.style.display, 'none');
});
