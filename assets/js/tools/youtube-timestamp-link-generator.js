(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var url = document.getElementById('url');
        var time = document.getElementById('time');
        var result = document.getElementById('result');
        var generateBtn = document.getElementById('generate-btn');
        var copyBtn = document.getElementById('copy-btn');

        function extractVideoId(url) {
            var patterns = [
                /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
                /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
                /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
                /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
                /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/
            ];
            for (var i = 0; i < patterns.length; i++) {
                var match = url.match(patterns[i]);
                if (match) return match[1];
            }
            return null;
        }

        function generateLink() {
            var videoUrl = url.value.trim();
            var seconds = parseInt(time.value, 10) || 0;
            if (!videoUrl) {
                if (result) result.innerHTML = '<span style="color:var(--color-error)">Please enter a YouTube URL.</span>';
                return;
            }
            var videoId = extractVideoId(videoUrl);
            if (!videoId) {
                if (result) result.innerHTML = '<span style="color:var(--color-error)">Please enter a valid YouTube URL.</span>';
                return;
            }
            var link = 'https://www.youtube.com/watch?v=' + videoId;
            if (seconds > 0) {
                link += '&t=' + seconds + 's';
            }
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
