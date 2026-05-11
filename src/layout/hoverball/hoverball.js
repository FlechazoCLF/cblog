
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
 * 2026-02-11     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/
/* react */
import React, { useState, useRef, useEffect } from 'react';
/* theme */
import { useTheme } from '../../kernel/theme/theme'
/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/
/* hover ball menu */
const Hoverball_t = [];

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Hoverball_Item()
****************************************************************************************************/
function Hoverball_Item({ icon, label, onClickFunc, active, color }) {
    const theme = useTheme();
    /* hover */
    const [isHovered, setIsHovered] = useState(false);

    do
    {

    }while(0);

    return (
        <button
            onClick={onClickFunc}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                /* layout */
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                /* style */
                background: isHovered ? `${theme.total.background}F2` : `linear-gradient(135deg, ${color}22 50%, ${color}11 100%)`,
                border: `2px solid ${active ? color : theme.total.border}`,
                borderRadius: '12px',
                boxShadow: isHovered ? `0 6px 20px ${color}33` : `0 4px 12px ${theme.total.overlay}`,
                /* animation */
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0)',
                cursor: 'pointer',
                /* font */
                color: theme.total.text,
                fontWeight: active ? '600' : '500',
                fontSize: '14px',
            }}
        >
            {/* icon */}
            <span 
                style={{
                    /* layout */
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    /* size */
                    width: '28px',
                    height: '28px',
                    /* color */
                    background: active ? `linear-gradient(135deg, ${color} 0%, ${color} 100%)` : `${theme.total.background}F2`,
                    color: active ? theme.total.background : color,
                    /* font */
                    fontSize: '16px',
                    fontWeight: 'bold',
                    /* style */
                    borderRadius: '8px',
                    boxShadow: active ? `0 2px 8px ${color}66` : `0 2px 6px ${theme.total.overlay}`,
                    transition: 'all 0.3s ease',
                }}
            >
                {icon}
            </span>

            {/* label */}
            <span
                style={{
                    /* style */
                    writingMode: 'horizontal-tb',
                    whiteSpace: 'nowrap',
                }}
            >
                {label}
            </span>
            
            {/* active */}
            {active && (
                <span 
                    style={{
                        /* layout */
                        marginLeft: 'auto',
                        width: '8px',
                        height: '8px',
                        /* color */
                        background: color,
                        borderRadius: '50%',
                        boxShadow: `0 0 8px ${color}`,
                    }}
                />
            )}
        </button>
    );
}

/****************************************************************************************************
* Hoverball_Init()
****************************************************************************************************/
export function Hoverball_Init() {

    do
    {

    }while(0);

}

/****************************************************************************************************
* Hoverball_Item_Find()
****************************************************************************************************/
export function Hoverball_Item_Find(name) {
    return Hoverball_t.find(item => item.name == name);
}

/****************************************************************************************************
* Hoverball_Register()
****************************************************************************************************/
export function Hoverball_Item_Register({name,icon,label,onClickFunc,active,color}) {
    let item = null;
    do
    {
        /* check */
        if((name == "") || (label == "") || (onClickFunc == null))
        {
            continue;
        }
        /* find */
        if(Hoverball_Item_Find(name) != undefined)
        {
            continue;
        }
        /* register */
        item = {
            name:name,
            icon:icon,
            label:label,
            onClickFunc:onClickFunc,
            active:active,
            color:color,
        }
        Hoverball_t.push(item);
    }while(0);
    return Hoverball_t.length;
}

/****************************************************************************************************
* Hoverball_Item_Update()
****************************************************************************************************/
export function Hoverball_Item_Update(name,{icon,label,active,color}) {
    let item = undefined;
    do
    {
        /* check */
        if((name == "") || (label == ""))
        {
            continue;
        }
        /* find */
        item = Hoverball_Item_Find(name);
        if(item == undefined)
        {
            continue;
        }
        /* update */
        item.icon = icon;
        item.label = label;
        item.active = active || item.active;
        item.color = color || item.color;
    }
    while(0);
    return item;
}

/****************************************************************************************************
* Hoverball_Menu()
****************************************************************************************************/
export function Hoverball_Menu() {
    const theme = useTheme();
    /* open */
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    /* click outside */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {document.removeEventListener('mousedown', handleClickOutside);};
    }, [isMenuOpen]);
    /* switch menu */
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };
    return (
        <div
            ref={menuRef}
            style={{
                /* layout */
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'fixed',
                /* position */
                bottom: '16px',
                right: '16px',
                zIndex: 1000,
            }}
        >
            {/* menu */}
            {isMenuOpen && (
                <div style={{
                    /* layout */
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    bottom: '60px',
                    marginBottom: '20px',
                    right: 0,
                    gap: '12px',
                }}>
                    {Hoverball_t.map(item => {
                        return (
                            <Hoverball_Item
                                key={item.name || item.id || Math.random()}
                                icon = {item.icon}
                                label = {item.label}
                                onClickFunc = {item.onClickFunc}
                                active = {item.active}
                                color = {item.color}
                            />
                        )
                    })}
                </div>
            )}
            {/* button */}
            <button
                onClick={toggleMenu}
                style={{
                    /* layout */
                    position: 'relative',
                    /* color */
                    border: 'none',
                    background:'transparent',
                    color: `${theme.total.background}1A`,
                    /* font */
                    fontSize: '48px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.25)';
                    e.currentTarget.style.color = `${theme.total.background}99`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.color = `${theme.total.background}1A`;
                }}
            >
                {isMenuOpen ? '🧣' : '🌅'}
            </button>
        </div>
    );
}

/****************************************************************************************************
* Hoverball()
****************************************************************************************************/
export function Hoverball() {

    do
    {

    }while(0);

    return (
        <Hoverball_Menu />
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
