
mkdir /usr/lib/taboca
cp -r ./build/* /usr/lib/taboca

cp ./screen/ubuntu/xorg.conf /etc/X11/xorg.conf

mkdir /opt/telasocial-manager
cd ./cron
cp telasocial-runner /opt/telasocial-manager
cp check.py /opt/telasocial-manager
cp telasocial.log /var/log/telasocial.log

cd ..



