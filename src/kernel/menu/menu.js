
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
 * 2026-07-05     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useEffect, useCallback, useRef } from 'react';
/* router */
import { useNavigate } from 'react-router-dom';
/* context */
import { useAppContext } from '../context/context';
/* theme */
import { useTheme, useThemeMenuAction } from '../theme/theme';
/* config */
import { Menu_Cfg_Items_Get } from './menu_cfg';

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* menu width */
const MENU_WIDTH = 180;
/* menu item height */
const ITEM_HEIGHT = 36;
/* menu action registry */
const menu_action_registry = {};

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Menu_Register_Action(name, handler)
* (usage) Menu_Register_Action('share', (target) => { ... });
****************************************************************************************************/
export function Menu_Register_Action(name, handler) {
    menu_action_registry[name] = handler;
}

/****************************************************************************************************
* Menu_Unregister_Action(name)
****************************************************************************************************/
export function Menu_Unregister_Action(name) {
    delete menu_action_registry[name];
}

/****************************************************************************************************
* Menu_Icon()
****************************************************************************************************/
function Menu_Icon({ name, color }) {
    const icons = {
        home: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
        ),
        back: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
        ),
        forward: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
        ),
        theme: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
            </svg>
        ),
        copy: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
        ),
        info: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
        ),
    };
    return icons[name] || null;
}

/****************************************************************************************************
* Menu()
****************************************************************************************************/
export function Menu() {

    const theme = useTheme();
    const { navigate } = useAppContext();
    const items = Menu_Cfg_Items_Get();

    /* register theme menu action */
    useThemeMenuAction();

    /* status */
    const [visible, setVisible]   = useState(false);
    const [pos, setPos]           = useState({ x: 0, y: 0 });
    const [hoveredIdx, setHoveredIdx] = useState(-1);
    const menuRef = useRef(null);

    /* ref */
    const navigateRef = useRef(navigate);
    useEffect(() => { navigateRef.current = navigate; }, [navigate]);

    /* default menu actions */
    useEffect(() => {
        Menu_Register_Action('navigate', (target) => {
            navigateRef.current(target);
        });
        Menu_Register_Action('history', (target) => {
            if (target === 'back') window.history.back();
            else if (target === 'forward') window.history.forward();
        });
        Menu_Register_Action('copy', () => {
            const text = window.getSelection().toString();
            if (text) navigator.clipboard.writeText(text).catch(() => {});
        });
    }, []);

    /* right click menu */
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
            /* calculate position */
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            let x = e.clientX;
            let y = e.clientY;
            if (x + MENU_WIDTH > vw) x = vw - MENU_WIDTH - 8;
            /* calc height */
            const visibleItems = items.filter(item => {
                if (item.condition === 'hasSelection') {
                    return window.getSelection().toString().length > 0;
                }
                return true;
            });
            const estimatedHeight = visibleItems.length * ITEM_HEIGHT + 16;
            if (y + estimatedHeight > vh) y = vh - estimatedHeight - 8;

            setPos({ x, y });
            setVisible(true);
            setHoveredIdx(-1);
        };

        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
    }, [items]);

    /* close */
    const close = useCallback(() => {
        setVisible(false);
        setHoveredIdx(-1);
    }, []);

    /* close on click outside */
    useEffect(() => {
        if (!visible) return;
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                close();
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [visible, close]);

    /* Escape close + scroll close */
    useEffect(() => {
        if (!visible) return;
        const handleKeyDown = (e) => { if (e.key === 'Escape') close(); };
        const handleScroll = () => close();
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [visible, close]);

    /* execute action */
    const executeAction = useCallback((item) => {
        const handler = menu_action_registry[item.action];
        if (handler) handler(item.target);
        close();
    }, [close]);

    /* filter items */
    const visibleItems = items.filter(item => {
        if (item.condition === 'hasSelection') {
            return window.getSelection().toString().length > 0;
        }
        return true;
    });

    /* colors */
    const menuBg       = theme.total.surface + 'F0';
    const menuBorder   = theme.total.borderSecondary;
    const itemColor    = theme.total.textPrimary;
    const itemHoverBg  = theme.total.surfaceHover;
    const iconColor    = theme.total.textSecondary;
    const dividerColor = theme.total.divider;

    if (!visible) return null;

    return (
        <div
            ref={menuRef}
            style={{
                position: 'fixed',
                left: pos.x + 'px',
                top: pos.y + 'px',
                zIndex: 9999,
                /* style */
                minWidth: MENU_WIDTH + 'px',
                padding: '6px 0',
                borderRadius: '12px',
                background: menuBg,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${menuBorder}`,
                boxShadow: theme.total.shadowLg,
                /* animation */
                animation: 'menuFadeIn 0.15s ease',
            }}
        >
            {/* menu items */}
            {visibleItems.map((item, i) => (
                <React.Fragment key={i}>
                    <div
                        onClick={() => executeAction(item)}
                        onMouseEnter={() => setHoveredIdx(i)}
                        onMouseLeave={() => setHoveredIdx(-1)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '0 14px',
                            height: ITEM_HEIGHT + 'px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: itemColor,
                            background: hoveredIdx === i ? itemHoverBg : 'transparent',
                            borderRadius: '6px',
                            margin: '0 4px',
                            width: 'calc(100% - 8px)',
                            transition: 'background 0.15s',
                            userSelect: 'none',
                        }}
                    >
                        <Menu_Icon name={item.icon} color={iconColor} />
                        <span>{item.label}</span>
                    </div>
                    {item.divider && (
                        <div style={{
                            height: '1px',
                            background: dividerColor,
                            margin: '4px 12px',
                        }} />
                    )}
                </React.Fragment>
            ))}

            {/* animation */}
            <style>{`
                @keyframes menuFadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to   { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
