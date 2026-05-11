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

/****************************************************************************************************
* Define
****************************************************************************************************/

/* input folder */
const ARTICLE_CFG_GENERATOR_INPUT_FOLDER = './public/articles';

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* article_cfg_generator_get_frontmatter()
****************************************************************************************************/
function article_cfg_generator_get_frontmatter(content) {
    const result = {};

    do
    {
        /* check */
        if(content == "")
        {
            continue;
        }
        /* get date from markdown */
        const match = content.match(/---\s*([\s\S]*?)\s*---/);
        if(match == null)
        {
            continue;
        }
        /* get line */
        const lines = match[1].split('\n');
        lines.forEach(line => {
            /* split : */
            const [key, ...rest] = line.split(':');
            if (key && rest.length > 0) 
            {
                /* result */
                result[key.trim()] = rest.join(':').trim();
            }
        });
    }while(0);

    return result;
}

/****************************************************************************************************
* categorize_cfg_generator_scan_article()
****************************************************************************************************/
function categorize_cfg_generator_scan_article(folder,category,article) {
    let articleinfo = "";

    do
    {
        try {
            /* check folder */
            const articlePath = folder + "/" + article;
            const stats = fs.statSync(articlePath);
            if (!stats.isDirectory()) 
            {
                return;
            }
            /* check article folder */
            const subStats = fs.statSync(articlePath);
            if (!subStats.isDirectory())
            {
                return;
            }
            /* check readme.md */
            const readmePath = path.join(articlePath, 'readme.md');
            if (!fs.existsSync(readmePath))
            {
                return;
            }
            /* read */
            const mdContent = fs.readFileSync(readmePath, 'utf8');
            /* get front matter */
            const frontmatter = article_cfg_generator_get_frontmatter(mdContent);
            /* push */
            articleinfo = {
                /* info */
                /* title */
                title: frontmatter.title || article,
                /* date */
                date: frontmatter.date || "",
                /* author */
                author: frontmatter.author || "flechazo",
                /* location */
                location: frontmatter.location || "中国",
                /* state 已发布 / 发布中 / 审核中 / 待审核 / 未发布 / 编辑中 */
                state: frontmatter.state || "已发布",
                /* priority for sort */
                priority: frontmatter.priority || "64",
                /* authority for access */
                authority: frontmatter.authority || "everyone",
                /* category */
                category: frontmatter.category || category || "",
                /* tag */
                tags: frontmatter.tags || "",
                /* calendar 每年 每月 每日 单次 | 阳历 阴历 */
                calendar: frontmatter.calendar || "",
                /* cover image */
                cover: frontmatter.cover || "",
                /* description */
                description: frontmatter.description || "",
                /* path */
                path: readmePath || ("articles/" + category + '/' + article),
                /* article file name */
                article: article,
            };
        } catch (error) {
            console.error('get articles error:', error);
        }

    }while(0);

    return articleinfo;
}

/****************************************************************************************************
* categorize_cfg_generator_add_category()
****************************************************************************************************/
function categorize_cfg_generator_add_category(categories,articles,folder,frontmatter) {

    do
    {
        /* articles */
        articles.forEach((article => {
            /* if hasn't category*/
            const categoryExists = categories.some(category => category.category === article.category);
            if(categoryExists)
            {
                return;
            }
            /* check */
            if (article.category && article.category !== "") {
            {
                /* add category */
                categories.push({
                    category: article.category || folder,
                    description: frontmatter.description || "",
                    icon: frontmatter.icon || "🧮",
                    color: " #333333",
                    path: folder,
                    articles: [],
                });
            }
        }}))
    }while(0);

    return;
}

/****************************************************************************************************
* categorize_cfg_generator_add_article()
****************************************************************************************************/
function categorize_cfg_generator_add_article(categories,articles,folder,frontmatter) {

    do
    {
        /* articles */
        articles.forEach((article => {
            /* get category*/
            for(let i = 0; i < categories.length; i++)
            {
                let category = categories[i];
                /* modify category */
                /* if((category.category === article.category) || (category.category === frontmatter.category) || (category.category === folder)) */
                /* if(category.category === article.category) */
                /* if(category.category === frontmatter.category) */
                if(category.category === folder)
                {
                    /* exit */
                    category.articles.push(article);
                }
            }
        }));
    }while(0);
}

/****************************************************************************************************
* categorize_cfg_generator_scan_folder()
****************************************************************************************************/
function categorize_cfg_generator_scan_folder(categories,folder,folderPath) {
    let articles = [];

    do
    {
        /* check folder */
        if((folderPath == "") || (folder == ""))
        {
            continue;
        }
        /* get articles */
        const subItems = fs.readdirSync(folderPath);
        subItems.forEach(subItem => {
            const stats = fs.statSync(folderPath + "/" + subItem);
            if (!stats.isDirectory()) 
            {
                return;
            }
            const articleinfo = categorize_cfg_generator_scan_article(folderPath,folder,subItem);
            if((articleinfo == null) || (articleinfo == "") || (articleinfo == undefined))
            {
                return;
            }
            articles.push(articleinfo);
        });
        /* get category readme as article default frontmatter */
        const mdContent = fs.readFileSync(folderPath + "/readme.md", 'utf8');
        /* get category front matter */
        const frontmatter = article_cfg_generator_get_frontmatter(mdContent);
        /* push */
        if(articles.length <= 0)
        {
            return;
        }
        /* push category from article */
        categorize_cfg_generator_add_category(categories,articles,folder,frontmatter);
        categorize_cfg_generator_add_article(categories,articles,folder,frontmatter);
    }while(0);

    return categories;
}

/****************************************************************************************************
* categorize_cfg_generator_scan()
****************************************************************************************************/
function categorize_cfg_generator_scan() {
    const categories = [];

    do
    {
        try {
            /* check folder */
            if (!fs.existsSync(ARTICLE_CFG_GENERATOR_INPUT_FOLDER))
            {
                continue;
            }
            /* get folder => categorize */
            const folders = fs.readdirSync(ARTICLE_CFG_GENERATOR_INPUT_FOLDER);
            folders.forEach(folder => {
                const folderPath = path.join(ARTICLE_CFG_GENERATOR_INPUT_FOLDER, folder);
                /* check is folder */
                const stats = fs.statSync(folderPath);
                if (!stats.isDirectory()) 
                {
                    return;
                }
                /* get articles scan folder */
                categorize_cfg_generator_scan_folder(categories,folder,folderPath);
            });
        } catch (error) {
            console.error('get folder error:', error);
        }

    }while(0);

    return categories;
}

/****************************************************************************************************
* main()
****************************************************************************************************/
function article_database_get() {
    return categorize_cfg_generator_scan();
}

/****************************************************************************************************
* Execute
****************************************************************************************************/
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    article_database_get,
  };
}
/****************************************************************************************************
* File End!
****************************************************************************************************/
