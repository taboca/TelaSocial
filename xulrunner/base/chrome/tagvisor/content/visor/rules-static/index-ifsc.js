
com.taboca.upvisor.registerWidget( null , "org/ifsc/layout/vertical.js","container");
com.taboca.upvisor.registerWidget( null , "org/ifsc/calendar/calendar.js","calendar");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/clock/clock.js","clock", "area_topmid");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/acontece/acontece.js","twitter", "area_panel1");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/fotogrid/fotogrid.js","fotos", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/twitter-postit/twitter.js","twitterslash", "area_panel3");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/typing/typing.js","typing", "area_bottom");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






