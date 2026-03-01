
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
 * {{date}}     cc          Auto Generate Don't Edit!!!
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

/* database */
const directory_generator_database = {{directory_info}}

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* directory_generator_database_get()
****************************************************************************************************/
export function directory_generator_database_get() {
    return (directory_generator_database);
}

/****************************************************************************************************
* directory_generator_database_get_folder()
****************************************************************************************************/
export function directory_generator_database_get_folder(directory_database,folderPath) {
    let folder = null;
    let paths = folderPath.split("/");
    let currentFolder = directory_database;

    do
    {
        /* check folder path */
        if(folderPath === undefined || folderPath === null || folderPath == "")
        {
            continue;
        }
        /* get folder */
        let finded = false;
        for(let p = 0; p < paths.length; ++p)
        {
            /* clear flag */
            finded = false;
            /* if next layer */
            currentFolder = currentFolder.children;
            /* find */
            for(let i = 0; i < currentFolder.length; ++i)
            {
                if(currentFolder[i].name === paths[p])
                {
                    currentFolder = currentFolder[i];
                    finded = true;
                    break;
                }
            }
            /* check */
            if(finded === false)
            {
                /* not found */
                break;
            }
        }
        /* output */
        folder = currentFolder;
    }while(0);

    return folder;
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
