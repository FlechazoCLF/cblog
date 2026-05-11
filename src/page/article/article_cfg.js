
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
import React, { useContext } from 'react';
/* database init */
import { article_Cfg_Database_Init } from '../../database/article_cfg_database'
/* route */
import { cblog_route_get } from '../../route/route'
/* author */
import { Author_State_Get } from '../../kernel/author/author';

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

export let article_cfg_list = [
    /* category description icon color articles (
                                        title date author state category cover description path article)
    */
];

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* article_cfg_get()
****************************************************************************************************/
export function article_cfg_get() {
    /* get author */
    const AuthorState = Author_State_Get();
    /* article filter */
    let filterarticles = article_cfg_list;
    /* filter */
    if(AuthorState == true)
    {
        /* flechazo */
    }
    else
    {
        /* everybody */
        filterarticles = filterarticles.map(category => {
            return {
                ...category,
                articles: category.articles.filter(article => article.authority != "flechazo")
            };
        }).filter(category => category.articles.length > 0);
    }
    return filterarticles;
}

/****************************************************************************************************
* article_cfg_category_get()
****************************************************************************************************/
export function article_cfg_category_get(category) {
    let item = null;
    /* get author */
    const AuthorState = Author_State_Get();

    do
    {
        /* check parameter */
        if(category == "")
        {
            continue;
        }
        /* impletement */
        /* find catagorize */
        for (let index = 0; index < article_cfg_list.length; index++)
        {
            let element = article_cfg_list[index];
            /* check categorize */
            if(element.category != category)
            {
                continue;
            }
            /* find article */
            item = element;
            /* article length */
            if(item.articles.length == 0)
            {
                continue;
            }
            /* author filter */
            if(AuthorState == true)
            {
                /* flechazo */
            }
            else
            {
                /* everybody */
                item.articles = item.articles.filter(article => article.authority != "flechazo");
            }
            break;
        }
    }while(0);

    return item ;
}

/****************************************************************************************************
* article_cfg_item_get()
****************************************************************************************************/
export function article_cfg_item_get(category,article) {
    let item = null;
    /* get author */
    const AuthorState = Author_State_Get();

    do
    {
        /* check parameter */
        if((category == "") || (article == ""))
        {
            continue;
        }
        /* impletement */
        /* find catagorize */
        for (let index = 0; index < article_cfg_list.length; index++)
        {
            const element = article_cfg_list[index];
            if(element.category != category)
            {
                continue;
            }
            /* find article */
            for (let index = 0; index < element.articles.length; index++)
            {
                const subelement = element.articles[index];
                if(subelement.article != article)
                {
                    continue;
                }
                /* author filter */
                if(AuthorState == true)
                {
                    /* flechazo */
                }
                else
                {
                    /* everybody */
                    if(subelement.authority == "flechazo")
                    {
                        continue;
                    }
                }
                /* find article */
                item = subelement;
                break;
            }
            /* if find */
            if(item != null)
            {
                continue;
            }
        }
    }while(0);

    return item ;
}

/****************************************************************************************************
* article_cfg_category_add()
****************************************************************************************************/
export function article_cfg_category_add(category,description,icon,color) {
    let item = null;

    do
    {
        /* check parameter */
        if((category == "") || (description == "") || (icon == "") || (color == ""))
        {
            continue
        }
        /* impletement */
        /* get */
        item = article_cfg_category_get(category);
        if(item != null)
        {
            /* already add */
            continue;
        }
        /* add */
        item = {
            category:category,
            description:description,
            icon:icon,
            color:color,
            articles:[],
        };
        /* add */
        article_cfg_list.push(item);
    }while(0);

    return item;
}

/****************************************************************************************************
* article_cfg_item_add()
****************************************************************************************************/
export function article_cfg_item_add(category,title,date,author,location,state,priority,authority,tags,calendar,cover,description,path,article) {
    let item = null;

    do
    {
        /* check parameter */
        /* if((category == "") || (article == "") || (title == "") || (author == "") || (date == "") || (cover == "") || (description == "")) */
        if((category == "") || (article == "") || (title == ""))
        {
            continue
        }
        /* impletement */
        item = article_cfg_item_get(category,article);
        if(item != null)
        {
            /* already add */
            continue;
        }
        /* get category */
        let category_item = article_cfg_category_get(category);
        if(category_item == null)
        {
            continue;
        }
        /* get path */
        const articlePath = cblog_route_get("article").url;
        /* add article */
        item = {
            category: category,
            title: title,
            date: date,
            author: author,
            location: location,
            state: state,
            priority: priority,
            authority: authority,
            tags: tags,
            calendar: calendar,
            cover: cover,
            description: description,
            path: path,
            article: article,
        };
        category_item.articles.push(item);
    }while(0);

    return item ;
}

/****************************************************************************************************
* Article_Cfg_Init()
****************************************************************************************************/
export function Article_Cfg_Init() {

    do
    {
        /* database init */
        article_Cfg_Database_Init();
    }while(0);

    return (
        <div>

        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
