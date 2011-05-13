com.taboca.upvisor.registerWidget( null , "org/icmc/3pane/gfxless.js","container");
com.taboca.upvisor.registerWidget( null , "org/icmc/calendar/calendar.js","calendar");
//com.taboca.upvisor.registerWidget( null , "org/icmc/bg/bg.js","bgsemana");

com.taboca.upvisor.registerWidget( ".container" , "org/icmc/clock/clock.js","clock", "area_bottomright");
//com.taboca.upvisor.registerWidget( ".container" , "org/icmc/image-show/image-show.js","imageshow", "area_panel1");
com.taboca.upvisor.registerWidget( ".container" , "org/icmc/fotogrid/fotogrid.js","imageshow", "area_panel1");
com.taboca.upvisor.registerWidget( ".container" , "org/icmc/rss-palestras/rss.js","palestras", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "org/icmc/rede-social/redesocial.js","redesocial", "area_panel3");
com.taboca.upvisor.registerWidget( ".container" , "org/icmc/typing/typing.js","uspmain", "area_bottom");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } ); 






