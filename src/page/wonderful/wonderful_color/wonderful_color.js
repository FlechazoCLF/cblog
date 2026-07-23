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
 * 2026-07-19     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState } from 'react';
/* theme */
import { useTheme } from '../../../kernel/theme/theme'
/* color */
import { color_list_get } from '../../../kernel/color/color'
/* copy */
import { Window_Set_Clipboard } from '../../../kernel/window/window'

/****************************************************************************************************
* Define
****************************************************************************************************/

/* gradient angle */
const COLOR_GRADIENT_ANGLE = 135;

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
* Wonderful_color_build_gradient()
****************************************************************************************************/
function Wonderful_color_build_gradient(values) {
    let gradient = "";

    do
    {
        /* sanitize & join */
        const cols = values.map(value => value.trim());
        gradient = `linear-gradient(${COLOR_GRADIENT_ANGLE}deg, ${cols.join(', ')})`;
    }while(0);

    return (gradient);
}

/****************************************************************************************************
* Wonderful_color_card()
****************************************************************************************************/
function Wonderful_color_card({ color, theme }) {
    const [copied, setCopied] = useState(false);
    /* gradient or solid */
    const isGradient = Array.isArray(color.value);
    const displayColor = isGradient ? Wonderful_color_build_gradient(color.value) : color.value.trim();

    /* handle copy */
    const handleCopy = () => {
        /* set copied */
        Window_Set_Clipboard(displayColor);
        setCopied(true);
        /* set timeout */
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div
            onClick={handleCopy}
            title="点击复制色值"
            style={{
                /* layout */
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 12px',
                /* color */
                background: theme.total.surface,
                /* style */
                border: `1px solid ${theme.total.borderSecondary}`,
                borderRadius: '18px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = theme.total.shadowMd; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
        >
            {/* ball */}
            <div
                style={{
                    /* layout */
                    width: '64px',
                    height: '64px',
                    /* style */
                    borderRadius: '50%',
                    background: displayColor,
                    boxShadow: theme.total.shadowSm,
                    marginBottom: '12px',
                }}
            />
            {/* description */}
            <div style={{ textAlign: 'center' }}>
                {/* cn name */}
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: theme.total.textPrimary }}>
                    {color.description}
                </div>
                {/* name */}
                <div style={{ fontSize: '0.72rem', color: theme.total.textMuted, marginTop: '2px' }}>
                    {color.name}
                </div>
                {/* value */}
                <div style={{ fontSize: '0.7rem', color: theme.total.textSecondary, marginTop: '4px' }}>
                    {isGradient ? '渐变' : color.value.trim()}
                </div>
            </div>
            {/* copied badge */}
            {copied && (
                <div
                    style={{
                        /* layout */
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        /* color */
                        color: theme.total.textInverse,
                        background: theme.total.primary,
                        /* font */
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                        /* style */
                        padding: '2px 6px',
                        borderRadius: '8px',
                    }}
                >
                    已复制
                </div>
            )}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_color_Init()
****************************************************************************************************/
export function Wonderful_color_Init() {

    do
    {
        /* data is static; nothing to preload */
    }while(0);

    return (
        <>
        </>
    );
}

/****************************************************************************************************
* Wonderful_color()
****************************************************************************************************/
export function Wonderful_color() {
    const theme = useTheme();
    /* get categories */
    const categories = color_list_get();

    return (
        <div
            style={{
                /* layout */
                width: '90%',
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '24px',
                /* style */
                borderRadius: '32px',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = theme.total.shadowMd; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
        >
            {/* title */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <h1 style={{ fontSize: '2.4rem', marginBottom: '8px', color: theme.total.textPrimary }}>
                    🎨 云朵偷喝了酒, 染红了半边天
                </h1>
                <p style={{ color: theme.total.textSecondary, fontSize: '1rem' }}>
                    点击任意色卡即可复制色值
                </p>
            </div>
            {/* categories */}
            {categories.map((cat, ci) => (
                <div key={ci} style={{ marginBottom: '32px' }}>
                    {/* header */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
                        <h2 style={{ fontSize: '1.3rem', color: theme.total.textPrimary }}>
                            {cat.description}
                        </h2>
                        <span style={{ fontSize: '0.8rem', color: theme.total.textMuted }}>
                            {cat.colors.length} 色
                        </span>
                    </div>
                    {/* grid */}
                    <div
                        style={{
                            /* layout */
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                            gap: '16px',
                        }}
                    >
                        {cat.colors.map((color, i) => (
                            <Wonderful_color_card key={i} color={color} theme={theme} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
