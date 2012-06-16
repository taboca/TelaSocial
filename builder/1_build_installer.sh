rm -rf ./telasocial-output.zip
rm -rf ./installer
rm -rf TelaSocial
#git clone git://github.com/taboca/TelaSocial.git
mkdir ./installer
echo .
cp -r ../linux/ubuntu-install/* ./installer
echo .
mkdir ./installer/build
cp -r ../xulrunner/base/* ./installer/build
rm -rf  ./installer/build/chrome/tagvisor/content/visor/*
cp index.html ./installer/build/chrome/tagvisor/content/visor/

# local
cp -r ../app/base/* ./installer/build/chrome/tagvisor/content/visor

cp mybrowser-prefs.js ./installer/build/defaults/preferences/mybrowser-prefs.js

#cp xorg.conf ./installer/screen/ubuntu/xorg.conf
cp -r ./build/xulrunner ./installer/build
cp -r ./installer/build/xulrunner/xulrunner-stub ./installer/build/telasocial
zip -r telasocial.zip ./installer
echo telasocial.zip is your build

