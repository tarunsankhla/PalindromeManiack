function  reversestring(str){
  var listOfChars = str.split('');
  var reverseList = listOfChars.reverse();
  var reversestr = reverseList.join('');
  return reversestr;
}
console.log(reversestring('ahel'));
function IsPallindrome(str){
  var rev = reversestring(str);
  if(str ===rev){
    return true;
  }
  return false;
}

function convertDateToString(date){
  var datestr ={
    day:'',
    month:'',
    year:'',
  }
  if(date.day <10)
  {
    datestr.day = '0' +date.day;
  }else{
    datestr.day = date.day.toString();
  }
  if(date.month <10)
    {
      datestr.month = '0' +date.month;
    }else{
      datestr.month = date.month.toString();
    }

  datestr.year = date.year.toString();
  return datestr;


}

// var date ={
//   day:2,
//   month:2,
//    year:2020,
// }

function getAllDateFormats(date){
  var dateStr = convertDateToString(date);
  var ddmmyyyy = dateStr.day + dateStr.month +dateStr.year;
  var mmddyyyy = dateStr.month+ dateStr.day +dateStr.year;
  var yyyymmdd = dateStr.year+ dateStr.month+ dateStr.day ;
  var ddmmyy =dateStr.day + dateStr.month +dateStr.year.slice(-2);
  var mmddyy =  dateStr.month+ dateStr.day +dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2)+ dateStr.month+ dateStr.day ;
 
  return [ddmmyy,mmddyy,yyyymmdd,ddmmyyyy,mmddyyyy ,yymmdd];

}

function checkpallindromeForAllFormats(date){
  var listPall = getAllDateFormats(date);
  var isPallindrome = false;
  for(let i=0; i< listPall.length;i++)
  {
    if(IsPallindrome(listPall[i])){
      isPallindrome = true;
      break;
    }
  }
  return isPallindrome;
}

function isleapYear(year){
  if(year %400 === 0){
    return true;
  }
  if(year % 4 ===0 ){
    return true;
  }
  if(year % 100 ===0 ){
    return false;
  }
  return false;
}

function getNextDate(date){
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth=[ 31,28,31,30,31,30,31,31,30,31,30,31];
  // checking for second month feb
  if(month ==2){
    // check for leap year
    if(isleapYear(year)){
      if(day > 29)
      {
        day =1;
        month++;
      }
    }
    else{
       if(day> 28){
         day =1;
         month ++;
       }
    }

  }else{
    if(day > daysInMonth[month-1]){
      day =1;
      month ++;
    }
  }
  // check for year 
  if(month >12){
    month=1;
    year++;
  }
  return {
    day : day,
    month: month,
    year: year
  }

}

function getNextPallindrome(date){
  var count =0;
  // console.log(" jj",count, nextDate);
  var nextDate = getNextDate(date);
  while(1){
    count ++;
    // console.log(count , nextDate);
    var ispall = checkpallindromeForAllFormats(nextDate);
    if(ispall){
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [count, nextDate];
}

var dates ={
  day:31,
  month:12,
   year:2020,
}
// console.log('hee');
console.log(isleapYear(2021));
console.log(getNextPallindrome(dates));

var  datebtn= document.querySelector('#show-btn');
var datebinp = document.querySelector('#input');
var res = document.querySelector('#result');

function clickHandler(e){
  console.log(datebinp.value);
  var brithdayStr =datebinp.value;
  if(brithdayStr !== ''){
    var dates = brithdayStr.split('-');
    var dat ={
      day : Number(dates[2]),
      month : Number(dates[1]),
      year : Number(dates[0])
    }
    console.log(dat);
    var checkpall = checkpallindromeForAllFormats(dat);
     var [crr, nextDate] = getNextPallindrome(dat);
    if(checkpall){
      res.innerHTML = 'yay ! your birthday is pallindrome';
    }else{
      res.innerHTML = `The next pallindrome is on : ${nextDate.day} - ${nextDate.month} - ${nextDate.year},  you missed it by ${crr} days !!`;
    }
   
  }
}

datebtn.addEventListener('click',clickHandler)
