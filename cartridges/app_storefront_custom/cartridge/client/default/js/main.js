window.jQuery = window.$ = require('jquery');
var processInclude = require('./util');

$(document).ready(function () {
    processInclude(require('./components/test'));
});

