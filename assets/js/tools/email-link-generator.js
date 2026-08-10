(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var to = document.getElementById('to');
        var subject = document.getElementById('subject');
        var cc = document.getElementById('cc');
        var bcc = document.getElementById('bcc');
        var body = document.getElementById('body');
        var result = document.getElementById('result');
        var generateBtn = document.getElementById('generate-btn');
        var copyBtn = document.getElementById('copy-btn');

        function generateLink() {
            if (!to.value.trim()) {
                if (result) result.innerHTML = '<span style="color:var(--color-error)">Please enter a recipient email.</span>';
                return;
            }

            var email = encodeURIComponent(to.value.trim());
            var params = [];
            if (subject.value.trim()) params.push('subject=' + encodeURIComponent(subject.value.trim()));
            if (cc.value.trim()) params.push('cc=' + encodeURIComponent(cc.value.trim()));
            if (bcc.value.trim()) params.push('bcc=' + encodeURIComponent(bcc.value.trim()));
            if (body.value.trim()) params.push('body=' + encodeURIComponent(body.value.trim()));

            var link = 'mailto:' + email;
            if (params.length > 0) {
                link += '?' + params.join('&');
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
