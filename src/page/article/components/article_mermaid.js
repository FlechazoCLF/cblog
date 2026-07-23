
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
 * 2025-08-02     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useEffect, useRef } from 'react';
/* mermaid */
/* import mermaid from 'mermaid'; */
/* theme */
import { useTheme } from '../../../kernel/theme/theme'

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* mermaid */
let mermaid = null;

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Article_Mermaid_Import()
****************************************************************************************************/
async function Article_Mermaid_Import() {
    if (!mermaid) mermaid = (await import('mermaid')).default;
    return mermaid;
}

/****************************************************************************************************
* Article_Mermaid_Init()
****************************************************************************************************/
export async function Article_Mermaid_Init() {

    do
    {
        /* import mermaid */
        await Article_Mermaid_Import();
        /* mermaid init */
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: 'default',
            dompurify: { USE_PROFILES: { svg: true } }
        });
    }while(0);

    return (
        <div>

        </div>
    );
}

/****************************************************************************************************
* Article_Mermaid()
****************************************************************************************************/
export function Article_Mermaid({ chart }) {
    const ref = useRef(null);
    const id = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);
    const hasRendered = useRef(false);
    const svgRef = useRef(null);
    const isDragging = useRef(false);
    const lastPosition = useRef({ x: 0, y: 0 });
    const scale = useRef(1);
    const isFullscreen = useRef(false);
    const theme = useTheme();

    /* mouse */
    /* drag */
    const handleMouseDown = (e) => {
        /* left key */
        if (e.button === 0)
        {
            isDragging.current = true;
            lastPosition.current = { x: e.clientX, y: e.clientY };
            e.preventDefault();
        }
        /* right key or middle key, do nothing */
    };
    const handleMouseUp = () => {
        isDragging.current = false;
    };
    /* move */
    const handleMouseMove = (e) => {
        /* check if dragging and svg exists */
        if (!isDragging.current || !svgRef.current) return;

        /* calculate movement delta */
        const dx = e.clientX - lastPosition.current.x;
        const dy = e.clientY - lastPosition.current.y;

        /* update viewBox position */
        const viewBox = svgRef.current.viewBox.baseVal;
        viewBox.x -= dx / scale.current;
        viewBox.y -= dy / scale.current;

        /* update last position */
        lastPosition.current = { x: e.clientX, y: e.clientY };
        e.preventDefault();
    };
    /* zoom */
    const handleWheel = (e) => {
        /* check if svg exists */
        if (!svgRef.current) return;
        
        e.preventDefault();
        /* calculate zoom factor */
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale.current *= delta;
        
        /* get mouse position in svg */
        const svgRect = svgRef.current.getBoundingClientRect();
        const mouseX = e.clientX - svgRect.left;
        const mouseY = e.clientY - svgRect.top;
        
        /* calculate viewBox coordinates */
        const viewBox = svgRef.current.viewBox.baseVal;
        const mouseViewBoxX = viewBox.x + (mouseX / svgRect.width) * viewBox.width;
        const mouseViewBoxY = viewBox.y + (mouseY / svgRect.height) * viewBox.height;
        
        /* adjust viewBox to keep mouse position fixed */
        viewBox.x = mouseViewBoxX - (mouseX / svgRect.width) * viewBox.width / delta;
        viewBox.y = mouseViewBoxY - (mouseY / svgRect.height) * viewBox.height / delta;
        viewBox.width /= delta;
        viewBox.height /= delta;
    };

    /* fullscreen */
    const toggleFullscreen = () => {
        /* get container element */
        const container = ref.current;
        if (!container) return;

        /* enter fullscreen */
        if (!isFullscreen.current) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
        } else {
            /* exit fullscreen */
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        /* toggle fullscreen state */
        isFullscreen.current = !isFullscreen.current;
    };

    /* fullscreen change listener */
    useEffect(() => {
        /* handle fullscreen state change */
        const handleFullscreenChange = () => {
            /* convert to bool */
            isFullscreen.current = !!document.fullscreenElement;
        };

        /* add event listeners */
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        /* cleanup */
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        if (!ref.current || !chart?.trim()) return;

        const renderChart = async () => {
            try {
                /* Avoid duplicate rendering */
                if (hasRendered.current) return;
                hasRendered.current = true;
            
                /* Clear previous chart */
                ref.current.innerHTML = '';
            
                /* Use already imported mermaid */
                /* Ensure mermaid is initialized with improved configuration */
                await mermaid.initialize({
                    startOnLoad: false,
                    securityLevel: 'loose',
                    theme: 'default',
                    flowchart: { 
                        useMaxWidth: false,
                        diagramPadding: 10,
                        htmlLabels: true,
                        curve: 'basis'
                    },
                    sequence: { 
                        useMaxWidth: false,
                        diagramMarginX: 0,
                        diagramMarginY: 0
                    },
                    gitGraph: {
                        useMaxWidth: false,
                        diagramPadding: 10
                    },
                    gantt: {
                        useMaxWidth: false
                    },
                    pie: {
                        useMaxWidth: false,
                        textPosition: 0.5,
                        labelPosition: 'outside',
                        pieStrokeWidth: 2,
                        pieOuterStrokeWidth: 5,
                        useWidth: true
                    },
                    dompurify: { USE_PROFILES: { svg: true } },
                    wrap: true,
                    fontFamily: 'inherit',
                    fontSize: 16,
                    logLevel: 3
                });
            
                /* Render chart */
                const { svg } = await mermaid.render(id.current, chart);
                if (ref.current) {
                    ref.current.innerHTML = svg;
                    /* get svg element */
                    const svgElement = ref.current.querySelector('svg');
                    if (svgElement) {
                        svgRef.current = svgElement;
                        
                        /* get svg content size */
                        const gElement = svgElement.querySelector('g');
                        if (gElement) {
                            const bbox = gElement.getBBox();
                            
                            /* set viewBox to contain entire chart */
                            svgElement.setAttribute('viewBox', `${bbox.x - 20} ${bbox.y - 20} ${bbox.width + 40} ${bbox.height + 40}`);
                            
                            /* remove fixed dimensions */
                            svgElement.removeAttribute('width');
                            svgElement.removeAttribute('height');
                            
                            /* set styles to fill container */
                            svgElement.style.width = '100%';
                            svgElement.style.height = '100%';
                            svgElement.style.display = 'block';
                            svgElement.style.margin = '0';
                            svgElement.style.padding = '0';

                            /* calculate initial scale to fit the chart */
                            const containerWidth = ref.current.clientWidth - 20;
                            const containerHeight = ref.current.clientHeight - 20;
                            const scaleX = containerWidth / (bbox.width + 40);
                            const scaleY = containerHeight / (bbox.height + 40);

                            scale.current = Math.min(scaleX, scaleY, 1);

                            /* apply initial scale */
                            const initialViewBox = svgElement.viewBox.baseVal;
                            const centerX = bbox.x + bbox.width / 2;
                            const centerY = bbox.y + bbox.height / 2;
                            
                            initialViewBox.width = containerWidth / scale.current;
                            initialViewBox.height = containerHeight / scale.current;
                            initialViewBox.x = centerX - initialViewBox.width / 2;
                            initialViewBox.y = centerY - initialViewBox.height / 2;

                            /* add event listeners */
                            svgElement.addEventListener('mousedown', handleMouseDown);
                            svgElement.addEventListener('mousemove', handleMouseMove);
                            svgElement.addEventListener('mouseup', handleMouseUp);
                            svgElement.addEventListener('mouseleave', handleMouseUp);
                            svgElement.addEventListener('wheel', handleWheel, { passive: false });
                            
                            /* add double-click fullscreen */
                            svgElement.addEventListener('dblclick', toggleFullscreen);
                        }
                        if (!gElement.innerHTML.trim()) {
                            console.log('Mermaid pie chart rendering failed, implementing custom pie chart');
                            
                            // 解析原始图表数据
                            const pieData = [];
                            const lines = chart.split('\n');
                            let title = '';
                            
                            // 提取标题和数据
                            lines.forEach(line => {
                                const titleMatch = line.match(/title\s+(.+)/);
                                if (titleMatch) {
                                    title = titleMatch[1];
                                }
                                
                                const dataMatch = line.match(/"([^"]+)"\s*:\s*(\d+\.?\d*)/);
                                if (dataMatch) {
                                    pieData.push({
                                        name: dataMatch[1],
                                        value: parseFloat(dataMatch[2])
                                    });
                                }
                            });
                            
                            // 如果找到数据，创建自定义饼图
                            if (pieData.length > 0) {
                                // 计算总和
                                const total = pieData.reduce((sum, item) => sum + item.value, 0);
                                
                                // 设置饼图参数
                                const centerX = 200;
                                const centerY = 200;
                                const radius = 150;
                                const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'];
                                
                                // 创建SVG元素
                                let svgContent = `<g transform="translate(${centerX}, ${centerY})">`;
                                
                                // 添加标题
                                if (title) {
                                    svgContent += `<text x="0" y="-${radius + 20}" text-anchor="middle" font-size="20" font-weight="bold">${title}</text>`;
                                }
                                
                                // 绘制饼图扇区
                                let startAngle = 0;
                                let legendY = radius + 40;
                                
                                pieData.forEach((item, index) => {
                                    const percentage = item.value / total;
                                    const endAngle = startAngle + percentage * 2 * Math.PI;
                                    
                                    // 计算扇区路径
                                    const x1 = radius * Math.cos(startAngle);
                                    const y1 = radius * Math.sin(startAngle);
                                    const x2 = radius * Math.cos(endAngle);
                                    const y2 = radius * Math.sin(endAngle);
                                    
                                    // 确定是否是大弧（大于180度）
                                    const largeArcFlag = percentage > 0.5 ? 1 : 0;
                                    
                                    // 创建扇区路径
                                    const path = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                                    
                                    // 添加扇区
                                    const color = colors[index % colors.length];
                                    svgContent += `<path d="${path}" fill="${color}" stroke="white" stroke-width="2"></path>`;
                                    
                                    // 计算标签位置（在扇区中间）
                                    const labelAngle = startAngle + (endAngle - startAngle) / 2;
                                    const labelRadius = radius * 0.7;
                                    const labelX = labelRadius * Math.cos(labelAngle);
                                    const labelY = labelRadius * Math.sin(labelAngle);
                                    
                                    // 添加百分比标签
                                    const percentText = `${(percentage * 100).toFixed(1)}%`;
                                    svgContent += `<text x="${labelX}" y="${labelY}" text-anchor="middle" fill="white" font-weight="bold">${percentText}</text>`;
                                    
                                    // 添加图例
                                    svgContent += `<rect x="-${radius}" y="${legendY}" width="15" height="15" fill="${color}"></rect>`;
                                    svgContent += `<text x="-${radius - 10}" y="${legendY + 12}" text-anchor="end" font-size="14">${item.value}</text>`;
                                    svgContent += `<text x="-${radius - 20}" y="${legendY + 12}" text-anchor="start" font-size="14">${item.name}</text>`;
                                    
                                    legendY += 25;
                                    startAngle = endAngle;
                                });
                                
                                svgContent += '</g>';
                                gElement.innerHTML = svgContent;
                                
                                // 调整视图框以适应内容
                                const svgElement = svgRef.current;
                                if (svgElement) {
                                    const bbox = gElement.getBBox();
                                    svgElement.setAttribute('viewBox', `${bbox.x - 20} ${bbox.y - 20} ${bbox.width + 40} ${bbox.height + 40}`);
                                }
                                
                                console.log('Custom pie chart rendered successfully');
                            } else {
                                // 如果没有找到数据，显示错误消息
                                gElement.innerHTML = '<text x="50" y="50" fill="red">无法解析饼图数据</text>';
                            }
                        }

                    }
                    
                    /* add fullscreen button */
                    const fullscreenButton = document.createElement('button');
                    fullscreenButton.textContent = '全屏';
                    fullscreenButton.style.position = 'absolute';
                    fullscreenButton.style.top = '10px';
                    fullscreenButton.style.right = '10px';
                    fullscreenButton.style.zIndex = '100';
                    fullscreenButton.style.padding = '5px 10px';
                    fullscreenButton.style.backgroundColor = theme.total.surfaceHover;
                    fullscreenButton.style.border = `1px solid ${theme.total.border}`;
                    fullscreenButton.style.borderRadius = '4px';
                    fullscreenButton.style.cursor = 'pointer';
                    fullscreenButton.addEventListener('click', toggleFullscreen);
                    
                    ref.current.style.position = 'relative';
                    ref.current.appendChild(fullscreenButton);
                }
            } catch (error) {
                console.error('Mermaid rendering failed:', error);
                if (ref.current) {
                    ref.current.textContent = '图表渲染失败，请检查语法';
                }
            }
        };

        renderChart();

        /* Reset render flag and clean up event listeners when chart changes */
        return () => {
            hasRendered.current = false;
            if (svgRef.current) {
                /* remove event listeners */
                svgRef.current.removeEventListener('mousedown', handleMouseDown);
                svgRef.current.removeEventListener('mousemove', handleMouseMove);
                svgRef.current.removeEventListener('mouseup', handleMouseUp);
                svgRef.current.removeEventListener('mouseleave', handleMouseUp);
                svgRef.current.removeEventListener('wheel', handleWheel);
                svgRef.current.removeEventListener('dblclick', toggleFullscreen);
            }
        };
    }, [chart]);

    return (
        <div 
            ref={ref} 
            style={{
                width: '100%',
                height: '400px',
                overflow: 'hidden',
                padding: '10px',
                boxSizing: 'border-box',
                backgroundColor: theme.total.background,
                position: 'relative'
            }} 
        />
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
