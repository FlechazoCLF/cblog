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
 * 2026-03-17     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* fs */
const fs = require('fs');
const path = require('path');
const { article_database_get } = require('../../../kernel/article/article_database');

/****************************************************************************************************
* Define
****************************************************************************************************/

/* templete file */
const ARTICLE_CFG_GENERATOR_TEMPLETE_ARTICLE = 'wonderful_ebbinghaus_database_templete.js';
/* output file */
const ARTICLE_CFG_GENERATOR_OUTPUT_ARTICLE = './src/database/wonderful_ebbinghaus_database.js';

/* name map */
const Wonderful_ebbinghaus_events_tags_map = {
    "感悟": "insight",
    "计划": "plan",
    "视频": "video",
    "文章": "article",
};

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* article_cfg_generator_parser()
****************************************************************************************************/
function article_cfg_generator_parser(article) {
    let rawContent = "";
    do
    {
        /* check */
        if(article == null || article.path == null)
        {
            continue;
        }
        /* read */
        articleContent = fs.readFileSync(article.path, 'utf8');
        if(articleContent == null || articleContent.length == 0)
        {
            continue;
        }
        /* get date from markdown */
        const pattern = '```' + Wonderful_ebbinghaus_events_tags_map[article.tags] + '\\s*([\\s\\S]*?)\\s*```';
        const regex = new RegExp(pattern, 'm');
        const match = articleContent.match(regex);
        if(match == null)
        {
            return null;
        }
        /* get line */
        rawContent = match[1].trim();
        if((rawContent == "") || (rawContent == "{}") || (rawContent == "[]") || (rawContent == undefined))
        {
            return null;
        }

    }while(0);

    return ( rawContent );
}

/****************************************************************************************************
* article_cfg_generator_create_database()
****************************************************************************************************/
function article_cfg_generator_create_database(articles) {
    let templete = "";

    do
    {
        /* get templete */
        const templetePath = path.join(__dirname, ARTICLE_CFG_GENERATOR_TEMPLETE_ARTICLE);
        /* read */
        templete = fs.readFileSync(templetePath, 'utf8');
        /* init function */
        let ebbinghaus_database = "";

        /* add */
        articles.forEach(article => {
            if(!article)
            {
                return;
            }
            const eventsContent = article_cfg_generator_parser(article);
            if((eventsContent == "") || (eventsContent == null))
            {
                return;
            }
            ebbinghaus_database += `\n${eventsContent}`
        })
        /* replace */
        templete = templete.replace("{{date}}", new Date().toISOString().replace('T', ' ').slice(0, 19));
        templete = templete.replace("{{ebbinghaus_database}}",ebbinghaus_database);
    }while(0);

    return templete;
}

/****************************************************************************************************
* article_Ebbinghaus_Filter()
****************************************************************************************************/
function article_Ebbinghaus_Filter(categories) {
    let filterArticles = [];
    do
    { 
        categories.forEach(category => {
            if(!category.articles)
            {
                return;
            }
            category.articles.forEach(article => {
                if(!article)
                {
                    return;
                }
                if((article.category.includes("艾宾浩斯")) || (article.category.includes("Ebbinghaus")))
                {
                    filterArticles.push(article);
                }
            })
        });
    }while(0);
    return filterArticles;
}

/****************************************************************************************************
* main()
****************************************************************************************************/
function main() {

    do
    {
        /* scan */
        const categories = article_database_get();
        const articles = article_Ebbinghaus_Filter(categories);
        /* get content */
        const articleContent = article_cfg_generator_create_database(articles);
        /* generate */
        try {
            /* article */
            fs.writeFileSync(ARTICLE_CFG_GENERATOR_OUTPUT_ARTICLE, articleContent, 'utf8');
        } catch (error) {
            console.error('写入文件时出错:', error);
        }
    }while(0);

}

/****************************************************************************************************
* Execute
****************************************************************************************************/
if (require.main === module) {
    main();
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
