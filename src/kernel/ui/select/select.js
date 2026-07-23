
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
 * 2026-07-23     cc          add custom div Select (replace native <select>, full style control)
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useEffect, useRef } from 'react';
/* theme */
import { useTheme } from '../../theme/theme'

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
* Select()
****************************************************************************************************/
export function Select({ options = [], value, onChange, getLabel, placeholder = '请选择', style = {}, menuStyle = {} }) {
    /* theme */
    const theme = useTheme();
    /* state */
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    /* helpers */
    const labelOf = (option) => (getLabel ? getLabel(option) : (typeof option === 'string' ? option : (option && option.label)));
    /* current */
    const current = options.find(option => labelOf(option) === value);

    /* close when click outside */
    useEffect(() => {
        if (!open) return;
        const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, [open]);

    /* pick */
    const pick = (option) => { if (onChange) onChange(option); setOpen(false); };

    return (
        <div 
            ref={ref} 
            style={{
                /* layout */
                position: 'relative', 
                display: 'inline-flex', 
                flexShrink: 0, 
                /* style */
                ...style 
            }}
        >
            {/* select */}
            <div
                onClick={() => setOpen(option => !option)}
                style={{
                    /* layout */
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 8,
                    padding: '8px 12px', 
                    flexShrink: 0,
                    /* style */
                    background: 'transparent',
                    fontSize: 14,
                    color: theme.total.textPrimary,
                    cursor: 'pointer',
                    outline: 'none',
                    fontWeight: 600,
                    userSelect: 'none',
                }}
            >
                {/* label */}
                <span 
                    style={{ 
                        whiteSpace: 'nowrap' 
                    }}
                >
                    {current ? labelOf(current) : placeholder}
                </span>
                {/* arrow */}
                <span 
                    style={{ 
                        /* style */
                        fontSize: 16, 
                    }}
                >
                    {open ? '🔺' : '🔻'}
                </span>
            </div>
            {/* options */}
            {open && (
                <div
                    style={{
                        /* layout */
                        position: 'absolute', 
                        top: 'calc(100% + 6px)', 
                        left: 0, 
                        minWidth: '100%',
                        /* style */
                        background: theme.total.surface,
                        border: '1px solid ' + theme.total.border,
                        borderRadius: 14,
                        boxShadow: theme.total.shadowLg,
                        padding: 6,
                        zIndex: 50,
                        maxHeight: 280,
                        overflowY: 'auto',
                        ...menuStyle,
                    }}
                >
                    {/* options list */}
                    {options.map((option, i) => {
                        const selected = labelOf(option) === value;
                        return (
                            <div
                                key={i}
                                onClick={() => pick(option)}
                                onMouseEnter={(e) => { 
                                    e.currentTarget.style.background = theme.total.surfaceHover; 
                                }}
                                onMouseLeave={(e) => { 
                                    e.currentTarget.style.background = 'transparent'; 
                                }}
                                style={{
                                    /* layout */
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 8,
                                    padding: '8px 12px', 
                                    borderRadius: 10,
                                    /* style */
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    color: theme.total.textPrimary,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {/* label */}
                                <span 
                                    style={{ 
                                        flex: 1 
                                    }}
                                >
                                    {labelOf(option)}
                                </span>
                                {/* check */}
                                {selected && <span 
                                    style={{ 
                                        color: theme.total.primary, 
                                        fontSize: 12 
                                    }}
                                >
                                    ✔️
                                </span>}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
