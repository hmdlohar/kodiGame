/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        // this.receivedEvent('deviceready');
        initAd();
        console.log("device is readu now, init called")
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function initAd() {
    if (window.plugins && window.plugins.AdMob) {
        var ad_units = {
            ios: {
                banner: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx',		//PUT ADMOB ADCODE HERE
                interstitial: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx'	//PUT ADMOB ADCODE HERE
            },
            android: {
                banner: 'ca-app-pub-9898422851384315/1788517135',		//PUT ADMOB ADCODE HERE
                interstitial: 'ca-app-pub-9898422851384315/1246425808'	//PUT ADMOB ADCODE HERE
            }
        };
        var admobid = (/(android)/i.test(navigator.userAgent)) ? ad_units.android : ad_units.ios;

        window.plugins.AdMob.setOptions({
            publisherId: admobid.banner,
            interstitialAdId: admobid.interstitial,
            adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,	//use SMART_BANNER, BANNER, LARGE_BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD
            bannerAtTop: false, // set to true, to put banner at top
            overlap: true, // banner will overlap webview 
            offsetTopBar: false, // set to true to avoid ios7 status bar overlap
            isTesting: false, // receiving test ad
            autoShow: true // auto show interstitial ad when loaded
        });

        registerAdEvents();
        window.plugins.AdMob.createInterstitialView();	//get the interstitials ready to be shown
        window.plugins.AdMob.requestInterstitialAd();

    } else {
        //alert( 'admob plugin not ready' );
    }
}


function registerAdEvents() {
    document.addEventListener('onReceiveAd', function () { console.log("onReceiveAd") });
    document.addEventListener('onFailedToReceiveAd', function (data) { console.log("onFailedToReceiveAd", data) });
    document.addEventListener('onPresentAd', function () { console.log("onPresentAd") });
    document.addEventListener('onDismissAd', function () { console.log("onDismissAd") });
    document.addEventListener('onLeaveToAd', function () { console.log("onLeaveToAd") });
    document.addEventListener('onReceiveInterstitialAd', function () { console.log("onReceiveInterstitialAd") });
    document.addEventListener('onPresentInterstitialAd', function () { console.log("onPresentInterstitialAd") });
    document.addEventListener('onDismissInterstitialAd', function () {
        console.log("onDismissInterstitialAd")
        // window.plugins.AdMob.createInterstitialView();			//REMOVE THESE 2 LINES IF USING AUTOSHOW
        // window.plugins.AdMob.requestInterstitialAd();			//get the next one ready only after the current one is closed
    });
}

//display the banner
function showBannerFunc(){
    window.plugins.AdMob.createBannerView();
}
//display the interstitial
function showInterstitialFunc(){
    window.plugins.AdMob.showInterstitialAd();
}

app.initialize();