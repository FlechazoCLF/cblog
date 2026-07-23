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
 * 2025-08-22     cc          the first version
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

/* color type */
const COLOR_TYPE_BASE = "base";
const COLOR_TYPE_GRADIENT = "gradient";

/****************************************************************************************************
* Variable
****************************************************************************************************/

const colorList = [
    {
        type: "base",
        description: "基础颜色",
        colors: [
            {
                name: "red",
                description: "红色",
                value: " #ff0000"
            },
            {
                name: "crimson",
                description: "深红色",
                value: " #dc143c"
            },
            {
                name: "coral",
                description: "珊瑚色",
                value: " #ff7f50"
            },
            {
                name: "tomato",
                description: "番茄红",
                value: " #ff6347"
            },
            {
                name: "indianred",
                description: "印第安红",
                value: " #cd5c5c"
            },
            {
                name: "orange",
                description: "橙色",
                value: " #ffa500"
            },
            {
                name: "darkorange",
                description: "深橙色",
                value: " #ff8c00"
            },
            {
                name: "gold",
                description: "金色",
                value: " #ffd700"
            },
            {
                name: "yellow",
                description: "黄色",
                value: " #ffff00"
            },
            {
                name: "khaki",
                description: "卡其色",
                value: " #f0e68c"
            },
            {
                name: "lemonchiffon",
                description: "柠檬绸色",
                value: " #fffacd"
            },
            {
                name: "green",
                description: "绿色",
                value: " #008000"
            },
            {
                name: "limegreen",
                description: "青柠绿",
                value: " #32cd32"
            },
            {
                name: "forestgreen",
                description: "森林绿",
                value: " #228b22"
            },
            {
                name: "seagreen",
                description: "海洋绿",
                value: " #2e8b57"
            },
            {
                name: "mediumspringgreen",
                description: "中春绿色",
                value: " #00fa9a"
            },
            {
                name: "springgreen",
                description: "春绿色",
                value: " #00ff7f"
            },
            {
                name: "cyan",
                description: "青色",
                value: " #00ffff"
            },
            {
                name: "turquoise",
                description: "绿松石色",
                value: " #40e0d0"
            },
            {
                name: "teal",
                description: "鸭绿色",
                value: " #008080"
            },
            {
                name: "blue",
                description: "蓝色",
                value: " #0000ff"
            },
            {
                name: "royalblue",
                description: "皇家蓝",
                value: " #4169e1"
            },
            {
                name: "steelblue",
                description: "钢蓝色",
                value: " #4682b4"
            },
            {
                name: "deepskyblue",
                description: "深天蓝",
                value: " #00bfff"
            },
            {
                name: "dodgerblue",
                description: "道奇蓝",
                value: " #1e90ff"
            },
            {
                name: "cornflowerblue",
                description: "矢车菊蓝",
                value: " #6495ed"
            },
            {
                name: "purple",
                description: "紫色",
                value: " #800080"
            },
            {
                name: "blueviolet",
                description: "蓝紫色",
                value: " #8a2be2"
            },
            {
                name: "mediumpurple",
                description: "中紫色",
                value: " #9370db"
            },
            {
                name: "mediumorchid",
                description: "中兰紫",
                value: " #ba55d3"
            },
            {
                name: "magenta",
                description: "洋红色",
                value: " #ff00ff"
            },
            {
                name: "orchid",
                description: "兰花紫",
                value: " #da70d6"
            },
            {
                name: "pink",
                description: "粉色",
                value: " #ffc0cb"
            },
            {
                name: "hotpink",
                description: "热粉红",
                value: " #ff69b4"
            },
            {
                name: "deeppink",
                description: "深粉色",
                value: " #ff1493"
            },
            {
                name: "lightpink",
                description: "浅粉色",
                value: " #ffb6c1"
            },
            {
                name: "brown",
                description: "棕色",
                value: " #a52a2a"
            },
            {
                name: "chocolate",
                description: "巧克力色",
                value: " #d2691e"
            },
            {
                name: "sienna",
                description: "赭色",
                value: " #a0522d"
            },
            {
                name: "sandybrown",
                description: "沙褐色",
                value: " #f4a460"
            },
            {
                name: "peru",
                description: "秘鲁色",
                value: " #cd853f"
            },
            {
                name: "gray",
                description: "灰色",
                value: " #808080"
            },
            {
                name: "darkgray",
                description: "深灰色",
                value: " #a9a9a9"
            },
            {
                name: "silver",
                description: "银色",
                value: " #c0c0c0"
            },
            {
                name: "lightgray",
                description: "浅灰色",
                value: " #d3d3d3"
            },
            {
                name: "gainsboro",
                description: "淡灰色",
                value: " #dcdcdc"
            },
            {
                name: "white",
                description: "白色",
                value: " #ffffff"
            },
            {
                name: "black",
                description: "黑色",
                value: " #000000"
            },
            {
                name: "ivory",
                description: "象牙色",
                value: " #fffff0"
            },
            {
                name: "snow",
                description: "雪白色",
                value: " #fffafa"
            },
            {
                name: "ghostwhite",
                description: "幽灵白",
                value: " #f8f8ff"
            }
        ]
    },
    {
        type: "gradient-red",
        description: "红色系渐变",
        colors: [
            {
                name: "gradient-soft-peach",
                description: "柔和桃色渐变",
                value: [
                    " #ff9a9e",
                    " #fad0c4",
                ]
            },
            {
                name: "gradient-deep-rose",
                description: "深玫瑰渐变",
                value: [
                    " #ff8177",
                    " #cf556c",
                    " #b12a5b",
                ]
            },
            {
                name: "gradient-peach-glow",
                description: "桃光渐变",
                value: [
                    " #ff9a9e",
                    " #fecfef",
                ]
            },
            {
                name: "gradient-hot-pink",
                description: "热粉渐变",
                value: [
                    " #f093fb",
                    " #f5576c",
                ]
            },
            {
                name: "gradient-summer-joy",
                description: "夏日欢乐渐变",
                value: [
                    " #fa709a",
                    " #fee140",
                ]
            },
            {
                name: "gradient-rose-morning",
                description: "玫瑰晨光渐变",
                value: [
                    " #d299c2",
                    " #fef9d7",
                ]
            },
            {
                name: "gradient-passion-fire",
                description: "激情火焰渐变",
                value: [
                    " #a6c0fe",
                    " #f68084",
                ]
            },
            {
                name: "gradient-vivid-pink",
                description: "鲜艳粉红渐变",
                value: [
                    " #c471f5",
                    " #fa71cd",
                ]
            },
            {
                name: "gradient-coral-sunset",
                description: "珊瑚日落渐变",
                value: [
                    " #f78ca0",
                    " #f9748f",
                    " #fd868c",
                    " #fe9a8b",
                ]
            },
            {
                name: "gradient-fire-coral",
                description: "火珊瑚渐变",
                value: [
                    " #ff0844",
                    " #ffb199",
                ]
            },
            {
                name: "gradient-candy-pink",
                description: "糖果粉渐变",
                value: [
                    " #ff758c",
                    " #ff7eb3",
                ]
            },
            {
                name: "gradient-soft-blossom",
                description: "柔和花朵渐变",
                value: [
                    " #ddd6f3",
                    " #faaca8",
                ]
            },
            {
                name: "gradient-wine-blush",
                description: "酒红腮红渐变",
                value: [
                    " #c71d6f",
                    " #d09693",
                ]
            },
            {
                name: "gradient-hot-flame",
                description: "热焰渐变",
                value: [
                    " #f77062",
                    " #fe5196",
                ]
            },
            {
                name: "gradient-soft-cherry",
                description: "柔和樱桃渐变",
                value: [
                    " #ee9ca7",
                    " #ffdde1",
                ]
            },
            {
                name: "gradient-warm-coral",
                description: "暖珊瑚渐变",
                value: [
                    " #ed6ea0",
                    " #ec8c69",
                ]
            },
            {
                name: "gradient-peach-blush",
                description: "桃子腮红渐变",
                value: [
                    " #ffc3a0",
                    " #ffafbd",
                ]
            },
            {
                name: "gradient-pink-sky",
                description: "粉红天空渐变",
                value: [
                    " #e8198b",
                    " #c7eafd",
                ]
            },
            {
                name: "gradient-peach-cream",
                description: "桃子奶油渐变",
                value: [
                    " #f794a4",
                    " #fdd6bd",
                ]
            },
            {
                name: "gradient-pink-indigo",
                description: "粉红靛蓝渐变",
                value: [
                    " #ec77ab",
                    " #7873f5",
                ]
            },
            {
                name: "gradient-sky-magenta",
                description: "天空洋红渐变",
                value: [
                    " #B6CEE8",
                    " #F578DC",
                ]
            },
            {
                name: "gradient-morning-blush",
                description: "晨曦红晕渐变",
                value: [
                    " #9795f0",
                    " #fbc8d4",
                ]
            },
            {
                name: "gradient-royal-magenta",
                description: "皇家洋红渐变",
                value: [
                    " #cc208e",
                    " #6713d2",
                ]
            },
            {
                name: "gradient-pink-gold",
                description: "粉金渐变",
                value: [
                    " #e14fad",
                    " #f9d423",
                ]
            },
        ]
    },
    {
        type: "gradient-orange-yellow",
        description: "橙黄色系渐变",
        colors: [
            {
                name: "gradient-sunset",
                description: "日落渐变",
                value: [
                    " #f6d365",
                    " #fda085",
                ]
            },
            {
                name: "gradient-warm-flame",
                description: "暖焰渐变",
                value: [
                    " #ffecd2",
                    " #fcb69f",
                ]
            },
            {
                name: "gradient-magic-sunset",
                description: "魔幻日落渐变",
                value: [
                    " #fccb90",
                    " #d57eeb",
                ]
            },
            {
                name: "gradient-golden-beach",
                description: "金色沙滩渐变",
                value: [
                    " #fddb92",
                    " #d1fdff",
                ]
            },
            {
                name: "gradient-fire-amber",
                description: "火焰琥珀渐变",
                value: [
                    " #f83600",
                    " #f9d423",
                ]
            },
            {
                name: "gradient-sunset-fire",
                description: "日落火焰渐变",
                value: [
                    " #ff5858",
                    " #f09819",
                ]
            },
            {
                name: "gradient-orange-fire",
                description: "橙色火焰渐变",
                value: [
                    " #fc6076",
                    " #ff9a44",
                ]
            },
            {
                name: "gradient-sunset-glow",
                description: "日落余晖渐变",
                value: [
                    " #f9d423",
                    " #ff4e50",
                ]
            },
            {
                name: "gradient-lime-gold",
                description: "青柠金渐变",
                value: [
                    " #50cc7f",
                    " #f5d100",
                ]
            },
            {
                name: "gradient-jungle-day",
                description: "丛林日光渐变",
                value: [
                    " #16a085",
                    " #f4d03f",
                ]
            },
        ]
    },
    {
        type: "gradient-green",
        description: "绿色系渐变",
        colors: [
            {
                name: "gradient-fresh-grass",
                description: "新鲜草地渐变",
                value: [
                    " #d4fc79",
                    " #96e6a1",
                ]
            },
            {
                name: "gradient-aqua-splash",
                description: "水花渐变",
                value: [
                    " #84fab0",
                    " #8fd3f4",
                ]
            },
            {
                name: "gradient-emerald",
                description: "翡翠渐变",
                value: [
                    " #43e97b",
                    " #38f9d7",
                ]
            },
            {
                name: "gradient-fresh-lime",
                description: "新鲜青柠渐变",
                value: [
                    " #96fbc4",
                    " #f9f586",
                ]
            },
            {
                name: "gradient-aqua-marine",
                description: "海蓝宝石渐变",
                value: [
                    " #2af598",
                    " #009efd",
                ]
            },
            {
                name: "gradient-fresh-moss",
                description: "新鲜苔藓渐变",
                value: [
                    " #c1dfc4",
                    " #deecdd",
                ]
            },
            {
                name: "gradient-forest-green",
                description: "森林绿渐变",
                value: [
                    " #0ba360",
                    " #3cba92",
                ]
            },
            {
                name: "gradient-mint-blue",
                description: "薄荷蓝渐变",
                value: [
                    " #37ecba",
                    " #72afd3",
                ]
            },
            {
                name: "gradient-spring-grass",
                description: "春季草地渐变",
                value: [
                    " #92fe9d",
                    " #00c9ff",
                ]
            },
            {
                name: "gradient-mint-green",
                description: "薄荷绿渐变",
                value: [
                    " #b3ffab",
                    " #12fff7",
                ]
            },
            {
                name: "gradient-lime-mint",
                description: "青柠薄荷渐变",
                value: [
                    " #9be15d",
                    " #00e3ae",
                ]
            },
            {
                name: "gradient-fresh-meadow",
                description: "清新草地渐变",
                value: [
                    " #64b3f4",
                    " #c2e59c",
                ]
            },
            {
                name: "gradient-turquoise-lime",
                description: "绿松石青柠渐变",
                value: [
                    " #20E2D7",
                    " #F9FEA5",
                ]
            },
            {
                name: "gradient-aqua-teal",
                description: "水绿蓝渐变",
                value: [
                    " #96deda",
                    " #50c9c3",
                ]
            },
            {
                name: "gradient-spring-bloom",
                description: "春季绽放渐变",
                value: [
                    " #9890e3",
                    " #b1f4cf",
                ]
            },
        ]
    },
    {
        type: "gradient-blue",
        description: "蓝色系渐变",
        colors: [
            {
                name: "gradient-sky-blue",
                description: "天蓝渐变",
                value: [
                    " #a1c4fd",
                    " #c2e9fb",
                ]
            },
            {
                name: "gradient-deep-blue",
                description: "深蓝渐变",
                value: [
                    " #4facfe",
                    " #00f2fe",
                ]
            },
            {
                name: "gradient-deep-ocean",
                description: "深海渐变",
                value: [
                    " #30cfd0",
                    " #330867",
                ]
            },
            {
                name: "gradient-crystal-water",
                description: "水晶之水渐变",
                value: [
                    " #89f7fe",
                    " #66a6ff",
                ]
            },
            {
                name: "gradient-deep-blue-sea",
                description: "深蓝海洋渐变",
                value: [
                    " #00c6fb",
                    " #005bea",
                ]
            },
            {
                name: "gradient-ocean-blue",
                description: "海洋蓝渐变",
                value: [
                    " #16d9e3",
                    " #30c7ec",
                    " #46aef7",
                ]
            },
            {
                name: "gradient-blue-river",
                description: "蓝河渐变",
                value: [
                    " #e0c3fc",
                    " #8ec5fc",
                ]
            },
            {
                name: "gradient-turquoise-indigo",
                description: "青绿靛蓝渐变",
                value: [
                    " #74ebd5",
                    " #9face6",
                ]
            },
            {
                name: "gradient-electric-blue",
                description: "电光蓝渐变",
                value: [
                    " #b224ef",
                    " #7579ff",
                ]
            },
        ]
    },
    {
        type: "gradient-purple",
        description: "紫色系渐变",
        colors: [
            {
                name: "gradient-lavender-dream",
                description: "薰衣草梦境渐变",
                value: [
                    " #a18cd1",
                    " #fbc2eb",
                ]
            },
            {
                name: "gradient-cotton-candy",
                description: "棉花糖渐变",
                value: [
                    " #fad0c4",
                    " #ffd1ff",
                ]
            },
            {
                name: "gradient-fairy-dust",
                description: "仙尘渐变",
                value: [
                    " #fbc2eb",
                    " #a6c1ee",
                ]
            },
            {
                name: "gradient-soft-lilac",
                description: "柔和丁香渐变",
                value: [
                    " #fdcbf1",
                    " #e6dee9",
                ]
            },
            {
                name: "gradient-mint-lavender",
                description: "薄荷薰衣草渐变",
                value: [
                    " #5ee7df",
                    " #b490ca",
                ]
            },
            {
                name: "gradient-royal-purple",
                description: "皇家紫渐变",
                value: [
                    " #667eea",
                    " #764ba2",
                ]
            },
            {
                name: "gradient-lavender-mist",
                description: "薰衣草薄雾渐变",
                value: [
                    " #ebc0fd",
                    " #d9ded8",
                ]
            },
            {
                name: "gradient-soft-violet",
                description: "柔和紫罗兰渐变",
                value: [
                    " #cd9cf2",
                    " #f6f3ff",
                ]
            },
            {
                name: "gradient-electric-violet",
                description: "电光紫渐变",
                value: [
                    " #6a11cb",
                    " #2575fc",
                ]
            },
            {
                name: "gradient-royal-romance",
                description: "皇家浪漫渐变",
                value: [
                    " #7028e4",
                    " #e5b2ca",
                ]
            },
            {
                name: "gradient-cosmic-fusion",
                description: "宇宙融合渐变",
                value: [
                    " #b721ff",
                    " #21d4fd",
                ]
            },
            {
                name: "gradient-rich-orchid",
                description: "丰富兰花渐变",
                value: [
                    " #d783d9",
                    " #966fd6",
                ]
            },
            {
                name: "gradient-soft-lavender",
                description: "柔和薰衣草渐变",
                value: [
                    " #df89b5",
                    " #bfd9fe",
                ]
            },
        ]
    },
    {
        type: "gradient-rainbow",
        description: "彩虹/多彩渐变",
        colors: [
            {
                name: "gradient-rainbow-blend",
                description: "彩虹混合渐变",
                value: [
                    " #b8cbb8",
                    " #b465da",
                    " #cf6cc9",
                    " #ee609c",
                ]
            },
            {
                name: "gradient-royal-sunset",
                description: "皇家日落渐变",
                value: [
                    " #3b41c5",
                    " #a981bb",
                    " #ffc8a9",
                ]
            },
            {
                name: "gradient-pastel-rainbow",
                description: "粉彩彩虹渐变",
                value: [
                    " #2CD8D5",
                    " #C5C1FF",
                    " #FFBAC3",
                ]
            },
            {
                name: "gradient-neon-life",
                description: "霓虹生活渐变",
                value: [
                    " #00dbde",
                    " #fc00ff",
                ]
            },
            {
                name: "gradient-sweet-dream",
                description: "甜美梦境渐变",
                value: [
                    " #a8edea",
                    " #fed6e3",
                ]
            },
            {
                name: "gradient-pastel-dream",
                description: "粉彩梦境渐变",
                value: [
                    " #d9afd9",
                    " #97d9e1",
                ]
            },
            {
                name: "gradient-soft-dawn",
                description: "柔和黎明渐变",
                value: [
                    " #e9defa",
                    " #fbfcdb",
                ]
            },
            {
                name: "gradient-mint-rose",
                description: "薄荷玫瑰渐变",
                value: [
                    " #E3FDF5",
                    " #FFE6FA",
                ]
            },
            {
                name: "gradient-cream-beige",
                description: "奶油米色",
                value: [
                    " #FAF9F6",
                    " #FEFBF5",
                ]
            },
        ]
    },
    {
        type: "gradient-neutral",
        description: "中性/灰白色系渐变",
        colors: [
            {
                name: "gradient-cloud-light",
                description: "云光渐变",
                value: [
                    " #cfd9df",
                    " #e2ebf0",
                ]
            },
            {
                name: "gradient-clean-paper",
                description: "洁白纸张渐变",
                value: [
                    " #fdfbfb",
                    " #ebedee",
                ]
            },
            {
                name: "gradient-winter-sky",
                description: "冬日天空渐变",
                value: [
                    " #f5f7fa",
                    " #c3cfe2",
                ]
            },
            {
                name: "gradient-soft-linen",
                description: "柔软亚麻渐变",
                value: [
                    " #fdfcfb",
                    " #e2d1c3",
                ]
            },
            {
                name: "gradient-cloud-white",
                description: "云白渐变",
                value: [
                    " #dfe9f3",
                    " #ffffff",
                ]
            },
            {
                name: "gradient-pure-white",
                description: "纯净白渐变",
                value: [
                    " #FFFEFF",
                    " #D7FFFE",
                ]
            },
            {
                name: "gradient-olive-khaki",
                description: "橄榄卡其渐变",
                value: [
                    " #c1c161",
                    " #d4d4b1",
                ]
            },
        ]
    },
];

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* color_get()
****************************************************************************************************/
export function color_get(type,name) {
    let color = null;

    do
    {
        /* check */
        if (type == "" || name == "")
        {
            continue;
        }
        /* find */
        for (let i = 0; i < colorList.length; i++)
        {
            /* check type */
            if (colorList[i].type != type)
            {
                continue;
            }
            /* get color */
            const colors = colorList[i].colors;
            for (let j = 0; j < colors.length; j++)
            {
                /* check name */
                if (colors[j].name != name)
                {
                    continue;
                }
                /* get color */
                color = colors[j];
                break;
            }
        }
    }while(0);

    return (color);
}

/****************************************************************************************************
* color_list_get()
****************************************************************************************************/
export function color_list_get() {
    let list = [];

    do
    {
        /* copy list */
        list = colorList;
    }while(0);

    return (list);
}

/****************************************************************************************************
* File End!
****************************************************************************************************/