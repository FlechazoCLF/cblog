
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
 * 2025-07-16     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
/* article */
import { article_cfg_get } from '../article/article_cfg';
/* theme */
import { useTheme } from '../../kernel/theme/theme'

/****************************************************************************************************
* Define
****************************************************************************************************/

/* cards | virtuallist */
const ARTICLELIST_DISPLAY_MODE_VIRTUALLIST = "virtuallist";
const ARTICLELIST_DISPLAY_MODE_CARDS = "cards";
/* select mode */
const ARTICLELIST_DISPLAY_MODE = ARTICLELIST_DISPLAY_MODE_VIRTUALLIST;

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
* Articlelist_category_article()
****************************************************************************************************/
export function Articlelist_category_article({article}) {
    const theme = useTheme();

    do
    {

    }while(0);

    return (
        (article.state == "已发布") ? (
            <Link
                to={article.path}
                style={{
                    /* display */
                    display: 'inline-block',
                    alignItems: 'center',
                    padding: '1px',
                    position: 'relative',
                    /* font */
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
                    /* style */
                    width: '200px',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
            >
                {/* image */}
                <div
                    style={{
                        /* display */
                        position: 'relative',
                        flexShrink: 0,
                        overflow: 'hidden',
                        marginRight: '16px',
                        /* sytle */
                        width: '100%',
                        height: '100px',
                        borderRadius: '8px',
                    }}
                >
                    <img
                        src={article.cover}
                        alt={article.title}
                        style={{
                            /* display */
                            objectFit: 'cover',
                            /* sytle */
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </div>
                
                {/* content */}
                <div
                    style={{
                        /* display */
                        margin: '8px 8px 0 16px',
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minWidth: 0,
                    }}
                >
                    <h3 
                        style={{
                            /* display */
                            margin: '0 0 4px 0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            /* style */
                            color: theme.total.text,
                            fontSize: '16px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {article.title}
                    </h3>
                    <p
                        style={{
                            /* display */
                            display: '-webkit-box',
                            overflow: 'hidden',
                            margin: 0,
                            /* style */
                            color: theme.card.description,
                            fontSize: '13px',
                            lineHeight: '1.4',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {article.date} | {article.location}
                    </p>
                </div>
            </Link>
        ) : (
            <></>
        )
    )
}

/****************************************************************************************************
* Articlelist_Category_VirtualList()
****************************************************************************************************/
function Articlelist_Category_VirtualList({articles,itemHeight = 156,containerHeight = 168 * 3,columns = 5,gap = 20})
{
    const [scrollTop, setScrollTop] = useState(0);

    /* calc row height */
    const rowHeight = itemHeight + gap;
    const totalRows = Math.ceil(articles.length / columns);
    
    /* calc visible rows */
    const visibleRows = Math.ceil(containerHeight / rowHeight);
    const bufferRows = 20; 

    /* calc start and end rows */
    const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - bufferRows);
    const endRow = Math.min(totalRows, startRow + visibleRows + bufferRows * 2);

    /* calc start and end index */
    const startIndex = startRow * columns;
    const endIndex = Math.min(articles.length, endRow * columns);

    /* memoize visible articles */
    const visibleArticles = useMemo(() => {
        return articles.slice(startIndex, endIndex);
    }, [articles, startIndex, endIndex]);

    /* calc padding */
    const paddingTop = startRow * rowHeight;
    const paddingBottom = (totalRows - endRow) * rowHeight;

    const handleScroll = (e) => {
        let scrollTop = e.target.scrollTop;
        setScrollTop(scrollTop);
    };

    return (
        <div 
            style={{
                height: containerHeight,
                overflowY: 'auto'
            }} 
            onScroll={handleScroll}
        >
            <div
                style={{
                    padding: `${paddingTop} 0px ${paddingBottom} 0px`,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: `${gap}px`,
                    margin: '0 auto',
                    padding: '0 20px',
                    boxSizing: 'border-box'
                }}
            >
                {visibleArticles.map((article) => (
                    <div key={article.id || article.title}>
                        <Articlelist_category_article article={article} />
                    </div>
                ))}
            </div>
        </div>
    );
}

/****************************************************************************************************
* Articlelist_category()
****************************************************************************************************/
export function Articlelist_category({category}) {
    const theme = useTheme();

    do
    {

    }while(0);

    return (
        <div>
            <div
                /* layout */
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <h1 style={{
                    /* position */
                    margin: '30px',
                    /* font */
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    /* color */
                    color: theme.total.text,
                    /* style */
                    borderBottom: `2px solid ${theme.total.primary}`,
                }}>
                    {category.category}
                </h1>
            </div>
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    margin: '0 auto',
                    gap: '20px',
                    padding: '0 20px',
                }}
            >
                {
                    (ARTICLELIST_DISPLAY_MODE == ARTICLELIST_DISPLAY_MODE_VIRTUALLIST) ? (
                        <Articlelist_Category_VirtualList articles={category.articles}/>
                    ) : (
                        category.articles && category.articles.map((article, aidx) => (<Articlelist_category_article article={article} key={aidx} />))
                    )
                }
            </div>
        </div>
    )
}

/****************************************************************************************************
* Articlelist()
****************************************************************************************************/
export function Articlelist() {
    let articleList = null;
    const theme = useTheme();

    do
    {
        /* get all article */
        articleList = article_cfg_get();
    }while(0);

    return (
        <div
            style={{
                /* layout */
                width: '90%',
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
            {articleList.map((category, idx) => (
                <Articlelist_category category={category} key={idx} />
            ))}
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
