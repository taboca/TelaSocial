mkdir -p backup/etc/default/
cp /etc/default/grub ./backup/etc/default/
cat ./backup/etc/default/grub | sed s/splash/splash\ text/ > /etc/default/grub
update-grub


