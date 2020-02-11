window.plugins.AdMob.setOptions({
    publisherId: "ca-app-pub-9898422851384315/1788517135",
    interstitialAdId: "ca-app-pub-9898422851384315/1959961817",
    bannerAtTop: false, // set to true, to put banner at top
    overlap: true, // set to true, to allow banner overlap webview
    offsetTopBar: false, // set to true to avoid ios7 status bar overlap
    isTesting: false, // receiving test ad
    autoShow: true // auto show interstitial ad when loaded
});


window.plugins.AdMob.createBannerView();
