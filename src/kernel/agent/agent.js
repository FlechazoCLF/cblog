
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
 * 2026-07-12     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
/* theme */
import { useTheme } from '../theme/theme'
/* hover */
import { Hoverball_Item_Register } from '../../layout/hoverball/hoverball'

/****************************************************************************************************
* Define
****************************************************************************************************/

/* page-agent config */
const AGENT_CONFIG = {
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: 'sk-ws-H.EDMDIRE.tOPm.MEUCIBFeyy4qPS3U_kU29TiJbSB8qXiTeK_De55t6hzYfzEnAiEAps60qEtGePw4OYzM_besivPe9i4U_Nd2CJ5ycIcBCjM',
    model: 'qwen-plus',
    language: 'zh-CN',
};

/* script */
const Agent_SCRIPT_ID = 'page-agent-cdn-script';
const Agent_SCRIPT_URL = 'https://registry.npmmirror.com/page-agent/1.12.1/files/dist/iife/page-agent.demo.js?autoInit=false';

/* css style for page agent */
const Agent_HIDE_CSS = `
[id*="page-agent"]:not(.ai-float):not(.ai-float *),
[class*="page-agent"]:not(.ai-float):not(.ai-float *) {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
}
.ai-float ::-webkit-scrollbar { width: 4px; }
.ai-float ::-webkit-scrollbar-track { background: transparent; }
.ai-float ::-webkit-scrollbar-thumb { background: rgba(154,149,144,0.25); border-radius: 2px; }
.ai-float ::-webkit-scrollbar-thumb:hover { background: rgba(154,149,144,0.4); }
@keyframes ai-fadeIn { from{opacity:0} to{opacity:1} }
@keyframes ai-slideUp { from{opacity:0;transform:translateX(-50%) translateY(20px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
`;

/* user habit */
const Agent_User_Habit = `
    角色:我是一名嵌入式软件开发
    技能:C/C++/Python/React
    博客:用简介的话来驱动我的博客
`;

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
* Agent_Init_InjectHideStyles()
****************************************************************************************************/
let styleInjected = false;
function Agent_Init_InjectHideStyles() {
    do {
        /* inject Hide Styles */
        if (styleInjected) break;
        styleInjected = true;
        const style = document.createElement('style');
        style.id = 'ai-float-hide-styles';
        style.textContent = Agent_HIDE_CSS;
        document.head.appendChild(style);
    } while (0);
}

/****************************************************************************************************
* Agent_Create()
****************************************************************************************************/
export function Agent_Create(agentRef) {
    do {
        /* create agent */
        let script = document.getElementById(Agent_SCRIPT_ID);

        /* agent script */
        const createAgent = () => {
            do {
                if (!window.PageAgent) break;
                if (agentRef.current) break;
                agentRef.current = new window.PageAgent(AGENT_CONFIG);
            } while (0);
        };

        if(script)
        {
            if(window.PageAgent)
            {
                /* loaded or loading */
                createAgent();
            }
            else
            {
                /* download */
                const originalOnload = script.onload;
                script.onload = () => {
                    if (originalOnload) originalOnload();
                    createAgent();
                };
            }
        }
        else
        {
            /* init */
            script = document.createElement('script');
            script.id = Agent_SCRIPT_ID;
            script.src = Agent_SCRIPT_URL;
            script.crossOrigin = 'anonymous';
            script.async = true;
            script.onload = createAgent;
            document.body.appendChild(script);
        }
    } while (0);
}

/****************************************************************************************************
* Agent_Init()
****************************************************************************************************/
export function Agent_Init(agentRef,visible,setVisible) {
    do {
        /* hoverball init */
        Hoverball_Item_Register({
            name:"AI",
            icon:"🤖",
            label:"全能AI助手",
            onClickFunc:() => setVisible(!visible),
            active:visible,
            color:"#ff6b6b",
        });
        /* default style init */
        Agent_Init_InjectHideStyles();
        /* create agent */
        Agent_Create(agentRef);
    } while (0);
}

/****************************************************************************************************
* Agent_Message()
****************************************************************************************************/
export async function Agent_Message(agentRef,messages,setMessages,input,setInput,loading,setLoading) {
    do {
        /* check state */
        if (!agentRef.current)
        {
            continue;
        }
        if (!input.trim() || loading)
        {
            continue;
        }
        /* send message */
        const userContent = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userContent }]);
        setLoading(true);

        try {
            /* execute command */
            const conciseCommand = `${Agent_User_Habit} 用户指令：${userContent}`;
            const result = await agentRef.current.execute(conciseCommand);
            /* get reply */
            let reply = '';
            if (typeof result === 'string') {
                reply = result;
            } else if (result && typeof result === 'object') {
                /* parser result */
                const summary = result.data || result.summary || result.message || result.result
                                || result.output || result.text || result.answer;
                const success = result.success !== false;
                const action = result.action || result.type;

                if (summary) {
                    reply = summary;
                } else if (action) {
                    reply = success ? `已执行：${action}` : `操作失败：${action}`;
                } else if (success) {
                    reply = '操作已完成 ✓';
                } else {
                    reply = '操作未成功';
                }

                if (result.steps && Array.isArray(result.steps)) {
                    reply += ` (共${result.steps.length}步)`;
                }
            } else {
                reply = '已完成 ✓';
            }
            /* slice 300 */
            if (reply.length > 300) {
                reply = reply.substring(0, 300) + '...';
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: reply,
                rawResult: result,
            }]);
        }
        /* error */
        catch (err) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: '出错了：' + (err.message || '未知错误'),
                error: true,
            }]);
        }
        /* finally */
        finally {
            setLoading(false);
        }
    } while (0);
}

/****************************************************************************************************
* Agent_DialogPanel_History_Show()
****************************************************************************************************/
function Agent_DialogPanel_History_Show({ historyOpen, setHistoryOpen, theme }) {
    return (
        <div style={{
            /* layout */
            display: 'flex',
            justifyContent: 'center',
            flexShrink: 0,
            padding: '4px 0',
        }}>
            <button
                onClick={() => setHistoryOpen(!historyOpen)}
                style={{
                    /* layout */
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    /* style */
                    background: `${theme.total.surface}cc`,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: `1px solid ${theme.total.borderSecondary}`,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    color: theme.total.textSecondary,
                    fontSize: '12px',
                    transition: 'all 0.25s',
                    boxShadow: theme.total.shadowSm,
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = `${theme.total.surface}e6`;
                    e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = `${theme.total.surface}cc`;
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                {historyOpen ? '▾' : '▸'}
            </button>
        </div>
    );
}

/****************************************************************************************************
* Agent_DialogPanel_History_List()
****************************************************************************************************/
function Agent_DialogPanel_History_List({ theme, messages, loading, expandedMessages, setExpandedMessages, scrollRef }) {
    return (
        <div
            ref={scrollRef}
            style={{
                /* layout */
                flex: 1,
                overflowY: 'auto',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                scrollbarWidth: 'thin',
            }}
        >
            {messages.map((msg, i) => (
                <div
                    key={i}
                    style={{
                        /* layout */
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    }}
                >
                    <div style={{
                        /* layout */
                        maxWidth: '85%',
                        padding: '10px 14px',
                        lineHeight: '1.65',
                        /* style */
                        background: msg.role === 'user'
                            ? theme.total.primary
                            : (msg.error
                                ? `${theme.total.error}15`
                                : theme.total.surfaceSecondary),
                        color: msg.role === 'user'
                            ? theme.total.textInverse
                            : theme.total.textPrimary,
                        borderRadius: msg.role === 'user'
                            ? '14px 14px 2px 14px'
                            : '14px 14px 14px 2px',
                        fontSize: '14px',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                    }}>
                        {msg.content}

                        {/* msg content */}
                        {msg.rawResult && (
                            <div style={{ marginTop: '6px' }}>
                                <button
                                    onClick={() => setExpandedMessages(prev => ({
                                        ...prev,
                                        [i]: !prev[i]
                                    }))}
                                    style={{
                                        /* layout */
                                        padding: '0',
                                        textDecoration: 'underline',
                                        /* style */
                                        background: 'none',
                                        border: 'none',
                                        color: msg.role === 'user'
                                            ? `${theme.total.textInverse}99`
                                            : theme.total.primary,
                                        cursor: 'pointer',
                                        fontSize: '11px',
                                        opacity: 0.7,
                                        transition: 'opacity 0.2s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; }}
                                >
                                    {expandedMessages[i] ? '收起详情' : '查看详情'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {loading && (
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{
                        /* layout */
                        padding: '10px 14px',
                        /* style */
                        background: theme.total.surfaceSecondary,
                        borderRadius: '14px 14px 14px 2px',
                        fontSize: '14px',
                        color: theme.total.textMuted,
                    }}>
                        思考中...
                    </div>
                </div>
            )}
        </div>
    );
}

/****************************************************************************************************
* Agent_DialogPanel_History()
****************************************************************************************************/
function Agent_DialogPanel_History({ theme, messages, setMessages, expandedMessages, setExpandedMessages, scrollRef, loading, historyOpen }) {
    do {
        if (messages.length === 0) break;
        if (!historyOpen) break;

        return (
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    flex: 1,
                    minHeight: 0,
                    /* style */
                    background: `${theme.total.surface}e0`,
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    animation: 'ai-fadeIn 0.35s ease',
                }}
            >
                {/* title */}
                <div style={{
                    /* layout */
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 16px',
                    flexShrink: 0,
                    /* style */
                    borderBottom: `1px solid ${theme.total.borderSecondary}`,
                }}>
                    <span style={{
                        fontSize: '12px',
                        color: theme.total.textMuted,
                        fontWeight: 500,
                    }}>
                        对话记录
                    </span>
                    <button
                        onClick={() => setMessages([])}
                        style={{
                            /* layout */
                            padding: '2px 8px',
                            /* style */
                            background: 'none',
                            border: 'none',
                            color: theme.total.textMuted,
                            cursor: 'pointer',
                            fontSize: '11px',
                            borderRadius: '6px',
                            transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = theme.total.surfaceSecondary; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                    >
                        清空
                    </button>
                </div>

                {/* list */}
                <Agent_DialogPanel_History_List
                    theme={theme}
                    messages={messages}
                    loading={loading}
                    expandedMessages={expandedMessages}
                    setExpandedMessages={setExpandedMessages}
                    scrollRef={scrollRef}
                />
            </div>
        );
    } while (0);

    return null;
}

/****************************************************************************************************
* Agent_DialogPanel_Input_Actions()
****************************************************************************************************/
function Agent_DialogPanel_Input_Actions({ theme, actionOpen, setActionOpen, setModelOpen, setInput, dropStyle }) {
    /* preset actions */
    const actions = [
        { icon: '🔗', label: '跳转首页', command: '跳转到首页' },
        { icon: '📝', label: '跳转博客', command: '跳转到博客页面' },
        { icon: '🔍', label: '查询内容', command: '帮我查询当前页面的内容摘要' },
        { icon: '👤', label: '关于作者', command: '介绍一下这个博客的作者' },
        { icon: '🌓', label: '切换主题', command: '帮我切换明暗主题' },
    ];

    /* action select */
    const onActionSelect = (act) => {
        setInput(act.command);
        setActionOpen(false);
    };

    return (
        <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
                onClick={() => { setActionOpen(!actionOpen); setModelOpen(false); }}
                style={{
                    /* layout */
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    height: '42px',
                    padding: '0 10px',
                    /* style */
                    background: theme.total.surfaceSecondary,
                    color: theme.total.textSecondary,
                    border: `1px solid ${theme.total.border}`,
                    borderRadius: '12px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = theme.total.primary; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = theme.total.border; }}
            >
                <span>⚡</span>
                <span style={{ fontSize: '10px' }}>{actionOpen ? '▴' : '▾'}</span>
            </button>

            {actionOpen && (
                <ul style={{ ...dropStyle, bottom: '50px' }}>
                    {actions.map((act, i) => (
                        <li
                            key={i}
                            onClick={() => onActionSelect(act)}
                            style={{
                                /* layout */
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 12px',
                                /* style */
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: theme.total.textPrimary,
                                borderRadius: '8px',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = theme.total.surfaceSecondary; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                            <span>{act.icon}</span>
                            <span>{act.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/****************************************************************************************************
* Agent_DialogPanel_Input_text()
****************************************************************************************************/
function Agent_DialogPanel_Input_text({ theme, input, setInput, handleKeyDown }) {
    return (
        <textarea
            value={input}
            onChange={e => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
            }}
            onKeyDown={handleKeyDown}
            placeholder="输入指令，Enter 发送..."
            rows={1}
            style={{
                /* layout */
                flex: 1,
                resize: 'none',
                minHeight: '42px',
                maxHeight: '80px',
                padding: '10px 14px',
                lineHeight: '1.5',
                /* style */
                background: theme.total.elevated,
                color: theme.total.textPrimary,
                border: `1px solid ${theme.total.border}`,
                borderRadius: '14px',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.25s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = theme.total.primary; }}
            onBlur={e => { e.currentTarget.style.borderColor = theme.total.border; }}
        />
    );
}

/****************************************************************************************************
* Agent_DialogPanel_Input_models()
****************************************************************************************************/
function Agent_DialogPanel_Input_models({ theme, modelOpen, setModelOpen, setActionOpen, selectedModel, setSelectedModel, dropStyle }) {
    /* model list */
    const models = [
        { key: 'qwen-plus', label: 'Qwen Plus', desc: '均衡推荐' },
        { key: 'qwen-max', label: 'Qwen Max', desc: '最强能力' },
        { key: 'qwen-turbo', label: 'Qwen Turbo', desc: '极速响应' },
    ];

    return (
        <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
                onClick={() => { setModelOpen(!modelOpen); setActionOpen(false); }}
                style={{
                    /* layout */
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    height: '42px',
                    padding: '0 10px',
                    /* style */
                    background: theme.total.surfaceSecondary,
                    color: theme.total.textSecondary,
                    border: `1px solid ${theme.total.border}`,
                    borderRadius: '12px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = theme.total.primary; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = theme.total.border; }}
            >
                <span style={{ fontWeight: 500 }}>
                    {models.find(m => m.key === selectedModel)?.label || selectedModel}
                </span>
                <span style={{ fontSize: '10px' }}>{modelOpen ? '▴' : '▾'}</span>
            </button>

            {modelOpen && (
                <ul style={{ ...dropStyle, bottom: '50px', minWidth: '140px' }}>
                    {models.map((m) => (
                        <li
                            key={m.key}
                            onClick={() => { setSelectedModel(m.key); setModelOpen(false); }}
                            style={{
                                /* layout */
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                                padding: '8px 12px',
                                /* style */
                                cursor: 'pointer',
                                borderRadius: '8px',
                                transition: 'background 0.15s',
                                background: m.key === selectedModel ? theme.total.surfaceSecondary : 'transparent',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = theme.total.surfaceSecondary; }}
                            onMouseLeave={e => {
                                if (m.key !== selectedModel) {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                        >
                            <span style={{
                                fontSize: '13px',
                                fontWeight: m.key === selectedModel ? 600 : 400,
                                color: m.key === selectedModel
                                    ? theme.total.primary
                                    : theme.total.textPrimary,
                            }}>
                                {m.label}
                            </span>
                            <span style={{
                                fontSize: '11px',
                                color: theme.total.textMuted,
                            }}>
                                {m.desc}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/****************************************************************************************************
* Agent_DialogPanel_Input_Send()
****************************************************************************************************/
function Agent_DialogPanel_Input_Send({ theme, input, loading, handleSend }) {
    return (
        <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            style={{
                /* layout */
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                width: '42px',
                height: '42px',
                /* style */
                background: (input.trim() && !loading)
                    ? theme.total.primary
                    : theme.total.surfaceSecondary,
                color: (input.trim() && !loading)
                    ? theme.total.textInverse
                    : theme.total.textMuted,
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                cursor: (input.trim() && !loading) ? 'pointer' : 'default',
                transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
                if (input.trim() && !loading) {
                    e.currentTarget.style.transform = 'scale(1.08)';
                }
            }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
            ↑
        </button>
    );
}

/****************************************************************************************************
* Agent_DialogPanel_Input()
****************************************************************************************************/
function Agent_DialogPanel_Input({ theme, messages, input, setInput, loading, handleSend, handleKeyDown, historyOpen }) {
    /* dropdown state */
    const [actionOpen, setActionOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState('qwen-plus');

    /* shared dropdown style */
    const dropStyle = {
        /* layout */
        position: 'absolute',
        left: 0,
        right: 0,
        minWidth: '120px',
        overflow: 'hidden',
        padding: '4px',
        margin: 0,
        /* style */
        background: `${theme.total.surface}f0`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${theme.total.borderSecondary}`,
        borderRadius: '12px',
        boxShadow: theme.total.shadowMd,
        zIndex: 20,
        animation: 'ai-fadeIn 0.15s ease',
        listStyle: 'none',
    };

    return (
        <div style={{
            /* layout */
            position: 'relative',
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '8px',
            padding: '10px 14px',
            flexShrink: 0,
            /* style */
            background: `${theme.total.surface}5F`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${theme.total.borderSecondary}`,
            borderRadius: messages.length > 0 && historyOpen ? '0 0 20px 20px' : '20px',
            boxShadow: theme.total.shadowLg,
            zIndex: 10,
        }}>
            {/* actions */}
            <Agent_DialogPanel_Input_Actions
                theme={theme}
                actionOpen={actionOpen}
                setActionOpen={setActionOpen}
                setModelOpen={setModelOpen}
                setInput={setInput}
                dropStyle={dropStyle}
            />
            {/* input */}
            <Agent_DialogPanel_Input_text
                theme={theme}
                input={input}
                setInput={setInput}
                handleKeyDown={handleKeyDown}
            />
            {/* model */}
            <Agent_DialogPanel_Input_models
                theme={theme}
                modelOpen={modelOpen}
                setModelOpen={setModelOpen}
                setActionOpen={setActionOpen}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                dropStyle={dropStyle}
            />
            {/* send */}
            <Agent_DialogPanel_Input_Send
                theme={theme}
                input={input}
                loading={loading}
                handleSend={handleSend}
            />
        </div>
    );
}

/****************************************************************************************************
* Agent_DialogPanel()
****************************************************************************************************/
export function Agent_DialogPanel({visible,setVisible,messages,setMessages,input,setInput,loading,setLoading,expandedMessages,setExpandedMessages,scrollRef,handleSend,handleKeyDown}) {
    const theme = useTheme();

    /* refs */
    const containerRef = useRef(null);
    const inputBarRef = useRef(null);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const panelStartPos = useRef({ x: 0, y: 0 });

    /* history toggle */
    const [historyOpen, setHistoryOpen] = useState(true);

    /* drag state */
    const [position, setPosition] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const positionRef = useRef(position);
    positionRef.current = position;

    /* cleanup: remove listeners on unmount */
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    /* mouse move: update position */
    const handleMouseMove = (e) => {
        do {
            const dx = e.clientX - dragStartPos.current.x;
            const dy = e.clientY - dragStartPos.current.y;
            const newX = panelStartPos.current.x + dx;
            const newY = panelStartPos.current.y + dy;
            setPosition({ x: newX, y: newY });
        } while (0);
    };

    /* mouse up: stop dragging */
    const handleMouseUp = () => {
        do {
            setIsDragging(false);
            document.body.style.cursor = '';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        } while (0);
    };

    /* mouse down on panel: start drag */
    const handleMouseDown = (e) => {
        do {
            /* skip if clicking interactive elements */
            const tag = e.target.tagName.toLowerCase();
            if (tag === 'textarea' || tag === 'button' || tag === 'input' ||
                tag === 'select' || tag === 'li' || tag === 'ul' || tag === 'option') {
                break;
            }

            /* first drag: compute position from current DOM rect */
            if (!positionRef.current && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const initPos = { x: rect.left, y: rect.top };
                setPosition(initPos);
                positionRef.current = initPos;
            }

            dragStartPos.current = { x: e.clientX, y: e.clientY };
            panelStartPos.current = { ...positionRef.current };
            setIsDragging(true);
            document.body.style.cursor = 'grabbing';
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } while (0);
    };

    /* click outside input bar → close history */
    useEffect(() => {
        if (!historyOpen) return;
        const handler = (e) => {
            do {
                if (!inputBarRef.current) break;
                if (inputBarRef.current.contains(e.target)) break;
                setHistoryOpen(false);
            } while (0);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [historyOpen]);

    /* new message → auto open history */
    useEffect(() => {
        if (messages.length > 0 && !historyOpen) {
            setHistoryOpen(true);
        }
    }, [messages]);

    /* compensate top when panel height changes (history open/close), keep bottom edge fixed */
    const prevHeightRef = useRef(0);
    useLayoutEffect(() => {
        if (!position || !containerRef.current) {
            /* reset when position is null (dialog reopened, fresh start) */
            prevHeightRef.current = 0;
            return;
        }
        const currentHeight = containerRef.current.offsetHeight;
        const deltaHeight = currentHeight - prevHeightRef.current;
        /* skip first measurement after reset (prevHeightRef is 0) */
        if (prevHeightRef.current > 0 && deltaHeight !== 0) {
            const newY = position.y - deltaHeight;
            setPosition(prev => prev ? { ...prev, y: newY } : prev);
            positionRef.current = { ...positionRef.current, y: newY };
        }
        prevHeightRef.current = currentHeight;
    });

    return (
        <div
            ref={containerRef}
            className="ai-float"
            onMouseDown={handleMouseDown}
            style={{
                /* layout */
                display: 'flex',
                position: 'fixed',
                flexDirection: 'column',
                ...(position
                    ? { left: `${position.x}px`, top: `${position.y}px` }
                    : { bottom: '24px', left: '50%', transform: 'translateX(-50%)' }),
                width: '90%',
                maxWidth: '560px',
                height: 'auto',
                maxHeight: '70vh',
                /* style */
                background: `${theme.total.surface}5F`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${theme.total.borderSecondary}`,
                borderRadius: '20px',
                boxShadow: theme.total.shadowLg,
                zIndex: 9999,
                animation: 'ai-slideUp 0.3s ease',
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging ? 'none' : 'box-shadow 0.2s',
            }}
        >
            {/* history */}
            <Agent_DialogPanel_History
                theme={theme}
                messages={messages}
                setMessages={setMessages}
                expandedMessages={expandedMessages}
                setExpandedMessages={setExpandedMessages}
                scrollRef={scrollRef}
                loading={loading}
                historyOpen={historyOpen}
            />

            {/* toggle + input (marginTop: auto pushes to bottom when history is closed) */}
            <div ref={inputBarRef} style={{ marginTop: 'auto' }}>
                {messages.length > 0 && (
                    <Agent_DialogPanel_History_Show
                        historyOpen={historyOpen}
                        setHistoryOpen={setHistoryOpen}
                        theme={theme}
                    />
                )}
                <Agent_DialogPanel_Input
                    theme={theme}
                    messages={messages}
                    input={input}
                    setInput={setInput}
                    loading={loading}
                    handleSend={handleSend}
                    handleKeyDown={handleKeyDown}
                    historyOpen={historyOpen}
                />
            </div>
        </div>
    );
}

/****************************************************************************************************
* Agent()
****************************************************************************************************/
export function Agent() {
    const theme = useTheme();
    const [visible, setVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [expandedMessages, setExpandedMessages] = useState({});
    const agentRef = useRef(null);
    const scrollRef = useRef(null);

    /* Agent Init */
    useEffect(() => {
        Agent_Init(agentRef,visible,setVisible);
    }, []);

    /* Agent Send */
    const handleSend = async () => {
        Agent_Message(agentRef,messages,setMessages,input,setInput,loading,setLoading);
    };

    /* Send */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    /* new message */
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, expandedMessages]);

    /* ESC close */
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                if (Object.keys(expandedMessages).some(k => expandedMessages[k])) {
                    setExpandedMessages({});
                } else if (visible) {
                    setVisible(false);
                }
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [visible, expandedMessages]);

    return (
        <>
            {/* AI Agent Dialog Panel */}
            {visible && (
                <Agent_DialogPanel
                    visible={visible}
                    setVisible={setVisible}
                    messages={messages}
                    setMessages={setMessages}
                    input={input}
                    setInput={setInput}
                    loading={loading}
                    setLoading={setLoading}
                    expandedMessages={expandedMessages}
                    setExpandedMessages={setExpandedMessages}
                    scrollRef={scrollRef}
                    handleSend={handleSend}
                    handleKeyDown={handleKeyDown}
                />
            )}
        </>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
