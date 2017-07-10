/**
 * 模块化
 */
var moment = require('moment');

exports.stamptimeTransfer = function(results){
    for(var i=0;i<results.length;i++){
            results[i].month = moment(results[i].creattime).format('MMM');
            results[i].year = moment(results[i].creattime).format('YYYY');
            results[i].day = moment(results[i].creattime).format('DD');
        }
}

exports.monthTransfer = function(papermonth){
    for(var i=0;i<papermonth.length;i++){
            papermonth[i].date = moment(papermonth[i].creattime).format('MMMM YYYY');
        }
}

exports.dateTransfer = function(results){
    for(var i=0;i<results.length;i++){
            results[i].date = moment(results[i].creattime).format('MMMM Do YYYY');
        }
}

exports.fromNowDay = function(results){
    for(var i=0;i<results.length;i++){
            results[i].fnow = moment().startOf(results[i].creattime).fromNow();
        }    
}