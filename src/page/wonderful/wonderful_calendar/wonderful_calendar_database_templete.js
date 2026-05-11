
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
 * {{date}}     cc          Auto Generate Don't Edit!!!
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
    {{calendar_database}}
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
