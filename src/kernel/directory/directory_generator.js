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
 * 2025-08-19     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* fs */
const fs = require('fs');
const { type } = require('os');
const path = require('path');

/****************************************************************************************************
* Define
****************************************************************************************************/

/* input folder */
const DIRECTORY_GENERATOR_INPUT_PATH = 'public';
/* output file */
const DIRECTORY_GENERATOR_OUTPUT_FILE = './src/database/directory_database.js';

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* directory */
let directoryInfoTree = {
    /* name */
    name: "root",
    /* type */
    type: "folder",
    /* path */
    path: DIRECTORY_GENERATOR_INPUT_PATH,
    /* description */
    description: "根目录",
    /* icon */
    icon: "📂",
    /* children */
    children: [],
};

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* directory_generator_scan()
****************************************************************************************************/
function directory_generator_scan(directoryTree,directory) {

    do
    {
        try {
            /* check folder */
            if (!fs.existsSync(directory))
            {
                continue;
            }
            /* get folder */
            const folders = fs.readdirSync(directory);
            folders.forEach(folder => {
                const folderPath = path.join(directory, folder);
                /* check is folder */
                const stats = fs.statSync(folderPath);
                if (stats.isDirectory())
                {
                    /* scan */
                    let directoryInfo = {
                        /* name */
                        name: folder,
                        /* type */
                        type: "folder",
                        /* path */
                        path: folderPath,
                        /* description */
                        description: "",
                        /* icon */
                        icon: "📂",
                        /* children */
                        children: [],
                    };
                    /* sub directory */
                    directory_generator_scan(directoryInfo,folderPath);
                    /* push */
                    directoryTree.children.push(directoryInfo);
                }
                if (stats.isFile()) 
                {
                    /* scan */
                    let directoryInfo = {
                        /* name */
                        name: folder,
                        /* type */
                        type: "file",
                        /* path */
                        path: folderPath,
                        /* description */
                        description: "",
                        /* icon */
                        icon: "📂",
                        /* children */
                        children: [],
                    };
                    /* push */
                    directoryTree.children.push(directoryInfo);
                }
            });
        } catch (error) {
            console.error('get folder error:', error);
        }

    }while(0);
}

/****************************************************************************************************
* directory_generator_create_database_info_layer()
****************************************************************************************************/
function directory_generator_create_database_info_layer(info,layer) {
    let newInfo = "";

    do
    {
        /* check parameter */
        if(layer < 0)
        {
            continue;
        }
        if(info == "")
        {
            continue;
        }
        /* get templete */
        let lines = info.split('\n');
        /* for each line */
        for(let i=0; i < lines.length; i++)
        {
            let line = lines[i];
            /* add layer */
            let tab = "    ".repeat(layer);
            line = tab + line;
            /* push */
            lines[i] = line + '\n';
        }
        /* combine */
        newInfo = lines.join('');
    }while(0);

    return newInfo;
}

/****************************************************************************************************
* directory_generator_create_database_info()
****************************************************************************************************/
function directory_generator_create_database_info(directoryTree,layer) {
    let directory_info = "";
    let directory_info_children = "";

    do
    {
        /* parent */
        directory_info += `\n\
{\n\
    /* ${directoryTree.name} */\n\
    name: "${directoryTree.name}",\n\
    type: "${directoryTree.type}",\n\
    path: "${directoryTree.path.replace(/\\/g,'/')}",\n\
    description: "${directoryTree.description}",\n\
    icon: "${directoryTree.icon}",\n\
    children: [\
        {{directory_info_children}}\
    ]\n\
}`;
        /* end */
        directory_info += (layer == 0) ? ";" : ",";
        /* children */
        for(let i=0; i < directoryTree.children.length; i++)
        {
            const child = directoryTree.children[i];
            /* check is folder */
            if(child.type == "folder")
            {
                /* add */
                directory_info_children += `${directory_generator_create_database_info(child,layer+1)}`;
            }
            else
            {
                /* add */
                directory_info_children += `${directory_generator_create_database_info(child,layer+1)}`;
            }
        }
        /* fill */
        directory_info = directory_info.replace("{{directory_info_children}}",directory_info_children);
        /* layer */
        directory_info = "\n\
/************************************************************************************************\n\
 * layer: " + layer + "\n"+"\
************************************************************************************************/" + directory_info;
        directory_info = directory_generator_create_database_info_layer(directory_info,layer > 0);
    }while(0);

    return directory_info;
}

/****************************************************************************************************
* directory_generator_create_database()
****************************************************************************************************/
function directory_generator_create_database(directoryTree) {
    let templete = "";
    
    do
    {
        /* get templete */
        const templetePath = path.join(__dirname, 'directory_generator_templete.js');
        /* read */
        templete = fs.readFileSync(templetePath, 'utf8');
        /* fill info */
        let directory_info = directory_generator_create_database_info(directoryTree,0);
        /* replace */
        templete = templete.replace("{{date}}", new Date().toISOString().replace('T', ' ').slice(0, 19));
        templete = templete.replace("{{directory_info}}",directory_info);
    }while(0);

    return templete;
}

/****************************************************************************************************
* main()
****************************************************************************************************/
function main() {

    do
    {
        /* scan */
        directory_generator_scan(directoryInfoTree,DIRECTORY_GENERATOR_INPUT_PATH);
        /* get content */
        const directoryContent = directory_generator_create_database(directoryInfoTree);
        /* generate */
        try {
            /* write */
            fs.writeFileSync(DIRECTORY_GENERATOR_OUTPUT_FILE, directoryContent, 'utf8');
        } catch (error) {
            console.error('写入目录树文件时出错:', error);
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
