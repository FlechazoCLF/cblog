
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
 * 2025-09-01     cc          add friend list info
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* site info */
export const friend_cfg_siteInfo = {
    name: 'Flechazo\'s Blog',
    url: 'http://flechazo.mba',
    description: '记录技术成长与生活感悟的个人博客',
    avatar: '👑',
    author: 'Flechazo',
    email: 'contact@flechazo.mba',
    tags: ['技术博客', 'C', 'python', '嵌入式软件开发', '生活感悟']
};

/* friend_cfg_links */
export let friend_cfg_links = [
    {
        id: 1,
        name: 'GitHub',
        url: 'https://github.com/FlechazoCLF',
        description: 'flechazo的GitHub',
        avatar: '🐙',
        status: 'active'
    },
    {
        id: 2,
        name: 'Gitee',
        url: 'https://gitee.com/carlchai',
        description: 'flechazo的Gitee',
        avatar: '📚',
        status: 'active'
    },
    {
        id: 3,
        name: '知乎',
        url: 'https://www.zhihu.com/people/jiu_sheng',
        description: '欢迎造访我的知乎',
        avatar: '💡',
        status: 'active'
    },
    {
        id: 4,
        name: 'CSDN',
        url: 'https://blog.csdn.net/qianshang52013',
        description: '欢迎造访我的CSDN',
        avatar: '⚛️',
        status: 'active'
    }
];

/* friend_cfg_message */
export let friend_cfg_message = [
    {
        name: 'flechazo',
        email: '837207595@qq.com',
        website: 'flechazo.mba',
        content: '欢迎大家来访问我的博客💒',
        timestamp: '2025-09-01',
    },
    {
        name: 'jaya',
        email: '837207595@qq.com',
        website: 'flechazo.mba',
        content: '爱你呦💝',
        timestamp: '2025-09-01',
    },
];

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Friend_Cfg_Links_Add()
****************************************************************************************************/
export function Friend_Cfg_Links_Add(name, url, description, avatar, status) {
    friend_cfg_links.push({
        id: friend_cfg_links.length + 1,
        name: name,
        url: url,
        description: description,
        avatar: avatar,
        status: status
    });
}

/****************************************************************************************************
* Friend_Cfg_Message_Add()
****************************************************************************************************/
export function Friend_Cfg_Message_Add(name, email, website, content) {

    do
    {
        /* check parameter */
        if ((name == "") || (email == "") || (website == "") || (content == ""))
        {
            continue;
        }
        /* add message */
        friend_cfg_message.push({
            name: name,
            email: email,
            website: website,
            content: content,
            timestamp: new Date().toLocaleDateString(),
        });
    }while(0);

}

/****************************************************************************************************
* File End!
****************************************************************************************************/
