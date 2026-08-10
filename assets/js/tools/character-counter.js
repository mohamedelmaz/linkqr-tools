(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var textarea = document.getElementById('text');
        var charCount = document.getElementById('char-count');
        var charNoSpaceCount = document.getElementById('char-no-space-count');
        var wordCount = document.getElementById('word-count');
        var sentenceCount = document.getElementById('sentence-count');
        var lineCount = document.getElementById('line-count');
        var paragraphCount = document.getElementById('paragraph-count');

        function updateStats() {
            var text = textarea.value;

            charCount.textContent = text.length;
            charNoSpaceCount.textContent = text.replace(/\s/g, '').length;

            var words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
            wordCount.textContent = words;

            var sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(function (s) { return s.trim().length > 0; }).length;
            sentenceCount.textContent = sentences;

            var lines = text.trim() === '' ? 0 : text.split(/\r\n|\r|\n/).length;
            lineCount.textContent = lines;

            var paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(function (p) { return p.trim().length > 0; }).length;
            paragraphCount.textContent = paragraphs;
        }

        if (textarea) textarea.addEventListener('input', updateStats);
        updateStats();
    });
})();
