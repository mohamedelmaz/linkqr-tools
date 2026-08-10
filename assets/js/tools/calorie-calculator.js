(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById('calorie-form');
        var resultBox = document.getElementById('calorie-result');

        function calculateCalories() {
            var gender = document.getElementById('gender').value;
            var age = parseFloat(document.getElementById('age').value);
            var height = parseFloat(document.getElementById('height').value);
            var weight = parseFloat(document.getElementById('weight').value);
            var activity = parseFloat(document.getElementById('activity').value);
            var goal = document.getElementById('goal').value;

            if (!age || !height || !weight || age <= 0 || height <= 0 || weight <= 0) return;

            var bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
            var tdee = bmr * activity;

            var target = tdee;
            if (goal === 'lose') target = tdee - 500;
            if (goal === 'gain') target = tdee + 500;

            document.getElementById('bmr-value').textContent = Math.round(bmr);
            document.getElementById('tdee-value').textContent = Math.round(tdee);
            document.getElementById('target-value').textContent = Math.round(target);
            resultBox.style.display = 'block';
        }

        if (form) form.addEventListener('submit', calculateCalories);
    });
})();
