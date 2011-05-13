Now supporting XULRunner 2

With linux, the whole E4X solution is failing. Notice we used to have the E4X in the code itself to define chunks of HTML and CSS. 

Bugzilla bug is 613142

To install with XULRunner, when it works

# https://developer.mozilla.org/en/XULRunner_1.9.2_Release_Notes

xulrunner --register-global

Install app 

xulrunner --install-app ./base

Execute the app

/usr/bin/startx /usr/lib/taboca/telasocial/telasocial

Change the rule scripts in the chrome tagvisor content visor ./rules-static 

If XULRunner --install-app does not work, you can also load directly calling /Full_path_to_xulrunner/xulrunner-bin full_path_to_telasocial/xulrunner/base/application.ini
