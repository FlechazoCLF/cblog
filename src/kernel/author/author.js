
/****************************************************************************************************
* File Start!
****************************************************************************************************/

/*
 *
 *  Copyright (c) 2024-2025 by flechazo. All rights reserved.
 *
 * Author : CarlChai LinFeng Chai flechazo
 * Website: flechazo.mba
 *
 * Change Logs:
 * Date           Author       Notes
 * 2025-08-27     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { createContext, useState, useEffect, useContext } from 'react';

/****************************************************************************************************
* Define
****************************************************************************************************/

/* info */
const AUTHOR_TOKEN_KEY = 'auth_token';
const AUTHOR_USER_NAME = 'flechazo';
const AUTHOR_USER_PASSWORD = 'clf20313';

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* context */
const Author_Context = createContext();
/* authorstate */
let Author_State = false;

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Author_State_Check()
****************************************************************************************************/
export function Author_State_Check()
{
    let result = false;

    do
    {
        /* get state */
        const token = sessionStorage.getItem(AUTHOR_TOKEN_KEY);
        if(!token)
        {
            Author_State = false;
            continue;
        }
        /* check token */
        if(token !== AUTHOR_USER_PASSWORD)
        {
            Author_State = false;
            continue;
        }
        /* update state */
        Author_State = true;
    }while(0);

    return result;
}

/****************************************************************************************************
* Author_Login()
****************************************************************************************************/
export function Author_Login(info, password)
{
    let result = false;

    do
    {
        /* check parameters */
        if(password === '')
        {
            /* show login windows */
            password = prompt('请输入密码' + info + ':');
        }
        /* check password */
        if (password !== AUTHOR_USER_PASSWORD)
        {
            result = false;
            alert('🚃密码错误!');
            continue;
        }
        /* login success */
        alert('登录成功👑!');
        sessionStorage.setItem(AUTHOR_TOKEN_KEY, password);
        /* set state */
        Author_State = true;
        result = true;
    }while(0);

    return result;
}

/****************************************************************************************************
* Author_Logout()
****************************************************************************************************/
export function Author_Logout()
{
    sessionStorage.removeItem(AUTHOR_TOKEN_KEY);
    Author_State = false;
    return ;
}

/****************************************************************************************************
* Author_Provider()
****************************************************************************************************/
export function Author_Provider({children})
{
    /* author */
    const [isAuthenticated, setIsAuthenticated] = useState(Author_State);

    /* check */
    useEffect(() => {
        /* check author */
        const author = Author_State_Check();
        if (author == true) {
            setIsAuthenticated(true);
        }
    }, []);
    /* login */
    const login = (info, password) => {
        let result = false;
        /* login */
        result = Author_Login(info, password);
        if(result == true)
        {
            /* set state */
            setIsAuthenticated(true);
        }
        /* return */
        return result;
    };
    /* logout */
    const logout = () => {
        Author_Logout();
        setIsAuthenticated(false);
    };
    /* return */
    return (
        <Author_Context.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </Author_Context.Provider>
    );
}

/****************************************************************************************************
* Author_Init()
****************************************************************************************************/
export function Author_Init()
{
    /* check */
    useEffect(() => {
        Author_State_Check();
    }, []);
    
    /* return */
    return (
        <>

        </>
    );
}

/****************************************************************************************************
* Author_Get()
****************************************************************************************************/
export function Author_Get()
{
    return Author_Context;
}

/****************************************************************************************************
* Author_State_Get()
****************************************************************************************************/
export function Author_State_Get()
{
    if(Author_State == false)
    {
        Author_State_Check();
    }
    return Author_State;
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
