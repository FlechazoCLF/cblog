
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
 * 2026-03-16     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* Wonderful_ebbinghaus_TimeLine */
const Wonderful_ebbinghaus_TimeLine = [1, 2, 4, 7, 15, 30, 60, 90, 180, 360];

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Wonderful_ebbinghaus_timeline_get()
****************************************************************************************************/
function Wonderful_ebbinghaus_timeline_get(reviewNumber) {
    let num = reviewNumber;
    /* check parameter */
    if (num < 0) {
        num = 0;
    }
    if (num >= Wonderful_ebbinghaus_TimeLine.length) {
        num = Wonderful_ebbinghaus_TimeLine.length - 1;
    }
    /* output */
    return Wonderful_ebbinghaus_TimeLine[num];
}

/****************************************************************************************************
* Wonderful_ebbinghaus_getData()
****************************************************************************************************/
function Wonderful_ebbinghaus_getData()
{
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/****************************************************************************************************
* Wonderful_ebbinghaus_getDaysDifference()
****************************************************************************************************/
function Wonderful_ebbinghaus_getDaysDifference(dstDate, srcDate) {
    const d1 = new Date(srcDate);
    const d2 = new Date(dstDate);

    /* calc */
    const diffTime = d1.getTime() - d2.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

/****************************************************************************************************
* Wonderful_ebbinghaus_timeline_getRemainDays()
****************************************************************************************************/
export function Wonderful_ebbinghaus_timeline_getRemainDays(timeLine) {
    let remainDays = 0;
    do
    {
        /* check parameter */
        if (timeLine.length < 0) {
            continue;
        }
        /* 
            2026-03-10 | remember
            2026-03-13 | forget
            2026-03-16 | remember
        */
        /* get last time status */
        let lastTimeIndex = timeLine.length - 1;
        if(timeLine[lastTimeIndex].status === "forget")
        {
            /* need to review */
            remainDays = 0;
            continue;
        }
        /* get remember time */
        let earliestTime = Wonderful_ebbinghaus_getData();
        let rememberCount = 0;
        for(let i = timeLine.length - 1; i >= 0; i--)
        {
            /* remember | forget */
            if (timeLine[i].status != "forget") {
                earliestTime = timeLine[i].time;
                rememberCount = rememberCount + 1;
            }
        }
        /* last remember time */
        let lastRememberTime = timeLine[timeLine.length - 1].time;
        /* get gap time */
        let gapDays = Wonderful_ebbinghaus_getDaysDifference(lastRememberTime, Wonderful_ebbinghaus_getData());
        /* get interval */
        let intervalDays = Wonderful_ebbinghaus_timeline_get(rememberCount);
        if(gapDays <= intervalDays)
        {
            remainDays = intervalDays - gapDays;
            continue;
        }
    } while (0);
    return remainDays;
}

/****************************************************************************************************
* Wonderful_ebbinghaus_timeline_isReview()
****************************************************************************************************/
export function Wonderful_ebbinghaus_timeline_isReview(timeLine) {
    let isReview = false;
    do
    {
        /* check parameter */
        if (timeLine.length < 0) {
            continue;
        }
        /* 
            2026-03-10 | remember
            2026-03-13 | forget
            2026-03-16 | remember
        */
        /* get last time status */
        let lastTimeIndex = timeLine.length - 1;
        if(timeLine[lastTimeIndex].status === "forget")
        {
            /* need to review */
            isReview = true;
            continue;
        }
        /* get remember time */
        let earliestTime = Wonderful_ebbinghaus_getData();
        let rememberCount = 0;
        for(let i = timeLine.length - 1; i >= 0; i--)
        {
            /* remember | forget */
            if (timeLine[i].status != "forget") {
                earliestTime = timeLine[i].time;
                rememberCount = rememberCount + 1;
            }
        }
        /* last remember time */
        let lastRememberTime = timeLine[timeLine.length - 1].time;
        /* get gap time */
        let gapDays = Wonderful_ebbinghaus_getDaysDifference(lastRememberTime, Wonderful_ebbinghaus_getData());
        /* get interval */
        let intervalDays = Wonderful_ebbinghaus_timeline_get(rememberCount);
        if(gapDays >= intervalDays)
        {
            isReview = true;
            continue;
        }
    } while (0);
    return isReview;
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
