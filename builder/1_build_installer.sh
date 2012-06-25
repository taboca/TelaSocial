echo "Creating installer directory..." 

rm -rf ./installer
mkdir ./installer

echo "Copying basic ubuntu install scripts..."
cp -r ../linux/ubuntu-install/* ./installer

echo "Creating installer ./installer/build output binaries..."
mkdir ./installer/build

#cp xorg.conf ./installer/screen/ubuntu/xorg.conf
echo "copy XULRunner..." 
cp -r ./build/xulrunner ./installer/build
cp -r ./installer/build/xulrunner/xulrunner-stub ./installer/build/telasocial

echo "Copying TelaSocial core app..."
cp -r ../xulrunner/base/* ./installer/build

echo "Cleanup base TelaSocial app..."
rm -rf  ./installer/build/chrome/tagvisor/content/visor/*



