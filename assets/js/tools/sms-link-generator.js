(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var phone = document.getElementById('phone');
        var message = document.getElementById('message');
        var result = document.getElementById('result');
        var generateBtn = document.getElementById('generate-btn');
        var copyBtn = document.getElementById('copy-btn');

        function generateLink() {
            var phoneNumber = phone.value.replace(/[^0-9+]/g, '');
            if (!phoneNumber) {
                if (result) result.innerHTML = '<span style="color:var(--color-error)">Please enter a phone number.</span>';
                return;
            }

            var text = message ? message.value.trim() : '';
            var link = 'sms:' + phoneNumber;
            if (text) {
                var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                link += (isIOS ? '&' : '?') + 'body=' + encodeURIComponent(text);
            }

            if (result) result.innerHTML = '<a href="' + link + '">' + link + '</a>';
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

        if (generateBtn) generateBtn.addEventListener('click', generateLink);
        if (copyBtn) copyBtn.addEventListener('click', copyLink);
    });
})();
