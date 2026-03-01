
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
 * 2025-09-22     cc          the first version
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

/* city config */
const wonderful_map_city_cfg = [
    { index: 1, name: '北京',  country: '中国',     priority: 1, lat: 39.9042, lng: 116.4074, articles: 0 },
    { index: 2, name: '上海',  country: '中国',     priority: 1, lat: 31.2304, lng: 121.4737, articles: 0 },
    { index: 3, name: '广州',  country: '中国',     priority: 1, lat: 23.1291, lng: 113.2644, articles: 0 },
    { index: 4, name: '深圳',  country: '中国',     priority: 1, lat: 22.5431, lng: 114.0579, articles: 0 },
    { index: 5, name: '杭州',  country: '中国',     priority: 1, lat: 30.2741, lng: 120.1551, articles: 0 },
    { index: 6, name: '成都',  country: '中国',     priority: 1, lat: 30.5728, lng: 104.0668, articles: 0 },
    { index: 7, name: '西安',  country: '中国',     priority: 1, lat: 34.3416, lng: 108.9398, articles: 0 },
    { index: 8, name: '东京',  country: '日本',     priority: 1, lat: 35.6762, lng: 139.6503, articles: 0 },
    { index: 9, name: '纽约',  country: '美国',     priority: 1, lat: 40.7128, lng: -74.0060, articles: 0 },
    { index: 10, name: '伦敦', country: '英国',     priority: 1, lat: 51.5074, lng: -0.1278,  articles: 0 },
    { index: 11, name: '巴黎', country: '法国',     priority: 1, lat: 48.8566, lng: 2.3522,   articles: 0 },
    { index: 12, name: '悉尼', country: '澳大利亚', priority: 1, lat: -33.8688, lng: 151.2093, articles: 0 }
];

/* url config */
const wonderful_map_url_cfg = {
    tileUrls:
    [
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    ],
    cdnUrls: 
    {
        css: 
        [
            'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css',
            'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        ],
        js: 
        [
            'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js',
            'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        ]
    }
};

/* config */
const wonderful_map_cfg = {
};

/****************************************************************************************************
* Function Interface
****************************************************************************************************/



/****************************************************************************************************
* File End!
****************************************************************************************************/
