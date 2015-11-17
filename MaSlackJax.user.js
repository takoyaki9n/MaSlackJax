// ==UserScript==
// @name         MaSlackJax
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  User script that enable mathjax on slack
// @author       wtr816
// @match        https://*.slack.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// @run-at       document-start
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function($) {
    $(document).ready(function(){
        var conf = {TeX: {extensions: ["AMScd.js"]}, tex2jax: {inlineMath: [["$","$"]]}, displayMath: [["\\[","\\]"]]};
        var tags = '';
        tags += `<script type="text/x-mathjax-config">MathJax.Hub.Config(${JSON.stringify(conf)});</script>`
        tags += '<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>';
        tags += '<meta http-equiv="X-UA-Compatible" CONTENT="IE=EmulateIE7" />';
        $("head").append($(tags));

        var msgs_div = $("#msgs_div")[0];
        var observer = new MutationObserver(function (mutations) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, msgs_div]);
        });
        var config = { attributes: false, childList: true, characterData: false};
        observer.observe(msgs_div, config);
    });
})(jQuery);
