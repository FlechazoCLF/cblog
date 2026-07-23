
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
import React,{ useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
/* author */
import { Author_State_Get } from '../../kernel/author/author';
/* route */
import { cblog_route_get } from '../../route/route'
/* read file */
import { kernel_file_read, kernel_file_get_frontmatter } from '../../kernel/file/kernel_file'
/* markdown */
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
/* article cfg init */
import { Article_Cfg_Init, article_cfg_item_get } from './article_cfg'
/* mermaid */
import { Article_Mermaid_Init,Article_Mermaid } from './components/article_mermaid'
/* table */
import remarkGfm from 'remark-gfm';
/* theme */
import { useTheme } from '../../kernel/theme/theme'
/* style */
import { article_style_img,article_style_table,article_style_table_head,article_style_table_body,
         article_style_table_row,article_style_table_header,article_style_table_data,article_style_code,
         article_style_h1,article_style_h2,article_style_h3,article_style_p,article_style_ul,article_style_ol,
         article_style_quote} from './article_style';

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
* Article_Markdown_Frontmatter()
****************************************************************************************************/
export function Article_Markdown_Frontmatter(frontmatter) {
    const theme = useTheme();
    
    return (
        <div
            style={{
                /* display */
                margin: '32px 48px',
                textAlign: 'center',
                /* style */
                borderBottom: `1px solid ${theme.total.border}`,
            }}
        >
            {/* title */}
            <h1 
                style={{
                    /* display */
                    margin: '8px',
                    /* style */
                    fontSize: '2.4rem',
                }}
            >
                {frontmatter.title}
            </h1>
            {/* info */}
            <div 
                style={{
                    /* display */
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                    /* style */
                    color: theme.total.textSecondary,
                    fontSize: '0.9rem',
                }}
            >
                {/* date */}
                {frontmatter.date && 
                    <Link
                        to={`${cblog_route_get("csay").url}`}
                    >
                        📅 {frontmatter.date}
                    </Link>}
                {/* author */}
                {frontmatter.author && 
                    <Link
                        to={`${cblog_route_get("about").url}`}
                    >
                        ✍️ {frontmatter.author}
                    </Link>}
                {/* category */}
                {frontmatter.category && 
                    <Link
                        to={`${cblog_route_get("category").url}`}
                    >
                        📁 {frontmatter.category}
                    </Link>}
                {/* tags */}
                {frontmatter.tags && (
                    <Link
                        to={`${cblog_route_get("articlelist").url}`}
                        style={{
                            display: 'flex',
                            gap: '8px'
                        }}
                    >
                        🏷️ {frontmatter.tags}
                    </Link>
                )}
            </div>
        </div>
    );
}

/****************************************************************************************************
* Article_Markdown_Get()
****************************************************************************************************/
export function Article_Markdown_Get({path}) {
    const theme = useTheme();
    const [content, setContent] = useState('');
    const [metadata, setMetadata] = useState(null);

    /* read file */
    useEffect(() => {
        async function loadContent() {
            const result = await kernel_file_read(path);
            /* check state & authory */
            const frontmatter = kernel_file_get_frontmatter(result);
            if(!frontmatter)
            {
                return;
            }
            if((frontmatter.authority == "flechazo") && (Author_State_Get() != true))
            {
                return;
            }
            /* metadata */
            setMetadata(frontmatter);
            /* return content */
            const contentWithoutFrontmatter = result.replace(/^---[\s\S]*?---\s*/m, '');
            setContent(contentWithoutFrontmatter);

        }
        loadContent();
    }, [path]);

    return (
        <div
            /* style */
            style={{
                /* layout */
                padding: '24px',
                width: '90%',
                textAlign: 'center',
                /* style */
                borderRadius: '32px',
            }}
            /* mouse */
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = theme.total.shadowMd;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'None';
            }}
        >
            {/* frontmatter */}
            {metadata && Article_Markdown_Frontmatter(metadata)}
            {/* content */}
            <ReactMarkdown
                /* markdown extensions */
                remarkPlugins={[remarkGfm]}
                /* html process */
                rehypePlugins={[rehypeRaw]}
                /* url process */
                urlTransform={uri => {
                    if (uri.startsWith('http') || uri.startsWith('/'))
                        return uri;
                    return process.env.PUBLIC_URL + '/' + path + '/' + uri;
                }}
                /* style */
                components={{
                    /* img */
                    img: article_style_img(),
                    /* table */
                    table: article_style_table(),
                    /* table head */
                    thead: article_style_table_head(),
                    tbody: article_style_table_body(),
                    tr: article_style_table_row(),
                    th: article_style_table_header(),
                    td: article_style_table_data(),
                    /* code */
                    code: article_style_code(),
                    /* title */
                    h1: article_style_h1(),
                    h2: article_style_h2(),
                    h3: article_style_h3(),
                    /* p */
                    p: article_style_p(),
                    /* list */
                    ul: article_style_ul(),
                    ol: article_style_ol(),
                    /* blockquote */
                    blockquote: article_style_quote(),
                  }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

/****************************************************************************************************
* Article_Init()
****************************************************************************************************/
export function Article_Init() {

    do
    {
        /* cfg init */
        Article_Cfg_Init();
        /* mermaid init */
        Article_Mermaid_Init();
    }while(0);

    return (
        <div>

        </div>
    );
}

/****************************************************************************************************
* Article()
****************************************************************************************************/
export function Article() {
    /* get id */
    const { category, article } = useParams();
    /* markdown content */
    const articlePath = "articles/" + category + "/" + article;

    return (
        <div
            style={
                {
                    /* display */
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "auto",
                    width: "100%",
                    height: "100%",
                }
            }
        >
            <Article_Markdown_Get path={articlePath} />
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
