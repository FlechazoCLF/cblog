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
/* author */
import { Author_Get } from '../../../kernel/author/author';
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
    return (
        <div>
            {/* title */}
            <h1
                style={{
                    /* layout */
                    textAlign: 'center',
                    marginBottom: '10px',
                    /* style */
                    color: '#e74c3c',
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
                    color: '#7f8c8d',
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
function Wonderful_love_statistics(lovearticles,setFilterLoveArticles) {
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
                        color: 'white',
                        boxShadow: `0 4px 15px ${item.shadowColor}`,
                        cursor: 'pointer',
                    }}
                    /* mouse */
                    onMouseOver={e => {
                        e.currentTarget.style.transform = 'translateY(-1px) scale(1.1)';
                        e.currentTarget.style.boxShadow = `0 8px 32px ${item.shadowColor}`;
                    }}
                    onMouseOut={e => {
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
function Wonderful_love_header(lovearticles) {
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
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
            }}
        >
            {/* title */}
            <h2
                style={{
                    /* layout */
                    margin: 0,
                    /* style */
                    color: '#2c3e50'
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
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        backgroundColor: 'white',
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
function Wonderful_love_plan_card(article) {
    return (
        <div
            style={{
                /* layout */
                padding: '20px',
                marginBottom: '15px',
                /* style */
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
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
                        color: '#2c3e50',
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
                            backgroundColor: 'rgb(187, 240, 244)',
                            color: 'black',
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
                            backgroundColor: '#f8f9fa',
                            color: '#495057',
                            borderRadius: '8px',
                            fontSize: '12px',
                            border: '1px solid #e9ecef',
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
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef',
                    }}
                >
                    {/* description */}
                    <div
                        style={{
                            /* layout */
                            marginBottom: '8px',
                            /* style */
                            fontSize: '12px',
                            color: '#666',
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
                            color: '#333',
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
                    <a
                        href={article.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            /* layout */
                            display: 'inline-block',
                            padding: '8px 16px',
                            /* style */
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontSize: '14px',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        🔗 查看相关文章
                    </a>
                </div>
            )}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_love_list()
****************************************************************************************************/
function Wonderful_love_list(lovearticles) {
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
                        color: '#999',
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
                            color: '#666',
                        }}
                    >
                        共找到 {lovearticles.length} 个计划
                    </div>
                    {/* love card */}
                    {lovearticles.map(article => (
                        Wonderful_love_plan_card(article)
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
            {Wonderful_love_title()}

            {isAuthenticated && (
                <div
                    style={{
                        /* layout */
                        marginBottom: '30px',
                    }}
                >
                    {/* statistics */}
                    {Wonderful_love_statistics(lovearticles,setFilterLoveArticles)}
                    
                    {/* control */}
                    {Wonderful_love_header(filterlovearticles)}
                    
                    {/* list */}
                    {Wonderful_love_list(filterlovearticles)}
                </div>
            )}
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/