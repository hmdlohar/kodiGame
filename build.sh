printf  "Select Option. 1) React Build->Build-> Install\n2)Build->Install\n3)Install:\n"
read CH

APPDIR=$(pwd)

#Build APK
if [ $CH == "1" ]
then
    # npm run build
    npx cap copy
fi

# Sign APK
if [ $CH == "1" -o  $CH == "2" ]
then
    cd android
	./gradlew assembleDebug
fi

if [ $CH == "1" -o  $CH == "2" -o  $CH == "3" ]
then

	echo "Installing..."
	#adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk
	adb install -r "$APPDIR/android/app/build/outputs/apk/debug/app-debug.apk"
fi