
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
 * 2025-08-16     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useEffect } from 'react';
/* categorize */
import { categorize_cfg_item_get } from '../../categorize/categorize_cfg';
/* theme */
import { useTheme } from '../../../kernel/theme/theme'

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Wonderful_cook_title()
****************************************************************************************************/
export function Wonderful_cook_title() {
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
                不辜负小肚子🥝
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
                记录曾经做过的美食
            </p>
        </div>
    );
}

/****************************************************************************************************
* Wonderful_cook_filter()
****************************************************************************************************/
export function Wonderful_cook_filter({cookarticles,setCookarticles,filtercookarticles,setFilterCookArticles,selectedTag,setSelectedTag}) {
    const theme = useTheme();
    /* get all tags */
    let allTags = [];
    cookarticles.forEach(item => {
        /* split tags by space and add to allTags */
        if (item.tags && typeof item.tags === 'string') {
            const tagArray = item.tags.split(' ').filter(tag => tag.trim() !== '');
            allTags = [...allTags, ...tagArray];
        }
    });
    /* remove duplicate tags */
    allTags = [...new Set(allTags)];
    /* add filter tags */
    const Wonderful_cook_filter_allTagsDiv = allTags.map(tag => {
        const isSelected = selectedTag === tag;
        const isAllTag = tag === '美食';
        
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
                    setFilterCookArticles(isAllTag ? cookarticles : cookarticles.filter(item => item.tags.includes(tag)));
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
            {Wonderful_cook_filter_allTagsDiv}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_cook_content()
****************************************************************************************************/
export function Wonderful_cook_content({cookarticles}) {
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
            {cookarticles.map((article, idx) => (
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
                        onClick={() => window.open(article.path, article.external ? '_blank' : '_self')}
                    >
                        {/* image */}
                        <img
                            src={article.cover || '/images/avatar/avatar.jpg'}
                            alt={article.title}
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
                            {article.title}
                        </div>
                    </div>
                    
                    {/* tags */}
                    {article.tags && (
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
                            {article.tags.split(' ').filter(tag => tag.trim() !== '').slice(0, 3).map((tag, tagIdx) => (
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
                    {article.description && (
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
                            {article.description}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_cook()
****************************************************************************************************/
export function Wonderful_cook() {
    const theme = useTheme();
    /* articles */
    const [cookarticles, setCookarticles] = useState([]);
    const [filtercookarticles, setFilterCookArticles] = useState([]);
    const [selectedTag, setSelectedTag] = useState('美食');

    /* init */
    useEffect(() => {
        let cookcategories = null;
        let articles = [];
        /* get articles */
        cookcategories = categorize_cfg_item_get('厨艺');
        if (cookcategories && cookcategories.articles) {
            articles = cookcategories.articles;
        }
        /* set default */
        setCookarticles(articles);
        setFilterCookArticles(articles);
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
            {/* title */}
            <Wonderful_cook_title />
            {/* filter */}
            <Wonderful_cook_filter cookarticles={cookarticles} setCookarticles={setCookarticles} filtercookarticles={filtercookarticles} setFilterCookArticles={setFilterCookArticles} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
            {/* content */}
            <Wonderful_cook_content cookarticles={filtercookarticles} />
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
