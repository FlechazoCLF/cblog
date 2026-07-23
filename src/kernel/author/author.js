
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
/* SHA-256 hash of the actual password */
const AUTHOR_PASSWORD_HASH = 'b807f4e66fc37ce226a2727560d44b0da8e21006a1e9554502690e4903318f57';

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
* Author_CalcHash()
****************************************************************************************************/
async function Author_CalcHash(password)
{
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

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
        /* check token — compare stored hash with expected hash */
        if(token !== AUTHOR_PASSWORD_HASH)
        {
            Author_State = false;
            continue;
        }
        /* update state */
        Author_State = true;
        result = true;
    }while(0);

    return result;
}

/****************************************************************************************************
* Author_Login()
****************************************************************************************************/
export async function Author_Login(info, password)
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
        /* hash user input and compare with stored hash */
        const inputHash = await Author_CalcHash(password);
        if (inputHash !== AUTHOR_PASSWORD_HASH)
        {
            result = false;
            alert('🚃密码错误!');
            continue;
        }
        /* login success */
        alert('登录成功👑!');
        sessionStorage.setItem(AUTHOR_TOKEN_KEY, inputHash);
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
    const login = async (info, password) => {
        let result = false;
        /* login */
        result = await Author_Login(info, password);
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
    Author_State_Check();

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
