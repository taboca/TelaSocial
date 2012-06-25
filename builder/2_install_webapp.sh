echo "Override index.html..."
cp index.html ./installer/build/chrome/tagvisor/content/visor/

echo "Copy YOUR app..."
cp -r ../apps/base/* ./installer/build/chrome/tagvisor/content/visor

echo "Add YOUR prefs..."
cp mybrowser-prefs.js ./installer/build/defaults/preferences/mybrowser-prefs.js


