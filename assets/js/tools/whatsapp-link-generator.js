(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var cc = document.getElementById('cc');
        var phone = document.getElementById('phone');
        var message = document.getElementById('message');
        var result = document.getElementById('result');
        var qrArea = document.getElementById('qr-area');
        var qr = document.getElementById('qr');
        var copyBtn = document.getElementById('copy-btn');
        var downloadBtn = document.getElementById('download-btn');
        var generateBtn = document.getElementById('generate-btn');

        function generateLink() {
            var countryCode = cc.value.replace(/[^0-9]/g, '');
            var phoneNumber = phone.value.replace(/[^0-9]/g, '');

            if (!countryCode || !phoneNumber) {
                if (result) {
                    result.innerHTML = '<span style="color:var(--color-error)">Please enter a valid phone number.</span>';
                }
                if (qrArea) qrArea.style.display = 'none';
                return;
            }

            var fullNumber = countryCode + phoneNumber;
            fullNumber = fullNumber.replace(/^0+/, '');

            var text = message ? message.value.trim() : '';
            var link = 'https://wa.me/' + fullNumber;
            if (text) {
                link += '?text=' + encodeURIComponent(text);
            }

            if (result) {
                result.innerHTML = '<a href="' + link + '" target="_blank" rel="noopener noreferrer">' + link + '</a>';
            }

            if (qrArea) qrArea.style.display = 'block';

            if (typeof QRCode !== 'undefined' && qr) {
                qr.innerHTML = '';
                new QRCode(qr, {
                    text: link,
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

        function copyLink() {
            var linkEl = result ? result.querySelector('a') : null;
            if (!linkEl) return;
            var text = linkEl.getAttribute('href') || linkEl.textContent;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function () {
                    if (copyBtn) copyBtn.textContent = 'Copied!';
                    setTimeout(function () { if (copyBtn) copyBtn.textContent = 'Copy Link'; }, 2000);
                });
            } else {
                var tempInput = document.createElement('input');
                tempInput.value = text;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                if (copyBtn) copyBtn.textContent = 'Copied!';
                setTimeout(function () { if (copyBtn) copyBtn.textContent = 'Copy Link'; }, 2000);
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
            a.download = 'whatsapp-qr.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        if (generateBtn) generateBtn.addEventListener('click', generateLink);
        if (copyBtn) copyBtn.addEventListener('click', copyLink);
        if (downloadBtn) downloadBtn.addEventListener('click', downloadQR);
    });
})();
