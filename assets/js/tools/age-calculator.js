(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var dobInput = document.getElementById('dob');
        var refInput = document.getElementById('ref-date');
        var form = document.getElementById('age-form');
        var resultBox = document.getElementById('age-result');

        if (refInput) {
            refInput.value = new Date().toISOString().split('T')[0];
        }

        function calculateAge() {
            var dob = new Date(dobInput.value + 'T00:00:00');
            var ref = refInput.value ? new Date(refInput.value + 'T00:00:00') : new Date();
            ref.setHours(0, 0, 0, 0);

            if (isNaN(dob.getTime())) return;

            var years = ref.getFullYear() - dob.getFullYear();
            var months = ref.getMonth() - dob.getMonth();
            var days = ref.getDate() - dob.getDate();

            if (days < 0) {
                months--;
                var prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0);
                days += prevMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            var diffTime = Math.abs(ref - dob);
            var totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            var totalWeeks = Math.floor(totalDays / 7);
            var totalMonths = years * 12 + months;

            var nextBirthday = new Date(ref.getFullYear(), dob.getMonth(), dob.getDate());
            if (nextBirthday <= ref) {
                nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
            }
            var daysUntil = Math.ceil((nextBirthday - ref) / (1000 * 60 * 60 * 24));

            document.getElementById('age-ymd').textContent = years + ' years, ' + months + ' months, ' + days + ' days';
            document.getElementById('total-days').textContent = totalDays.toLocaleString();
            document.getElementById('total-weeks').textContent = totalWeeks.toLocaleString();
            document.getElementById('total-months').textContent = totalMonths.toLocaleString();
            document.getElementById('days-until').textContent = daysUntil + ' days';

            resultBox.style.display = 'block';
        }

        if (form) form.addEventListener('submit', calculateAge);
    });
})();
