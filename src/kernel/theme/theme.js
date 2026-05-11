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
            background:       '#fcfcfc',      /* 页面整体底色 */
            surface:          '#ffffff',      /* 卡片、弹窗、导航 */
            surfaceSecondary: '#f7f7f8',      /* 次级区块 */
            surfaceHover:     '#f2f3f5',      /* 列表项/卡片 hover 态 */
            overlay:          '#00000066',    /* 弹窗/抽屉遮罩 (8位hex=RGBA) */
            codeBg:           '#f6f8fa',      /* 代码块/行内代码背景 */

            /* 文字层 */
            textPrimary:    '#1f2328',      /* 正文、标题、重点内容 */
            textSecondary:  '#57606a',      /* 副标题、时间、作者、分类 */
            textMuted:      '#8b949e',      /* 占位符、失效文字、极弱提示 */
            textDisabled:   '#b1b1b1',      /* 禁用态 */
            textInverse:    '#ffffff',      /* 深色背景上的文字（如按钮/标签内） */

            textLink:       '#0969da',      /* 超链接 */
            textLinkHover:  '#0550ae',      /* 链接 hover 态 */
            textCode:       '#cf222e',      /* 行内代码/语法高亮基础色 */

            /* 边框与分割线 */
            border:         '#d8dee4',      /* 输入框、卡片、表格常规边框 */
            borderSecondary:'#eaeef2',      /* 输入框、卡片、表格次级边框 */
            borderFocus:    '#FA5A15',      /* 输入框 focus / 选中高亮 */
            divider:        '#eef1f4',      /* 段落分割线（通常比 border 更浅更细） */

            /* 交互与状态色 */
            primary:           '#FA5A15',      /* 主按钮、高亮标记、进度条 */
            primaryHover:      '#e14d0a',      /* 主色 hover 态 */
            primaryActive:     '#c63f00',
            primaryLight:      '#fff1eb',
            primaryUltraLight: '#fff7f3',

            /* 状态色 */
            success:           '#2da44e',      /* 发布成功、已通过、正向反馈 */
            successBg:         '#dafbe1',
            warning:           '#bf8700',      /* 待审核、草稿、风险提示 */
            warningBg:         '#fff8c5',
            error:             '#cf222e',      /* 删除、报错、必填未填 */
            errorBg:           '#ffebe9',
            info:              '#0969da',      /* 系统提示、标签、帮助说明 */
            infoBg:            '#ddf4ff',

            /* 阴影 */
            shadowXs:    '0 1px 2px rgba(0,0,0,0.1)',    /* 轻阴影（对应 OutboxShadow）*/
            shadowSm:    '0 2px 8px rgba(0,0,0,0.2)',    /* 重阴影（对应 OverboxShadow） */
            shadowMd:    '0 8px 24px rgba(0,0,0,0.4)',
            shadowLg:    '0 12px 32px rgba(0,0,0,0.8)',

            /* Markdown 标签/徽章/特殊内容 */
            blockquoteBorder:   '#FA5A15',
            blockquoteBg:       '#fff7f3',
            tableStripe:        '#fafafa',
            selection:          '#FA5A1533',
            tagBg:              '#f3f4f6',
            tagText:            '#4b5563',
            markBg:             '#fff3bf',

            /* 特殊内容 */
            scrollbarThumb:         '#d0d7de',
            scrollbarThumbHover:    '#afb8c1',
            tocActive:              '#FA5A15',
            progressBg:             '#f0f0f0',
            progressBar:            '#FA5A15',
        },
        /* card */
        card: {
            background:     '#FFFFFF',
            text:           '#333333',
            title:          '#333333',
            description:    '#888888',
            primary:        '#646cff',
            border:         '#e0e0e0',
            hover:          '#ffffff',
        },
        /* navigate */
        navigate: {
            background:     '#ffffff',
            text:           '#333333',
            title:          '#DB3A40',
            description:    '#525252',
            primary:        '#FA5A15',
            border:         '#e0e0e0',
            hover:          '#D4D4D4',
        },
    },
    dark: {
        /* total */
        total : {
            /* total theme */
            background:     '#ffffff',
            text:           '#333333',
            title:          '#333333',
            description:    '#333333',
            primary:        '#646cff',
            border:         '#e0e0e0',
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
* File End!
****************************************************************************************************/