
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
/* theme */
import { useTheme } from '../../../kernel/theme/theme'
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
export function Wonderful_chat_sidebar_chatlist({chatList, setSelectedChat}) {
    const theme = useTheme();
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
                            borderBottom: `1px solid ${theme.total.surfaceSecondary}`,
                            backgroundColor: isSelected ? theme.total.surfaceHover : 'transparent',
                            transition: 'background-color 0.2s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            if (!isSelected) {
                                e.target.style.backgroundColor = theme.total.codeBg;
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
                                backgroundColor: isSelected ? theme.total.info : theme.total.progressBg,
                                fontSize: '20px',
                                border: `2px solid ${isSelected ? theme.total.info : theme.total.borderSecondary}`,
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
                                        color: isSelected ? theme.total.info : theme.total.textPrimary,
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
                                            color: theme.total.textMuted,
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
                                        color: theme.total.textDisabled,
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
                                        color: theme.total.textDisabled,
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
export function Wonderful_chat_sidebar({chatList, setSelectedChat}) {
    const theme = useTheme();
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
                borderRight: `1px solid ${theme.total.borderSecondary}`,
            }}
        >
            {/* sidebar header */}
            <div
                style={{
                    /* layout */
                    padding: '20px',
                    /* style */
                    borderBottom: `1px solid ${theme.total.progressBg}`,
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
                        color: theme.total.textDisabled,
                        fontSize: '12px',
                    }}
                >
                    选择聊天对象
                </p>
            </div>

            {/* sidebar chat list */}
            <Wonderful_chat_sidebar_chatlist chatList={chatList} setSelectedChat={setSelectedChat} />
        </div>
    );
}

/****************************************************************************************************
* Wonderful_chat_window_header()
****************************************************************************************************/
export function Wonderful_chat_window_header({filteredChat, selectedChat}) {
    const theme = useTheme();
    return (
        <div
            style={{
                /* layout */
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                /* style */
                backgroundColor: theme.total.background,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: theme.total.shadowSm,
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
                        backgroundColor: theme.total.progressBg,
                        fontSize: '18px',
                        border: `2px solid ${theme.total.borderSecondary}`,
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
                            color: theme.total.textPrimary,
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
                            color: theme.total.textDisabled,
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
export function Wonderful_chat_window_content_message({filteredChat, messages}) {
    const theme = useTheme();
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
                            backgroundColor: isRightSide ? theme.total.info : theme.total.progressBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            flexShrink: 0,
                            border: `2px solid ${isRightSide ? theme.total.info : theme.total.borderSecondary}`
                        }}
                    >
                        {(isRightSide ? ("小柴") : (filteredChat.user) )}
                    </div>
                    
                    {/* 消息气泡 */}
                    <div 
                        style={{
                            position: 'relative',
                            backgroundColor: isRightSide ? theme.total.info : theme.total.background,
                            color: isRightSide ? theme.total.textInverse : theme.total.textPrimary,
                            borderRadius: '18px',
                            padding: '12px 16px',
                            boxShadow: theme.total.shadowSm,
                            border: isRightSide ? 'none' : `1px solid ${theme.total.borderSecondary}`,
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
                                [isRightSide ? 'borderLeft' : 'borderRight']: `8px solid ${isRightSide ? theme.total.info : theme.total.textInverse}`
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
export function Wonderful_chat_window_content({filteredChat, selectedChat}) {
    const theme = useTheme();
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
                            backgroundColor: theme.total.background,
                            borderRadius: '12px',
                            padding: '40px',
                            textAlign: 'center',
                            boxShadow: theme.total.shadowSm
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
                                color: theme.total.textDisabled, 
                                fontSize: '18px' 
                            }}
                        >
                            {`与 ${filteredChat.user} 还没有聊天记录`}
                        </p>
                    </div>
                ) : (
                    <Wonderful_chat_window_content_message filteredChat={filteredChat} messages={filteredMessages} />
                );
            })()}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_chat_window_footer()
****************************************************************************************************/
export function Wonderful_chat_window_footer({filteredChat, selectedChat}) {
    const theme = useTheme();
    const filteredMessages = filteredChat.messages;
    return filteredMessages.length > 0 && (
        <div 
            style={{
                /* layout */
                textAlign: 'center',
                flexShrink: 0,
                /* style */
                padding: '20px',
                color: theme.total.textMuted,
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
export function Wonderful_chat_window({chatList, selectedChat}) {
    const theme = useTheme();
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
                backgroundColor: theme.total.surfaceSecondary,
                boxSizing: 'border-box',
                borderRadius: '32px',
            }}
        >
            {/* chat window header */}
            <Wonderful_chat_window_header filteredChat={filteredChat} selectedChat={selectedChat} />
            {/* chat window content */}
            <Wonderful_chat_window_content filteredChat={filteredChat} selectedChat={selectedChat} />
            {/* chat window footer */}
            <Wonderful_chat_window_footer filteredChat={filteredChat} selectedChat={selectedChat} />
        </div>
    );
}

/****************************************************************************************************
* Wonderful_chat()
****************************************************************************************************/
export function Wonderful_chat() {
    const theme = useTheme();
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
            {/* sidebar */}
            <Wonderful_chat_sidebar chatList={chat_cfg_list} setSelectedChat={setSelectedChat} />
            {/* window */}
            <Wonderful_chat_window chatList={chat_cfg_list} selectedChat={selectedChat} />
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
