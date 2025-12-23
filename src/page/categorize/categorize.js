
/****************************************************************************************************
* File Start!
****************************************************************************************************/

/*
 *
 *  Copyright (c) 2024-2025 by flechazo. All rights reserved.
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
import { useParams } from "react-router-dom";
/* categorize cfg */
import { Categorize_Cfg_Init, categorize_cfg_get, categorize_cfg_item_get } from './categorize_cfg'
/* route */
import { cblog_route_get } from '../../route/route'

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
* Categorize_Init()
****************************************************************************************************/
export function Categorize_Init() {

    do
    {
        /* cfg init */
        Categorize_Cfg_Init();
    }while(0);

    return (
        <div>

        </div>
    );
}

/****************************************************************************************************
* CategorizeDetail()
****************************************************************************************************/
export function CategorizeDetail() {
    const { category } = useParams();
    let categorize = null;

    do
    {
        /* get categorize */
        categorize = categorize_cfg_item_get(category);
    }while(0);

    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                flexDirection: 'column',
                width: '90%',
                padding: '24px',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                /* color */
                background: ' #FFFFFF',
                /* style */
                borderRadius: '32px',
                boxShadow: '0 20px 80px rgba(0, 0, 0, 0.25)',
            }}
        >
            {/* category */}
            <div>
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
                    {categorize.category}
                </h1>
            </div>
            {/* articles */}
            <div 
                style={{
                    /* layout */
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    /* gap */
                    gap: '32px',
                    margin: '32px 0',
                }}
            >
                {categorize.articles.map(article => (
                    <a
                        href={'../' + article.path}
                        style={{
                            /* layout */
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            /* size */
                            width: '300px',
                            height: '84px',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            /* color */
                            background: ' #FFFFFF',
                            /* style */
                            borderRadius: '18px',
                            boxShadow: '0 2px 8px #0002',
                        }}
                        /* mouse */
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'scale(1.15)';
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
                ))}
            </div>
        </div>
    );
}

/****************************************************************************************************
* Categorize_Item()
****************************************************************************************************/
export function Categorize_Item(categories) {
    let category_route = "";

    do
    {
        category_route = cblog_route_get("category");
    }while(0);

    return (
        <div>
            {/* items */}
            <div 
                style={{
                    /* layout */
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    /* gap */
                    gap: '64px',
                    margin: '48px 0',
                }}
            >
                {categories.map((category,index) => (
                    <a
                        href={category_route.url + "/" + category.category}
                        style={{
                            /* layout */
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            /* size */
                            width: '280px',
                            height: '140px',
                            /* color */
                            background: ' #FFFFFF',
                            /* style */
                            border: '1px solid #eaeaea',
                            borderRadius: '18px',
                            boxShadow: '0 2px 8px #0002',
                        }}
                        /* mouse */
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'scale(1.25)';
                            e.currentTarget.style.boxShadow = '0 18px 16px #0008';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 8px #0002';
                        }}
                    >
                        <div>
                            <h2>
                                {category.icon}
                                {category.category}
                            </h2>
                            <p>
                                {category.description}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

/****************************************************************************************************
* Categorize_Statistic()
****************************************************************************************************/
export function Categorize_Statistic(categories) {

    do
    {

    }while(0);

    return (
        <div 
            style={{
                textAlign: 'center',
            }}
        >
            共 {categories.length} 个分类，总计 {categories.reduce((sum, cat) => sum + (cat.articles ? cat.articles.length : 0), 0)} 篇文章
        </div>
    );
}

/****************************************************************************************************
* Categorize()
****************************************************************************************************/
export function Categorize() {
    let categories = null;

    do
    {
        categories = categorize_cfg_get();
    }while(0);

    return (
        <div
            style={{
                /* layout */
                width: '90%',
                padding: '24px',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
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
            {/* title */}
            <h1 style={{
                /* position */
                margin: '32px',
                /* font */
                fontSize: '2rem',
                fontWeight: 'bold',
                /* color */
                color: ' #333333',
                /* style */
                borderBottom: '2px solid #FA5A15',
            }}>
                文章分类
            </h1>
            {/* categories */}
            {Categorize_Item(categories)}
            {/* statistic */}
            {Categorize_Statistic(categories)}
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
