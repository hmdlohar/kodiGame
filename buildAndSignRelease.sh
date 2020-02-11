printf  "Select Option. 1) Build->Sign-> Install\n2)Sign->Install\n3)Install:\n"
read CH
APPDIR=$(pwd)

#Build APK
if [ $CH == "1" ]
then
    cordova build android --release
fi

# Sign APK
if [ $CH == "1" -o  $CH == "2" ]
then
	#jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keystore/eyewynk.keystore platforms/android/app/build/outputs/apk/debug/app-debug.apk eyewynk_alias
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "$APPDIR/keystore/key180830.jks" "$APPDIR/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk" key180830
fi

if [ $CH == "1" -o  $CH == "2" -o  $CH == "3" ]
then

	echo "Installing..."
	#adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk
	adb install -r "$APPDIR/android/app/build/outputs/apk/release/app-release-unsigned.apk"
fi