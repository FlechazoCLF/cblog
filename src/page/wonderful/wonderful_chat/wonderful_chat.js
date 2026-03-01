
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
/* author */
import { Author_Get } from '../../../kernel/author/author';
/* chat list */
import { chat_cfg_list, Wonderful_chat_cfg_list_user_get } from './wonderful_chat_cfg';

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
* Wonderful_chat_sidebar_chatlist()
****************************************************************************************************/
export function Wonderful_chat_sidebar_chatlist(chatList,setSelectedChat) {
    return (
        <div 
            style={{
                /* layout */
                flex: 1,
                overflowY: 'auto',
                /* style */
            }}
        >
            {chatList.map(chat => {
                /* selected */
                const isSelected = chat.user === setSelectedChat;
                /* last message */
                const lastMessage = chat.messages[chat.messages.length - 1];

                return (
                    <div
                        key={chat.user}
                        onClick={() => setSelectedChat(chat.user)}
                        style={{
                            /* layout */
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            gap: '12px',
                            /* style */
                            padding: '15px 20px',
                            borderBottom: '1px solid #f5f5f5',
                            backgroundColor: isSelected ? '#e3f2fd' : 'transparent',
                            transition: 'background-color 0.2s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            if (!isSelected) {
                                e.target.style.backgroundColor = '#f8f9fa';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSelected) {
                                e.target.style.backgroundColor = 'transparent';
                            }
                        }}
                    >
                        {/* user */}
                        <div 
                            style={{
                                /* layout */
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                /* style */
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                backgroundColor: isSelected ? '#2196f3' : '#f0f0f0',
                                fontSize: '20px',
                                border: `2px solid ${isSelected ? '#2196f3' : '#e0e0e0'}`,
                            }}
                        >
                            {chat.user}
                        </div>

                        {/* 聊天信息 */}
                        <div 
                            style={{
                                /* layout */
                                flex: 1,
                                minWidth: 0,
                                /* style */
                            }}
                        >
                            <div 
                                style={{
                                    /* layout */
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '4px',
                                    /* style */
                                }}
                            >
                                <span 
                                    style={{
                                        /* layout */
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        /* style */
                                        fontSize: '15px',
                                        fontWeight: isSelected ? '600' : '500',
                                        color: isSelected ? '#2196f3' : '#333',
                                    }}
                                >
                                    {chat.name}
                                </span>
                                {lastMessage && (
                                    <span 
                                        style={{
                                            /* layout */
                                            flexShrink: 0,
                                            /* style */
                                            fontSize: '11px',
                                            color: '#999',
                                        }}
                                    >
                                        {lastMessage.timestamp}
                                    </span>
                                )}
                            </div>
                            
                            {lastMessage ? (
                                <div 
                                    style={{
                                        /* layout */
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        /* style */
                                        fontSize: '13px',
                                        color: '#666',
                                    }}
                                >
                                    {lastMessage.content.length > 25 
                                        ? lastMessage.content.substring(0, 25) + '...' 
                                        : lastMessage.content
                                    }
                                </div>
                            ) : (
                                <div 
                                    style={{
                                        /* layout */
                                        /* style */
                                        fontSize: '13px',
                                        color: '#999',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {chat.user === '全部' ? '查看所有聊天记录' : '暂无消息'}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_chat_sidebar()
****************************************************************************************************/
export function Wonderful_chat_sidebar(chatList,setSelectedChat) {
    return (
        /* sidebar */
        <div
            style={{
                /* layout */
                display: 'flex',
                flexDirection: 'column',
                /* style */
                width: '300px',
                height: '100vh',
                borderRight: '1px solid #e0e0e0',
            }}
        >
            {/* sidebar header */}
            <div
                style={{
                    /* layout */
                    padding: '20px',
                    /* style */
                    borderBottom: '1px solid #f0f0f0',
                }}
            >
                <h2>
                    💬 聊天列表
                </h2>
                <p 
                    style={{
                        /* layout */
                        margin: '5px 0 0 0',
                        /* style */
                        color: '#999',
                        fontSize: '12px',
                    }}
                >
                    选择聊天对象
                </p>
            </div>

            {/* sidebar chat list */}
            {Wonderful_chat_sidebar_chatlist(chatList,setSelectedChat)}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_chat_window_header()
****************************************************************************************************/
export function Wonderful_chat_window_header(filteredChat,selectedChat) {
    return (
        <div
            style={{
                /* layout */
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                /* style */
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
        >
            {/* chat header */}
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px',
                    /* style */
                    gap: '10px',
                }}
            >
                <div 
                    style={{
                        /* layout */
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        /* style */
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#f0f0f0',
                        fontSize: '18px',
                        border: '2px solid #e0e0e0',
                    }}
                >
                    {filteredChat.user || '💬'}
                </div>
                <div 
                    style={{ 
                        /* layout */
                        textAlign: 'center',
                        /* style */
                    }}
                >
                    <h1 
                        style={{ 
                            /* layout */
                            margin: 0,
                            /* style */
                            color: '#1a1a1a',
                            fontSize: '20px',
                            fontWeight: '600',
                        }}
                    >
                        {filteredChat.user || '美好时光'}
                    </h1>
                    <p 
                        style={{ 
                            /* layout */
                            margin: '2px 0 0 0',
                            /* style */
                            color: '#666',
                            fontSize: '14px',
                        }}
                    >
                        {`与 ${filteredChat.user} 的聊天`}
                    </p>
                </div>
            </div>
        </div>
    );
}

/****************************************************************************************************
* Wonderful_chat_window_content_message()
****************************************************************************************************/
export function Wonderful_chat_window_content_message(filteredChat,messages) {
    return messages.map(message => {
        const isRightSide = message.direction === 'send';
        return (
            <div
                key={message.id} 
                style={{
                    display: 'flex',
                    justifyContent: isRightSide ? 'flex-end' : 'flex-start',
                    marginBottom: '15px'
                    }}
                >
                <div
                    style={{
                        maxWidth: '70%',
                        display: 'flex',
                        flexDirection: isRightSide ? 'row-reverse' : 'row',
                        alignItems: 'flex-start',
                        gap: '12px'
                    }}
                >
                    {/* 头像 */}
                    <div
                        style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            backgroundColor: isRightSide ? '#007AFF' : '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            flexShrink: 0,
                            border: `2px solid ${isRightSide ? '#007AFF' : '#e0e0e0'}`
                        }}
                    >
                        {(isRightSide ? ("小柴") : (filteredChat.user) )}
                    </div>
                    
                    {/* 消息气泡 */}
                    <div 
                        style={{
                            position: 'relative',
                            backgroundColor: isRightSide ? '#007AFF' : 'white',
                            color: isRightSide ? 'white' : '#333',
                            borderRadius: '18px',
                            padding: '12px 16px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            border: isRightSide ? 'none' : '1px solid #e0e0e0',
                            wordBreak: 'break-word'
                        }}
                    >
                        {/* 消息气泡尖角 */}
                        <div 
                            style={{
                                position: 'absolute',
                                top: '12px',
                                [isRightSide ? 'right' : 'left']: '-8px',
                                width: 0,
                                height: 0,
                                borderTop: '8px solid transparent',
                                borderBottom: '8px solid transparent',
                                [isRightSide ? 'borderLeft' : 'borderRight']: `8px solid ${isRightSide ? '#007AFF' : 'white'}`
                            }} 
                        />
                        
                        {/* 发言人名称 */}
                        <div 
                            style={{
                                fontSize: '12px',
                                opacity: 0.8,
                                marginBottom: '4px',
                                fontWeight: '500'
                            }}
                        >
                            {message.authorName || message.author}
                        </div>
                        
                        {/* 消息内容 */}
                        <div 
                            style={{
                                fontSize: '15px',
                                lineHeight: '1.4',
                                marginBottom: '6px'
                            }}
                        >
                            {message.content}
                        </div>
                        
                        {/* 时间和删除按钮 */}
                        <div 
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '11px',
                                opacity: 0.7,
                                marginTop: '4px'
                            }}
                        >
                            <span>{message.timestamp}</span>
                            <div 
                                style={{ 
                                    /* layout */
                                    /* style */
                                    display: 'flex',
                                    gap: '4px',
                                }}
                            >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
}

/****************************************************************************************************
* Wonderful_chat_window_content()
****************************************************************************************************/
export function Wonderful_chat_window_content(filteredChat,selectedChat) {
    return (
        <div 
            style={{
                /* layout */
                display: 'flex', 
                flexDirection: 'column', 
                flex: 1,
                overflowY: 'auto',
                /* style */
                gap: '15px',
                paddingRight: '5px',
            }}
        >
            {(() => {
                const filteredMessages = filteredChat.messages;
                return filteredMessages.length === 0 ? (
                    <div 
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '40px',
                            textAlign: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div
                            style={{ 
                                /* layout */
                                /* style */
                                fontSize: '48px', 
                                marginBottom: '15px' 
                            }}
                        >
                            💭
                        </div>
                        <p 
                            style={{ 
                                /* layout */
                                /* style */
                                color: '#666', 
                                fontSize: '18px' 
                            }}
                        >
                            {`与 ${filteredChat.user} 还没有聊天记录`}
                        </p>
                    </div>
                ) : (
                    Wonderful_chat_window_content_message(filteredChat,filteredMessages)
                );
            })()}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_chat_window_footer()
****************************************************************************************************/
export function Wonderful_chat_window_footer(filteredChat,selectedChat) {
    const filteredMessages = filteredChat.messages;
    return filteredMessages.length > 0 && (
        <div 
            style={{
                /* layout */
                textAlign: 'center',
                flexShrink: 0,
                /* style */
                padding: '20px',
                color: '#8e8e93',
                fontSize: '14px',
            }}
        >
            {`与 ${filteredChat.user} 共 ${filteredMessages.length} 条消息 ✨`}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_chat_window()
****************************************************************************************************/
export function Wonderful_chat_window(chatList,selectedChat) {
    let filteredChat = Wonderful_chat_cfg_list_user_get(selectedChat);

    do
    {
        /* check parameter */
        if(filteredChat === undefined || filteredChat === null)
        {
            filteredChat = chat_cfg_list[0];
            continue;
        }
    }while(0);

    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                padding: '20px',
                /* style */
                height: '100vh',
                backgroundColor: ' #f5f5f5',
                boxSizing: 'border-box',
                borderRadius: '32px',
            }}
        >
            {/* chat window header */}
            {Wonderful_chat_window_header(filteredChat,selectedChat)}
            {/* chat window content */}
            {Wonderful_chat_window_content(filteredChat,selectedChat)}
            {/* chat window footer */}
            {Wonderful_chat_window_footer(filteredChat,selectedChat)}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_chat()
****************************************************************************************************/
export function Wonderful_chat() {
    /* select chat */
    const [selectedChat, setSelectedChat] = useState('all');

    do
    {

    }while(0);

    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                /* style */
                width: '90%',
                height: '100vh',
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
            {/* sidebar */}
            {Wonderful_chat_sidebar(chat_cfg_list,setSelectedChat)}
            {/* window */}
            {Wonderful_chat_window(chat_cfg_list,selectedChat)}
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
