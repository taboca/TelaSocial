com.taboca.upvisor.registerWidget( null , "org/v-icmc/main/main.js","main");
com.taboca.upvisor.registerWidget( null , "org/v-icmc/calendar/calendar.js","calendar");

com.taboca.upvisor.registerWidget( ".main" , "org/v-icmc/fotogrid/fotogrid.js","imageshow", "area_panel1");
com.taboca.upvisor.registerWidget( ".main" , "org/v-icmc/rss-palestras/rss.js","palestras", "area_panel2");
com.taboca.upvisor.registerWidget( ".main" , "org/v-icmc/typing/typing.js","typing", "area_bottom");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } );
