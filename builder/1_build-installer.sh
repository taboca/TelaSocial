rm -rf ./telasocial-output.zip
rm -rf ./installer
rm -rf TelaSocial
git clone git://github.com/taboca/TelaSocial.git
mkdir ./installer
echo .
cp -r ./TelaSocial/linux/ubuntu-install/* ./installer
echo .
mkdir ./installer/build
cp -r ./TelaSocial/xulrunner/base/* ./installer/build
rm -rf  ./installer/build/chrome/tagvisor/content/visor/*
cp index.html ./installer/build/chrome/tagvisor/content/visor/

# local
cp -r ../apps/ifsc-usp-v2/* ./installer/build/chrome/tagvisor/content/visor

cp mybrowser-prefs.js ./installer/build/defaults/preferences/mybrowser-prefs.js
#cp xorg.conf ./installer/screen/ubuntu/xorg.conf
cp -r ./build/xulrunner ./installer/build
cp -r ./installer/build/xulrunner/xulrunner-stub ./installer/build/telasocial
zip -r telasocial-ifsc.zip ./installer
echo telasocial-output.zip is your build

