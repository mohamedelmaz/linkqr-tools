(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var firstName = document.getElementById('firstName');
        var lastName = document.getElementById('lastName');
        var phone = document.getElementById('phone');
        var email = document.getElementById('email');
        var org = document.getElementById('org');
        var url = document.getElementById('url');
        var result = document.getElementById('result');
        var qrArea = document.getElementById('qr-area');
        var qr = document.getElementById('qr');
        var generateBtn = document.getElementById('generate-btn');
        var downloadBtn = document.getElementById('download-btn');

        function generateQR() {
            var fname = firstName.value.trim();
            var lname = lastName.value.trim();

            if (!fname && !lname) {
                if (result) result.innerHTML = '<span style="color:var(--color-error)">Please enter at least a first or last name.</span>';
                if (qrArea) qrArea.style.display = 'none';
                return;
            }

            var vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
            if (fname || lname) vcard += 'N:' + (lname || '') + ';' + fname + ';;;\n';
            if (fname && lname) vcard += 'FN:' + fname + ' ' + lname + '\n';
            if (phone.value.trim()) vcard += 'TEL;TYPE=CELL:' + phone.value.trim() + '\n';
            if (email.value.trim()) vcard += 'EMAIL;TYPE=WORK:' + email.value.trim() + '\n';
            if (org.value.trim()) vcard += 'ORG:' + org.value.trim() + '\n';
            if (url.value.trim()) vcard += 'URL:' + url.value.trim() + '\n';
            vcard += 'END:VCARD';

            if (result) result.innerHTML = '<code>' + vcard.replace(/\n/g, '<br>') + '</code>';

            if (qrArea) qrArea.style.display = 'block';

            if (typeof QRCode !== 'undefined' && qr) {
                qr.innerHTML = '';
                new QRCode(qr, {
                    text: vcard,
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
            var urlData = null;

            if (canvas) {
                urlData = canvas.toDataURL('image/png');
            } else if (img) {
                urlData = img.src;
            }

            if (!urlData) {
                alert('QR code not ready yet.');
                return;
            }

            var a = document.createElement('a');
            a.href = urlData;
            a.download = 'vcard-qr.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        if (generateBtn) generateBtn.addEventListener('click', generateQR);
        if (downloadBtn) downloadBtn.addEventListener('click', downloadQR);
    });
})();
