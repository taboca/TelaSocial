#!/usr/bin/perl -w

system("echo 'ldsld' > t1.txt");
$data = localtime time;
system("/home/icmc/taboca-telasocial/screenshot.sh");
system("/usr/bin/convert /home/icmc/taboca-telasocial/images/test.png -resize 640 /home/icmc/taboca-telasocial/images/test.jpg");
system("mv /home/icmc/taboca-telasocial/images/test.jpg '/home/icmc/taboca-telasocial/images/file$data.jpg'");
#system("convert /home/icmc/taboca-telasocial/images/test.png /home/icmc/taboca-telasocial/images/output*.jpg");

