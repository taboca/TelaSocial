if [ ! -d "./backup" ]; then
   mkdir -p backup/etc/default/
   cp /etc/default/grub ./backup/etc/default/
fi 
cat ./backup/etc/default/grub | sed s/GRUB_CMDLINE_LINUX_DEFAULT.*/GRUB_CMDLINE_LINUX_DEFAULT=\"quiet text\"/ > /etc/default/grub
update-grub


