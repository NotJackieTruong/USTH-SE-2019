var bean = require('bean');

module.exports = Gallery;

function Gallery(container) {
    this.container = document.querySelector(container);
    this.photoListItems = this.container.querySelectorAll('li');
    this.length = this.photoListItems.length;

    bean.on(this.container, 'click', '.item', function (e) {
        clickHandler.call(this, e)
    });

    for (var i = 0; i < this.length; ++i) {
        if (i !== 0) {
            hide(this.photoListItems.item(i));
        }
    }
}

function clickHandler(e) {
    var el = e.currentTarget;
    var img = el.querySelector('img');
    var width = img.width;
    var half = width / 2;
    var x = e.clientX;

    hide(el);
    if (half <= x) {
        if (el.nextElementSibling) {
            show(el.nextElementSibling);
        } else {
            show(this.photoListItems.item(0));
        }
    } else if (half >= x) {
        if (el.previousElementSibling) {
            show(el.previousElementSibling);
        } else {
            show(this.photoListItems.item(this.length - 1));
        }
    }
}

function hide(el) {
    el.style.display = 'none';
}

function show(el) {
    el.style.display = 'block';
}
