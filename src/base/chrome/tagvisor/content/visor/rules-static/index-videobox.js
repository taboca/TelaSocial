com.taboca.upvisor.registerWidget( null , "org/videobox/layout/index.js","container");
com.taboca.upvisor.registerWidget( null , "org/videobox/calendar/calendar.js","calendar");
com.taboca.upvisor.registerWidget( ".container" , "org/videobox/video/video.js","video", "area_middle");
com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } );




