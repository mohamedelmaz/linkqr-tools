(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var username = document.getElementById('username');
        var result = document.getElementById('result');
        var generateBtn = document.getElementById('generate-btn');
        var copyBtn = document.getElementById('copy-btn');

        function generateLink() {
            var user = username.value.trim().replace('@', '');
            if (!user) {
                if (result) result.innerHTML = '<span style="color:var(--color-error)">Please enter a username or ID.</span>';
                return;
            }
            if (!/^[a-zA-Z0-9_]+$/.test(user)) {
                if (result) result.innerHTML = '<span style="color:var(--color-error)">Invalid username. Only letters, numbers, and underscores allowed.</span>';
                return;
            }
            var link = 'https://t.me/' + user;
            if (result) result.innerHTML = '<a href="' + link + '" target="_blank" rel="noopener noreferrer">' + link + '</a>';
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
