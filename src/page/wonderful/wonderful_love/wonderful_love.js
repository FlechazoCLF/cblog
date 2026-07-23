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
import React, { useContext, useState, useEffect } from 'react';
/* router */
import { Link } from 'react-router-dom';
/* author */
import { Author_Get } from '../../../kernel/author/author';
/* theme */
import { useTheme } from '../../../kernel/theme/theme'
/* categorize */
import { categorize_cfg_item_get } from '../../categorize/categorize_cfg';

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
* Wonderful_love_title()
****************************************************************************************************/
function Wonderful_love_title() {
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
                美好爱情 💕
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
                记录我们的美好时光和未来计划
            </p>
        </div>
    );
}

/****************************************************************************************************
* Wonderful_love_statistics()
****************************************************************************************************/
function Wonderful_love_statistics({lovearticles,setFilterLoveArticles}) {
    const theme = useTheme();
    const totalarticles = lovearticles.length;
    const todoarticles = lovearticles.filter(p => p.state === '未发布').length;
    const doingarticles = lovearticles.filter(p => p.state === '发布中').length;
    const donearticles = lovearticles.filter(p => p.state === '已发布').length;

    /* statistics */
    const statisticsData = [
        {
            count: totalarticles,
            name: '总计划数',
            background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            shadowColor: 'rgba(255, 154, 158, 0.4)',
            filter: null,
        },
        {
            count: todoarticles,
            name: '待办',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
            shadowColor: 'rgba(255, 107, 107, 0.4)',
            filter: '未发布',
        },
        {
            count: doingarticles,
            name: '进行中',
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
            shadowColor: 'rgba(78, 205, 196, 0.4)',
            filter: '发布中',
        },
        {
            count: donearticles,
            name: '已完成',
            background: 'linear-gradient(135deg, #45b7d1 0%, #96c93d 100%)',
            shadowColor: 'rgba(69, 183, 209, 0.4)',
            filter: '已发布',
        }
    ];

    return (
        <div
            style={{
                /* layout */
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(20px, 10fr))',
                gap: '20px',
                marginBottom: '30px',
                /* style */
            }}
        >
            {statisticsData.map((item, index) => (
                /* sub item */
                <div
                    key={index}
                    style={{
                        /* layout */
                        padding: '20px',
                        textAlign: 'center',
                        /* style */
                        background: item.background,
                        borderRadius: '12px',
                        color: theme.total.textInverse,
                        boxShadow: `0 4px 15px ${item.shadowColor}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                    }}
                    /* mouse */
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-1px) scale(1.1)';
                        e.currentTarget.style.boxShadow = `0 8px 32px ${item.shadowColor}`;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = `0 4px 15px ${item.shadowColor}`;
                    }}
                    /* click */
                    onClick={() => {
                        const filteredArticles = item.filter 
                            ? lovearticles.filter(p => p.state === item.filter)
                            : lovearticles;
                        setFilterLoveArticles(filteredArticles);
                    }}
                >
                    {/* count */}
                    <div
                        style={{
                            marginBottom: '8px',
                            fontSize: '32px',
                            fontWeight: 'bold',
                        }}
                    >
                        {item.count}
                    </div>
                    {/* count description */}
                    <div
                        style={{
                            fontSize: '14px',
                            opacity: 0.9,
                        }}
                    >
                        {item.name}
                    </div>
                </div>
            ))}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_love_header()
****************************************************************************************************/
function Wonderful_love_header({lovearticles}) {
    const theme = useTheme();
    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '15px',
                /* style */
                backgroundColor: theme.total.surfaceSecondary,
                borderRadius: '8px'
            }}
        >
            {/* title */}
            <h2
                style={{
                    /* layout */
                    margin: 0,
                    /* style */
                    color: theme.total.textPrimary
                }}
            >
                💕 爱情计划清单
            </h2>
            {/* filter */}
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center',
                    /* style */
                }}
            >
                <select
                    style={{
                        /* layout */
                        padding: '8px 12px',
                        /* style */
                        border: `1px solid ${theme.total.border}`,
                        borderRadius: '4px',
                        backgroundColor: theme.total.background,
                        cursor: 'pointer'
                    }}
                >
                    <option 
                        value="all"
                    >
                        所有年份
                    </option>
                </select>
            </div>
        </div>
    );
}

/****************************************************************************************************
* Wonderful_love_plan_card()
****************************************************************************************************/
function Wonderful_love_plan_card({article}) {
    const theme = useTheme();
    return (
        <div
            style={{
                /* layout */
                padding: '20px',
                marginBottom: '15px',
                /* style */
                backgroundColor: theme.total.background,
                borderRadius: '12px',
                boxShadow: theme.total.shadowSm,
                border: `1px solid ${theme.total.progressBg}`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = theme.total.shadowMd;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme.total.shadowSm;
            }}
        >
            {/* title */}
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                    /* style */
                }}
            >
                {/* title */}
                <h3
                    style={{
                        /* layout */
                        margin: '0 0 8px 0',
                        /* style */
                        color: theme.total.textPrimary,
                        fontSize: '18px',
                        fontWeight: 'bold',
                    }}
                >
                    {article.title}
                </h3>
                {/* status */}
                <div
                    style={{
                        /* layout */
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px',
                        /* style */
                    }}
                >
                    <span
                        style={{
                            /* layout */
                            padding: '4px 12px',
                            /* style */
                            backgroundColor: theme.total.infoBg,
                            color: theme.total.textPrimary,
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                        }}
                    >
                        {article.state}
                    </span>
                    {/* date */}
                    <span
                        style={{
                            /* layout */
                            padding: '4px 8px',
                            /* style */
                            backgroundColor: theme.total.surfaceSecondary,
                            color: theme.total.textPrimary,
                            borderRadius: '8px',
                            fontSize: '12px',
                            border: `1px solid ${theme.total.borderSecondary}`,
                        }}
                    >
                        {article.date}
                    </span>
                </div>
            </div>
            {/* description */}
            {article.description && (
                <div
                    style={{
                        /* layout */
                        marginBottom: '15px',
                        padding: '12px',
                        /* style */
                        backgroundColor: theme.total.surfaceSecondary,
                        borderRadius: '8px',
                        border: `1px solid ${theme.total.borderSecondary}`,
                    }}
                >
                    {/* description */}
                    <div
                        style={{
                            /* layout */
                            marginBottom: '8px',
                            /* style */
                            fontSize: '12px',
                            color: theme.total.textDisabled,
                            fontWeight: 'bold',
                        }}
                    >
                        📝 计划描述
                    </div>
                    {/* article description */}
                    <div 
                        style={{
                            /* style */
                            fontSize: '14px',
                            color: theme.total.text,
                            lineHeight: '1.5',
                        }}
                    >
                        {article.description}
                    </div>
                </div>
            )}
            {/* article link */}
            {article.path && (
                <div
                    style={{
                        marginBottom: '15px'
                    }}
                >
                    <Link
                        to={article.path}
                        style={{
                            /* layout */
                            display: 'inline-block',
                            padding: '8px 16px',
                            /* style */
                            backgroundColor: theme.total.primary,
                            color: theme.total.textInverse,
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        🔗 查看相关文章
                    </Link>
                </div>
            )}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_love_list()
****************************************************************************************************/
function Wonderful_love_list({lovearticles}) {
    const theme = useTheme();
    return (
        <div>
            {/* article item */}
            {lovearticles.length === 0 ? (
                <div
                    style={{
                        /* layout */
                        textAlign: 'center',
                        padding: '60px 20px',
                        /* style */
                        color: theme.total.textMuted,
                    }}
                >
                    <div 
                        style={{ 
                            /* layout */
                            marginBottom: '20px',
                            /* font */
                            fontSize: '48px', 
                        }}
                    >
                        💕
                    </div>
                    <div 
                        style={{ 
                            /* layout */
                            marginBottom: '10px',
                            /* font */
                            fontSize: '18px', 
                        }}
                    >
                        暂无爱情计划记录
                    </div>
                    <div 
                        style={{ 
                            /* font */
                            fontSize: '14px',
                        }}
                    >
                        点击上方"➕ 添加新计划"按钮开始记录你们的美好计划吧！
                    </div>
                </div>
            ) : (
                <>
                    {/* title */}
                    <div 
                        style={{
                            /* layout */
                            marginBottom: '20px',
                            /* style */
                            fontSize: '14px',
                            color: theme.total.textDisabled,
                        }}
                    >
                        共找到 {lovearticles.length} 个计划
                    </div>
                    {/* love card */}
                    {lovearticles.map(article => (
                        <Wonderful_love_plan_card article={article} />
                    ))}
                </>
            )}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_love()
****************************************************************************************************/
export function Wonderful_love() {
    const theme = useTheme();
    /* author */
    const AuthContext = Author_Get();
    const { isAuthenticated, login, logout } = useContext(AuthContext);
    const [filterlovearticles, setFilterLoveArticles] = useState([]);
    /* articles */
    let lovecategories = null;
    let lovearticles = [];

    do
    {
        /* get categories */
        lovecategories = categorize_cfg_item_get('love');
        if(lovecategories == null)
        {
            continue;
        }
        /* get articles */
        lovearticles = lovecategories.articles;
    }while(0);

    /* init */
    useEffect(() => {
        setFilterLoveArticles(lovearticles);
    }, [lovearticles.length]);

    return (
        <div
            style={{
                /* layout */
                width: '90%',
                padding: '24px',
                margin: '0 auto',
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
            <Wonderful_love_title />

            {isAuthenticated && (
                <div
                    style={{
                        /* layout */
                        marginBottom: '30px',
                    }}
                >
                    {/* statistics */}
                    <Wonderful_love_statistics lovearticles={lovearticles} setFilterLoveArticles={setFilterLoveArticles} />

                    {/* control */}
                    <Wonderful_love_header lovearticles={filterlovearticles} />

                    {/* list */}
                    <Wonderful_love_list lovearticles={filterlovearticles} />
                </div>
            )}
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/