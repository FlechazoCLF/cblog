
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
/* home (browser start page) */
import { Home } from './page/home/home';
/* components */
import { kernel_init,Kernel } from './kernel/kernel'
import { layout_init } from './layout/layout'
import { page_init } from './page/page'
import { cblog_route_init } from './route/route'
/* AppContext */
import { AppProvider } from './kernel/context/context';

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
		<Router>
			<AppProvider>
				<Routes>
					{/* home */}
					<Route path="/" element={<Home />} >
						{/* home */}
					</Route>
					{/* navigate */}
					<Route path="/navigate" element={<Navigate />}>
						{Navigate_Route()}
					</Route>
					{/* blog */}
					<Route path="/blog" element={<Blog />}>
						{Blog_Route()}
					</Route>
				</Routes>
				{/* kernel */}
				<Kernel />
			</AppProvider>
		</Router>
	);
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
