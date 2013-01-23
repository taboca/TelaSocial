
echo "Copy YOUR app..."
#cp -r ../apps/base/* ./installer/build/chrome/tagvisor/content/visor

echo "Override index.html... PS: our index.html calls index2.html from the web app"
cp index.html ./installer/build/chrome/tagvisor/content/visor/

echo "Add YOUR prefs..."
cp mybrowser-prefs.js ./installer/build/defaults/preferences/mybrowser-prefs.js

echo "*** Build directory installed - you can zip or install from ./installer ***"
