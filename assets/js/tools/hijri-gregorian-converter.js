(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var gregorianInput = document.getElementById('gregorian-input');
        var hijriInput = document.getElementById('hijri-input');
        var toHijriBtn = document.getElementById('to-hijri-btn');
        var toGregorianBtn = document.getElementById('to-gregorian-btn');
        var resultBox = document.getElementById('hijri-result');
        var resultText = document.getElementById('result-text');

        function pad(n) { return n < 10 ? '0' + n : '' + n; }

        function formatGregorian(date) {
            return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
        }

        function formatHijri(date) {
            var parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).formatToParts(date);

            var y = parts.find(function (p) { return p.type === 'year'; }).value;
            var m = parts.find(function (p) { return p.type === 'month'; }).value;
            var d = parts.find(function (p) { return p.type === 'day'; }).value;
            return y + '-' + m + '-' + d;
        }

        function setToday() {
            var today = new Date();
            document.getElementById('today-gregorian').textContent = formatGregorian(today);
            document.getElementById('today-hijri').textContent = formatHijri(today);
        }

        setToday();

        toHijriBtn.addEventListener('click', function () {
            if (!gregorianInput.value) return;
            var date = new Date(gregorianInput.value + 'T00:00:00');
            if (isNaN(date.getTime())) return;

            var hijri = formatHijri(date);
            resultText.textContent = 'Gregorian ' + formatGregorian(date) + ' = Hijri ' + hijri;
            resultBox.style.display = 'block';
        });

        toGregorianBtn.addEventListener('click', function () {
            var parts = hijriInput.value.split('-');
            if (parts.length !== 3) return;

            var targetY = parseInt(parts[0], 10);
            var targetM = parseInt(parts[1], 10);
            var targetD = parseInt(parts[2], 10);

            var found = null;
            for (var y = 1900; y <= 2076; y++) {
                for (var m = 1; m <= 12; m++) {
                    for (var d = 1; d <= 31; d++) {
                        var testDate = new Date(y, m - 1, d);
                        var hijriParts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        }).formatToParts(testDate);

                        var hy = parseInt(hijriParts.find(function (p) { return p.type === 'year'; }).value, 10);
                        var hm = parseInt(hijriParts.find(function (p) { return p.type === 'month'; }).value, 10);
                        var hd = parseInt(hijriParts.find(function (p) { return p.type === 'day'; }).value, 10);

                        if (hy === targetY && hm === targetM && hd === targetD) {
                            found = testDate;
                            break;
                        }
                    }
                    if (found) break;
                }
                if (found) break;
            }

            if (found) {
                resultText.textContent = 'Hijri ' + hijriInput.value + ' = Gregorian ' + formatGregorian(found);
                resultBox.style.display = 'block';
            } else {
                resultText.textContent = 'No matching Gregorian date found in range 1900–2076.';
                resultBox.style.display = 'block';
            }
        });
    });
})();
