
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
 * 2026-07-22     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useEffect, useMemo, useRef } from 'react';

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
* Carousel()
****************************************************************************************************/
export function Carousel({ items, interval = 5000, vertical = true, pauseOnHover = true, manual = true, height = 96, viewportStyle = {} }) {
    const [index, setIndex] = useState(0);
    const [animate, setAnimate] = useState(true);
    const pausedRef = useRef(false);
    const indexRef = useRef(0);
    useEffect(() => { indexRef.current = index; }, [index]);

    /* step cycle */
    const step = (dir) => {
        const prev = indexRef.current;
        let n = prev + dir;
        let snapped = false;
        if (n >= items.length) { n = 0; snapped = true; }
        else if (n < 0) { n = items.length - 1; snapped = true; }
        setAnimate(!snapped);
        setIndex(n);
        if (snapped) {
            /* snap */
            requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
        }
    };

    /* click switch item */
    const onClick = (e) => {
        if (manual != true) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const isLeft = x < rect.width / 2;
        const isTop = y < rect.height / 2;
        if (isLeft || isTop) step(-1);
        else step(1);
    };

    /* auto play */
    useEffect(() => {
        const t = setInterval(() => { if (!pausedRef.current) step(1); }, interval);
        return () => clearInterval(t);
        // eslint-disable-next-line
    }, [interval]);

    return (
        <div 
            style={{ 
                /* layout */ 
                width: '100%' 
            }}
        >
            <div
                onClick={onClick}
                style={{
                    /* layout */
                    width: '100%', 
                    height: height, 
                    overflow: 'hidden',
                    /* style */
                    cursor: 'pointer',
                    ...viewportStyle,
                }}
                onMouseEnter={pauseOnHover ? () => { pausedRef.current = true; } : undefined}
                onMouseLeave={pauseOnHover ? () => { pausedRef.current = false; } : undefined}
            >
                <div 
                    style={{
                        /* layout */
                        willChange: 'transform',
                        display: vertical ? 'block' : 'flex',
                        flexDirection: vertical ? undefined : 'row',
                        transform: vertical ? `translateY(${-index * height}px)` : `translateX(${-index * 100}%)`,
                        /* style */
                        transition: animate ? 'transform 0.6s ease' : 'none',
                    }}
                >
                    {items.map((node, i) => (
                        <div 
                            key={i} 
                            style={
                                vertical ? { 
                                    /* layout */ 
                                    height: height, 
                                    overflow: 'hidden' 
                                } : { 
                                    /* layout */ 
                                    width: '100%', 
                                    height: height, 
                                    overflow: 'hidden', 
                                    flexShrink: 0 
                                }
                            }
                        >
                            {node}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
