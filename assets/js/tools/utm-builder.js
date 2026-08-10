(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var url = document.getElementById('url');
        var source = document.getElementById('source');
        var medium = document.getElementById('medium');
        var name = document.getElementById('name');
        var term = document.getElementById('term');
        var content = document.getElementById('content');
        var result = document.getElementById('result');
        var generateBtn = document.getElementById('generate-btn');
        var copyBtn = document.getElementById('copy-btn');

        function buildLink() {
            var baseUrl = url.value.trim();
            if (!baseUrl) {
                if (result) result.innerHTML = '<span style="color:var(--color-error)">Please enter a URL.</span>';
                return;
            }

            var utmParams = [];
            if (source.value.trim()) utmParams.push('utm_source=' + encodeURIComponent(source.value.trim()));
            if (medium.value.trim()) utmParams.push('utm_medium=' + encodeURIComponent(medium.value.trim()));
            if (name.value.trim()) utmParams.push('utm_campaign=' + encodeURIComponent(name.value.trim()));
            if (term.value.trim()) utmParams.push('utm_term=' + encodeURIComponent(term.value.trim()));
            if (content.value.trim()) utmParams.push('utm_content=' + encodeURIComponent(content.value.trim()));

            var separator = baseUrl.indexOf('?') !== -1 ? '&' : '?';
            var link = baseUrl + separator + utmParams.join('&');

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

        if (generateBtn) generateBtn.addEventListener('click', buildLink);
        if (copyBtn) copyBtn.addEventListener('click', copyLink);
    });
})();
