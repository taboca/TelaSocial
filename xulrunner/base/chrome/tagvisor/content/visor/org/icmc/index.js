com.taboca.upvisor.registerWidget( null , "org/icmc/3pane/gfxless.js","container");
com.taboca.upvisor.registerWidget( null , "org/icmc/calendar/calendar.js","calendar");

com.taboca.upvisor.registerWidget( ".container" , "org/icmc/clock/clock.js","clock", "area_bottomright");
com.taboca.upvisor.registerWidget( ".container" , "org/icmc/rss-palestras/rss.js","palestras", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "org/icmc/redesocial/redesocial.js","redesocial", "area_panel3");
com.taboca.upvisor.registerWidget( ".container" , "org/icmc/scrolling/typing.js","uspmain", "area_bottom");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






