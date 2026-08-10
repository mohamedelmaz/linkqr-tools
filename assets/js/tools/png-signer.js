(function (global) {
  'use strict';

  function crc32(bytes) {
    var crc = -1;
    for (var i = 0; i < bytes.length; i++) {
      crc ^= bytes[i];
      for (var j = 0; j < 8; j++) {
        var mask = -(crc & 1);
        crc = (crc >>> 1) ^ (0xEDB88320 & mask);
      }
    }
    return crc ^ -1;
  }

  function readUint32(dataView, offset) {
    return (dataView.getUint8(offset) << 24) |
           (dataView.getUint8(offset + 1) << 16) |
           (dataView.getUint8(offset + 2) << 8) |
           dataView.getUint8(offset + 3);
  }

  function signPngDataUrl(dataUrl) {
    try {
      var base64 = dataUrl.split(',')[1];
      if (!base64) return dataUrl;
      var binary = atob(base64);
      var len = binary.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      var view = new DataView(bytes.buffer);
      var offset = 0;

      if (bytes.length < 8) return dataUrl;
      var sig = [137, 80, 78, 71, 13, 10, 26, 10];
      for (i = 0; i < 8; i++) {
        if (bytes[i] !== sig[i]) return dataUrl;
      }
      offset = 8;

      var ihdrOffset = -1;
      while (offset + 8 <= bytes.length) {
        var chunkLen = readUint32(view, offset);
        var chunkType = String.fromCharCode(
          bytes[offset + 4],
          bytes[offset + 5],
          bytes[offset + 6],
          bytes[offset + 7]
        );
        if (chunkType === 'IHDR') {
          ihdrOffset = offset;
          break;
        }
        offset += 12 + chunkLen;
        if (chunkType === 'IDAT' || chunkType === 'IEND') break;
      }

      if (ihdrOffset === -1) return dataUrl;

      var keyword = 'Copyright';
      var text = 'LinkQR Tools - https://linkqr.tools - Free unlimited watermark-free QR codes';
      var textData = new Uint8Array(keyword.length + 1 + text.length);
      for (i = 0; i < keyword.length; i++) {
        textData[i] = keyword.charCodeAt(i);
      }
      textData[keyword.length] = 0;
      for (i = 0; i < text.length; i++) {
        textData[keyword.length + 1 + i] = text.charCodeAt(i);
      }

      var chunkTypeBytes = new Uint8Array([84, 69, 88, 84]);
      var newChunkLen = textData.length;
      var newChunkData = new Uint8Array(4 + 4 + newChunkLen + 4);
      var pos = 0;
      newChunkData[pos++] = (newChunkLen >> 24) & 0xff;
      newChunkData[pos++] = (newChunkLen >> 16) & 0xff;
      newChunkData[pos++] = (newChunkLen >> 8) & 0xff;
      newChunkData[pos++] = newChunkLen & 0xff;
      newChunkData.set(chunkTypeBytes, pos);
      pos += 4;
      newChunkData.set(textData, pos);
      pos += newChunkLen;

      var crcInput = new Uint8Array(4 + newChunkLen);
      crcInput.set(chunkTypeBytes, 0);
      crcInput.set(textData, 4);
      var crcVal = crc32(crcInput);
      newChunkData[pos++] = (crcVal >> 24) & 0xff;
      newChunkData[pos++] = (crcVal >> 16) & 0xff;
      newChunkData[pos++] = (crcVal >> 8) & 0xff;
      newChunkData[pos++] = crcVal & 0xff;

      var afterIhdr = ihdrOffset + 12;
      var rest = bytes.subarray(afterIhdr);
      var result = new Uint8Array(8 + newChunkData.length + rest.length);
      result.set(bytes.subarray(0, 8), 0);
      result.set(newChunkData, 8);
      result.set(rest, 8 + newChunkData.length);

      var binaryOut = '';
      for (i = 0; i < result.length; i++) {
        binaryOut += String.fromCharCode(result[i]);
      }
      return 'data:image/png;base64,' + btoa(binaryOut);
    } catch (e) {
      return dataUrl;
    }
  }

  global.signPngDataUrl = signPngDataUrl;
})(typeof window !== 'undefined' ? window : this);
