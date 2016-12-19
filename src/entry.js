var css = require("./main.css");
var Vue = require('vue/dist/vue.js')

new Vue({
    el: '#app-content',
    methods: {
        filterMusics: function (event) {
            let $folder = document.getElementById('folder-selector');
            let $level = document.getElementById('level-selector');
            let $isUndefinedShown = document.getElementById('isUndefinedShown');
            let $rows = Array.apply(null, document.querySelectorAll('.musics tbody tr'));
            for (var i = $rows.length; i>=0; i--) {
                let $row = $rows[i];
                if ($row === undefined) {
                    continue;
                }
                let checkedFolder = function () {
                    if (!!!$folder) {
                        return true;
                    }
                    return $folder.value === "ALL"
                        || $row.cells[0].innerText.substring(0, 1) === $folder.value;
                }();
                let checkedLevel = function () {
                    if (!!!$level) {
                        return true;
                    }
                    return $level.value === "ALL"
                        || $row.cells[1].innerText.substring(0, 1) === $level.value;
                }();
                if (checkedFolder && checkedLevel) {
                    $row.style.display = 'table-row';
                } else {
                    $row.style.display = 'none';
                }
            }
        },
        toggleUndefinedShown: function(event) {
            let $rows = Array.apply(null, document.querySelectorAll('.musics tbody tr'));
            for (var i = $rows.length; i>=0; i--) {
                let $row = $rows[i];
                if ($row === undefined) {
                    continue;
                }
                if ($row.cells[0].innerText.substring(0, 1) !== "") {
                    continue;
                }
                if (event.target.checked) {
                    $row.style.display = 'table-row';
                } else {
                    $row.style.display = 'none';
                }
            }
        },
    },
});