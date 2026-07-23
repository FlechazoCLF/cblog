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
 * 2025-08-16     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useEffect } from 'react';
/* file */
import { kernel_file_read } from '../../../kernel/file/kernel_file';
/* config */
import { wonderful_emerge_cfg_info } from './wonderful_emerge_cfg';
/* theme */
import { useTheme } from '../../../kernel/theme/theme'
/* directory static import */
/* import { directory_generator_database_get,directory_generator_database_get_folder } from '../../../database/directory_database'; */

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
* Wonderful_emerge_navigation()
****************************************************************************************************/
function Wonderful_emerge_navigation({selectedPath, setSelectedPath}) {
    const theme = useTheme();
    return (
        <div 
            style={{
                /* layout */
                display: 'flex',
                alignItems: 'center',
                padding: '10px 0',
                marginBottom: '20px',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                /* style */
                borderBottom: `1px solid ${theme.total.borderSecondary}`,
            }}
        >
            {/* root */}
            <span 
                style={{
                    /* layout */
                    padding: '4px 8px',
                    /* style */
                    color: selectedPath.length === 0 ? theme.total.info : theme.total.textDisabled,
                    cursor: 'pointer',
                    borderRadius: '4px',
                    backgroundColor: selectedPath.length === 0 ? theme.total.primaryUltraLight : 'transparent'
                }}
                onClick={() => setSelectedPath([])}
            >
                根目录
            </span>
            {/* path */}
            {selectedPath.map((folder, index) => (
                <React.Fragment key={folder.id}>
                    <span 
                        style={{ 
                            /* layout */
                            margin: '0 8px',
                            /* style */
                            color: theme.total.textDisabled
                        }}
                    >
                        /
                    </span>
                    <span 
                        style={{
                            /* layout */
                            padding: '4px 8px',
                            /* style */
                            color: index === selectedPath.length - 1 ?  theme.total.info : theme.total.textDisabled,
                            cursor: 'pointer',
                            borderRadius: '4px',
                            backgroundColor: index === selectedPath.length - 1 ?  theme.total.primaryUltraLight : 'transparent'
                        }}
                        onClick={() => setSelectedPath(selectedPath.slice(0, index + 1))}
                    >
                        {folder}
                    </span>
                </React.Fragment>
            ))}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_emerge_header()
****************************************************************************************************/
function Wonderful_emerge_header({selectedPath,setSelectedPath,handleGoBack}) {
    const theme = useTheme();
    return (
        <div 
            style={{ 
                /* layout */
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px',
                /* style */
            }}
        >
            <div>
                {/* title */}
                <h2 
                    style={{ 
                        /* layout */
                        marginBottom: '5px',
                        /* style */
                        color: theme.total.text,
                    }}
                >
                    架构设计工具
                </h2>
                {/* description */}
                <p 
                    style={{ 
                        /* layout */
                        /* style */
                        color: theme.total.textDisabled, 
                        fontSize: '14px'
                    }}
                >
                    通过分层展开的方式浏览复杂的架构设计。点击卡片查看详细内容和子目录。
                </p>
            </div>
            {/* go back */}
            {selectedPath.length > 0 && (
                <button 
                    onClick={() => handleGoBack(selectedPath,setSelectedPath)}
                    style={{
                        /* layout */
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '8px 16px',
                        /* style */
                        backgroundColor: theme.total.progressBg,
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        color: theme.total.text,
                        fontWeight: 'bold',
                        boxShadow: theme.total.shadowSm
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.total.borderSecondary;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = theme.total.progressBg;
                    }}
                >
                    <span 
                        style={{ 
                            /* layout */
                            /* style */
                            fontSize: '18px'
                        }}
                    >
                        ←↩️
                    </span>
                    <span>
                        返回上一级
                    </span>
                </button>
            )}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_emerge_cards_column()
****************************************************************************************************/
function Wonderful_emerge_cards_column({cards,selectedPath,setSelectedPath,handleSelectFolder}) {
    const theme = useTheme();
    let currentColumn = [];
    let currentCards = [];
    let columns = [];

    do
    {
        /* check parameter */
        if(((cards == "") || (cards == null) || (cards == undefined)) ||
           ((selectedPath == "") || (selectedPath == null) || (selectedPath == undefined)))
        {
            continue;
        }
        /* get current cards array */
        currentCards = cards;
        /* first column */
        for(let i = 0; i < currentCards.length; i++)
        {
            /* push */
            currentColumn.push({
                /* name */
                name:currentCards[i].name,
                /* description */
                description:currentCards[i].description,
                /* icon */
                icon:currentCards[i].icon,
                /* path */
                path:currentCards[i].path,              
            });
        }
        /* store column */
        columns.push(currentColumn);
        currentColumn = [];
        /* for each selectedPath */
        for(let i = 1; i < selectedPath.length; i++)
        {
            /* add cards */
            for(let j = 0; j < currentCards.length; j++)
            {
                /* check children */
                if(currentCards[j].name != selectedPath[i])
                {
                    continue;
                }
                /* get children */
                currentCards = currentCards[j].children;
                /* push */
                for(let c = 0; c < currentCards.length; c++)
                {
                    currentColumn.push({
                        /* name */
                        name:currentCards[c].name,
                        /* description */
                        description:currentCards[c].description,
                        /* icon */
                        icon:currentCards[c].icon,
                        /* path */
                        path:currentCards[c].path,                
                    });
                }
                /* break then next path */
                break;
            }
            /* store column */
            columns.push(currentColumn);
            currentColumn = [];
        }
    }while(0);
    
    return (
        <div 
            style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '10px',
            }}
        >
            {columns.map((columnCards, columnIndex) => (
                <div key={columnIndex} style={{ minWidth: '200px' }}>
                    {/* 这里渲染每一列的卡片 */}
                    {columnCards.map((card, cardIndex) => (
                        <div key={cardIndex} style={{ 
                            padding: '10px', 
                            margin: '5px 0',
                            border: `1px solid ${theme.total.textDisabled}`,
                            borderRadius: '8px'
                        }}
                        onClick={() => handleSelectFolder(selectedPath,setSelectedPath,columnIndex,card.name)}

                        >
                            <div>{card.name}</div>
                            <div>{card.description}</div>
                            {/* 根据需要添加更多卡片内容 */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

/****************************************************************************************************
* Wonderful_emerge_cards()
****************************************************************************************************/
function Wonderful_emerge_cards({cards,selectedPath,setSelectedPath,handleSelectFolder}) {

    do{
        /* check parameter */
        if((cards == "") || (cards == null) || (cards == undefined))
        {
            continue;
        }
        if(selectedPath == "")
        {
            selectedPath = ["root"];
        }
    }while(0);
    
    return (
        <div
            style={{
                /* layout */
                display: 'flex',
                overflowX: 'auto',
                gap: '10px',
                padding: '10px 0',
                position: 'relative',
                minHeight: '400px',
                /* style */
            }}
        >
            {/* map by selectedPath */}
            <Wonderful_emerge_cards_column cards={cards} selectedPath={selectedPath} setSelectedPath={setSelectedPath} handleSelectFolder={handleSelectFolder} />
        </div>
    );
}

/****************************************************************************************************
* Wonderful_emerge_getCards()
****************************************************************************************************/
async function Wonderful_emerge_getCards(selectedPath) {

    let cards = [];
    let folder = {};
    const { directory_generator_database_get, directory_generator_database_get_folder } = await import('../../../database/directory_database');

    do{
        /* check parameter */
        if((selectedPath == "") || (selectedPath == null) || (selectedPath == undefined))
        {
            selectedPath = ["架构设计"];
        }
        /* get base folder */
        folder = directory_generator_database_get();
        /* check folder */
        if((folder == "") || (folder == null) || (folder == undefined))
        {
            continue;
        }
        /* get folder */
        folder = directory_generator_database_get_folder(folder,`articles/架构设计`);
        /* check */
        if(folder == null)
        {
            continue;
        }
        /* add cards */
        for (let i = 0; i < folder.children.length; i++)
        {
            cards.push(folder.children[i]);
        }
        /* check cards */
        /* do nothing */
    }while(0);

    return cards;
}

/****************************************************************************************************
* Wonderful_emerge_selectFolder()
****************************************************************************************************/
function Wonderful_emerge_selectFolder(selectedPath,setSelectedPath,columnIndex,folder) {

    let newPath = [];
    let depth = 0;

    do
    {
        /* check parameter */
        if(((selectedPath == "") || (selectedPath == null) || (selectedPath == undefined)) ||
            ((setSelectedPath == "") || (setSelectedPath == null) || (setSelectedPath == undefined)) ||
            ((folder == "") || (folder == null) || (folder == undefined)))
        {
            continue;
        }
        /* handle folder selection */
        depth = columnIndex + 1;
        /* truncate path after current depth and add new selected folder */
        newPath = [...selectedPath.slice(0, depth), folder];
        /* update state */
        setSelectedPath(newPath);
    }while(0);
}

/****************************************************************************************************
* Wonderful_emerge_selectBack()
****************************************************************************************************/
function Wonderful_emerge_selectBack(selectedPath, setSelectedPath) {

    let newPath = [];
    let depth = 0;

    do
    {
        /* check parameter */
        if(((selectedPath == "") || (selectedPath == null) || (selectedPath == undefined)) ||
            ((setSelectedPath == "") || (setSelectedPath == null) || (setSelectedPath == undefined)))
        {
            continue;
        }
        /* handle folder selection */
        depth = selectedPath.length;
        if(depth <= 0)
        {
            continue;
        }
        /* truncate path after current depth and add new selected folder */
        newPath = [...selectedPath.slice(0, depth - 1)];
        /* update state */
        setSelectedPath(newPath);
    }while(0);
}

/****************************************************************************************************
* Wonderful_emerge()
****************************************************************************************************/
export function Wonderful_emerge() {
    const theme = useTheme();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    /* selected folder path */
    const [selectedPath, setSelectedPath] = useState(["root"]);
    /* calculate columns based on current selected path */
    useEffect(() => {
        let alive = true;
        setLoading(true);
        Wonderful_emerge_getCards(selectedPath).then((c) => {
            if (alive) { setCards(c); setLoading(false); }
        });
        return () => { alive = false; };
    }, [selectedPath]);

    /* loading */
    if (loading) {
        return (
            <div style={{ width: '90%', padding: '24px', borderRadius: '32px', minHeight: '400px' }}>
                loading...
            </div>
        );
    }

    /* load complete */
    return (
        <div 
            style={{
                /* layout */
                width: '90%',
                padding: '24px',
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
            {/* header */}
            <Wonderful_emerge_header selectedPath={selectedPath} setSelectedPath={setSelectedPath} handleGoBack={Wonderful_emerge_selectBack} />
            {/* navigation */}
            <Wonderful_emerge_navigation selectedPath={selectedPath} setSelectedPath={setSelectedPath} />
            {/* cards */}
            <Wonderful_emerge_cards cards={cards} selectedPath={selectedPath} setSelectedPath={setSelectedPath} handleSelectFolder={Wonderful_emerge_selectFolder} />
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/