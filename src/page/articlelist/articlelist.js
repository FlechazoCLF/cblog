
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

/* article */
import { article_cfg_get } from '../article/article_cfg';

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
* Articlelist()
****************************************************************************************************/
export function Articlelist() {
    let articleList = null;

    do
    {
        /* get all article */
        articleList = article_cfg_get();
    }while(0);

    return (
        <div
            style={{
                /* layout */
                width: '90%',
                /* color */
                background: 'rgba(245, 245, 245, 0.6)',
                backdropFilter: 'blur(15px)',
                /* style */
                borderRadius: '32px',
                boxShadow: '0 20px 80px rgba(0, 0, 0, 0.25)',
            }}
            /* mouse */
            onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
                e.currentTarget.style.boxShadow = '0 25px 85px rgba(0, 0, 0, 0.6)';
            }}
            onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 80px rgba(0, 0, 0, 0.25)';
            }}
        >
            {articleList.map((category, idx) => (
                <div>
                    <div
                        /* layout */
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <h1 style={{
                            /* position */
                            margin: '30px',
                            /* font */
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            /* color */
                            color: ' #333333',
                            /* style */
                            borderBottom: '2px solid #007bff',
                        }}>
                            {category.category}
                        </h1>
                    </div>
                    <div
                        style={{
                            /* layout */
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        {category.articles && category.articles.map((article, aidx) => (
                            /* check */
                            (article.state == "已发布") ? (
                                <a
                                    href={article.path}
                                    style={{
                                        /* layout */
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        /* size */
                                        width: '300px',
                                        height: '80px',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                        /* color */
                                        background: ' #FFFFFF',
                                        /* style */
                                        margin: '8px',
                                        borderRadius: '18px',
                                        boxShadow: '0 2px 8px #0002',
                                    }}
                                    /* mouse */
                                    onMouseOver={e => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 18px 16px #0008';
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 2px 8px #0002';
                                    }}
                                >
                                    <div>
                                        {article.title}
                                    </div>
                                </a>
                            ) : (
                                <></>
                            )
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
