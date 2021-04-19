export const canUseDOM = !!(
    typeof window !== 'undefined' &&
            window.document &&
            window.document.createElement
    );

if (canUseDOM) {
    //example how to load jquery in next.js;
    window.$ = window.jQuery = require('jquery');
}