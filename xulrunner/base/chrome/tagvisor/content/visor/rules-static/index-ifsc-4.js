
com.taboca.upvisor.registerWidget( null , "org/ifsc/layout-4/vertical.js","container");
com.taboca.upvisor.registerWidget( null , "org/ifsc/calendar/calendar-4.js","calendar");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/clock/clock.js","clock", "area_topmid");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/acontece/acontece.js","twitter", "area_panel1");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/destaque/destaque.js","destaque", "area_midmid");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/fotogrid/fotogrid.js","fotos", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/defesas/rss.js","twitterslash", "area_panel3");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/fotogrid-poster/fotogrid.js","poster", "area_panel4");
com.taboca.upvisor.registerWidget( ".container" , "org/ifsc/typing/typing.js","typing", "area_bottom");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






