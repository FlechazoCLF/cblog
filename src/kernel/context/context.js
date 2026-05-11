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
 * 2026-05-07     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* context */
import { createContext, useContext, useState, useRef } from 'react'

/* components */
/* router */
import { useNavigate } from 'react-router-dom'

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* cblog context */
const AppContext = createContext(null)

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* AppProvider()
****************************************************************************************************/
export const AppProvider = ({ children }) => {
    /* all app context */
    /*
        theme: light | dark                      -> control theme
        navigate: url                            -> control navigate page/article
        author: author info                      -> control author info
        search: search query                     -> control search query
        notify: notify info                      -> control notify info
        highlight: highlight id                  -> control highlight id
        modal: modal info                        -> control modal info
        chat: chat info                          -> control chat info
    */
    const navigate = useNavigate();
    const [theme, setTheme]               = useState('light');
    const [author, setAuthor]             = useState(null)
    const [search, setSearch]             = useState('')
    const [notify, setNotify]             = useState([])
    const [highlight, setHighlight]       = useState(null)
    const [modal, setModal]               = useState(null)
    const [chat, setChat]                 = useState(null)

    return (
        <AppContext.Provider value={{
            /* all state */
            theme, author, search, notify, highlight, modal, chat,
            /* setter */
            setTheme, setAuthor, setSearch, setNotify, setHighlight, setModal, setChat,
            /* router */
            navigate,
        }}>
            {children}
        </AppContext.Provider>
    )
}

/* export */
export const useAppContext = () => useContext(AppContext)

/****************************************************************************************************
* File End!
****************************************************************************************************/