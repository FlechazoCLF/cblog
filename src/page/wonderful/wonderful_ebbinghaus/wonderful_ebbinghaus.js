
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

/* react */
import React, { useState, useEffect } from 'react';
/* ebbinghaus events */
import { ebbinghaus_database } from '../../../database/wonderful_ebbinghaus_database';
/* theme */
import { useTheme } from '../../../kernel/theme/theme'
/* time line */
import { Wonderful_ebbinghaus_timeline_getRemainDays, Wonderful_ebbinghaus_timeline_isReview} from './wonderful_ebbinghaus_timeline'

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* name map */
const Wonderful_ebbinghaus_events_tags_map = {
    "感悟": "insight",
    "计划": "plan",
    "视频": "video",
    "文章": "article",
};

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Wonderful_ebbinghaus_header()
****************************************************************************************************/
function Wonderful_ebbinghaus_header() {
    const theme = useTheme();
    return (
        <div>
            {/* title */}
            <h1
                style={{
                    /* layout */
                    textAlign: 'center',
                    marginBottom: '10px',
                    /* style */
                    color: theme.total.primary,
                }}
            >
                〰️艾宾浩斯遗忘曲线
            </h1>
            {/* title description */}
            <p 
                style={{
                    /* layout */
                    textAlign: 'center',
                    marginBottom: '30px',
                    /* style */
                    color: theme.total.textMuted,
                }}
            >
                人生的感悟需要反复思考
            </p>
        </div>
    );
}

/****************************************************************************************************
* Wonderful_ebbinghaus_filter()
****************************************************************************************************/
function Wonderful_ebbinghaus_filter({events,setevents,filterevents,setfilterEvents,selectedTime,setSelectedTime}) {
    const theme = useTheme();
    /* get all times */
    let allTimes = ["全部","今天","近3天","近7天","近30天","近90天","近180天"];
    /* add filter times */
    const Wonderful_ebbinghaus_filter_allTimesDiv = allTimes.map(time => {
        const isSelected = selectedTime === time;
        const isAllTime = time === '全部';
        /* filter */
        function handleFilterClick(time,event) {
            /* get event time */
            let remainDays = Wonderful_ebbinghaus_timeline_getRemainDays(event.timeline);
            if(time == '全部')
            {
                return true;
            }else if(time == '今天')
            {
                return ((remainDays == 0) ? true : false);
            }else if(time == '近3天')
            {
                return ((remainDays <= 3) ? true : false);
            }else if(time == '近7天')
            {
                return ((remainDays <= 7) ? true : false);
            }else if(time == '近30天')
            {
                return ((remainDays <= 30) ? true : false);
            }else if(time == '近90天')
            {
                return ((remainDays <= 90) ? true : false);
            }else if(time == '近180天')
            {
                return ((remainDays <= 180) ? true : false);
            }
        }

        return (
            <div
                style={{
                    /* layout */
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '6px 8px',
                    padding: '8px 16px',
                    /* size */
                    minWidth: '60px',
                    height: '36px',
                    /* color */
                    background: isSelected ? theme.total.blockquoteBorder : (isAllTime ? theme.total.textSecondary : theme.total.primaryHover),
                    color: theme.card.background,
                    /* font */
                    fontWeight: isSelected ? 'bold' : '500',
                    fontSize: '0.9rem',
                    /* style */
                    borderRadius: '20px',
                    boxShadow: isSelected ? '0 4px 12px rgba(255, 107, 53, 0.4)' : theme.total.shadowSm,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isSelected ? `2px solid ${theme.total.primary}` : 'none',
                }}
                /* mouse */
                onMouseEnter={e => {
                    if (!isSelected) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = theme.total.shadowMd;
                    }
                }}
                onMouseLeave={e => {
                    if (!isSelected) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = theme.total.shadowSm;
                    }
                }}
                /* click */
                onClick={() => {
                    /* selected tag */
                    setSelectedTime(time);
                    /* filter */
                    setfilterEvents(isAllTime ? events : events.filter(item => handleFilterClick(time,item)));
                }}
            >
                {time}
            </div>
        );
    });

    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* filter title */}
            <div
                style={{
                    /* layout */
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '16px',
                    /* style */
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: theme.total.textPrimary,
                }}
            >
                🏷️ 按遗忘时间筛选
            </div>
            {/* filter times */}
            {Wonderful_ebbinghaus_filter_allTimesDiv}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_ebbinghaus_category_filter()
****************************************************************************************************/
function Wonderful_ebbinghaus_category_filter({events,setevents,filterevents,setfilterEvents,selectedTag,setSelectedTag}) {
    const theme = useTheme();
    /* get all tags */
    let allTags = [];
    events.forEach(item => {
        /* split tags by space and add to allTags */
        if (item.tags && typeof item.tags === 'string') {
            const tagArray = item.tags.split(' ').filter(tag => tag.trim() !== '');
            allTags = [...allTags, ...tagArray];
        }
    });
    /* remove duplicate tags */
    allTags = [...new Set(allTags)];
    allTags.unshift('全部');
    /* add filter tags */
    const Wonderful_ebbinghaus_filter_allTagsDiv = allTags.map(tag => {
        const isSelected = selectedTag === tag;
        const isAllTag = tag === '全部';
        
        return (
            <div
                style={{
                    /* layout */
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '6px 8px',
                    padding: '8px 16px',
                    /* size */
                    minWidth: '60px',
                    height: '36px',
                    /* color */
                    background: isSelected ? theme.total.blockquoteBorder : (isAllTag ? theme.total.textSecondary : theme.total.primaryHover),
                    color: theme.card.background,
                    /* font */
                    fontWeight: isSelected ? 'bold' : '500',
                    fontSize: '0.9rem',
                    /* style */
                    borderRadius: '20px',
                    boxShadow: isSelected ? '0 4px 12px rgba(255, 107, 53, 0.4)' : theme.total.shadowSm,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isSelected ? `2px solid ${theme.total.primary}` : 'none',
                }}
                /* mouse */
                onMouseEnter={e => {
                    if (!isSelected) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = theme.total.shadowMd;
                    }
                }}
                onMouseLeave={e => {
                    if (!isSelected) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = theme.total.shadowSm;
                    }
                }}
                /* click */
                onClick={() => {
                    /* selected tag */
                    setSelectedTag(tag);
                    /* filter */
                    setfilterEvents(isAllTag ? events : events.filter(item => item.tags.includes(tag)));
                }}
            >
                {tag}
            </div>
        );
    });

    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 0',
                marginBottom: '20px',
                /* style */
                borderBottom: `1px solid ${theme.total.progressBg}`,
            }}
        >
            {/* filter title */}
            <div
                style={{
                    /* layout */
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '16px',
                    /* style */
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: theme.total.textPrimary,
                }}
            >
                🏷️ 按标签筛选
            </div>
            {/* filter tags */}
            {Wonderful_ebbinghaus_filter_allTagsDiv}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_ebbinghaus_content()
****************************************************************************************************/
function Wonderful_ebbinghaus_content({events}) {
    const theme = useTheme();
    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
                padding: '20px 0',
            }}
        >
            {/* item */}
            {events.map((event, idx) => (
                <div key={idx} style={{
                    /* layout */
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    /* size */
                    width: '180px',
                    margin: '10px',
                }}>
                    <div 
                        style={{
                            /* layout */
                            display: 'flex',
                            position: 'relative',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflow: 'hidden',
                            /* size */
                            width: '160px',
                            height: '160px',
                            /* color */
                            background: theme.card.background,
                            color: theme.card.text,
                            /* font */
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            /* style */
                            borderRadius: '20px',
                            boxShadow: theme.total.shadowSm,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            border: '3px solid transparent',
                        }}
                        /* mouse */
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                            e.currentTarget.style.boxShadow = theme.total.shadowMd;
                            e.currentTarget.style.borderColor = theme.total.blockquoteBorder;
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = theme.total.shadowSm;
                            e.currentTarget.style.borderColor = 'transparent';
                        }}
                        /* click */
                        onClick={() => window.open(event.url, '_blank')}
                    >
                        {/* image */}
                        <img
                            src={event.cover || '/images/avatar/avatar.jpg'}
                            alt={event.title}
                            style={{
                                /* position */
                                width: '100%',
                                height: '125px',
                                /* style */
                                objectFit: 'cover',
                                borderRadius: '17px 17px 0 0',
                            }}
                        />
                        
                        {/* title overlay */}
                        <div style={{
                            /* layout */
                            position: 'absolute',
                            bottom: '0',
                            /* font */
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textAlign: 'center',
                            /* style */
                        }}>
                            {event.title}
                        </div>
                    </div>
                    
                    {/* tags */}
                    {event.tags && (
                        <div style={{
                            /* layout */
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '4px',
                            marginTop: '8px',
                            /* size */
                            width: '100%',
                        }}>
                            {event.tags.split(' ').filter(tag => tag.trim() !== '').slice(0, 3).map((tag, tagIdx) => (
                                <span key={tagIdx} style={{
                                    /* layout */
                                    padding: '2px 8px',
                                    /* color */
                                    background: theme.total.progressBg,
                                    color: theme.total.textMuted,
                                    /* font */
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    /* style */
                                    borderRadius: '10px',
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    {/* description */}
                    {event.description && (
                        <div style={{
                            /* layout */
                            marginTop: '8px',
                            padding: '0 8px',
                            textAlign: 'center',
                            /* font */
                            fontWeight: 'normal',
                            fontSize: '0.85rem',
                            lineHeight: '1.4',
                            /* color */
                            color: theme.total.textMuted,
                            /* style */
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}>
                            {event.description}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_ebbinghaus_getlist()
****************************************************************************************************/
function Wonderful_ebbinghaus_getlist(articles) {

}

/****************************************************************************************************
* Wonderful_ebbinghaus()
****************************************************************************************************/
export function Wonderful_ebbinghaus() {
    const theme = useTheme();
    /* articles */
    const [events, setevents] = useState([]);
    const [filterevents, setfilterEvents] = useState([]);
    const [selectedTime, setSelectedTime] = useState('全部');
    const [selectedTag, setSelectedTag] = useState('全部');

    /* init */
    useEffect(() => {
        /* init events */
        setevents(ebbinghaus_database);
        setfilterEvents(ebbinghaus_database);
    }, []);

    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                flexDirection: 'column',
                width: '90%',
                padding: '24px',
                /* style */
                borderRadius: '32px',
            }}
            /* mouse */
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = theme.total.shadowMd;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* header */}
            <Wonderful_ebbinghaus_header />
            {/* ebbinghaus filter */}
            <Wonderful_ebbinghaus_filter events={events} setevents={setevents} filterevents={filterevents} setfilterEvents={setfilterEvents} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
            {/* category filter */}
            <Wonderful_ebbinghaus_category_filter events={events} setevents={setevents} filterevents={filterevents} setfilterEvents={setfilterEvents} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
            {/* content */}
            <Wonderful_ebbinghaus_content events={filterevents} />
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
