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
 * 2026-03-12     cc          the first version
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

/* output file */
const ARTICLE_CFG_GENERATOR_OUTPUT_ARTICLE = './src/database/wonderful_calendar_database.js';

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

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
* article_cfg_generator_get_email_config()
****************************************************************************************************/
function article_cfg_generator_get_email_config(content) {
    const result = {};

    do
    {
        /* check */
        if(content == "")
        {
            continue;
        }
        /* get date from markdown */
        const match = content.match(/```cemail\s*([\s\S]*?)\s*```/);
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
* Calendar_Email_Sendto_Parser()
****************************************************************************************************/
function Calendar_Email_Sendto_Parser(article) {
    let sendto = ``;
    do
    {
        /* read file */
        const mdContent = fs.readFileSync(article.path, 'utf8');
        /* get email config */
        const emailConfig = article_cfg_generator_get_email_config(mdContent);
        if(!emailConfig.name)
        {
            continue;
        }
        /* get name */
        const name = emailConfig.name.split(' ');
        /* get email */
        const email = emailConfig.email.split(' ');
        if((name == '') || (email == ''))
        {
            continue;
        }
        /* generate sendto */
        for(let i = 0; i < name.length; i++)
        {
            sendto += `{name: '${name[i]}', email: '${email[i]}'},`;
        }
    }while(0);

    return sendto;
}

/****************************************************************************************************
* Calendar_Week_Translate()
****************************************************************************************************/
function Calendar_Week_Translate(weekName) {
    let find = false;
    let id = '*';
    const weekNameList1 = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const weekNameList2 = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const weekNameList3 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    do
    {
        /* find */
        for(let i = 0; i < weekNameList1.length; i++)
        {
            if(weekName.includes(weekNameList1[i]))
            {
                id = i;
                find = true;
                break;
            }
        }
        if(find)
        {
            continue;
        }
        for(let i = 0; i < weekNameList2.length; i++)
        {
            if(weekName.includes(weekNameList2[i]))
            {
                id = i;
                find = true;
                break;
            }
        }
        if(find)
        {
            continue;
        }
        for(let i = 0; i < weekNameList3.length; i++)
        {
            if(weekName.includes(weekNameList3[i]))
            {
                id = i;
                find = true;
                break;
            }
        }
        if(find)
        {
            continue;
        }
    }while(0);

    return id;
}

/****************************************************************************************************
* article_cfg_generator_create_database()
****************************************************************************************************/
function article_cfg_generator_create_database(articles) {
    let templete = "";

    do
    {
        /* get templete */
        const templetePath = path.join(__dirname, 'wonderful_calendar_database_templete.js');
        /* read */
        templete = fs.readFileSync(templetePath, 'utf8');
        /* init function */
        let calendar_database = "";

        /* sort */
        articles = categorize_cfg_generator_article_sort(articles);
        /* add */
        articles.forEach(article => {
            if(!article)
            {
                return;
            }
            calendar_database += `
        {
            enable: true,
            route: { fromname: '🌅 flechazo', fromemail: '3253290979@qq.com', to: [${Calendar_Email_Sendto_Parser(article) || "{name: 'flechazo', email: '837207595@qq.com'},"}], },
            time: { year: '${((article.calendar.includes("每年")) || (article.calendar.includes("每月") || (article.calendar.includes("每日")))) ? ('*') : (article.date.slice(0,4))}', month: '${((article.calendar.includes("每月")) || (article.calendar.includes("每日"))) ? ('*') : (article.date.slice(5,7))}', day: '${(article.calendar.includes("每日")) ? ('*') : (article.date.slice(8,10))}', hour: '10', minute: '00', week: '${Calendar_Week_Translate(article.calendar)}', },
            content: { title: '${article.title}', text: '${article.description}',},
        },`
        })
        /* replace */
        templete = templete.replace("{{date}}", new Date().toISOString().replace('T', ' ').slice(0, 19));
        templete = templete.replace("{{calendar_database}}",calendar_database);
    }while(0);

    return templete;
}

/****************************************************************************************************
* article_Calendar_Filter()
****************************************************************************************************/
function article_Calendar_Filter(categories) {
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
                if(article.calendar)
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
        const articles = article_Calendar_Filter(categories);
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
