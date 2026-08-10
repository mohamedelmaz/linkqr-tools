/* LinkQR Tools SDK — https://linkqr.tools */
(function(root) {
    'use strict';

    var LinkQR = {};

    function escapeWiFi(str) {
        if (str == null) return '';
        return String(str)
            .replace(/\\/g, '\\\\')
            .replace(/;/g, '\\;')
            .replace(/:/g, '\\:')
            .replace(/,/g, '\\,')
            .replace(/"/g, '\\"');
    }

    function buildQuery(params) {
        var qs = [];
        for (var key in params) {
            if (params.hasOwnProperty(key) && params[key] != null && params[key] !== '') {
                qs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
            }
        }
        return qs.length ? '?' + qs.join('&') : '';
    }

    LinkQR.whatsapp = function(cc, phone, msg) {
        return 'https://wa.me/' + encodeURIComponent(cc + phone) + buildQuery({ text: msg });
    };

    LinkQR.telegram = function(user) {
        return 'https://t.me/' + encodeURIComponent(user);
    };

    LinkQR.sms = function(phone, msg) {
        return 'sms:' + encodeURIComponent(phone) + buildQuery({ body: msg });
    };

    LinkQR.mailto = function(to, opts) {
        opts = opts || {};
        var qs = {};
        if (opts.subject) qs.subject = opts.subject;
        if (opts.cc) qs.cc = opts.cc;
        if (opts.bcc) qs.bcc = opts.bcc;
        if (opts.body) qs.body = opts.body;
        return 'mailto:' + to + buildQuery(qs);
    };

    LinkQR.wifi = function(ssid, pass, enc, hidden) {
        var s = 'WIFI:S:' + escapeWiFi(ssid) + ';T:' + escapeWiFi(enc || 'nopass') + ';P:' + escapeWiFi(pass) + ';H:' + (hidden ? 'true' : 'false') + ';;';
        return s;
    };

    LinkQR.vcard = function(obj) {
        obj = obj || {};
        var lines = ['BEGIN:VCARD', 'VERSION:3.0'];
        var firstName = obj.firstName || '';
        var lastName = obj.lastName || '';
        lines.push('N:' + escapeWiFi(lastName) + ';' + escapeWiFi(firstName) + ';;;');
        if (firstName || lastName) {
            lines.push('FN:' + escapeWiFi(firstName + (firstName && lastName ? ' ' : '') + lastName));
        }
        if (obj.org) lines.push('ORG:' + escapeWiFi(obj.org));
        if (obj.phone) lines.push('TEL:' + escapeWiFi(obj.phone));
        if (obj.email) lines.push('EMAIL:' + escapeWiFi(obj.email));
        if (obj.url) lines.push('URL:' + escapeWiFi(obj.url));
        lines.push('END:VCARD');
        return lines.join('\n');
    };

    LinkQR.utm = function(url, params) {
        var u = new URL(url, window.location.href);
        if (params.source) u.searchParams.set('utm_source', params.source);
        if (params.medium) u.searchParams.set('utm_medium', params.medium);
        if (params.campaign) u.searchParams.set('utm_campaign', params.campaign);
        if (params.term) u.searchParams.set('utm_term', params.term);
        if (params.content) u.searchParams.set('utm_content', params.content);
        return u.toString();
    };

    LinkQR.youtube = function(url, sec) {
        var videoId = '';
        var m;
        if ((m = url.match(/[?&]v=([^&#]+)/))) {
            videoId = m[1];
        } else if ((m = url.match(/youtu\.be\/([^?&#]+)/))) {
            videoId = m[1];
        } else if ((m = url.match(/youtube\.com\/embed\/([^?&#]+)/))) {
            videoId = m[1];
        } else if ((m = url.match(/youtube\.com\/shorts\/([^?&#]+)/))) {
            videoId = m[1];
        }
        if (!videoId) return url;
        sec = sec || 0;
        return 'https://www.youtube.com/watch?v=' + encodeURIComponent(videoId) + '&t=' + encodeURIComponent(sec) + 's';
    };

    LinkQR.qr = function(text, el, size) {
        if (!text || !el) return;
        size = size || 256;

        if (typeof window.QRCode === 'function' && window.QRCode.prototype && typeof window.QRCode.prototype.toCanvas === 'function') {
            window.QRCode.toCanvas(el, text, { width: size, height: size });
            return;
        }

        if (typeof window.QRCode === 'function') {
            new window.QRCode(el, {
                text: text,
                width: size,
                height: size
            });
            return;
        }

        if (typeof window.qrcode === 'function') {
            window.qrcode(el, text);
            return;
        }

        if (el.tagName === 'CANVAS') {
            var ctx = el.getContext('2d');
            el.width = size;
            el.height = size;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, size, size);
            ctx.fillStyle = '#000000';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('QR library not found', size / 2, size / 2);
        }
    };

    root.LinkQR = LinkQR;
})(typeof window !== 'undefined' ? window : this);
