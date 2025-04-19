// ==UserScript==
// @name         Base64 自动检测与跳转
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  检测页面中的 Base64 内容，当复制时自动解码并跳转到目标 URL。
// @author       Phinsin666
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 监听页面的 "copy" 事件
    document.addEventListener('copy', function (event) {
        // 从剪贴板中获取用户复制的文本
        const copiedText = window.getSelection().toString().trim();

        if (copiedText) {
            try {
                // 尝试将复制的文本作为 Base64 解码
                const decodedText = atob(copiedText);

                // 检查解码后的内容是否为有效的 URL
                if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
                    console.log('检测到有效的 Base64 编码 URL:', decodedText);

                    // 自动跳转到目标地址
                    window.location.href = decodedText;
                } else {
                    console.warn('解码后的内容不是有效的 URL:', decodedText);
                }
            } catch (error) {
                console.error('复制的文本不是有效的 Base64 编码:', error);
            }
        }
    });
})();
