
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
 * 2025-09-01     cc          add friend list info
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useEffect } from 'react';
/* author */
import { Author_Get } from '../../kernel/author/author';
/* theme */
import { useTheme } from '../../kernel/theme/theme'
/* friend cfg */
import { friend_cfg_siteInfo, friend_cfg_links, friend_cfg_message, Friend_Cfg_Links_Add, Friend_Cfg_Message_Add } from './friend_cfg';

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
* Friend_Title()
****************************************************************************************************/
function Friend_Title() {
    const theme = useTheme();
    
    do
    {

    }while(0);

    return (
        <div
            style={{
                /* layout */
                textAlign: 'center',
                marginBottom: '40px',
                padding: '30px',
                /* style */
                backgroundColor: theme.total.surface,
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
        >
            {/* title */}
            <h1
                style={{
                    /* layout */
                    marginBottom: '10px',
                    /* style */
                    fontSize: '32px',
                    color: theme.total.textPrimary,
                }}
            >
                🤝 友情链接
            </h1>
            {/* description */}
            <p 
                style={{
                    /* layout */
                    /* style */
                    color: theme.total.textSecondary,
                    fontSize: '16px',
                    lineHeight: '1.6',
                }}
            >
                欢迎来到友链页面！这里收录了一些优质的网站和博客，也欢迎大家申请友链交换。
            </p>
        </div>
    );
}

/****************************************************************************************************
* Friend_Links()
****************************************************************************************************/
function Friend_Links(links) {
    const theme = useTheme();
    
    do
    {

    }while(0);

    return (
        <div
            style={{
                /* layout */
                marginBottom: '40px'
            }}
        >
            {/* title */}
            <h2
                style={{
                    /* layout */
                    textAlign: 'center',
                    marginBottom: '20px',
                    /* style */
                    fontSize: '24px',
                    color: theme.total.textPrimary,
                }}
            >
                🌟 推荐站点
            </h2>
            {/* links */}
            <div
                style={{
                    /* layout */
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px'
                }}
            >
                {links.map(link => (
                    <div
                        key={link.id} 
                        style={{
                            /* layout */
                            padding: '20px',
                            /* style */
                            backgroundColor: theme.total.surface,
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                        }}
                        onClick={() => window.open(link.url, '_blank')}
                    >
                        {/* link info */}
                        <div
                            style={{
                                /* layout */
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '15px',
                            }}
                        >
                            {/* avatar */}
                            <div
                                style={{
                                    /* layout */
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                    /* style */
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: theme.total.surfaceSecondary,
                                    fontSize: '24px',
                                }}
                            >
                                {link.avatar}
                            </div>
                            {/* name */}
                            <div>
                                <h3 
                                    style={{
                                        /* layout */
                                        margin: 0,
                                        /* style */
                                        color: theme.total.textPrimary,
                                        fontSize: '18px',
                                    }}
                                >
                                    {link.name}
                                </h3>
                                {/* url */}
                                <p 
                                    style={{
                                        /* layout */
                                        margin: 0,
                                        /* style */
                                        color: '#3498db',
                                        fontSize: '14px',
                                    }}
                                >
                                    {link.url}
                                </p>
                            </div>
                        </div>
                        <p
                            style={{
                                /* layout */
                                margin: 0,
                                /* style */
                                lineHeight: '1.5',
                                fontSize: '14px',
                                color: '#7f8c8d',
                            }}
                        >
                            {link.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/****************************************************************************************************
* Friend_Info()
****************************************************************************************************/
function Friend_Info(siteInfo) {
    do
    {

    }while(0);

    return (
        <div
            style={{
                /* layout */
                marginBottom: '40px',
                padding: '30px',
                /* style */
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
        >
            {/* title */}
            <h2 
                style={{
                    /* layout */
                    marginBottom: '20px',
                    textAlign: 'center',
                    /* style */
                    fontSize: '24px',
                    color: '#2c3e50',
                }}
            >
                📋 本站信息
            </h2>
            <div
                style={{
                    /* layout */
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                }}
            >
                <div>
                    <div
                        style={{
                            /* layout */
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '15px',
                        }}
                    >
                        {/* avatar */}
                        <span 
                            style={{ 
                                /* layout */
                                marginRight: '15px',
                                /* style */
                                fontSize: '32px', 
                            }}
                        >
                            {siteInfo.avatar}
                        </span>
                        {/* name */}
                        <div>
                            <h3 
                                style={{
                                    /* layout */
                                    margin: 0, 
                                    /* style */
                                    color: '#2c3e50',
                                }}
                            >
                                {siteInfo.name}
                            </h3>
                            {/* url */}
                            <p 
                                style={{
                                    /* layout */
                                    margin: 0,
                                    /* style */
                                    color: '#3498db', 
                                    fontSize: '14px',
                                }}
                            >
                                {siteInfo.url}
                            </p>
                        </div>
                    </div>
                    {/* description */}
                    <p 
                        style={{
                            /* layout */
                            marginBottom: '15px',
                            /* style */
                            color: '#7f8c8d',
                            lineHeight: '1.6',
                        }}
                    >
                        {siteInfo.description}
                    </p>
                </div>
                {/* contact */}
                <div>
                    {/* author */}
                    <div 
                        style={{
                            /* layout */
                            marginBottom: '15px' 
                        }}
                    >
                        <strong 
                            style={{
                                /* style */
                                color: '#2c3e50' 
                            }}
                        >
                            站长：
                        </strong>
                        <span 
                            style={{
                                /* style */
                                color: '#7f8c8d' 
                            }}
                        >
                            {siteInfo.author}
                        </span>
                    </div>
                    {/* email */}
                    <div 
                        style={{
                            /* layout */
                            marginBottom: '15px' 
                        }}
                    >
                        <strong 
                            style={{
                                /* style */
                                color: '#2c3e50' 
                            }}
                        >
                            邮箱：
                        </strong>
                        <span 
                            style={{
                                /* style */
                                color: '#7f8c8d' 
                            }}
                        >
                            {siteInfo.email}
                        </span>
                    </div>
                    {/* tags */}
                    <div>
                        <strong 
                            style={{
                                /* layout */
                                display: 'block', 
                                marginBottom: '8px',
                                /* style */
                                color: '#2c3e50', 
                            }}
                        >
                            标签：
                        </strong>
                        <div 
                            style={{
                                /* layout */
                                display: 'flex', 
                                flexWrap: 'wrap', 
                                gap: '8px',
                                /* style */
                            }}
                        >
                            {siteInfo.tags.map((tag, index) => (
                                <span 
                                    key={index} 
                                    style={{
                                        /* layout */
                                        padding: '4px 8px',
                                        /* style */
                                        backgroundColor: '#e3f2fd',
                                        color: '#1976d2',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/****************************************************************************************************
* Friend_Message_Input()
****************************************************************************************************/
function Friend_Message_Input(newMessage,setNewMessage) {
    return (
        <div 
            style={{
                /* layout */
                padding: '20px',
                marginBottom: '30px',
                /* style */
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
            }}
        >
            <div style={{
                /* layout */
                display: 'grid',
                marginBottom: '15px',
                gap: '15px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                /* style */
            }}>
                {/* name */}
                <input
                    type="text"
                    placeholder="姓名 *"
                    value={newMessage.name}
                    onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
                    style={{
                        /* layout */
                        padding: '12px',
                        outline: 'none',
                        /* style */
                        border: '2px solid #e1e8ed',
                        borderRadius: '6px',
                        fontSize: '14px',
                    }}
                />
                {/* email */}
                <input
                    type="email"
                    placeholder="邮箱"
                    value={newMessage.email}
                    onChange={(e) => setNewMessage({...newMessage, email: e.target.value})}
                    style={{
                        /* layout */
                        padding: '12px',
                        outline: 'none',
                        /* style */
                        border: '2px solid #e1e8ed',
                        borderRadius: '6px',
                        fontSize: '14px',
                    }}
                />
                {/* website */}
                <input
                    type="url"
                    placeholder="网站"
                    value={newMessage.website}
                    onChange={(e) => setNewMessage({...newMessage, website: e.target.value})}
                    style={{
                        /* layout */
                        padding: '12px',
                        outline: 'none',
                        /* style */
                        border: '2px solid #e1e8ed',
                        borderRadius: '6px',
                        fontSize: '14px',
                    }}
                />
            </div>
            {/* message */}
            <textarea
                placeholder="留言内容 *"
                value={newMessage.content}
                onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                rows="4"
                style={{
                    /* layout */
                    padding: '12px',
                    resize: 'vertical',
                    outline: 'none',
                    marginBottom: '15px',
                    /* style */
                    width: '100%',
                    border: '2px solid #e1e8ed',
                    borderRadius: '6px',
                    fontSize: '14px',
                }}
            />
            {/* button */}
            <button
                onClick={() => (
                    Friend_Cfg_Message_Add(newMessage.name, newMessage.email, newMessage.website, newMessage.content),
                    setNewMessage({name:'', email:'', website:'', content:''})
                )}
                style={{
                    /* layout */
                    padding: '12px 24px',
                    /* style */
                    color: 'white',
                    backgroundColor: '#3498db',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
            >
                🚀 发表留言
            </button>
        </div>
    );
}

/****************************************************************************************************
* Friend_Message_List()
****************************************************************************************************/
function Friend_Message_List(messages) {
    return (
        <div>
            {messages.length === 0 ? (
                <div 
                    style={{
                        /* layout */
                        textAlign: 'center',
                        padding: '40px',
                        /* style */
                        color: '#7f8c8d',
                    }}
                >
                    <div 
                        style={{ 
                            /* layout */
                            marginBottom: '15px',
                            /* style */
                            fontSize: '48px', 
                        }}
                    >
                        💭
                    </div>
                    <p>还没有留言，快来抢沙发吧！</p>
                </div>
            ) : (
                <div 
                    style={{ 
                        /* layout */
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '15px',
                        /* style */
                    }}
                >
                    {messages.map(message => (
                        <div 
                            key={message.id} 
                            style={{
                                /* layout */
                                padding: '20px',
                                /* style */
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                border: '1px solid #e9ecef',
                            }}
                        >
                            <div style={{
                                /* layout */
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '10px',
                                /* style */
                            }}>
                                <div style={{
                                    /* layout */
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    /* style */
                                }}>
                                    {/* name */}
                                    <div style={{
                                        /* layout */
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        /* style */
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: '#3498db',
                                        color: 'white',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                    }}>
                                        {message.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div 
                                            style={{
                                                /* layout */
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                /* style */
                                            }}
                                        >
                                            <strong 
                                                style={{ 
                                                    color: '#2c3e50' 
                                                }}
                                            >
                                                {message.name}
                                            </strong>
                                            {message.website && (
                                                <a
                                                    href={message.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        /* layout */
                                                        textDecoration: 'none',
                                                        /* style */
                                                        color: '#3498db',
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    🔗 网站
                                                </a>
                                            )}
                                        </div>
                                        <div style={{
                                            /* layout */
                                            /* style */
                                            color: '#7f8c8d',
                                            fontSize: '12px',
                                        }}>
                                            {message.timestamp}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p 
                                style={{
                                    /* layout */
                                    margin: 0,
                                    lineHeight: '1.6',
                                    /* style */
                                    color: '#2c3e50',
                                }}
                            >
                                {message.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/****************************************************************************************************
* Friend_Message()
****************************************************************************************************/
function Friend_Message(messages) {

    /* new message */
    const [newMessage, setNewMessage] = useState({
        name: '',
        email: '',
        website: '',
        message: ''
    });

    do
    {

    }while(0);

    return (
        <div
            style={{
                /* layout */
                padding: '30px',
                /* style */
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
        >
            {/* title */}
            <h2 
                style={{
                    /* layout */
                    marginBottom: '20px',
                    textAlign: 'center',
                    /* style */
                    fontSize: '24px',
                    color: '#2c3e50',
                }}
            >
                💬 留言板
            </h2>

            {/* form */}
            {Friend_Message_Input(newMessage, setNewMessage)}

            {/* messages list */}
            {Friend_Message_List(messages)}

            {/* total */}
            {messages.length > 0 && (
                <div 
                    style={{
                        /* layout */
                        textAlign: 'center',
                        marginTop: '20px',
                        /* style */
                        color: '#7f8c8d',
                        fontSize: '14px',
                    }}
                >
                    共 {messages.length} 条留言
                </div>
            )}
        </div>
    );
}

/****************************************************************************************************
* Friend()
****************************************************************************************************/
export function Friend() {
    const theme = useTheme();

    do
    {

    }while(0);

    return (
        <div
            style={{
                /* layout */
                width: '90%',
                padding: '24px',
                /* style */
                minHeight: '100vh',
                background: theme.total.background,
                boxSizing: 'border-box',
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
            <div 
                style={{
                    /* layout */
                    margin: '0 auto',
                    /* style */
                    maxWidth: '1200px',
                }}
            >
                {/* title */}
                {Friend_Title()}

                {/* friends list */}
                {Friend_Links(friend_cfg_links)}

                {/* site info*/}
                {Friend_Info(friend_cfg_siteInfo)}

                {/* friends message */}
                {Friend_Message(friend_cfg_message)}
            </div>
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
