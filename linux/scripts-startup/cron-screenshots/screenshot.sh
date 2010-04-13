#!/bin/bash

export DISPLAY=:0
xwd -root -out /home/icmc/taboca-telasocial/images/xwdss.xwd
convert /home/icmc/taboca-telasocial/images/xwdss.xwd /home/icmc/taboca-telasocial/images/test.png

