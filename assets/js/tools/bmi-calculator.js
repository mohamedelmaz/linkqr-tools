(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var toggle = document.getElementById('unit-toggle');
        var metricInputs = document.getElementById('metric-inputs');
        var imperialInputs = document.getElementById('imperial-inputs');
        var form = document.getElementById('bmi-form');
        var resultBox = document.getElementById('bmi-result');

        toggle.addEventListener('change', function () {
            if (toggle.value === 'metric') {
                metricInputs.style.display = 'block';
                imperialInputs.style.display = 'none';
            } else {
                metricInputs.style.display = 'none';
                imperialInputs.style.display = 'block';
            }
        });

        function getBMICategory(bmi) {
            if (bmi < 18.5) return 'Underweight';
            if (bmi < 25) return 'Normal';
            if (bmi < 30) return 'Overweight';
            return 'Obese';
        }

        function calculateBMI() {
            var heightM, weightKg;

            if (toggle.value === 'metric') {
                var heightCm = parseFloat(document.getElementById('height-cm').value);
                weightKg = parseFloat(document.getElementById('weight-kg').value);
                if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return;
                heightM = heightCm / 100;
            } else {
                var ft = parseFloat(document.getElementById('height-ft').value) || 0;
                var inches = parseFloat(document.getElementById('height-in').value) || 0;
                weightKg = parseFloat(document.getElementById('weight-lb').value);
                if ((ft <= 0 && inches <= 0) || !weightKg || weightKg <= 0) return;
                heightM = ((ft * 12) + inches) * 0.0254;
                weightKg = weightKg * 0.45359237;
            }

            var bmi = weightKg / (heightM * heightM);
            var category = getBMICategory(bmi);
            var low = (18.5 * heightM * heightM).toFixed(1);
            var high = (24.9 * heightM * heightM).toFixed(1);

            document.getElementById('bmi-value').textContent = bmi.toFixed(1);
            document.getElementById('bmi-class').textContent = category;
            document.getElementById('bmi-range').textContent = low + ' kg – ' + high + ' kg';
            resultBox.style.display = 'block';
        }

        if (form) form.addEventListener('submit', calculateBMI);
    });
})();
