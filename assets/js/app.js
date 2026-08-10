/* LinkQR Tools © 2026 — https://linkqr.tools — All rights reserved. */
(function () {
    'use strict';

    function setCurrentYear() {
        var yearEls = document.querySelectorAll('[data-year]');
        yearEls.forEach(function (el) {
            el.textContent = new Date().getFullYear();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setCurrentYear);
    } else {
        setCurrentYear();
    }

    // Tool search filter
    var searchInput = document.getElementById('tool-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            var query = searchInput.value.trim().toLowerCase();
            var cards = document.querySelectorAll('.tool-card');
            cards.forEach(function (card) {
                var text = card.textContent.toLowerCase();
                card.style.display = text.indexOf(query) !== -1 ? '' : 'none';
            });
        });
    }

    // Service Worker registration for offline support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').catch(function () {});
        });
    }

    // Theme Toggle
    (function () {
        var toggle = document.getElementById('theme-toggle');
        var root = document.documentElement;
        var saved = localStorage.getItem('theme');
        if (saved) {
            root.setAttribute('data-theme', saved);
        }
        if (toggle) {
            toggle.addEventListener('click', function () {
                var current = root.getAttribute('data-theme');
                var isDark = current === 'dark' ||
                    (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
                var next = isDark ? 'light' : 'dark';
                root.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
            });
        }
    })();
})();
