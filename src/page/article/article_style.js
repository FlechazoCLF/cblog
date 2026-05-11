
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
        ({node, ...props}) => (
            <img
                style={{
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
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                    objectFit: 'cover',
                    cursor: 'pointer',
                }}
                /* mouse */
                onMouseOver={e => {
                    e.currentTarget.style.zIndex = '1000';
                    e.currentTarget.style.transform = 'scale(1.15)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.zIndex = '1';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.05)';
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
                        background: rgba(245, 245, 245, 0.85);
                        backdropFilter: 'blur(15px)';
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
                        box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
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
    );
}

/****************************************************************************************************
* article_style_table()
****************************************************************************************************/
export function article_style_table() {
    return (
        ({node, ...props}) => (
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
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '4px',
                    }}
                    {...props}
                >
                </table>
            </div>
        )
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
                        backgroundColor: '#f0f5ff',
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
                        backgroundColor: (index % 2 === 0) ? theme.total.background : '#f9f9f9',
                        borderBottom: '1px solid #e0e0e0',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#f0f7ff';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = (index % 2 === 0) ? theme.total.background : '#f9f9f9';
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
        ({node, ...props}) => (
            <th
                style={{
                    /* style */
                    position: 'relative',
                    textAlign: 'left',
                    padding: '12px 16px',
                    /* style */
                    fontWeight: 'bold',
                    borderBottom: '2px solid #ccc',
                }}
                {...props}
            />
        )
    );
}

/****************************************************************************************************
* article_style_table_data()
****************************************************************************************************/
export function article_style_table_data() {
    return (
        ({node, ...props}) => (
            <td
                style={{
                    /* style */
                    padding: '10px 16px',
                    /* style */
                    borderBottom: '1px solid #e0e0e0',
                    lineHeight: '1.5',
                }}
                {...props}
            />
        )
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
                    backgroundColor: '#f5f5f5',
                    color: theme.total.text,
                    /* style */
                    borderRadius: '4px',
                    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    /* border */
                    border: '1px solid #e0e0e0',
                    /* shadow */
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
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
        ({node, ...props}) => (
            <blockquote
                style={{
                    /* layout */
                    margin: '16px 0',
                    width: '100%',
                    /* style */
                    borderLeft: '4px solid #ddd',
                    paddingLeft: '16px',
                    fontStyle: 'italic',
                    color: '#555',
                }}
                {...props}
            />
        )
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
