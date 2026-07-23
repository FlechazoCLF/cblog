
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
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React from 'react';
/* theme */
import { useTheme } from '../../kernel/theme/theme'
/* article */
import { Article_Markdown_Get } from '../article/article'
/* mbti */
import { About_Mbti_Cfg_Get } from './about_cfg'

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
* About_Mbti_Dimension()
****************************************************************************************************/
function About_Mbti_Dimension({ dim, theme }) {
    const leftActive = dim.left.percent >= 50;

    return (
        <div style={{ marginBottom: '14px' }}>
            {/* title */}
            <div style={{
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px',
                color: theme.total.textMuted, marginBottom: '6px',
                textTransform: 'uppercase',
            }}>
                {dim.label}
            </div>
            {/* label */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px',
            }}>
                {/* left tag */}
                <div style={{
                    fontSize: '12px', fontWeight: leftActive ? 700 : 400,
                    color: leftActive ? theme.total.primary : theme.total.textSecondary,
                    width: '52px', textAlign: 'left', flexShrink: 0,
                    transition: 'all 0.3s',
                }}>
                    {dim.left.tag} <span style={{ fontSize: '11px' }}>{dim.left.name}</span>
                </div>
                {/* percent */}
                <div style={{
                    fontSize: '11px', color: theme.total.textMuted,
                    fontVariantNumeric: 'tabular-nums',
                }}>
                    {dim.left.percent}%
                </div>
                {/* gap */}
                <div style={{ flex: 1 }} />
                {/* percent */}
                <div style={{
                    fontSize: '11px', color: theme.total.textMuted,
                    fontVariantNumeric: 'tabular-nums',
                }}>
                    {dim.right.percent}%
                </div>
                {/* right tag */}
                <div style={{
                    fontSize: '12px', fontWeight: !leftActive ? 700 : 400,
                    color: !leftActive ? theme.total.primary : theme.total.textSecondary,
                    width: '52px', textAlign: 'right', flexShrink: 0,
                    transition: 'all 0.3s',
                }}>
                    <span style={{ fontSize: '11px' }}>{dim.right.name}</span> {dim.right.tag}
                </div>
            </div>
            {/* progress */}
            <div style={{
                width: '100%', height: '6px', borderRadius: '3px',
                background: theme.total.progressBg,
                position: 'relative', overflow: 'hidden',
            }}>
                {/* fill */}
                <div style={{
                    position: 'absolute', left: 0, top: 0, height: '100%',
                    width: dim.left.percent + '%', borderRadius: '3px',
                    background: leftActive ? theme.total.primary : theme.total.textMuted,
                    opacity: leftActive ? 1 : 0.4,
                    transition: 'all 0.5s ease',
                }} />
                {/* fill */}
                <div style={{
                    position: 'absolute', right: 0, top: 0, height: '100%',
                    width: dim.right.percent + '%', borderRadius: '3px',
                    background: !leftActive ? theme.total.primary : theme.total.textMuted,
                    opacity: !leftActive ? 1 : 0.4,
                    transition: 'all 0.5s ease',
                }} />
            </div>
        </div>
    );
}

/****************************************************************************************************
* About_Mbti()
****************************************************************************************************/
export function About_Mbti() {

    const theme = useTheme();
    const cfg = About_Mbti_Cfg_Get();

    /* get coreType */
    const coreType = cfg.type.replace(/-[AT]$/, '');
    const subtype = cfg.type.split('-')[1] || '';

    return (
        <div
            style={{
                /* layout */
                width: '90%',
                padding: '20px 28px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '28px',
                /* merge */
                marginBottom: '20px',
                transition: 'all 0.3s ease',
            }}
            /* mouse */
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
                e.currentTarget.style.boxShadow = theme.total.shadowMd;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'None';
            }}
        >

            {/* type name */}
            <div style={{
                flexShrink: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                minWidth: '120px',
                alignSelf: 'stretch',
            }}>
                {/* type */}
                <div style={{
                    fontSize: '32px', fontWeight: 800, letterSpacing: '3px',
                    color: theme.total.primary,
                    lineHeight: 1,
                }}>
                    {coreType}
                </div>
                {/* subtype */}
                <div style={{
                    fontSize: '12px', fontWeight: 600,
                    color: theme.total.textMuted,
                    padding: '2px 10px', borderRadius: '6px',
                    background: theme.total.primaryLight,
                    marginTop: '6px',
                }}>
                    {subtype}
                </div>
                {/* name */}
                <div style={{
                    fontSize: '13px', fontWeight: 500,
                    color: theme.total.textSecondary,
                    marginTop: '8px',
                }}>
                    {cfg.name}
                </div>
                {/* name en */}
                <div style={{
                    fontSize: '11px', color: theme.total.textMuted,
                }}>
                    {cfg.nameEn}
                </div>
            </div>

            {/* split */}
            <div style={{
                width: '1px', alignSelf: 'stretch',
                background: theme.total.divider,
                flexShrink: 0,
            }} />

            {/* dimensions */}
            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px 24px',
                paddingTop: '4px',
            }}>
                {cfg.dimensions.map((dim, i) => (
                    <About_Mbti_Dimension key={i} dim={dim} theme={theme} />
                ))}
            </div>

            {/* split */}
            <div style={{
                width: '1px', alignSelf: 'stretch',
                background: theme.total.divider,
                flexShrink: 0,
            }} />

            {/* features */}
            <div style={{
                flexShrink: 0,
                width: '200px',
                display: 'flex', flexDirection: 'column',
                paddingTop: '4px',
            }}>
                <div style={{
                    fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px',
                    color: theme.total.textMuted, marginBottom: '8px',
                    textTransform: 'uppercase',
                }}>
                    核心特质
                </div>
                {cfg.traits.map((trait, i) => (
                    <div key={i} style={{
                        fontSize: '11px', lineHeight: '1.7',
                        color: theme.total.textSecondary,
                        paddingLeft: '10px',
                        position: 'relative',
                        marginBottom: '2px',
                    }}>
                        <span style={{
                            position: 'absolute', left: '0', top: '3px',
                            color: theme.total.primary, fontSize: '6px',
                        }}>●</span>
                        {trait}
                    </div>
                ))}
                {/* link button */}
                <a
                    href={cfg.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-block',
                        fontSize: '11px', fontWeight: 500,
                        color: theme.total.primary,
                        padding: '5px 12px', borderRadius: '8px',
                        background: theme.total.primaryLight,
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        marginTop: '12px',
                        textAlign: 'center',
                    }}
                >
                    查看完整报告 →
                </a>
            </div>
        </div>
    );
}

/****************************************************************************************************
* About()
****************************************************************************************************/
export function About() {

    do
    {

    }while(0);

    return (
        <div
            style={{
                /* layout */
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                margin: "auto",
                width: "100%",
                height: "100%",
            }}
        >
            {/* MBTI 卡片 */}
            <About_Mbti />
            {/* 关于我 */}
            <Article_Markdown_Get path="about/" />
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
