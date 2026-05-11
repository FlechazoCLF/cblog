
/****************************************************************************************************
* File Start!
****************************************************************************************************/

/*
 *
 *  Copyright (c) 2024-2026 by flechazo. All rights reserved.
 *
 * Author : CarlChai LinFeng Chai flechazo
 * Website: flechazo.mba
 *
 * Change Logs:
 * Date           Author       Notes
 * 2026-05-08 14:55:33     cc          Auto Generate Don't Edit!!!
 * 
*/

/* Calendar Database */
const calendar_database = [
    /*  
        route
            fromname fromemail toname toemail
        time
            year month day hour minute
        content
            title text
    */
    
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [{name: 'flechazo', email: '837207595@qq.com'},], },
            time: { year: '*', month: '12', day: '15', hour: '10', minute: '00', week: '*', },
            content: { title: '春节回家买高铁票🚝', text: '',},
        },
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [{name: 'flechazo', email: '837207595@qq.com'},], },
            time: { year: '*', month: '10', day: '01', hour: '10', minute: '00', week: '*', },
            content: { title: '考试报名考研', text: '',},
        },
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [{name: 'flechazo', email: '837207595@qq.com'},], },
            time: { year: '*', month: '09', day: '12', hour: '10', minute: '00', week: '*', },
            content: { title: '可爱妹妹的生日🎂', text: '',},
        },
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [{name: 'flechazo', email: '837207595@qq.com'},], },
            time: { year: '*', month: '09', day: '01', hour: '10', minute: '00', week: '*', },
            content: { title: '考试报名公务员', text: '',},
        },
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [{name: 'flechazo', email: '837207595@qq.com'},], },
            time: { year: '*', month: '08', day: '21', hour: '10', minute: '00', week: '*', },
            content: { title: '小晴宝宝的生日🎂', text: '',},
        },
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [{name: 'flechazo', email: '837207595@qq.com'},], },
            time: { year: '*', month: '08', day: '10', hour: '10', minute: '00', week: '*', },
            content: { title: '考试报名软考下半年', text: '',},
        },
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [{name: 'flechazo', email: '837207595@qq.com'},], },
            time: { year: '*', month: '03', day: '13', hour: '10', minute: '00', week: '*', },
            content: { title: '小柴也要爱自己哦🎂', text: '',},
        },
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [{name: 'flechazo', email: '837207595@qq.com'},], },
            time: { year: '*', month: '03', day: '10', hour: '10', minute: '00', week: '*', },
            content: { title: '考试报名软考上半年', text: '',},
        },
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [{name: 'flechazo', email: '837207595@qq.com'},], },
            time: { year: '*', month: '*', day: '01', hour: '10', minute: '00', week: '*', },
            content: { title: '理财规划💴', text: '',},
        },
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [{name: 'flechazo', email: '837207595@qq.com'},], },
            time: { year: '*', month: '02', day: '14', hour: '10', minute: '00', week: '*', },
            content: { title: '情人节来啦🌹', text: '',},
        },
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [{name: 'flechazo', email: '837207595@qq.com'},], },
            time: { year: '*', month: '10', day: '05', hour: '10', minute: '00', week: '*', },
            content: { title: '小柴和小晴相爱啦💝', text: '',},
        },
];

/* export */
module.exports = {
  getCalendar: function() {
    return calendar_database;
  }
};

/****************************************************************************************************
* File End!
****************************************************************************************************/
