/* ছবি ড্র্যাগ এবং লং-প্রেস ব্লক */
img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    -webkit-touch-callout: none; /* iOS-এ লং-প্রেস মেনু বন্ধ করে */
   // pointer-events: none;        /* ক্লিক/হোভার বন্ধ করে (যদি জুম ইফেক্ট না চাও) */
}

body {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
