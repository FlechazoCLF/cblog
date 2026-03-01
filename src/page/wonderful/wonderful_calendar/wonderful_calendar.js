
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
 * 2026-02-15     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/
/* react */
import React, { useState, useEffect } from 'react';
/* article */
import { article_cfg_get } from '../../article/article_cfg';

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* calendar event type */
const Calendar_Event_Types = {
    '生日': { icon: '🎂', color: '#FF6B6B' },
    '纪念日': { icon: '💍', color: '#4ECDC4' },
    '考试': { icon: '📝', color: '#FFD166' },
    '存钱规划': { icon: '💰', color: '#6A4C93' },
    '会议': { icon: '📅', color: '#1A936F' },
};

/* calendar get month names */
const Calendar_getMonthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
];

/* events */
let Wonderful_calendar_events = [
    /* year month day tags title cycle article */
];

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Wonderful_calendar_events_Init()
****************************************************************************************************/
function Wonderful_calendar_events_Init(articles) {
    let calendararticles = [];
    do
    {
        /* check parameter */
        if((articles == null) || (articles == undefined) || (articles.length == 0))
        {
            continue;
        }
        /* foreach article */
        for(let index_category = 0; index_category < articles.length; index_category++)
        {
            const category = articles[index_category];
            for(let index_article = 0; index_article < category.articles.length; index_article++)
            {
                const article = category.articles[index_article];
                calendararticles.push(article);
            }
        }
        /* filter */
        calendararticles = calendararticles.filter(article => (article.calendar !== ""));
        /* push events */
        Wonderful_calendar_events = [];
        calendararticles.map(article => (
            /* push */
            Wonderful_calendar_events.push(
                {
                    year: article.date.substring(0,4),
                    month: article.date.substring(5,7),
                    day: article.date.substring(8,10),
                    tags: article.tags.trim().split(/\s+/),
                    title: article.title,
                    cycle: article.calendar,
                    article: article.path
                }
            )
        ));
    }while(0);

    return (
        <>

        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_Init()
****************************************************************************************************/
export function Wonderful_calendar_Init() {

    do
    {
        /* init article data */
        const articles = article_cfg_get();
        /* init events */
        Wonderful_calendar_events_Init(articles);
    }while(0);

    return (
        <>

        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_getYears()
****************************************************************************************************/
function Wonderful_calendar_getYears() {
    let years = [];
    const currentYear = new Date().getFullYear();

    /* Get all events year */
    Wonderful_calendar_events.forEach(event => {
        if (!years.includes(event.year)) {
            years.push(event.year);
        }
    });
    /* sort years */
    years.sort((a, b) => a - b);
    /* fill years */
    for (let i = years[0] - 3; i <= currentYear + 3; i++) {
        if (!years.includes(i.toString()))
        {
            years.push(i.toString());
        }
    }
    /* sort years */
    return years.sort((a, b) => a - b);
}

/****************************************************************************************************
* Wonderful_calendar_get_days_in_month()
****************************************************************************************************/
function Wonderful_calendar_get_days_in_month(year, month) {
    return new Date(year, month, 0).getDate();
}

/****************************************************************************************************
* Wonderful_calendar_get_firstday_in_month()
****************************************************************************************************/
function Wonderful_calendar_get_firstday_in_month(year, month) {
    const day = new Date(year, month - 1, 1).getDay();
    /* first day of week is monday (1) */
    const firstDay = ((day === 0) ? (7 - 1) : (day - 1));
    return firstDay;
}

/****************************************************************************************************
* Wonderful_calendar_generate_days()
****************************************************************************************************/
function Wonderful_calendar_generate_days(year, month) {
    let days = [];
    do {
        /* check parameter */
        if ((year == undefined || month == undefined) || (year == null || month == null) || (month < 0 || month > 12)) {
            continue;
        }
        /* get days in month */
        const daysInMonth = Wonderful_calendar_get_days_in_month(year, month);
        const firstDay = Wonderful_calendar_get_firstday_in_month(year, month);
        /* null days */
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        /* days */
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        /* null days */
        for (let i = 0; i < 42 - firstDay - daysInMonth; i++) {
            days.push(null);
        }
    } while (0);
    return days;
}

/****************************************************************************************************
* Wonderful_calendar_get_events()
****************************************************************************************************/
function Wonderful_calendar_get_events() {
    return Wonderful_calendar_events;
}

/****************************************************************************************************
* Wonderful_calendar_get_event()
****************************************************************************************************/
function Wonderful_calendar_get_event(year,month,day) {
    /* Get all events year */
    let events = Wonderful_calendar_get_events();
    /* filter */
    events = events.filter(function(event) {
        let match = true;
        /* match */
        if(!event.cycle.includes("每日"))
        {
            if(!event.cycle.includes("每月"))
            {
                if(!event.cycle.includes("每年"))
                {
                    if((year != "") && (year != null) && (year != undefined))
                    {
                        match = (event.year == year);
                        if(match == false)
                        {
                            return false;
                        }
                    }
                }
                if((month != "") && (month != null) && (month != undefined))
                {
                    match = (event.month == month);
                    if(match == false)
                    {
                        return false;
                    }
                }
            }
            if((day != "") && (day != null) && (day != undefined))
            {
                match = (event.day == day);
                if(match == false)
                {
                    return false;
                }
            }
        }
        return match;
    });
    return events;
}

/****************************************************************************************************
* Wonderful_calendar_view_events_list()
****************************************************************************************************/
function Wonderful_calendar_view_events_list(events) {
    return (
        <>
            {events.map((event, index) => (
                <a
                    key={index}
                    href={event.article}
                    style={{
                        /* layout */
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        padding: '24px',
                        /* color */
                        backgroundColor: '#e3f2fd',
                        /* style */
                        borderRadius: '24px',
                    }}
                >
                    {/* tags */}
                    <div
                        style={{
                            /* layout */
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            gap: '6px',
                            minWidth: '120px',
                        }}
                    >
                        {event.tags && event.tags.length > 0 ? (
                            event.tags.map((tag, tagIndex) => (
                                <span
                                    key={tagIndex}
                                    style={{
                                        /* layout */
                                        padding: '4px 8px',
                                        /* color */
                                        color: '#000000',
                                        backgroundColor: '#ffc7c9',
                                        /* font */
                                        fontWeight: '500',
                                        fontSize: '12px',
                                        /* style */
                                        borderRadius: '8px',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span
                                style={{
                                    /* layout */
                                    padding: '4px 8px',
                                    /* color */
                                    color: '#666666',
                                    backgroundColor: '#e0e0e0',
                                    /* font */
                                    fontSize: '12px',
                                    /* style */
                                    borderRadius: '4px',
                                }}
                            >
                                无标签
                            </span>
                        )}
                    </div>
                    {/* title */}
                    <div
                        style={{
                            /* layout */
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                        }}
                    >
                        <div
                            style={{
                                /* layout */
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                /* color */
                                color: '#333333',
                                /* font */
                                fontSize: '16px',
                                fontWeight: '600',
                                /* style */
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {event.title}
                        </div>
                    </div>
                    {/* cycle */}
                    <div
                        style={{
                            /* layout */
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: '2px',
                            minWidth: '80px',
                        }}
                    >
                        <span
                            style={{
                                /* color */
                                color: '#1890ff',
                                /* font */
                                fontSize: '14px',
                                fontWeight: '600',
                            }}
                        >
                            {event.cycle}
                        </span>
                    </div>
                </a>
            ))}
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_events()
****************************************************************************************************/
function Wonderful_calendar_view_events(selectedYear,selectedMonth,selectedDay,showEventModal,setShowEventModal,events) {
    /* check show modal */
    if (!showEventModal || !selectedDay) return null;
    /* get events for the day */
    const dayEvents = Wonderful_calendar_get_event(selectedYear,selectedMonth,selectedDay);
    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                /* color */
                background: 'rgba(0, 0, 0, 0 0.5)',
                /* style */
                zIndex: 1000,
                animation: 'fadeIn 0.3s ease',
            }}
            onClick={() => {
                /* close modal */
                setShowEventModal(false);
            }}
        >
            <div
                style={{
                    /* layout */
                    width: '90%',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    /* color */
                    background: 'white',
                    /* style */
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                    animation: 'slideUp 0.3s ease',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* event modal title */}
                <div
                    style={{
                        /* layout */
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 25px',
                        /* color */
                        color: 'white',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        /* style */
                        borderBottom: '1px solid #eee',
                    }}
                >
                    {/* title */}
                    <h3>
                        {selectedYear} 年 {selectedMonth} 月 {selectedDay} 日 的日程💝
                    </h3>
                    {/* close */}
                    <button
                        style={{
                            /* color */
                            color: 'white',
                            background: 'none',
                            /* style */
                            border: 'none',
                            fontSize: '2rem',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            setShowEventModal(false);
                        }}
                    >
                        ×
                    </button>
                </div>
                {/* event list */}
                <div
                    style={{
                        /* layout */
                        padding: '32px',
                    }}
                >
                    {
                        (dayEvents.length > 0) ? (
                            <div
                                style={{
                                    /* layout */
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                }}
                            >
                                {/* events */}
                                {Wonderful_calendar_view_events_list(dayEvents)}
                            </div>
                        ) : (
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '40px 20px',
                                    color: '#6c757d',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '3rem',
                                        marginBottom: '15px',
                                        color: '#e9ecef',
                                    }}
                                >
                                    📅
                                </div>
                                <p>今天没有事件</p>
                                <p>点击下方添加新事件</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_years_list()
****************************************************************************************************/
function Wonderful_calendar_view_years_list(selectedYear, setSelectedYear, setCurrentView, events) {
    /* get all years */
    const years = Wonderful_calendar_getYears();
    const currentYear = new Date().getFullYear();

    return (
        <>
            {years.map(year => {
                /* get events for the year */
                const yearEvents = Wonderful_calendar_get_event(year,"","");

                return (
                    <div
                        key={year}
                        style={{
                            /* layout */
                            textAlign: 'center',
                            padding: '16px',
                            /* color */
                            background: (year == currentYear) ? '#fad0c4' : '#e9ecef',
                            /* style */
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: `2px solid ${(year === selectedYear) ? '#667eea' : 'transparent'}`,
                        }}
                        onClick={() => {
                            /* set year */
                            setSelectedYear(year);
                            /* to month */
                            setCurrentView('month');
                        }}
                    >
                        {/* Year */}
                        <div
                            style={{
                                /* layout */
                                marginBottom: '10px',
                                /* font */
                                fontSize: '2.2rem',
                                fontWeight: 'bold',
                                /* style */
                                color: '#2c3e50',
                            }}
                        >
                            {year}
                        </div>
                        {/* events */}
                        <div
                            style={{
                                /* font */
                                fontSize: '0.9rem',
                                /* style */
                                color: '#6c757d',
                            }}
                        >
                            {yearEvents.length} 篇
                        </div>
                    </div>
                );
            })}
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_years()
****************************************************************************************************/
function Wonderful_calendar_view_years(selectedYear, setSelectedYear, setCurrentView, events) {

    return (
        <>
            {/* year select */}
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    /* style */
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                }}
            >
                <h2>
                    选择年份
                </h2>
            </div>
            {/* years list */}
            <div
                style={{
                    /* layout */
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '16px',
                    marginTop: '16px',
                }}
            >
                {Wonderful_calendar_view_years_list(selectedYear, setSelectedYear, setCurrentView, events)}
            </div>
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_months_list()
****************************************************************************************************/
function Wonderful_calendar_view_months_list(selectedYear, selectedMonth, setSelectedMonth, setCurrentView, events) {
    const monthNames = Calendar_getMonthNames;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    return (
        <>
            {monthNames.map((month, index) => {
                const monthNumber = index + 1;
                const monthEvents = Wonderful_calendar_get_event(selectedYear,monthNumber,"");

                return (
                    <div
                        key={monthNumber}
                        style={{
                            /* layout */
                            padding: '20px',
                            textAlign: 'center',
                            /* color */
                            background: ((selectedYear == currentYear) && (monthNumber == currentMonth)) ? '#fad0c4' : '#e9ecef',
                            /* style */
                            borderRadius: '12px',
                            cursor: 'pointer',
                            border: `2px solid ${((monthNumber) === selectedMonth) ? '#667eea' : 'transparent'}`,
                        }}
                        onClick={() => {
                            /* day */
                            setSelectedMonth(monthNumber);
                            setCurrentView('day');
                        }}
                    >
                        <div
                            style={{
                                /* layout */
                                marginBottom: '10px',
                                /* font */
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                /* color */
                                color: '#2c3e50',
                            }}
                        >
                            {month}
                        </div>
                        <div
                            style={{
                                /* color */
                                color: '#6c757d',
                                /* font */
                                fontSize: '0.9rem',
                            }}
                        >
                            {monthEvents.length} 篇
                        </div>
                    </div>
                );
            })}
        </>
    );
}
/****************************************************************************************************
* Wonderful_calendar_view_months()
****************************************************************************************************/
function Wonderful_calendar_view_months(selectedYear, selectedMonth, setSelectedMonth, setCurrentView, events) {

    return (
        <>
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    /* style */
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                }}
            >
                <h2>
                    {selectedYear} 年
                </h2>
                {/* to year view */}
                <button
                    style={{
                        /* layout */
                        display: 'flex',
                        alignItems: 'center',
                        /* color */
                        color: 'white',
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        /* style */
                        borderRadius: '8px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        /* return to year view */
                        setSelectedMonth(null);
                        setCurrentView('year');
                    }}
                >
                    ← 返回年份
                </button>
            </div>

            <div
                style={{
                    /* layout */
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '20px',
                    marginTop: '20px',
                }}
            >
                {Wonderful_calendar_view_months_list(selectedYear, selectedMonth, setSelectedMonth, setCurrentView, events)}
            </div>
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_days_list()
****************************************************************************************************/
function Wonderful_calendar_view_days_list(selectedYear, selectedMonth, selectedDay, setSelectedDay, setCurrentView, setShowEventModal, events) {
    /* get days */
    const days = Wonderful_calendar_generate_days(selectedYear, selectedMonth);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    return (
        <>
            {days.map((day, index) => {
                const dayEvents = Wonderful_calendar_get_event(selectedYear,selectedMonth,day);

                return (
                    <div
                        key={index}
                        style={{
                            /* layout */
                            aspectRatio: '1',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            /* style */
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: ((selectedYear == currentYear) && (selectedMonth == currentMonth) && (day == currentDay)) ?
                                '#fad0c4' : 
                                (day && (dayEvents.length > 0)) ? '#ebc0fd' : '#e9ecef',
                        }}
                        onClick={() => {
                            /* set day */
                            setSelectedDay(day);
                            if (!day) return;
                            /* show event modal */
                            setShowEventModal(true);
                        }}
                    >
                        {day && (
                            <>
                                {/* day */}
                                <div
                                    style={{
                                        /* color */
                                        color: '#2c3e50',
                                        /* font */
                                        fontSize: '1.2rem',
                                        fontWeight: '500',
                                    }}
                                >
                                    {day}
                                </div>
                                {/* event */}
                                <div
                                    style={{
                                        /* color */
                                        color: '#6c757d',
                                        /* font */
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {dayEvents.length} 篇
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_view_days()
****************************************************************************************************/
function Wonderful_calendar_view_days(selectedYear, selectedMonth, selectedDay, setSelectedDay, setCurrentView, setShowEventModal, events) {

    return (
        <>
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 24px',
                    /* color */
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    /* style */
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                }}
            >
                {/* title */}
                <h2>
                    {selectedYear} 年 {selectedMonth} 月
                </h2>
                {/* button */}
                <button
                    style={{
                        /* layout */
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        /* color */
                        color: 'white',
                        background: 'rgba(255, 255, 255, 0.2)',
                        /* style */
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        /* return to month view */
                        setSelectedDay(null);
                        setCurrentView('month');
                    }}
                >
                    ← 返回月份
                </button>
            </div>
            {/* week titles */}
            <div
                style={{
                    /* layout */
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    padding: '10px 0',
                    marginTop: '16px',
                    /* style */
                    background: '#f8f9fa',
                    borderTop: '1px solid #eee',
                    borderBottom: '1px solid #eee',
                }}
            >
                {['一', '二', '三', '四', '五', '六', '日'].map(day => (
                    <div
                        key={day}
                        style={{
                            /* layout */
                            textAlign: 'center',
                            fontWeight: 'bold',
                            /* color */
                            color: '#6c757d',
                            /* font */
                            fontSize: '1.1rem',
                        }}
                    >
                        {day}
                    </div>
                ))}
            </div>
            {/* days */}
            <div
                style={{
                    /* layout */
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '8px',
                    marginTop: '16px',
                }}
            >
                {Wonderful_calendar_view_days_list(selectedYear, selectedMonth, selectedDay, setSelectedDay, setCurrentView, setShowEventModal, events)}
            </div>
        </>
    );
}

/****************************************************************************************************
* Wonderful_calendar_title()
****************************************************************************************************/
export function Wonderful_calendar_title() {
    return (
        /* title */
        <div
            style={{
                textAlign: 'center',
                marginBottom: '16px',
            }}
        >
            {/* title */}
            <h1
                style={{
                    fontSize: '2.5rem',
                    marginBottom: '10px'
                }}
            >
                📅 我的日程
            </h1>
            {/* description */}
            <p
                style={{
                    fontSize: '1.1rem',
                    opacity: 0.9
                }}
            >
                记录高光时刻，规划人生
            </p>
        </div>
    );
}

/****************************************************************************************************
* Wonderful_calendar()
****************************************************************************************************/
export function Wonderful_calendar() {
    /* view */
    const [currentView, setCurrentView] = useState('year'); // 'year', 'month', 'day'
    /* year month day */
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    /* events */
    const [showEventModal, setShowEventModal] = useState(false);
    const events = Wonderful_calendar_get_events();

    return (
        <div
            style={{
                /* layout */
                width: '90%',
                padding: '24px',
                margin: '0 auto',
                maxWidth: '860px',
                /* color */
                background: ' #FFFFFF',
                /* style */
                borderRadius: '32px',
                boxShadow: '0 20px 80px rgba(0, 0, 0, 0.25)',
            }}
            /* mouse */
            onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
                e.currentTarget.style.boxShadow = '0 25px 85px rgba(0, 0, 0, 0.6)';
            }}
            onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 80px rgba(0, 0, 0, 0.25)';
            }}
        >
            {/* title */}
            {Wonderful_calendar_title()}
            {/* calendar */}
            {currentView === 'year' && Wonderful_calendar_view_years(selectedYear, setSelectedYear, setCurrentView, events)}
            {currentView === 'month' && Wonderful_calendar_view_months(selectedYear, selectedMonth, setSelectedMonth, setCurrentView, events)}
            {currentView === 'day' && Wonderful_calendar_view_days(selectedYear, selectedMonth, selectedDay, setSelectedDay, setCurrentView, setShowEventModal, events)}
            {/* events */}
            {Wonderful_calendar_view_events(selectedYear,selectedMonth,selectedDay,showEventModal,setShowEventModal,events)}
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
