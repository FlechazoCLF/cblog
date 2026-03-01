
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

/* route */
import { BrowserRouter as Router, Routes, Route, Outlet, useParams } from 'react-router-dom';
/* layout */
import { Topbar } from '../../layout/topbar/topbar'
import { Footer } from '../../layout/footer/footer'
import { Sidebar } from '../../layout/sidebar/sidebar'
import { Hoverball } from '../../layout/hoverball/hoverball'
/* components */
import { About } from '../about/about';
import { Categorize, CategorizeDetail } from '../categorize/categorize';
import { Article } from '../article/article';
import { Articlelist } from '../articlelist/articlelist';
import { Csay } from '../csay/csay';
import { Project } from '../project/project';
import { Friend } from '../friend/friend';
import { Wonderful } from '../wonderful/wonderful';
import { Wonderful_chat } from '../wonderful/wonderful_chat/wonderful_chat';
import { Wonderful_cook } from '../wonderful/wonderful_cook/wonderful_cook';
import { Wonderful_emerge } from '../wonderful/wonderful_emerge/wonderful_emerge';
import { Wonderful_english } from '../wonderful/wonderful_english/wonderful_english';
import { Wonderful_love } from '../wonderful/wonderful_love/wonderful_love';
import { Wonderful_map } from '../wonderful/wonderful_map/wonderful_map';
import { Wonderful_calendar } from '../wonderful/wonderful_calendar/wonderful_calendar';
import{ Navigate_Show,Navigate_Show_Sticky,Navigate_Show_Donate } from '../navigate/navigate';

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
* Navigate_Show_Image()
****************************************************************************************************/
function Navigate_Show_Image() {

    do
    {

    }while(0);

    return (
        <div 
            style={{
                /* position */
                position: 'relative',
                top: '-400px',
            }}
        >
            {/* banner */}
            <img
                src={process.env.PUBLIC_URL + '/images/wallpaper/02.png'}
                style={{ 
                    /* layout */
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    width: '100vw',
                    height: '100vh',
                    /* style */
                    borderRadius: 8,
                    /* 渐变透明效果 */
                    mask: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                    WebkitMask: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                }}
            />
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Title()
****************************************************************************************************/
function Navigate_Show_Title() {

    do
    {

    }while(0);

    return (
        <div>
            {/* title */}
            <div
                style={{
                    /* layout */
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    /* style */
                    color: ' #FFFFFF',
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    textShadow: '0 4px 16px #000a',
                    letterSpacing: 4,
                }}
                /* mouse */
                onMouseOver={e => {
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.35)';
                    e.currentTarget.textContent = '爱你呦💝';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                    e.currentTarget.textContent = 'flechazo';
                }}
            >
                flechazo
            </div>
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Sidebar()
****************************************************************************************************/
function Navigate_Show_Sidebar() {

    do
    {

    }while(0);

    return (
        <div>
            <Sidebar></Sidebar>
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Hoverball()
****************************************************************************************************/
function Navigate_Show_Hoverball() {

    do
    {

    }while(0);

    return (
        <div>
            <Hoverball></Hoverball>
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Content()
****************************************************************************************************/
function Navigate_Show_Content() {

    do
    {

    }while(0);

    return (
        <div 
            style={{
                /* layout */
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Outlet />
        </div>
    );
}

/****************************************************************************************************
* Navigate_Show_Content_Holder()
****************************************************************************************************/
function Navigate_Show_Content_Holder() {

    do
    {

    }while(0);

    return (
        <div 
            style={{
                /* layout */
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* friend */}
            <Friend></Friend>
            {/* sticky */}
            <Navigate_Show_Sticky></Navigate_Show_Sticky>
            {/* categorize */}
            <Categorize></Categorize>
            {/* donate */}
            <Navigate_Show_Donate></Navigate_Show_Donate>
        </div>
    );
}

/****************************************************************************************************
* Blog_Show()
****************************************************************************************************/
function Blog_Show() {

    do
    {

    }while(0);

    return (
        <div>
            <div>
                {/* images */}
                {Navigate_Show_Image()}
                {/* title */}
                {Navigate_Show_Title()}
            </div>
            <div 
                style={{ 
                    /* layout */
                    display: 'flex',
                    minHeight: '80vh',
                    /* position */
                    position: 'relative',
                    margin: '-512px auto auto auto',
                    /* style */
                }}
            >
                {/* sidebar */}
                {Navigate_Show_Sidebar()}
                {/* content */}
                {Navigate_Show_Content()}
            </div>
            <div>
                {Navigate_Show_Hoverball()}
            </div>
        </div>
    );
}

/****************************************************************************************************
* Blog()
****************************************************************************************************/
export function Blog() {

    do
    {

    }while(0);

    return (
        <div>
            {/* top bar */}
            {Topbar()}
            {/* content */}
            {Blog_Show()}
            {/* footer */}
            {Footer()}
        </div>
    );
}

/****************************************************************************************************
* Blog_Route()
****************************************************************************************************/
export function Blog_Route() {

    do
    {

    }while(0);

    return (
        <>
          <Route index element={<Navigate_Show_Content_Holder></Navigate_Show_Content_Holder>} />
          <Route path="about" element={<About></About>} />
          <Route path="category" element={<Categorize></Categorize>} />
          <Route path="category/:category" element={<CategorizeDetail></CategorizeDetail>} />
          <Route path="articles/:category/:article" element={<Article></Article>} />
          <Route path="articlelist" element={<Articlelist></Articlelist>} />
          <Route path="csay" element={<Csay></Csay>} />
          <Route path="project" element={<Project></Project>} />
          <Route path="wonderful" element={<Wonderful></Wonderful>} />
          <Route path="wonderful_chat" element={<Wonderful_chat></Wonderful_chat>} />
          <Route path="wonderful_cook" element={<Wonderful_cook></Wonderful_cook>} />
          <Route path="wonderful_emerge" element={<Wonderful_emerge></Wonderful_emerge>} />
          <Route path="wonderful_english" element={<Wonderful_english></Wonderful_english>} />
          <Route path="wonderful_love" element={<Wonderful_love></Wonderful_love>} />
          <Route path="wonderful_map" element={<Wonderful_map></Wonderful_map>} />
          <Route path="wonderful_calendar" element={<Wonderful_calendar></Wonderful_calendar>} />
          <Route path="friend" element={<Friend></Friend>} />
        </>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
