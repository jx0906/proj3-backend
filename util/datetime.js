// todo:
// helper functions for datetime operations (eg, convert timestamp to days, convert timestamp to a
// certain date format)"

// 1 - convert user create restaurant input to ISO 8601 format for backend storage
// 1A - time for timeOpen and timeClose
// 1B - daysClose (?)
// 1C - [ICEBOX] holidays for daysClose

// 2 - convert user booking input to ISO 8601 format for backend storage
// 2A - date from booking date
// 2B - time from booking time (need to + booking date to get full ISO 8601 format)

// 3 - convert user booking input for comparison with backend info
// 3A - booking time > timeOpen and <= 60 min from timeClose
// 3B - booking date =! daysClose