
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

/* database */
import { navigate_database_list,navigate_database_sticky_projects } from '../../database/navigate_database.js'

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* navigate_cfg_list */
export let navigate_cfg_list = navigate_database_list;

/* navigate_cfg_sticky_projects */
export const navigate_cfg_sticky_projects = navigate_database_sticky_projects;

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Navigate_Cfg_Category_Get()
****************************************************************************************************/
export function Navigate_Cfg_Category_Get(category) {
    return navigate_cfg_list.find(section => section.category === category);
}

/****************************************************************************************************
* Navigate_Cfg_Item_Search()
****************************************************************************************************/
export function Navigate_Cfg_Item_Search(activeCategory,searchTerm) {
    let items = [];

    do
    {
        /* check parameter */
        if(!activeCategory)
        {
            activeCategory = '全部'
        }
        /* get active category */
        items = Navigate_Cfg_Category_Get(activeCategory).item;
        /* check search term */
        if(!searchTerm)
        {
            continue;
        }
        /* filter search */
        items = items.filter(item =>
            /* name */
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            /* description */
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }while(0);

    return items;
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
