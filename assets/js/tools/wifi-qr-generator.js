(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var ssid = document.getElementById('ssid');
        var password = document.getElementById('password');
        var encryption = document.getElementById('encryption');
        var hidden = document.getElementById('hidden');
        var result = document.getElementById('result');
        var qrArea = document.getElementById('qr-area');
        var qr = document.getElementById('qr');
        var generateBtn = document.getElementById('generate-btn');
        var downloadBtn = document.getElementById('download-btn');

        function escapeWiFi(str) {
            return str.replace(/([\\;,:"])/g, '\\$1');
        }

        function generateQR() {
            var network = ssid.value.trim();
            var pass = password.value.trim();
            var enc = encryption.value;
            var isHidden = hidden.value;

            if (!network) {
                if (result) result.innerHTML = '<span style="color:var(--color-error)">Please enter a network name.</span>';
                if (qrArea) qrArea.style.display = 'none';
                return;
            }

            var wifiString = 'WIFI:S:' + escapeWiFi(network) + ';T:' + enc + ';P:' + escapeWiFi(pass) + ';H:' + isHidden + ';;';
            if (result) result.innerHTML = '<code>' + wifiString + '</code>';

            if (qrArea) qrArea.style.display = 'block';

            if (typeof QRCode !== 'undefined' && qr) {
                qr.innerHTML = '';
                new QRCode(qr, {
                    text: wifiString,
                    width: 200,
                    height: 200,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.M
                });
            } else if (qrArea) {
                qr.innerHTML = '<p style="color:var(--color-text-light);font-size:0.875rem;">QR library not loaded.</p>';
            }
        }

        function downloadQR() {
            var canvas = qr ? qr.querySelector('canvas') : null;
            var img = qr ? qr.querySelector('img') : null;
            var url = null;

            if (canvas) {
                url = canvas.toDataURL('image/png');
            } else if (img) {
                url = img.src;
            }

            if (!url) {
                alert('QR code not ready yet.');
                return;
            }

            if (typeof window.signPngDataUrl === 'function') { url = window.signPngDataUrl(url); }
            if (!url) { return; }
            var a = document.createElement('a');
            a.href = url;
            a.download = 'wifi-qr.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        if (generateBtn) generateBtn.addEventListener('click', generateQR);
        if (downloadBtn) downloadBtn.addEventListener('click', downloadQR);

        var printSignBtn = document.getElementById('print-sign-btn');
        if (printSignBtn) {
            printSignBtn.addEventListener('click', function () {
                var canvas = qr ? qr.querySelector('canvas') : null;
                var img = qr ? qr.querySelector('img') : null;
                var src = canvas ? canvas.toDataURL('image/png') : (img ? img.src : null);
                if (!src) { alert('Generate the QR code first.'); return; }
                document.getElementById('sign-ssid').textContent = ssid.value.trim();
                document.getElementById('sign-pass').textContent = password.value.trim() || '(open network)';
                document.getElementById('sign-qr').innerHTML = '<img src="' + src + '" alt="WiFi QR code" style="width:220px;height:220px;">';
                document.getElementById('print-sign').hidden = false;
                setTimeout(function () { window.print(); }, 150);
            });
        }
    });
})();
