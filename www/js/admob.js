const AdMob = Capacitor.Plugins.AdMob;


class AdSizeClass {
    BANNER = "BANNER"

    FLUID = "FLUID"

    FULL_BANNER = "FULL_BANNER"

    LARGE_BANNER = "LARGE_BANNER"

    LEADERBOARD = "LEADERBOARD"

    MEDIUM_RECTANGLE = "MEDIUM_RECTANGLE"

    SMART_BANNER = "SMART_BANNER"
    CUSTOM = "CUSTOM"
}

class AdPositionClass {
    TOP_CENTER = "TOP_CENTER"

    CENTER = "CENTER"

    BOTTOM_CENTER = "BOTTOM_CENTER"
}
const AdPosition = new AdPositionClass();
const AdSize = new AdSizeClass();

class AdMobService {
    initAdMob() {
        AdMob.initialize("ca-app-pub-9898422851384315~2904505297");
        AdMob.addListener({eventName: 'onAdLoaded', listenerFunc: (d)=>{console.log("onAdLoaded",d)}});
        AdMob.addListener({eventName: 'onAdFailedToLoad', listenerFunc: (d)=>{console.log("onAdFailedToLoad",d)}});
        AdMob.addListener({eventName: 'onAdOpened', listenerFunc: (d)=>{console.log("onAdOpened",d)}});
        AdMob.addListener({eventName: 'onAdClosed', listenerFunc: (d)=>{console.log("onAdClosed",d)}});
    }

    showBanner() {
        let options = {
            adId: "ca-app-pub-9898422851384315/9278341958",
            adSize: AdSize.BANNER,
            position: AdPosition.BOTTOM_CENTER
        };

        // Show Banner Ad
        AdMob.showBanner(options).then(
            value => {
                console.log("Admob ad shown", value); // true
            },
            error => {
                console.error("err",error); // show error
            }
        );

        // Subscibe Banner Event Listener
        AdMob.addListener("onAdLoaded", (info) => {
            console.log("Banner Ad Loaded");
        });
    }

    prepareInterstitial() {
        let options = {
            adId: "ca-app-pub-9898422851384315/5923666284",
            adSize: AdSize.SMART_BANNER,
            position: AdPosition.BOTTOM_CENTER,
            hasTabBar: false, // make it true if you have TabBar Layout.
            tabBarHeight: 56
        };

        // Show Banner Ad
        AdMob.prepareInterstitial(options).then(
            value => {
                console.log("Admob Interstitial", value); // true
            },
            error => {
                console.error(error); // show error
            }
        );

        // Subscibe Banner Event Listener
        AdMob.addListener("onAdLoaded", (info) => {
            console.log("Admob Interstitial Loaded");
            this.showInterstitial();
            setInterval(() => {
                this.showInterstitial();
            }, 30000);
        });
    }

    showInterstitial() {
        AdMob.showInterstitial().then(() => {
            console.log("INterstitial loaded")
        }).catch(() => {
            console.log("INterstitial failed")
        });
    }
}

const adMob = new AdMobService();
window.adMob = adMob;
