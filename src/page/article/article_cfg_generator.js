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
 * 2025-07-17     cc          the first version
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
/* output file */
const ARTICLE_CFG_GENERATOR_OUTPUT_CATEGORIZE = './src/database/categorize_cfg_database.js';
const ARTICLE_CFG_GENERATOR_OUTPUT_ARTICLE = './src/database/article_cfg_database.js';

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
* article_cfg_generator_get_image()
****************************************************************************************************/
function article_cfg_generator_get_image(content) {
    let result = [];

    do
    {
        /* check */
        if(content == "")
        {
            continue;
        }
        /* get date from markdown */
        const matches = [...content.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+["'](.*?)["'])?\s*\)/g)];
        if(matches == null)
        {
            continue;
        }
        /* get line */
        result = matches.map((match) => ({
            alt: match[1] || '',
            url: match[2] || '',
            title: match[3] || '',
        }));;
    }while(0);

    return result;
}

/****************************************************************************************************
* article_cfg_generator_format_image_url()
****************************************************************************************************/
function article_cfg_generator_format_image_url(articlePath,image) {
    let result = "";

    do
    {
        /* check */
        if((articlePath == "") || (image == ""))
        {
            continue;
        }
        /* get date from markdown */
        result = articlePath.replaceAll("public","");
        result = path.join(result,image.url).replaceAll("\\","/") 
    }while(0);

    return result;
}

/****************************************************************************************************
* kernel_file_fill_frontmatter()
****************************************************************************************************/
function kernel_file_fill_frontmatter(frontmatter) {
    let result = {};

    do
    {
        /* foreach */
        result.title = frontmatter.title ? frontmatter.title : "默认标题";
        result.date = frontmatter.date ? frontmatter.date : new Date().toISOString().substring(0, 10);
        result.author = frontmatter.author ? frontmatter.author : "flechazo";
        result.location = frontmatter.location ? frontmatter.location : "上海";
        result.state = frontmatter.state ? frontmatter.state : "已发布";
        result.priority = frontmatter.priority ? frontmatter.priority : "64";
        result.authority = frontmatter.authority ? frontmatter.authority : "everyone";
        result.category = frontmatter.category ? frontmatter.category : "";
        result.tags = frontmatter.tags ? frontmatter.tags : "";
        result.calendar = frontmatter.calendar ? frontmatter.calendar : "";
        result.cover = frontmatter.cover ? frontmatter.cover : "";
        result.description = frontmatter.description ? frontmatter.description : "";
        result.icon = frontmatter.icon ? frontmatter.icon : "";
    }while(0);

    return result;
}

/****************************************************************************************************
* kernel_file_format_frontmatter_to_string()
****************************************************************************************************/
function kernel_file_format_frontmatter_to_string(frontmatter) {
    let result = "";

    do
    {
        /* head */
        result += "---\n";
        /* foreach */
        for (const key in frontmatter) {
            result += `${key}: ${frontmatter[key]}\n`;
        }
        /* tail */
        result += "---\n";
    }while(0);

    return result;
}

/****************************************************************************************************
* kernel_file_format_frontmatter()
****************************************************************************************************/
function kernel_file_format_frontmatter(articlePath,content,frontmatter) {
    let isrewrite = false;
    let fillfrontmatter = null;
    let fillcontent = null;

    do
    {
        /* check */
        if(articlePath == "")
        {
            continue;
        }
        /* format */
        fillfrontmatter = kernel_file_fill_frontmatter(frontmatter);
        /* check */
        for (const key in fillfrontmatter) {
            if (frontmatter[key] !== fillfrontmatter[key]) {
                isrewrite = true;
                break;
            }
        }
        if(!isrewrite)
        {
            continue;
        }
        /* rewrite */
        const frontmatterStr = kernel_file_format_frontmatter_to_string(fillfrontmatter) + '\n';
        const FRONTMATTER_REGEX = /---\s*([\s\S]*?)\s*---/;

        if (FRONTMATTER_REGEX.test(content)) {
            fillcontent = content.replace(FRONTMATTER_REGEX,frontmatterStr);
        } else {
            fillcontent = frontmatterStr + content;
        }
        fs.writeFileSync(articlePath,fillcontent,'utf8');
    }while(0);

    return fillfrontmatter;
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
            const fillfrontmatter = kernel_file_format_frontmatter(readmePath,mdContent,frontmatter);
            /* get first image url */
            const images = ((fillfrontmatter.cover == null) || (fillfrontmatter.cover == "")) ? article_cfg_generator_get_image(mdContent) : null ;
            const firstImage = ((images != null) && (images.length > 0)) ? article_cfg_generator_format_image_url(articlePath,images[0]) : null;
            const defaultImage = firstImage == null ? '/images/wallpaper/08.png' : firstImage;
            /* push */
            articleinfo = {
                /* info */
                /* title */
                title: fillfrontmatter.title || article,
                /* date */
                date: fillfrontmatter.date || "",
                /* author */
                author: fillfrontmatter.author || "flechazo",
                /* location */
                location: fillfrontmatter.location || "中国",
                /* state 已发布 / 发布中 / 审核中 / 待审核 / 未发布 / 编辑中 */
                state: fillfrontmatter.state || "已发布",
                /* priority for sort */
                priority: fillfrontmatter.priority || "64",
                /* authority for access */
                authority: fillfrontmatter.authority || "everyone",
                /* category */
                category: fillfrontmatter.category || category || "",
                /* tag */
                tags: fillfrontmatter.tags || "",
                /* calendar 每年 每月 每日 单次 | 阳历 阴历 */
                calendar: fillfrontmatter.calendar || "",
                /* cover image */
                cover: fillfrontmatter.cover || firstImage || defaultImage || "",
                /* description */
                description: fillfrontmatter.description || "",
                /* path */
                path: "/blog/articles/" + category + '/' + article,
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
* categorize_cfg_generator_article_sort()
****************************************************************************************************/
function categorize_cfg_generator_article_sort(articles) {
    
    do
    {
        /* sort date */
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }while(0);

    return articles;
}

/****************************************************************************************************
* categorize_cfg_generator_create_database_categorize()
****************************************************************************************************/
function categorize_cfg_generator_create_database_categorize(categories) {
    let template = "";
    
    do
    {
        /* get template */
        const templatePath = path.join(__dirname, 'article_cfg_generator_template.js');
        /* read */
        template = fs.readFileSync(templatePath, 'utf8');
        /* init function */
        let func_database_init = "";
        categories.forEach(category => {
            func_database_init += `
        categorize_cfg_item_add("${category.category}","${category.description}","${category.icon}","${category.color}");`;
        });
        /* replace */
        template = template.replace("{{date}}", new Date().toISOString().replace('T', ' ').slice(0, 19));
        template = template.replace(/{{type}}/g, "categorize");
        template = template.replace("{{func_database_init}}",func_database_init);
    }while(0);

    return template;
}

/****************************************************************************************************
* categorize_cfg_generator_create_database_article()
****************************************************************************************************/
function categorize_cfg_generator_create_database_article(categories) {
    let template = "";

    do
    {
        /* get template */
        const templatePath = path.join(__dirname, 'article_cfg_generator_template.js');
        /* read */
        template = fs.readFileSync(templatePath, 'utf8');
        /* init function */
        let func_database_init = "";
        categories.forEach(category => {
            if(!category.articles)
            {
                return;
            }
            /* sort */
            category.articles = categorize_cfg_generator_article_sort(category.articles);
            /* add */
            category.articles.forEach(article => {
                if(!article)
                {
                    return;
                }
                func_database_init += `
        article_cfg_item_add("${category.category}","${article.title}","${article.date}","${article.author}","${article.location}","${article.state}","${article.priority}","${article.authority}","${article.tags}","${article.calendar}","${article.cover}","${article.description}","${article.path}","${article.article}");`;
            })
        });
        /* replace */
        template = template.replace("{{date}}", new Date().toISOString().replace('T', ' ').slice(0, 19));
        template = template.replace(/{{type}}/g, "article");
        template = template.replace("{{func_database_init}}",func_database_init);
    }while(0);

    return template;
}

/****************************************************************************************************
* main()
****************************************************************************************************/
function main() {

    do
    {
        /* scan */
        const categories = categorize_cfg_generator_scan();
        /* get content */
        const categorizeContent = categorize_cfg_generator_create_database_categorize(categories);
        const articleContent = categorize_cfg_generator_create_database_article(categories);
        /* generate */
        try {
            /* categorize */
            fs.writeFileSync(ARTICLE_CFG_GENERATOR_OUTPUT_CATEGORIZE, categorizeContent, 'utf8');
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
