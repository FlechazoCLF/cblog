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
 * 2026-05-07     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* AppContext */
import { useAppContext } from '../context/context'
/* color */
import { color_get } from '../color/color'
/* react */
import { useEffect, useRef } from 'react'
/* menu */
import { Menu_Register_Action } from '../menu/menu'

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* themes */
const themes = {
    light: {
        /* total */
        total: {
            /* 背景层 */
            background:       '#faf8f5',      /* 页面整体底色，微微偏暖灰，比纯白更护眼 */
            surface:          '#fefdfb',      /* 卡片、弹窗、导航 — 暖白，避免纯白刺眼 */
            surfaceSecondary: '#f2efeb',      /* 次级区块，和 background 拉开一档 */
            surfaceHover:     '#e9ecef',      /* 列表项/卡片 hover 态 */
            overlay:          '#00000055',    /* 弹窗/抽屉遮罩 (8位hex=RGBA) */
            canvas:           '#faf8f5',      /* 最底层页面背景，微暖灰 */
            elevated:         '#ffffff',      /* 弹出层/模态框，比 surface 更亮 */
            overlayLight:     'rgba(250,248,245,0.88)', /* 轻遮罩 — 毛玻璃/半透明面板 */
            codeBg:           '#f4f5f7',      /* 代码块/行内代码背景 */

            /* 文字层 — 三级灰度拉开层次感 */
            textPrimary:    '#1f2328',      /* 正文、标题、重点内容 (对比度 ~15:1) */
            textSecondary:  '#656d76',      /* 副标题、时间、作者 (对比度 ~6.5:1) */
            textMuted:      '#8b949e',      /* 占位符、失效文字 (对比度 ~3.5:1) */
            textDisabled:   '#afb8c1',      /* 禁用态 */
            textInverse:    '#ffffff',      /* 深色背景上的文字 */

            textLink:       '#0969da',      /* 超链接 */
            textLinkHover:  '#0550ae',      /* 链接 hover 态 */
            textCode:       '#cf222e',      /* 行内代码/语法高亮基础色 */

            /* 边框与分割线 */
            border:         '#d0d7de',      /* 常规边框 */
            borderSecondary:'#e1e4e8',      /* 次级边框 */
            borderFocus:    '#FA5A15',      /* 输入框 focus / 选中高亮 */
            divider:        '#e8ebef',      /* 段落分割线 */

            /* 主色 — 橘色系，仅用于"用户正在交互的元素" */
            primary:           '#FA5A15',      /* 主按钮、高亮标记 */
            primaryHover:      '#e14d0a',      /* 主色 hover 态 */
            primaryActive:     '#c63f00',      /* 主色按下态 */
            primaryLight:      '#fff1eb',      /* 主色浅底（blockquote 背景、标签底色等静态装饰） */
            primaryUltraLight: '#fff7f3',      /* 主色极浅底 */

            /* 状态色 */
            success:           '#2da44e',
            successBg:         '#dafbe1',
            warning:           '#bf8700',
            warningBg:         '#fff8c5',
            error:             '#cf222e',
            errorBg:           '#ffebe9',
            info:              '#0969da',
            infoBg:            '#ddf4ff',

            /* 阴影 — 暖色调，不透明度控制在 0.04~0.12 */
            shadowXs:    '0 1px 2px rgba(80,60,40,0.04)',                          /* 几乎看不见，给平面元素一丝立体感 */
            shadowSm:    '0 2px 8px rgba(80,60,40,0.06), 0 1px 2px rgba(80,60,40,0.04)', /* 卡片默认阴影 */
            shadowMd:    '0 4px 16px rgba(80,60,40,0.08), 0 2px 4px rgba(80,60,40,0.04)', /* hover 抬起 */
            shadowLg:    '0 8px 32px rgba(80,60,40,0.12), 0 4px 8px rgba(80,60,40,0.06)', /* 弹窗/模态框 */

            /* Markdown 标签/徽章/特殊内容 */
            blockquoteBorder:   '#FA5A15',       /* blockquote 左边框保留主色，因为是唯一装饰 */
            blockquoteBg:       '#fff7f3',       /* 用 ultraLight 而不是主色 */
            tableStripe:        '#f8f9fa',
            selection:          '#FA5A1522',     /* 选中文字底色，透明度降到 13% */
            tagBg:              '#f1f3f5',
            tagText:            '#4b5563',
            markBg:             '#fff3bf',

            /* 特殊内容 */
            scrollbarThumb:         '#c9cfd6',
            scrollbarThumbHover:    '#a8b0b8',
            tocActive:              '#FA5A15',
            progressBg:             '#e9ecef',
            progressBar:            '#FA5A15',
        },
        /* card */
        card: {
            background:     '#fefdfb',          /* 对齐 surface — 暖白 */
            text:           '#1f2328',          /* 对齐 textPrimary */
            title:          '#1f2328',          /* 对齐 textPrimary */
            description:    '#656d76',          /* 对齐 textSecondary */
            primary:        '#FA5A15',          /* 对齐 total.primary */
            border:         '#d0d7de',          /* 对齐 total.border */
            hover:          '#fefdfb',          /* 对齐 surface */
        },
        /* navigate */
        navigate: {
            background:     '#fefdfb',          /* 对齐 surface — 暖白 */
            text:           '#1f2328',          /* 对齐 textPrimary */
            title:          '#FA5A15',          /* 对齐 total.primary */
            description:    '#656d76',          /* 对齐 textSecondary */
            primary:        '#FA5A15',          /* 对齐 total.primary */
            border:         '#d0d7de',          /* 对齐 total.border */
            hover:          '#e9ecef',          /* 对齐 total.surfaceHover */
        },
        /* sidebar */
        sidebar: {
            background:     '#fefdfb',          /* 对齐 surface */
            text:           '#1f2328',          /* 对齐 textPrimary */
            textSecondary:  '#656d76',          /* 对齐 textSecondary */
            primary:        '#FA5A15',          /* 对齐 total.primary */
            hover:          '#e9ecef',          /* 对齐 total.surfaceHover */
            border:         '#e8ebef',          /* 对齐 total.divider */
        },
        /* topbar */
        topbar: {
            background:     '#fefdfb',          /* 对齐 surface */
            text:           '#1f2328',          /* 对齐 textPrimary */
            primary:        '#FA5A15',          /* 对齐 total.primary */
            border:         '#e8ebef',          /* 对齐 total.divider */
        },
    },

    dark: {
        /* total */
        total: {
            /* 背景层 — Catppuccin Mocha 色系，偏紫灰的深色 */
            background:       '#1e1e2e',      /* Base — 页面底色，紫灰调 */
            surface:          '#262637',      /* 卡片、弹窗 — 比 Base 亮一档 */
            surfaceSecondary: '#2a2a3c',      /* 次级区块 */
            surfaceHover:     '#313244',      /* Surface0 — hover 态 */
            overlay:          '#11111bee',    /* Crust + 高透明度遮罩 */
            canvas:           '#faf8f5',      /* 最底层 — 与 background 一致 */
            elevated:         '#2a2a3c',      /* 弹出层 — 比 surface 亮一档 */
            overlayLight:     'rgba(30,30,46,0.88)', /* 轻遮罩 — 暗色毛玻璃 */
            codeBg:           '#2a2a3c',      /* 代码块背景 */

            /* 文字层 — Catppuccin Text 色系，柔和的薰衣草白 */
            textPrimary:    '#cdd6f4',      /* Text — 正文，带微蓝紫调的白 */
            textSecondary:  '#a6adc8',      /* Subtext0 — 副标题 */
            textMuted:      '#6c7086',      /* Overlay0 — 占位符 */
            textDisabled:   '#45475a',      /* Surface1 — 禁用态 */
            textInverse:    '#1e1e2e',      /* 深底浅字反转 */

            textLink:       '#89b4fa',      /* Catppuccin Blue — 暗色下链接要提亮 */
            textLinkHover:  '#b4befe',      /* Catppuccin Lavender */
            textCode:       '#f38ba8',      /* Catppuccin Red — 行内代码 */

            /* 边框与分割线 */
            border:         '#45475a',      /* Surface1 */
            borderSecondary:'#313244',      /* Surface0 */
            borderFocus:    '#fab387',      /* Catppuccin Peach — focus 高亮 */
            divider:        '#313244',      /* Surface0 */

            /* 主色 — 橘色提亮，在深色底上和 Catppuccin Peach 融合 */
            primary:           '#fab387',      /* Peach — 暗色下的橘色主色调 */
            primaryHover:      '#ffd8b5',      /* hover 态 — 更亮更暖 */
            primaryActive:     '#e69a60',      /* 按下态 */
            primaryLight:      '#2d2418',      /* 暗色下的暖色浅底 */
            primaryUltraLight: '#261f16',      /* 极浅暖底 */

            /* 状态色 — 全部来自 Catppuccin，和底色搭配和谐 */
            success:           '#a6e3a1',      /* Catppuccin Green */
            successBg:         '#1a2e1a',
            warning:           '#f9e2af',      /* Catppuccin Yellow */
            warningBg:         '#2e2a14',
            error:             '#f38ba8',      /* Catppuccin Red */
            errorBg:           '#2e1a22',
            info:              '#89b4fa',      /* Catppuccin Blue */
            infoBg:            '#1a2040',

            /* 阴影 — 暗色下阴影靠加深底色来表达，不用黑色 */
            shadowXs:    '0 1px 2px rgba(0,0,0,0.25)',
            shadowSm:    '0 2px 8px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)',
            shadowMd:    '0 4px 16px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
            shadowLg:    '0 8px 32px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.25)',

            /* Markdown */
            blockquoteBorder:   '#fab387',       /* Peach */
            blockquoteBg:       '#2d2418',       /* 暖色浅底 */
            tableStripe:        '#262637',       /* surface 色 */
            selection:          '#fab38733',     /* Peach 选中底色 */
            tagBg:              '#313244',       /* Surface0 */
            tagText:            '#a6adc8',       /* Subtext0 */
            markBg:             '#2e2a14',       /* 暖色高亮底 */

            /* 特殊内容 */
            scrollbarThumb:         '#45475a',
            scrollbarThumbHover:    '#585b70',
            tocActive:              '#fab387',
            progressBg:             '#313244',
            progressBar:            '#fab387',
        },

        /* card — 暗色 */
        card: {
            background:     '#262637',
            text:           '#cdd6f4',
            title:          '#cdd6f4',
            description:    '#a6adc8',
            primary:        '#fab387',
            border:         '#45475a',
            hover:          '#2a2a3c',
        },

        /* navigate — 暗色 */
        navigate: {
            background:     '#262637',
            text:           '#cdd6f4',
            title:          '#fab387',
            description:    '#a6adc8',
            primary:        '#fab387',
            border:         '#45475a',
            hover:          '#313244',
        },

        /* sidebar — 暗色 */
        sidebar: {
            background:     '#262637',          /* 对齐 surface */
            text:           '#cdd6f4',          /* 对齐 textPrimary */
            textSecondary:  '#a6adc8',          /* 对齐 textSecondary */
            primary:        '#fab387',          /* 对齐 total.primary */
            hover:          '#313244',          /* 对齐 total.surfaceHover */
            border:         '#313244',          /* 对齐 total.divider */
        },
        /* topbar — 暗色 */
        topbar: {
            background:     '#262637',          /* 对齐 surface */
            text:           '#cdd6f4',          /* 对齐 textPrimary */
            primary:        '#fab387',          /* 对齐 total.primary */
            border:         '#313244',          /* 对齐 total.divider */
        },
    }
}

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* useTheme()
****************************************************************************************************/
export const useTheme = () => {
  const { theme } = useAppContext()
  /* default theme -> light */
  return themes[theme] ?? themes.light
}

/****************************************************************************************************
* useThemeMenuAction()
****************************************************************************************************/
export function useThemeMenuAction() {
    const { theme, setTheme } = useAppContext();
    const themeRef = useRef(theme);
    const setThemeRef = useRef(setTheme);

    useEffect(() => { themeRef.current = theme; }, [theme]);
    useEffect(() => { setThemeRef.current = setTheme; }, [setTheme]);

    useEffect(() => {
        Menu_Register_Action('theme', () => {
            setThemeRef.current(themeRef.current === 'light' ? 'dark' : 'light');
        });
    }, []);
}

/****************************************************************************************************
* File End!
****************************************************************************************************/