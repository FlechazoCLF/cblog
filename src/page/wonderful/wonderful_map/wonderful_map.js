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
 * 2025-09-02     cc          the first version
 * 2025-09-11     cc          code refactoring and optimization
 * 2025-12-16     cc          bind article with map
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useEffect, useRef } from 'react';
/* router */
import { Link } from 'react-router-dom';
/* article */
import { article_cfg_get } from '../../article/article_cfg';
/* theme */
import { useTheme } from '../../../kernel/theme/theme'

/****************************************************************************************************
* variable
****************************************************************************************************/
let wonderful_map_cityDatas = [];

/****************************************************************************************************
* function
****************************************************************************************************/

/****************************************************************************************************
* Wonderful_map_LoadingOverlay
****************************************************************************************************/
function Wonderful_map_LoadingOverlay({isMapReady}) {
    let result = null;
    const theme = useTheme();

    do
    {
        /* check isMapReady */
        if(isMapReady)
        {
            continue;
        }
        /* load overlay */
        result = (
            /* loading */
            <div 
                style={{
                    /* layout */
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    /* position */
                    zIndex: 2000,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    /* color */
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                {/* loading */}
                <div 
                    style={{
                        /* layout */
                        marginBottom: '20px',
                        /* position */
                        width: '60px',
                        height: '60px',
                        /* style */
                        border: `4px solid ${theme.total.borderSecondary}`,
                        borderTop: `4px solid ${theme.total.info}`,
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }}
                >
                    {/* loading */}
                </div>
                {/* description */}
                <div 
                    style={{
                        /* layout */
                        marginBottom: '8px',
                        /* style */
                        color: theme.total.text,
                        fontSize: '18px',
                        fontWeight: 'bold',
                    }}
                >
                    🗺️ 地图加载中...
                </div>
                <div 
                    style={{
                        /* layout */
                        textAlign: 'center',
                        maxWidth: '300px',
                        /* style */
                        color: theme.total.textDisabled,
                        fontSize: '14px',
                    }}
                >
                    正在加载地图瓦片...
                </div>
                {/* loading */}
                <style jsx>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        )
    }while(0);

    return result;
}

/****************************************************************************************************
* Wonderful_map_StatisticsPanel()
****************************************************************************************************/
function Wonderful_map_StatisticsPanel({locationData, selectedLocation}) {
    const theme = useTheme();
    /* items */
    let statisticItems = [];
    do
    {
        /* check parameter */
        if((locationData == null) || (locationData == undefined))
        {
            continue;
        }
        /* statistics */
        statisticItems = [
            {
                value: locationData.length,
                label: '探索地点',
                color: theme.total.info,
            },
            {
                value: locationData.reduce((sum, location) => sum + location.articles.length, 0),
                label: '总文章数',
                color: theme.total.success,
            },
            {
                value: selectedLocation ? selectedLocation.articles.length : 0,
                label: '选中城市文章',
                color: theme.total.warning,
            },
            {
                value: selectedLocation ? selectedLocation.city : "城市",
                label: selectedLocation ? '选中地点' : '未选择',
                color: theme.total.error,
            },
        ];
    }while(0);

    return (
        <div
            style={{
                /* layout */
                display: 'grid',
                position: 'absolute',
                zIndex: 1000,
                /* position */
                top: '20px',
                left: '60px',
                gap: '10px',
                width: '320px',
                gridTemplateColumns: 'repeat(2, 1fr)',
            }}
        >
            {statisticItems.map((item, index) => (
                /* item */
                <div
                    key={index}
                    style={{
                        /* layout */
                        textAlign: 'center',
                        padding: '12px',
                        /* style */
                        background: theme.total.overlayLight,
                        borderRadius: '8px',
                        boxShadow: theme.total.shadowSm,
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {/* value */}
                    <div
                        style={{
                            /* layout */
                            marginBottom: '4px',
                            /* style */
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: item.color,
                        }}
                    >
                        {item.value}
                    </div>
                    {/* label */}
                    <div
                        style={{
                            /* layout */
                            /* style */
                            fontSize: '12px',
                            color: theme.total.textDisabled,
                        }}
                    >
                        {item.label}
                    </div>
                </div>
            ))}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_map_Sidebar_SelectedLocationPanel()
****************************************************************************************************/
function Wonderful_map_Sidebar_SelectedLocationPanel({selectedLocation, isArticlesExpanded, setIsArticlesExpanded}) {
    const theme = useTheme();

    return (
        <div
            style={{
                /* layout */
                padding: '15px',
                marginBottom: '20px',
                /* color */
                backgroundColor: theme.total.successBg,
                /* style */
                borderRadius: '8px',
                border: `1px solid ${theme.total.success}33`,
                cursor: 'pointer',
            }}
            onClick={() => setIsArticlesExpanded(!isArticlesExpanded)}
        >
            {/* subtitle */}
            <h3
                style={{
                    /* layout */
                    margin: '0 0 10px 0',
                    /* color */
                    color: theme.total.success,
                    /* font */
                    fontSize: '16px'
                }}
            >
                🎯 选中位置
            </h3>
            {/* selected location */}
            <div
                style={{
                    /* layout */
                    marginBottom: '8px',
                    /* color */
                    color: theme.total.text,
                    /* font */
                    fontSize: '14px',
                    fontWeight: 'bold',
                }}
            >
                {selectedLocation.city}, {selectedLocation.country}
            </div>
            {/* information */}
            <div
                style={{
                    /* layout */
                    /* color */
                    color: theme.total.textDisabled,
                    /* font */
                    fontSize: '14px', 
                }}
            >
                <div>纬度: {selectedLocation.lat.toFixed(6)}</div>
                <div>经度: {selectedLocation.lng.toFixed(6)}</div>
                <div 
                    style={{
                        /* layout */
                        marginTop: '8px',
                        /* color */
                        color: selectedLocation.articles.length > 0 ? theme.total.primaryHover : theme.total.textMuted
                    }}
                >
                    📝 {selectedLocation.articles.length} 篇文章
                </div>
            </div>
            {isArticlesExpanded && (
                /* articles */
                <div>
                    {/* header */}
                    <h3
                        style={{
                            /* layout */
                            margin: '20px 0 10px 0',
                            /* color */
                            color: theme.total.primary,
                            /* font */
                            fontSize: '16px'
                        }}
                    >
                        📝 文章列表
                    </h3>
                    {/* articles */}
                    {selectedLocation.articles.map((article, index) => (
                        <Link 
                            key={index}
                            to={article.path}
                            style={{
                                /* layout */
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '8px',
                                /* size */
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                /* color */
                                background: theme.card.background,
                                /* style */
                                borderRadius: '18px',
                                boxShadow: theme.total.shadowSm,
                                transition: 'all 0.3s ease',
                            }}
                            /* mouse */
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.boxShadow = theme.total.shadowMd;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = theme.total.shadowSm;
                            }}
                        >
                            {/* title */}
                            <h4
                                style={{
                                    /* layout */
                                    margin: '32px 0 8px 0',
                                    /* color */
                                    color: theme.total.text,
                                    /* font */
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {article.title}
                            </h4>
                            {/* data */}
                            <div
                                style={{
                                    /* layout */
                                    marginBottom: '8px',
                                    /* color */
                                    color: theme.total.textDisabled,
                                    /* font */
                                    fontSize: '12px',
                                }}
                            >
                                <div>发布时间: {article.date}</div>
                                <div>作者: {article.author}</div>
                            </div>
                            {/* description */}
                            <div
                                style={{
                                    /* layout */
                                    marginBottom: '8px',
                                    /* color */
                                    color: theme.total.textDisabled,
                                    /* font */
                                    fontSize: '14px',
                                }}
                            >
                                {article.description}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_map_Sidebar_SearchInput()
****************************************************************************************************/
function Wonderful_map_Sidebar_SearchInput({searchTerm, setSearchTerm}) {
    const theme = useTheme();
    return (
        <div
            style={{
                /* layout */
                marginBottom: '20px',
            }}
        >
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索城市或国家..."
                style={{
                    /* layout */
                    width: '100%',
                    padding: '12px',
                    /* font */
                    fontSize: '14px',
                    /* style */
                    border: `2px solid ${theme.total.border}`,
                    borderRadius: '8px',
                    outline: 'none',
                    backgroundColor: theme.total.surface,
                    color: theme.total.textPrimary,
                }}
            />
        </div>
    );
}

/****************************************************************************************************
* Wonderful_map_Sidebar_LocationItem()
****************************************************************************************************/
function Wonderful_map_Sidebar_LocationItem({ location, isSelected, onSelect }) {
    const theme = useTheme();
    return (
        <div
            onClick={onSelect}
            style={{
                /* layout */
                padding: '15px',
                /* color */
                backgroundColor: isSelected
                    ? theme.total.infoBg
                    : theme.total.surface,
                /* color */
                borderRadius: '8px',
                border: `2px solid ${isSelected ? theme.total.info : theme.total.borderSecondary}`,
                /* style */
                cursor: 'pointer',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
                if (!isSelected) {
                    e.target.style.backgroundColor = theme.total.surfaceHover;
                }
            }}
            onMouseLeave={(e) => {
                if (!isSelected) {
                    e.target.style.backgroundColor = theme.total.surface;
                }
            }}
        >
            {/* title */}
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                }}
            >
                {/* title */}
                <div
                    style={{
                        /* layout */
                        /* color */
                        color: theme.total.text,
                        /* font */
                        fontWeight: 'bold',
                        fontSize: '16px',
                    }}
                >
                    {location.city}
                </div>
                {/* articles */}
                <div
                    style={{
                        /* layout */
                        padding: '2px 8px',
                        /* color */
                        color: theme.total.textInverse,
                        backgroundColor: theme.total.success,
                        /* font */
                        fontSize: '12px',
                        fontWeight: 'bold',
                        /* style */
                        borderRadius: '12px',
                    }}
                >
                    {location.articles.length}
                </div>
            </div>
            {/* description */}
            <div 
                style={{
                    /* layout */
                    marginBottom: '5px',
                    /* color */
                    color: theme.total.textDisabled,
                    /* font */
                    fontSize: '14px',
                }}
            >
                📍 {location.country}
            </div>
            {/* lat & lng */}
            <div
                style={{
                    /* layout */
                    /* color */
                    color: theme.total.textMuted,
                    /* font */
                    fontSize: '12px',
                }}
            >
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </div>
        </div>
    );
}

/****************************************************************************************************
* Wonderful_map_Sidebar_LocationList()
****************************************************************************************************/
function Wonderful_map_Sidebar_LocationList({locations, selectedLocation, onLocationSelect}) {
    const theme = useTheme();
    return (
        <div>
            {/* title */}
            <h3
                style={{
                    /* layout */
                    margin: '0 0 15px 0',
                    /* color */
                    color: theme.total.text,
                    /* font */
                    fontSize: '18px',
                    fontWeight: 'bold',
                }}
            >
                🏙️ 位置列表 ({locations.length})
            </h3>
            {/* list */}
            <div
                style={{
                    /* layout */
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                {locations.map(location => (
                    <Wonderful_map_Sidebar_LocationItem
                        key={location.id}
                        location={location}
                        isSelected={selectedLocation && selectedLocation.id === location.id}
                        onSelect={() => onLocationSelect(location)}
                    />
                ))}
            </div>
            {/* search result */}
            <div
                style={{
                    /* layout */
                    textAlign: 'center',
                    padding: '20px',
                    /* color */
                    color: theme.total.textDisabled,
                    /* font */
                    fontSize: '14px'
                }}
            >
                共匹配到 {locations.length} 个位置
            </div>
        </div>
    );
}

/****************************************************************************************************
* Wonderful_map_Sidebar()
****************************************************************************************************/
function Wonderful_map_Sidebar({isOpen, onToggle, locationData, selectedLocation, onLocationSelect, searchTerm, setSearchTerm, isArticlesExpanded, setIsArticlesExpanded}) {
    const theme = useTheme();
    /* filter search term */
    const filteredLocations = locationData.filter(location =>
        location.city.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            {/* sidebar toggle button */}
            <button
                /* click */
                onClick={onToggle}
                style={{
                    /* layout */
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 1001,
                    width: '50px',
                    height: '50px',
                    /* color */
                    background: theme.total.overlayLight,
                    /* font */
                    fontSize: '20px',
                    /* style */
                    border: 'none',
                    borderRadius: '50%',
                    boxShadow: theme.total.shadowSm,
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                }}
            >
                {isOpen ? '✕' : '☰'}
            </button>

            {/* sidebar content */}
            <div
                style={{
                    /* layout */
                    position: 'absolute',
                    top: 0,
                    right: isOpen ? 0 : '-400px',
                    width: '400px',
                    height: '100vh',
                    zIndex: 1000,
                    padding: '80px 20px 20px 20px',
                    overflowY: 'auto',
                    /* color */
                    background: theme.total.overlayLight,
                    /* style */
                    boxShadow: isOpen ? theme.total.shadowLg : 'none',
                    backdropFilter: 'blur(20px)',
                    transition: 'right 0.3s ease',
                }}
            >
                {/* title */}
                <div 
                    style={{
                        /* layout */
                        marginBottom: '20px',
                    }}
                >
                    <h2
                        style={{
                            /* layout */
                            margin: '0 0 15px 0',
                            /* color */
                            color: theme.total.text,
                            /* font */
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        🗺️ 地图探索
                    </h2>
                    <p
                        style={{
                            /* layout */
                            margin: '0 0 20px 0',
                            /* color */
                            color: theme.total.textDisabled,
                            /* font */
                            fontSize: '14px',
                            lineHeight: '1.5',
                        }}
                    >
                        探索世界各地，记录你的足迹和文章
                    </p>
                </div>

                {/* selected location panel */}
                {selectedLocation && <Wonderful_map_Sidebar_SelectedLocationPanel selectedLocation={selectedLocation} isArticlesExpanded={isArticlesExpanded} setIsArticlesExpanded={setIsArticlesExpanded} />}

                {/* search input */}
                <Wonderful_map_Sidebar_SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                {/* location list */}
                <Wonderful_map_Sidebar_LocationList locations={filteredLocations} selectedLocation={selectedLocation} onLocationSelect={onLocationSelect} />
            </div>
        </>
    );
}

/****************************************************************************************************
* Constants & Configuration
****************************************************************************************************/

/**
 * 地图配置常量
 */
const MAP_CONFIG = {
    /* shanghai */
    defaultCenter: [31.2304, 121.4737],
    defaultZoom: 4,
    minZoom: 2,
    maxZoom: 18,
    tileUrls: [
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    ],
    cdnUrls: {
        css: [
            'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css',
            'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        ],
        js: [
            'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js',
            'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        ]
    }
};

/* city location */
const Wonderful_map_city_location = [
    // =============== 中国 ===============
    { id: 1,   city: '北京',       country: '中国',        lat: 39.9042,  lng: 116.4074 },
    { id: 2,   city: '上海',       country: '中国',        lat: 31.2304,  lng: 121.4737 },
    { id: 3,   city: '广州',       country: '中国',        lat: 23.1291,  lng: 113.2644 },
    { id: 4,   city: '深圳',       country: '中国',        lat: 22.5431,  lng: 114.0579 },
    { id: 5,   city: '重庆',       country: '中国',        lat: 29.5630,  lng: 106.5516 },
    { id: 6,   city: '天津',       country: '中国',        lat: 39.3434,  lng: 117.3616 },
    { id: 7,   city: '成都',       country: '中国',        lat: 30.5728,  lng: 104.0668 },
    { id: 8,   city: '武汉',       country: '中国',        lat: 30.5928,  lng: 114.3055 },
    { id: 9,   city: '西安',       country: '中国',        lat: 34.3416,  lng: 108.9398 },
    { id: 10,  city: '杭州',       country: '中国',        lat: 30.2741,  lng: 120.1551 },
    { id: 11,  city: '南京',       country: '中国',        lat: 32.0603,  lng: 118.7969 },
    { id: 12,  city: '苏州',       country: '中国',        lat: 31.2989,  lng: 120.5853 },
    { id: 13,  city: '郑州',       country: '中国',        lat: 34.7466,  lng: 113.6254 },
    { id: 14,  city: '青岛',       country: '中国',        lat: 36.0671,  lng: 120.3826 },
    { id: 15,  city: '长沙',       country: '中国',        lat: 28.2282,  lng: 112.9388 },
    { id: 16,  city: '宁波',       country: '中国',        lat: 29.8785,  lng: 121.5440 },
    { id: 17,  city: '佛山',       country: '中国',        lat: 23.0215,  lng: 113.1197 },
    { id: 18,  city: '合肥',       country: '中国',        lat: 31.8207,  lng: 117.2272 },
    { id: 19,  city: '沈阳',       country: '中国',        lat: 41.8003,  lng: 123.4288 },
    { id: 20,  city: '济南',       country: '中国',        lat: 36.6512,  lng: 117.1201 },
    { id: 21,  city: '福州',       country: '中国',        lat: 26.0753,  lng: 119.2965 },
    { id: 22,  city: '厦门',       country: '中国',        lat: 24.4798,  lng: 118.0819 },
    { id: 23,  city: '哈尔滨',     country: '中国',        lat: 45.8038,  lng: 126.5350 },
    { id: 24,  city: '长春',       country: '中国',        lat: 43.8171,  lng: 125.3235 },
    { id: 25,  city: '大连',       country: '中国',        lat: 38.9148,  lng: 121.6178 },
    { id: 26,  city: '石家庄',     country: '中国',        lat: 38.0428,  lng: 114.5236 },
    { id: 27,  city: '太原',       country: '中国',        lat: 37.8706,  lng: 112.5483 },
    { id: 28,  city: '南昌',       country: '中国',        lat: 28.6830,  lng: 115.8582 },
    { id: 29,  city: '南宁',       country: '中国',        lat: 22.8170,  lng: 108.3665 },
    { id: 30,  city: '贵阳',       country: '中国',        lat: 26.6477,  lng: 106.6302 },
    { id: 31,  city: '昆明',       country: '中国',        lat: 25.0389,  lng: 102.7183 },
    { id: 32,  city: '兰州',       country: '中国',        lat: 36.0611,  lng: 103.8343 },
    { id: 33,  city: '乌鲁木齐',   country: '中国',        lat: 43.8256,  lng: 87.6168  },
    { id: 34,  city: '海口',       country: '中国',        lat: 20.0173,  lng: 110.3336 },
    { id: 35,  city: '三亚',       country: '中国',        lat: 18.2528,  lng: 109.5119 },
    { id: 36,  city: '银川',       country: '中国',        lat: 38.4788,  lng: 106.2325 },
    { id: 37,  city: '西宁',       country: '中国',        lat: 36.6218,  lng: 101.7789 },
    { id: 38,  city: '呼和浩特',   country: '中国',        lat: 40.8407,  lng: 111.7520 },
    { id: 39,  city: '拉萨',       country: '中国',        lat: 29.6507,  lng: 91.1172  },
    { id: 40,  city: '徐州',       country: '中国',        lat: 34.2535,  lng: 117.2120 },
    { id: 41,  city: '温州',       country: '中国',        lat: 28.0020,  lng: 120.6706 },
    { id: 42,  city: '东莞',       country: '中国',        lat: 23.0207,  lng: 113.7518 },

    // =============== 全球城市 ===============
    // 亚洲
    { id: 43,  city: '东京',       country: '日本',        lat: 35.6762,  lng: 139.6503 },
    { id: 44,  city: '大阪',       country: '日本',        lat: 34.6937,  lng: 135.5023 },
    { id: 45,  city: '首尔',       country: '韩国',        lat: 37.5665,  lng: 126.9780 },
    { id: 46,  city: '釜山',       country: '韩国',        lat: 35.1796,  lng: 129.0756 },
    { id: 47,  city: '新加坡',     country: '新加坡',      lat: 1.3521,   lng: 103.8198 },
    { id: 48,  city: '曼谷',       country: '泰国',        lat: 13.7563,  lng: 100.5018 },
    { id: 49,  city: '吉隆坡',     country: '马来西亚',    lat: 3.1390,   lng: 101.6869 },
    { id: 50,  city: '雅加达',     country: '印度尼西亚',  lat: -6.2088,  lng: 106.8456 },
    { id: 51,  city: '马尼拉',     country: '菲律宾',      lat: 14.5995,  lng: 120.9842 },
    { id: 52,  city: '孟买',       country: '印度',        lat: 19.0760,  lng: 72.8777  },
    { id: 53,  city: '德里',       country: '印度',        lat: 28.7041,  lng: 77.1025  },
    { id: 54,  city: '班加罗尔',   country: '印度',        lat: 12.9716,  lng: 77.5946  },
    { id: 55,  city: '迪拜',       country: '阿联酋',      lat: 25.2048,  lng: 55.2708  },
    { id: 56,  city: '利雅得',     country: '沙特阿拉伯',  lat: 24.7136,  lng: 46.6753  },
    { id: 57,  city: '特拉维夫',   country: '以色列',      lat: 32.0853,  lng: 34.7818  },

    // 欧洲
    { id: 58,  city: '伦敦',       country: '英国',        lat: 51.5074,  lng: -0.1278  },
    { id: 59,  city: '巴黎',       country: '法国',        lat: 48.8566,  lng: 2.3522   },
    { id: 60,  city: '柏林',       country: '德国',        lat: 52.5200,  lng: 13.4050  },
    { id: 61,  city: '慕尼黑',     country: '德国',        lat: 48.1351,  lng: 11.5820  },
    { id: 62,  city: '罗马',       country: '意大利',      lat: 41.9028,  lng: 12.4964  },
    { id: 63,  city: '米兰',       country: '意大利',      lat: 45.4642,  lng: 9.1900   },
    { id: 64,  city: '马德里',     country: '西班牙',      lat: 40.4168,  lng: -3.7038  },
    { id: 65,  city: '巴塞罗那',   country: '西班牙',      lat: 41.3851,  lng: 2.1734   },
    { id: 66,  city: '阿姆斯特丹', country: '荷兰',        lat: 52.3676,  lng: 4.9041   },
    { id: 67,  city: '斯德哥尔摩', country: '瑞典',        lat: 59.3293,  lng: 18.0686  },
    { id: 68,  city: '哥本哈根',   country: '丹麦',        lat: 55.6761,  lng: 12.5683  },
    { id: 69,  city: '奥斯陆',     country: '挪威',        lat: 59.9139,  lng: 10.7522  },
    { id: 70,  city: '赫尔辛基',   country: '芬兰',        lat: 60.1699,  lng: 24.9384  },
    { id: 71,  city: '维也纳',     country: '奥地利',      lat: 48.2082,  lng: 16.3738  },
    { id: 72,  city: '苏黎世',     country: '瑞士',        lat: 47.3769,  lng: 8.5417   },
    { id: 73,  city: '莫斯科',     country: '俄罗斯',      lat: 55.7558,  lng: 37.6173  },
    { id: 74,  city: '圣彼得堡',   country: '俄罗斯',      lat: 59.9343,  lng: 30.3351  },

    // 美洲
    { id: 75,  city: '纽约',       country: '美国',        lat: 40.7128,  lng: -74.0060 },
    { id: 76,  city: '洛杉矶',     country: '美国',        lat: 34.0522,  lng: -118.2437 },
    { id: 77,  city: '芝加哥',     country: '美国',        lat: 41.8781,  lng: -87.6298 },
    { id: 78,  city: '休斯顿',     country: '美国',        lat: 29.7604,  lng: -95.3698 },
    { id: 79,  city: '凤凰城',     country: '美国',        lat: 33.4484,  lng: -112.0740 },
    { id: 80,  city: '费城',       country: '美国',        lat: 39.9526,  lng: -75.1652 },
    { id: 81,  city: '圣安东尼奥', country: '美国',        lat: 29.4241,  lng: -98.4936 },
    { id: 82,  city: '圣地亚哥',   country: '美国',        lat: 32.7157,  lng: -117.1611 },
    { id: 83,  city: '达拉斯',     country: '美国',        lat: 32.7767,  lng: -96.7970 },
    { id: 84,  city: '旧金山',     country: '美国',        lat: 37.7749,  lng: -122.4194 },
    { id: 85,  city: '波士顿',     country: '美国',        lat: 42.3601,  lng: -71.0589 },
    { id: 86,  city: '华盛顿',     country: '美国',        lat: 38.9072,  lng: -77.0369 },
    { id: 87,  city: '多伦多',     country: '加拿大',      lat: 43.6532,  lng: -79.3832 },
    { id: 88,  city: '蒙特利尔',   country: '加拿大',      lat: 45.5017,  lng: -73.5673 },
    { id: 89,  city: '温哥华',     country: '加拿大',      lat: 49.2827,  lng: -123.1207 },
    { id: 90,  city: '墨西哥城',   country: '墨西哥',      lat: 19.4326,  lng: -99.1332 },
    { id: 91,  city: '圣保罗',     country: '巴西',        lat: -23.5505, lng: -46.6333 },
    { id: 92,  city: '里约热内卢', country: '巴西',        lat: -22.9068, lng: -43.1729 },
    { id: 93,  city: '布宜诺斯艾利斯', country: '阿根廷',  lat: -34.6037, lng: -58.3816 },
    { id: 94,  city: '利马',       country: '秘鲁',        lat: -12.0464, lng: -77.0428 },
    { id: 95,  city: '波哥大',     country: '哥伦比亚',    lat: 4.7110,   lng: -74.0721 },

    // 大洋洲 & 非洲
    { id: 96,  city: '悉尼',       country: '澳大利亚',    lat: -33.8688, lng: 151.2093 },
    { id: 97,  city: '墨尔本',     country: '澳大利亚',    lat: -37.8136, lng: 144.9631 },
    { id: 98,  city: '布里斯班',   country: '澳大利亚',    lat: -27.4698, lng: 153.0251 },
    { id: 99,  city: '开罗',       country: '埃及',        lat: 30.0444,  lng: 31.2357  },
    { id: 100, city: '拉各斯',     country: '尼日利亚',    lat: 6.5244,   lng: 3.3792   },
    { id: 101, city: '约翰内斯堡', country: '南非',        lat: -26.2041, lng: 28.0473  },
    { id: 102, city: '内罗毕',     country: '肯尼亚',      lat: -1.2921,  lng: 36.8219  }
];

/****************************************************************************************************
* Utility Functions & Services
****************************************************************************************************/

/****************************************************************************************************
* Wonderful_map_LoadLeafletCSS()
****************************************************************************************************/
function Wonderful_map_LoadLeafletCSS(urls, onLoaded) {
    /* check if already loaded */
    if (document.querySelector('link[href*="leaflet"]')) {
        onLoaded();
        return;
    }

    /* try load CSS with fallback */
    const tryLoadCSS = (index = 0) => {
        /* check if all URLs failed */
        if (index >= urls.length) {
            console.error('All CSS CDN URLs failed to load');
            return;
        }

        /* create link element */
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = urls[index];
        link.onload = onLoaded;
        link.onerror = () => tryLoadCSS(index + 1);
        document.head.appendChild(link);
    };

    tryLoadCSS();
}

/****************************************************************************************************
* Wonderful_map_LoadLeafletJS()
****************************************************************************************************/
function Wonderful_map_LoadLeafletJS(urls, onLoaded) {
    /* check if already loaded */
    if (window.L) {
        onLoaded();
        return;
    }

    /* try load JS with fallback */
    const tryLoadJS = (index = 0) => {
        /* check if all URLs failed */
        if (index >= urls.length) {
            console.error('All JS CDN URLs failed to load');
            return;
        }

        /* create script element */
        const script = document.createElement('script');
        script.src = urls[index];
        script.onload = onLoaded;
        script.onerror = () => tryLoadJS(index + 1);
        document.head.appendChild(script);
    };

    tryLoadJS();
}

/****************************************************************************************************
* Wonderful_map_LoadLeaflet()
****************************************************************************************************/
function Wonderful_map_LoadLeaflet(onLoaded) {
    /* check if already loaded */
    if (window.L && document.querySelector('link[href*="leaflet"]')) {
        onLoaded && onLoaded();
        return;
    }

    /* loading state */
    let cssLoaded = false;
    let jsLoaded = false;

    /* check all resources loaded */
    const checkAllLoaded = () => {
        if (cssLoaded && jsLoaded && window.L) {
            onLoaded && onLoaded();
        }
    };

    /* load CSS */
    Wonderful_map_LoadLeafletCSS(MAP_CONFIG.cdnUrls.css, () => {
        cssLoaded = true;
        checkAllLoaded();
    });

    /* load JS */
    Wonderful_map_LoadLeafletJS(MAP_CONFIG.cdnUrls.js, () => {
        jsLoaded = true;
        checkAllLoaded();
    });
}

/****************************************************************************************************
* Wonderful_map_LeafletMap()
****************************************************************************************************/
function Wonderful_map_LeafletMap({locationData, selectedLocation, onLocationSelect, onMapClick, isMapReady}) {

    const theme = useTheme();
    /* refs */
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);

    /* map initialization effect */
    useEffect(() => {
        Wonderful_map_LeafletMap_InitializeMap();

        /* cleanup: destroy map instance on unmount to prevent memory leak */
        return () => {
            if (mapInstanceRef.current) {
                /* remove all markers first */
                markersRef.current.forEach(marker => {
                    mapInstanceRef.current.removeLayer(marker);
                });
                markersRef.current = [];

                /* destroy map instance — removes all listeners, tiles, DOM refs */
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [onMapClick, isMapReady]);

    /* markers management effect */
    useEffect(() => {
        Wonderful_map_LeafletMap_UpdateLocationMarkers();
    }, [locationData, selectedLocation, onLocationSelect]);

    /* map view control effect */
    useEffect(() => {
        if (selectedLocation && mapInstanceRef.current) {
            mapInstanceRef.current.setView([selectedLocation.lat, selectedLocation.lng], 8);
        }
    }, [selectedLocation]);

    /* initialize map instance */
    const Wonderful_map_LeafletMap_InitializeMap = () => {
        /* check prerequisites */
        if (!window.L || !mapRef.current || !isMapReady || mapInstanceRef.current) return;

        try {
            /* create map instance */
            mapInstanceRef.current = window.L.map(mapRef.current, {
                center: MAP_CONFIG.defaultCenter,
                zoom: MAP_CONFIG.defaultZoom,
                minZoom: MAP_CONFIG.minZoom,
                maxZoom: MAP_CONFIG.maxZoom,
                zoomControl: true,
                attributionControl: true
            });

            /* add tile layer */
            Wonderful_map_LeafletMap_AddTileLayer();
            
            /* bind map events */
            Wonderful_map_LeafletMap_BindMapEvents();

        } catch (error) {
            console.error('Map initialization failed:', error);
        }
    };

    /* add tile layer with fallback */
    const Wonderful_map_LeafletMap_AddTileLayer = () => {
        let currentTileIndex = 0;

        const tryLoadTiles = () => {
            /* check if all tile servers failed */
            if (currentTileIndex >= MAP_CONFIG.tileUrls.length) {
                console.error('All map tile servers are unavailable');
                return;
            }

            /* create tile layer */
            const tileLayer = window.L.tileLayer(MAP_CONFIG.tileUrls[currentTileIndex], {
                attribution: currentTileIndex === 2 
                    ? '© OpenStreetMap contributors © CARTO'
                    : '© OpenStreetMap contributors',
                maxZoom: 19,
                timeout: 10000
            });

            /* handle tile loading error */
            tileLayer.on('tileerror', () => {
                console.log(`Tile server ${currentTileIndex + 1} failed, trying next...`);
                mapInstanceRef.current.removeLayer(tileLayer);
                currentTileIndex++;
                tryLoadTiles();
            });

            tileLayer.addTo(mapInstanceRef.current);
        };

        tryLoadTiles();
    };

    /* bind map events */
    const Wonderful_map_LeafletMap_BindMapEvents = () => {
        mapInstanceRef.current.on('click', (e) => {
            onMapClick && onMapClick(e.latlng.lat, e.latlng.lng);
        });
    };

    /* update location markers */
    const Wonderful_map_LeafletMap_UpdateLocationMarkers = () => {
        /* check prerequisites */
        if (!mapInstanceRef.current || !window.L || !locationData) return;

        /* clear existing markers */
        Wonderful_map_LeafletMap_ClearExistingMarkers();

        /* add new markers */
        locationData.forEach(location => {
            const marker = Wonderful_map_LeafletMap_CreateLocationMarker(location);
            markersRef.current.push(marker);
        });
    };

    /* clear existing markers */
    const Wonderful_map_LeafletMap_ClearExistingMarkers = () => {
        markersRef.current.forEach(marker => {
            mapInstanceRef.current.removeLayer(marker);
        });
        markersRef.current = [];
    };

    /* create location marker */
    const Wonderful_map_LeafletMap_CreateLocationMarker = (location) => {
        const isSelected = selectedLocation && selectedLocation.id === location.id;
        
        /* create custom icon */
        const icon = Wonderful_map_LeafletMap_CreateCustomIcon(location, isSelected);
        
        /* create marker and bind events */
        return window.L.marker([location.lat, location.lng], { icon })
            .addTo(mapInstanceRef.current)
            .bindPopup(Wonderful_map_LeafletMap_CreatePopupContent(location))
            .on('click', () => onLocationSelect(location));
    };

    /* create custom icon */
    const Wonderful_map_LeafletMap_CreateCustomIcon = (location, isSelected) => {
        const backgroundColor = isSelected ? theme.total.primary : 
                              location.articles > 0 ? theme.total.success :  theme.total.info;
        
        return window.L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    /* layout */
                    width: 24px;
                    height: 24px;
                    position: relative;
                    /* style */
                    background-color: ${backgroundColor};
                    border: 3px solid white;
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    ${isSelected ? 'transform: scale(1.2);' : ''}
                ">
                    ${location.articles > 0 ? Wonderful_map_LeafletMap_CreateArticleBadge(location.articles) : ''}
                </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    };

    /* create article badge */
    const Wonderful_map_LeafletMap_CreateArticleBadge = (articleCount) => {
        return `
            <div style="
                /* layout */
                position: absolute;
                top: -8px;
                right: -8px;
                width: 16px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                /* style */
                background-color: ${theme.total.error};
                color: white;
                border-radius: 50%;
                font-size: 10px;
                font-weight: bold;
            ">${articleCount}</div>
        `;
    };

    /* create popup content */
    const Wonderful_map_LeafletMap_CreatePopupContent = (location) => {
        return `
            <div style="
                /* layout */
                text-align: center;
                min-width: 150px;
            ">
                <h3 style="
                    /* layout */
                    margin: 0 0 8px 0;
                    /* style */
                    color: ${theme.total.textPrimary};
                ">${location.city}</h3>
                <p style="
                    /* layout */
                    margin: 0 0 8px 0;
                    /* style */
                    color: ${theme.total.textSecondary};
                ">${location.country}</p>
                <p style="
                    /* layout */
                    margin: 0 0 8px 0;
                    /* style */
                    color: ${theme.total.textMuted};
                    font-size: 12px;
                ">
                    ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}
                </p>
                <p style="
                    /* layout */
                    margin: 0;
                    /* style */
                    color: ${location.articles.length > 0 ? theme.total.success : theme.total.textMuted};
                ">
                    📝 ${location.articles.length} 篇文章
                </p>
            </div>
        `;
    };

    /* render component */
    return (
        <>
            {/* map container */}
            <div
                ref={mapRef}
                style={{
                    /* layout */
                    position: 'absolute',
                    /* position */
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
            />

            {/* CSS styles */}
            <style jsx>{`
                .custom-marker {
                    background: none !important;
                    border: none !important;
                }
                
                .user-marker {
                    background: none !important;
                    border: none !important;
                }
                
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 ${theme.total.primary}B3; }
                    70% { box-shadow: 0 0 0 10px ${theme.total.primary}00; }
                    100% { box-shadow: 0 0 0 0 ${theme.total.primary}00; }
                }
            `}</style>
        </>
    );
}

/****************************************************************************************************
* Wonderful_map_city_location_get()
****************************************************************************************************/
function Wonderful_map_city_location_get(city) {
    let location = null;

    for (let index = 0; index < Wonderful_map_city_location.length; index++)
    {
        const element = Wonderful_map_city_location[index];
        if(element.city == city)
        {
            location = element;
            break;
        }
    }

    return location;
}

/****************************************************************************************************
* Wonderful_map_city_data_article_add()
****************************************************************************************************/
function Wonderful_map_city_data_article_add(article,cityDatas) {
    /* { city, lat, lng, articlelen , articles } */
    let cityData = null;
    let findcity = false;
    do
    {
        /* check parameter */
        if((article == "") || (article.location == ""))
        {
            continue
        }
        /* find city */
        for (let index = 0; index < cityDatas.length; index++)
        {
            if(cityDatas[index].city == article.location)
            {
                /* push */
                cityDatas[index].articles.push(article);
                cityDatas[index].articlelen += 1;
                findcity = true;
                break;
            }
        }
        /* new */
        if(!findcity)
        {
            /* get location */
            const location = Wonderful_map_city_location_get(article.location);
            /* check location */
            if(location == null)
            {
                continue;
            }
            /* cityData */
            cityData = {
                id: location.id,
                city: article.location,
                country: location.country,
                lat: location.lat,
                lng: location.lng,
                articlelen: 1,
                articles: [article]
            }
            /* push */
            cityDatas.push(cityData);
        }
    }while(0);
}

/****************************************************************************************************
* Wonderful_map_city_data_get()
****************************************************************************************************/
function Wonderful_map_city_data_get(articles,cityDatas) {

    do
    {
        /* check parameter */
        if(articles == "")
        {
            continue
        }
        /* foreach article */
        for(let index_category = 0; index_category < articles.length; index_category++)
        {
            const category = articles[index_category];
            for(let index_article = 0; index_article < category.articles.length; index_article++)
            {
                const article = category.articles[index_article];
                Wonderful_map_city_data_article_add(article,cityDatas);
            }
        }
    }while(0);

    return cityDatas;
}

/****************************************************************************************************
* Wonderful_map_Init()
****************************************************************************************************/
export function Wonderful_map_Init() {

    do
    {
        /* init article data */
        const articles = article_cfg_get();
        /* clear */
        wonderful_map_cityDatas = [];
        /* get city data */
        Wonderful_map_city_data_get(articles,wonderful_map_cityDatas);
    }while(0);

    return (
        <div>

        </div>
    );
}

/****************************************************************************************************
* Main Component
****************************************************************************************************/
export function Wonderful_map() {
    const theme = useTheme();
    /* state */
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMapReady, setIsMapReady] = useState(false);
    const [cityData, setCityData] = useState([]);
    /* show articles */
    const [isArticlesExpanded, setIsArticlesExpanded] = useState(false);

    /* load Leaflet map */
    useEffect(() => {
        /*  load Leaflet map */
        Wonderful_map_LoadLeaflet(() => {
            setIsMapReady(true);
        });
        /* set city data */
        setCityData(wonderful_map_cityDatas);
    }, []);

    /* click map */
    const handleMapClick = (lat, lng) => {
        console.log('地图点击位置:', lat, lng);
        /* add click event */
    };
    /* toggle sidebar */
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div 
            style={{
                /* layout */
                padding: '24px',
                position: 'relative',
                width: '96%',
                height: '100vh',
                overflow: 'hidden',
                /* style */
                borderRadius: '32px',
            }}
            /* mouse */
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = theme.total.shadowMd;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            {/* load state */}
            <Wonderful_map_LoadingOverlay isMapReady={isMapReady} />

            {/* static panel */}
            <Wonderful_map_StatisticsPanel locationData={cityData} selectedLocation={selectedLocation} />

            {/* map */}
            <Wonderful_map_LeafletMap locationData={cityData} selectedLocation={selectedLocation} onLocationSelect={setSelectedLocation} onMapClick={handleMapClick} isMapReady={isMapReady} />

            {/* sidebar */}
            <Wonderful_map_Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} locationData={cityData} selectedLocation={selectedLocation} onLocationSelect={setSelectedLocation} searchTerm={searchTerm} setSearchTerm={setSearchTerm} isArticlesExpanded={isArticlesExpanded} setIsArticlesExpanded={setIsArticlesExpanded} />
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/