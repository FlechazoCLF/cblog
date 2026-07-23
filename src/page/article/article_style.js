
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
 * 2025-08-18     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React,{ useState, useEffect } from 'react';
/* mermaid */
import { Article_Mermaid_Init,Article_Mermaid } from './components/article_mermaid'
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

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* article_style_img()
****************************************************************************************************/
export function article_style_img() {
    return (
        ({node, style: originalStyle, className: originalClassName, ...props}) => {
            const theme = useTheme();

            /* detect inline image — small icon/avatar, not a standalone article image */
            const isInline = (() => {
                /* check HTML attributes: width="25" height="30" */
                const attrW = parseInt(props.width);
                const attrH = parseInt(props.height);
                if ((attrW > 0 && attrW <= 80) || (attrH > 0 && attrH <= 80)) return true;

                /* check inline style: style={{ width: 25 }} */
                if (originalStyle) {
                    const sw = parseInt(originalStyle.width);
                    const sh = parseInt(originalStyle.height);
                    if ((sw > 0 && sw <= 80) || (sh > 0 && sh <= 80)) return true;
                }

                /* check parent node: inside heading = inline */
                if (node) {
                    let parent = node.parent;
                    while (parent) {
                        if (/^h[1-6]$/.test(parent.tagName)) return true;
                        parent = parent.parent;
                    }
                }

                return false;
            })();

            /* inline image — render naturally, no decoration */
            if (isInline) {
                return (
                    <img
                        style={{ verticalAlign: 'middle', ...originalStyle }}
                        className={originalClassName}
                        {...props}
                    />
                );
            }

            /* article image — full styling with hover & lightbox */
            const defaultStyle = {
                /* display */
                display: 'block',
                maxWidth: '100%',
                maxHeight: '280px',
                width: 'auto',
                height: 'auto',
                margin: '0 auto',
                zIndex: '1',
                /* style */
                borderRadius: '16px',
                boxShadow: theme.total.shadowMd,
                objectFit: 'cover',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
            };

            /* merge: defaults as base, original image style overrides on top */
            const mergedStyle = { ...defaultStyle, ...originalStyle };

            /* merge className: keep both default and original */
            const mergedClassName = [originalClassName].filter(Boolean).join(' ') || undefined;

            return (
                <img
                    style={mergedStyle}
                    className={mergedClassName}
                    /* mouse */
                    onMouseEnter={e => {
                        e.currentTarget.style.zIndex = '1000';
                        e.currentTarget.style.transform = 'scale(1.15)';
                        e.currentTarget.style.boxShadow = theme.total.shadowLg;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.zIndex = '1';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = mergedStyle.boxShadow;
                    }}
                    onClick={e => {
                        /* create */
                        const modal = document.createElement('div');
                        modal.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100vw;
                            height: 100vh;
                            background: ${theme.total.overlayLight};
                            backdropFilter: blur(15px);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            z-index: 9999;
                            cursor: pointer;
                        `;
                        
                        const fullImg = document.createElement('img');
                        fullImg.src = e.currentTarget.src;
                        fullImg.style.cssText = `
                            max-width: 90vw;
                            max-height: 90vh;
                            object-fit: contain;
                            border-radius: 8px;
                            box-shadow: ${theme.total.shadowLg};
                        `;
                        
                        modal.appendChild(fullImg);
                        document.body.appendChild(modal);
                        
                        /* close */
                        modal.addEventListener('click', () => {
                            document.body.removeChild(modal);
                        });
                    }}
                    {...props}
                >
                </img>
            )
        }
    );
}

/****************************************************************************************************
* article_style_table()
****************************************************************************************************/
export function article_style_table() {
    return (
        ({node, ...props}) => {
            const theme = useTheme();
            return (
                <div 
                    style={{
                        /* display */
                        margin: '20px',
                        overflowX: 'auto',
                    }}
                >
                    <table
                        style={{
                            /* display */
                            borderCollapse: 'collapse',
                            overflow: 'hidden',
                            /* style */
                            width: '100%',
                            fontSize: '14px',
                            boxShadow: theme.total.shadowSm,
                            borderRadius: '4px',
                        }}
                        {...props}
                    >
                    </table>
                </div>
            )
        }
    );
}

/****************************************************************************************************
* article_style_table_head()
****************************************************************************************************/
export function article_style_table_head() {
    return (
        ({node, ...props}) => {
            const theme = useTheme();
            return (
                <thead
                    style={{
                        /* style */
                        backgroundColor: theme.total.primaryLight,
                        color: theme.total.text,
                    }}
                    {...props}
                >
                </thead>
            )
        }
    );
}

/****************************************************************************************************
* article_style_table_body()
****************************************************************************************************/
export function article_style_table_body() {
    return (
        ({node, ...props}) => {
            const theme = useTheme();
            return (
                <tbody 
                    style={{
                        /* style */
                        backgroundColor: theme.total.background
                    }}
                    {...props} 
                >
                </tbody>
            )
        }
    );
}

/****************************************************************************************************
* article_style_table_row()
****************************************************************************************************/
export function article_style_table_row() {
    return (
        ({node, isOdd, index, ...props}) => {
            const theme = useTheme();
            return (
                <tr
                    style={{
                        /* style */
                        backgroundColor: (index % 2 === 0) ? theme.total.background : theme.total.surfaceSecondary,
                        borderBottom: `1px solid ${theme.total.borderSecondary}`,
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.total.primaryLight;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = (index % 2 === 0) ? theme.total.background : theme.total.surfaceSecondary;
                    }}
                    {...props}
                />
            )
        }
    );
}

/****************************************************************************************************
* article_style_table_header()
****************************************************************************************************/
export function article_style_table_header() {
    return (
        ({node, ...props}) => {
            const theme = useTheme();
            return (
                <th
                    style={{
                        /* style */
                        position: 'relative',
                        textAlign: 'left',
                        padding: '12px 16px',
                        /* style */
                        fontWeight: 'bold',
                        borderBottom: `2px solid ${theme.total.border}`,
                    }}
                    {...props}
                />
            )
        }
    );
}

/****************************************************************************************************
* article_style_table_data()
****************************************************************************************************/
export function article_style_table_data() {
    return (
        ({node, ...props}) => {
            const theme = useTheme();
            return (
                <td
                    style={{
                        /* style */
                        padding: '10px 16px',
                        /* style */
                        borderBottom: `1px solid ${theme.total.borderSecondary}`,
                        lineHeight: '1.5',
                    }}
                    {...props}
                />
            )
        }
    );
}

/****************************************************************************************************
* article_style_code()
****************************************************************************************************/
export function article_style_code() {
    return ({ className, children, ...props }) => {
        const theme = useTheme();
        /* mermaid */
        const match = /language-(\w+)/.exec(className || '');
        if (match && match[1] === 'mermaid') {
            const code = React.Children.toArray(children).join('');
            return <Article_Mermaid chart={code} />;
        }
        
        /* other code */
        return (
            <code 
                className={className} 
                {...props}
                style={{
                    /* layout */
                    display: 'block',
                    padding: '16px',
                    margin: '16px 0',
                    overflowX: 'auto',
                    /* color */
                    backgroundColor: theme.total.surfaceSecondary,
                    color: theme.total.text,
                    /* style */
                    borderRadius: '4px',
                    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    /* border */
                    border: `1px solid ${theme.total.borderSecondary}`,
                    /* shadow */
                    boxShadow: theme.total.shadowSm
                }}
            >
                {children}
            </code>
        );
    };
}

/****************************************************************************************************
* article_style_h1()
****************************************************************************************************/
export function article_style_h1() {
    return (
        ({node, ...props}) => {
            const theme = useTheme();
            return (
                <h1
                    style={{
                        /* layout */
                        margin: '24px 0 16px',
                        width: '100%',
                        /* style */
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: theme.total.text,
                    }}
                    {...props}
                />
            )
        }
    );
}

/****************************************************************************************************
* article_style_h2()
****************************************************************************************************/
export function article_style_h2() {
    return (
        ({node, ...props}) => {
            const theme = useTheme();
            return (
                <h2
                    style={{
                        /* layout */
                        margin: '20px 0 14px',
                        width: '100%',
                        /* style */
                        fontSize: '1.75rem',
                        fontWeight: 'bold',
                        color: theme.total.text,
                    }}
                    {...props}
                />
            )
        }
    );
}

/****************************************************************************************************
* article_style_h3()
****************************************************************************************************/
export function article_style_h3() {
    return (
        ({node, ...props}) => {
            const theme = useTheme();
            return (
                <h3
                    style={{
                        /* layout */
                        margin: '18px 0 12px',
                        width: '100%',
                        /* style */
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: theme.total.text,
                    }}
                    {...props}
                />
            )
        }
    );
}

/****************************************************************************************************
* article_style_p()
****************************************************************************************************/
export function article_style_p() {
    let result = null;
    let hasImage = false;
    /* type */
    const typeEnum = [
        {
            /* name */
            name: 'normal',
            discription: '普通段落',
        },
        {
            /* name */
            name: 'image',
            discription: '图片段落',
        }
    ];
    /* default */
    let type = typeEnum[0];

    return (
        ({node, ...props}) => {
            const theme = useTheme();
            /* check type */
            if(node && node.children && node.children.some(child => child.tagName === 'img'))
            {
                type = typeEnum[1];
            }
            else
            {
                type = typeEnum[0];
            }
            /* output */
            if(type.name === 'normal')
            {
                result = (
                    <p
                        style={{
                            /* layout */
                            display: 'block',
                            margin: '12px auto',
                            width: '100%',
                            lineHeight: '1.6',
                            verticalAlign: 'baseline',
                            /* style */
                            fontSize: '1rem',
                            color: theme.total.text
                        }}
                        {...props}
                    />
                );
            }
            else if(type.name === 'image')
            {
                result = (
                    <p
                        style={{
                            /* layout */
                            display:'inline-flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '8px',
                            width: 'auto',
                            maxWidth: '280px',
                            lineHeight: '1.6',
                            verticalAlign: 'top',
                            /* style */
                            fontSize: '1rem',
                            color: theme.total.text
                        }}
                        {...props}
                    />
                );
            }

            return result;
        }
    );
}

/****************************************************************************************************
* article_style_ul()
****************************************************************************************************/
export function article_style_ul() {
    return (
        ({node, ...props}) => (
            <ul
                style={{
                    /* layout */
                    textAlign: 'left',
                    paddingLeft: '20px',
                    margin: '12px',
                    width: 'fit-content',
                }}
                {...props}
            />
        )
    );
}

/****************************************************************************************************
* article_style_ol()
****************************************************************************************************/
export function article_style_ol() {
    return (
        ({node, ...props}) => (
            <ol
                style={{
                    /* layout */
                    textAlign: 'left',
                    paddingLeft: '20px',
                    margin: '12px',
                    width: 'fit-content',
                }}
                {...props}
            />
        )
    );
}

/****************************************************************************************************
* article_style_quote()
****************************************************************************************************/
export function article_style_quote() {
    return (
        ({node, ...props}) => {
            const theme = useTheme();
            return (
                <blockquote
                    style={{
                        /* layout */
                        margin: '16px 0',
                        width: '100%',
                        /* style */
                        backgroundColor: theme.total.blockquoteBg,
                        borderLeft: `4px solid ${theme.total.blockquoteBorder}`,
                        paddingLeft: '16px',
                        fontStyle: 'italic',
                        color: theme.total.tagText,
                    }}
                    {...props}
                />
            )
        }
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
