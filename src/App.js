
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

import './App.css';
/* route */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/* page */
import { Navigate , Navigate_Route } from './page/navigate/navigate';
import { Blog , Blog_Route } from './page/blog/blog';
/* components */
import { kernel_init } from './kernel/kernel'
import { layout_init } from './layout/layout'
import { page_init } from './page/page'
import { cblog_route_init } from './route/route'
/* author */
import { Author_Provider } from './kernel/author/author';

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
* App()
****************************************************************************************************/
export default function App() {
  /* init */
  /* kernel init */
  kernel_init();
  /* layout init */
  layout_init();
  /* page init */
  page_init();
  /* route init */
  cblog_route_init();
  /* display */
  return (
    <Author_Provider>
      <Router>
        <Routes>
          {/* root navigate */}
          <Route path="/" element={<Navigate />}>
            {Navigate_Route()}
          </Route>
          {/* blog */}
          <Route path="/blog" element={<Blog />}>
            {Blog_Route()}
          </Route>
        </Routes>
      </Router>
    </Author_Provider>
  );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
