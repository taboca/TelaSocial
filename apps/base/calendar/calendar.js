
var calendar = { 

dateControl : function(pubDate) {
var year, month, day, hour, weekday;
var phrase; // this phrase will be the date in a specific format

// the date format usually changes, so this treats two differente date formats
weekday = pubDate.slice(0,3); // example: Wed

// if the date format is "Wed, 15 Sep 2010 14:00:00 - 0300"
if(weekday == 'Sun' || weekday == 'Mon' || weekday == 'Tue' || weekday == 'Wed' || weekday == 'Thu' || weekday == 'Fri' || weekday == 'Sat'){
day = pubDate.slice(5,7); // example: 22
month = pubDate.slice(8,11); // example: Sep
year = pubDate.slice(12,16); // example: 2010
hour = pubDate.slice(17,22); // example: 10:00:00

// example: transforming month from 'Sep' to '09'
if(month == 'Jan')
month = '01';
else
if(month == 'Feb')
month = '02';
else
if(month == 'Mar')
month = '03';
else
if(month == 'Apr')
month = '04';
else
if(month == 'May')
month = '05';
else
if(month == 'Jun')
month = '06';
else
if(month == 'Jul')
month = '07';
else
if(month == 'Aug')
month = '08';
else
if(month == 'Sep')
month = '09';
else
if(month == 'Oct')
month = '10';
else
if(month == 'Nov')
month = '11';
else
if(month == 'Dec')
month = '12';

// example: transforming weekday from "Wed" to "Qua"
if(weekday == 'Sun')
weekday = 'Dom';
else
if(weekday == 'Mon')
weekday = 'Seg';
else
if(weekday == 'Tue')
weekday = 'Ter';
else
if(weekday == 'Wed')
weekday = 'Qua';
else
if(weekday == 'Thu')
weekday = 'Qui';
else
if(weekday == 'Fri')
weekday = 'Sex';
else
if(weekday == 'Sat')
weekday = 'Sab';

phrase = weekday.concat(", ", day, "/", month, "/", year, " ", hour);
}
else
if(pubDate.length == 10){ // if the date format is "2010-09-10"
day = pubDate.slice(8,10);
month = pubDate.slice(5,7);
year = pubDate.slice(0,4);

phrase = day.concat("/", month, "/", year);
}
else // for other date formats
phrase = pubDate;

return phrase;
}

}





