com.taboca.upvisor.registerWidget( null , "com/taboca/layout-ccw-fisl/gfxless.js","container");
com.taboca.upvisor.registerWidget( null , "com/taboca/calendar/calendar-fisl.js","calendar");
com.taboca.upvisor.registerWidget( ".container" , "com/taboca/clock/clock.js","clock", "area_bottomright");
com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-eventos/twitter.js","twitter", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "com/taboca/twitter-bloco1/twitter.js","twitterslash", "area_panel3");
com.taboca.upvisor.registerWidget( ".container" , "com/taboca/typing/typing.js","uspmain", "area_bottom");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






