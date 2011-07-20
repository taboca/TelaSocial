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

cp mybrowser-prefs.js ./installer/build/defaults/preferences/mybrowser-prefs.js 

cp -r ./build/xulrunner-sdk/bin ./installer/build
mv ./installer/build/bin ./installer/build/xulrunner
cp -r ./installer/build/xulrunner/xulrunner ./installer/build/telasocial

zip -r telasocial-output.zip ./installer

echo telasocial-output.zip is your build
