
com.taboca.upvisor.registerWidget( null , "org/simple/layout/vertical.js","container");
com.taboca.upvisor.registerWidget( ".container" , "org/simple/clock/clock.js","clock", "area1");
com.taboca.upvisor.registerWidget( ".container" , "org/simple/clock/clock.js","clocktwo", "area2");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".clock", "start"); } ); 
com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".clocktwo", "start"); } ); 






