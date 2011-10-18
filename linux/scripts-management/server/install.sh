
mkdir /opt/telasocial-manager
cp telasocial-runner /opt/telasocial-manager
cp check.py /opt/telasocial-manager
cp telasocial.log /var/log/telasocial.log

echo "Install to crontab -e" 
echo "* *     * * *     /root/memory/telasocial-mem-monitor/telasocial-runner"

