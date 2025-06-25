// Charts and Ecosystem Visualization Setup for Angel Connect Presentation
// Optimized for performance

let chartsInitialized = false;
let ecosystemInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize when needed to improve performance
    initializeChartsOnDemand();
});

function initializeChartsOnDemand() {
    // Initialize charts only when their slides become visible
    document.addEventListener('slideChanged', function(event) {
        const slideNumber = event.detail.slideNumber;
        
        // Initialize ecosystem diagram on slide 4
        if (slideNumber === 4 && !ecosystemInitialized && typeof d3 !== 'undefined') {
            setTimeout(() => setupEcosystemDiagram(), 200);
            ecosystemInitialized = true;
        }
        
        // Initialize charts on slides 7, 10, 11
        if ([7, 10, 11].includes(slideNumber) && !chartsInitialized && typeof Chart !== 'undefined') {
            setTimeout(() => setupCharts(), 200);
            chartsInitialized = true;
        }
    });
}

// Chart.js Setup for various charts
function setupCharts() {
    // Sector Distribution Chart (Slide 7) - Fixed size
    const sectorCtx = document.getElementById('sectorChart');
    if (sectorCtx) {
        // Set fixed canvas size
        sectorCtx.width = 400;
        sectorCtx.height = 200;
        sectorCtx.style.maxWidth = '400px';
        sectorCtx.style.maxHeight = '200px';
        
        new Chart(sectorCtx, {
            type: 'doughnut',
            data: {
                labels: ['AI/ML', 'FinTech', 'E-commerce', 'Другие'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        '#0066FF',
                        '#22C55E', 
                        '#F59E0B',
                        '#6B7280'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                animation: {
                    duration: 800
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Inter',
                                size: 11
                            },
                            usePointStyle: true,
                            padding: 15
                        }
                    }
                }
            }
        });
    }

    // Revenue Projections Chart (Slide 10) - Fixed size
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        // Set fixed canvas size
        revenueCtx.width = 500;
        revenueCtx.height = 250;
        revenueCtx.style.maxWidth = '500px';
        revenueCtx.style.maxHeight = '250px';
        
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['2025', '2026', '2027', '2028', '2029'],
                datasets: [
                    {
                        label: 'Портфельные выходы',
                        data: [150, 400, 750, 1200, 2500],
                        backgroundColor: '#0066FF',
                        borderRadius: 4
                    },
                    {
                        label: 'Плата за программы',
                        data: [100, 150, 200, 250, 300],
                        backgroundColor: '#22C55E',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                animation: {
                    duration: 1000
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                family: 'Inter',
                                size: 11
                            },
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': $' + context.parsed.y + 'k';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 10
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 10
                            },
                            callback: function(value) {
                                return '$' + value + 'k';
                            }
                        }
                    }
                }
            }
        });
    }

    // Funds Breakdown Pie Chart (Slide 11) - Fixed size
    const fundsCtx = document.getElementById('fundsChart');
    if (fundsCtx) {
        // Set fixed canvas size
        fundsCtx.width = 280;
        fundsCtx.height = 280;
        fundsCtx.style.maxWidth = '280px';
        fundsCtx.style.maxHeight = '280px';
        
        new Chart(fundsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Операции и команда', 'Инфраструктура', 'Инвестиционный капитал'],
                datasets: [{
                    data: [50, 30, 20],
                    backgroundColor: [
                        '#22C55E',
                        '#0066FF', 
                        '#F59E0B'
                    ],
                    borderWidth: 0,
                    cutout: '60%'
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                animation: {
                    duration: 800
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Inter',
                                size: 10
                            },
                            usePointStyle: true,
                            padding: 12
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '% ($' + 
                                       (context.parsed * 6) + 'k)';
                            }
                        }
                    }
                }
            }
        });
    }
}

// D3.js Ecosystem Diagram (Slide 4) - Optimized and fixed size
function setupEcosystemDiagram() {
    const container = d3.select('#ecosystem-chart');
    if (container.empty()) return;

    // Clear any existing content
    container.selectAll('*').remove();

    const width = 700;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('max-width', '700px')
        .style('max-height', '300px')
        .style('width', '100%')
        .style('height', 'auto');

    // Create gradient definitions
    const defs = svg.append('defs');
    
    const gradient = defs.append('linearGradient')
        .attr('id', 'ecosystem-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', 0)
        .attr('x2', width).attr('y2', height);
    
    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#0066FF')
        .attr('stop-opacity', 0.1);
    
    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#22C55E')
        .attr('stop-opacity', 0.1);

    // Background
    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'url(#ecosystem-gradient)');

    // Define ecosystem components
    const components = [
        {
            id: 'startups',
            label: 'Стартапы ЦА',
            x: 100,
            y: 200,
            color: '#22C55E',
            icon: '🚀'
        },
        {
            id: 'incubator',
            label: 'Инкубатор',
            x: 250,
            y: 150,
            color: '#0066FF',
            icon: '🏢'
        },
        {
            id: 'angel-club',
            label: 'Angel Club',
            x: 400,
            y: 120,
            color: '#0066FF',
            icon: '👼'
        },
        {
            id: 'mena-investors',
            label: 'MENA Инвесторы',
            x: 550,
            y: 150,
            color: '#F59E0B',
            icon: '💰'
        },
        {
            id: 'mena-markets',
            label: 'Рынки MENA',
            x: 700,
            y: 200,
            color: '#F59E0B',
            icon: '🌍'
        },
        {
            id: 'government',
            label: 'Гос. поддержка',
            x: 250,
            y: 280,
            color: '#6B7280',
            icon: '🏛️'
        },
        {
            id: 'mentors',
            label: 'Менторы',
            x: 400,
            y: 250,
            color: '#6B7280',
            icon: '🎓'
        }
    ];

    // Define connections
    const connections = [
        { source: 'startups', target: 'incubator', type: 'flow' },
        { source: 'incubator', target: 'angel-club', type: 'flow' },
        { source: 'angel-club', target: 'mena-investors', type: 'bridge' },
        { source: 'mena-investors', target: 'mena-markets', type: 'flow' },
        { source: 'government', target: 'incubator', type: 'support' },
        { source: 'mentors', target: 'incubator', type: 'support' },
        { source: 'mentors', target: 'angel-club', type: 'support' }
    ];

    // Create connections
    const connectionGroup = svg.append('g').attr('class', 'connections');
    
    connections.forEach(conn => {
        const source = components.find(c => c.id === conn.source);
        const target = components.find(c => c.id === conn.target);
        
        const line = connectionGroup.append('line')
            .attr('x1', source.x)
            .attr('y1', source.y)
            .attr('x2', target.x)
            .attr('y2', target.y)
            .attr('stroke', conn.type === 'bridge' ? '#FF6B6B' : 
                          conn.type === 'support' ? '#6B7280' : '#0066FF')
            .attr('stroke-width', conn.type === 'bridge' ? 4 : 2)
            .attr('stroke-dasharray', conn.type === 'support' ? '5,5' : 'none')
            .attr('opacity', 0.7);

        // Add arrow markers for flow connections
        if (conn.type === 'flow' || conn.type === 'bridge') {
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const angle = Math.atan2(dy, dx);
            const length = Math.sqrt(dx * dx + dy * dy);
            
            const arrowX = source.x + (length - 30) * Math.cos(angle);
            const arrowY = source.y + (length - 30) * Math.sin(angle);
            
            connectionGroup.append('polygon')
                .attr('points', '0,-5 10,0 0,5')
                .attr('fill', conn.type === 'bridge' ? '#FF6B6B' : '#0066FF')
                .attr('transform', `translate(${arrowX},${arrowY}) rotate(${angle * 180 / Math.PI})`);
        }
    });

    // Create component nodes
    const nodeGroup = svg.append('g').attr('class', 'nodes');
    
    components.forEach(component => {
        const node = nodeGroup.append('g')
            .attr('class', 'ecosystem-node')
            .attr('transform', `translate(${component.x},${component.y})`);

        // Outer glow circle
        node.append('circle')
            .attr('r', 35)
            .attr('fill', component.color)
            .attr('opacity', 0.2);

        // Main circle
        node.append('circle')
            .attr('r', 25)
            .attr('fill', '#FFFFFF')
            .attr('stroke', component.color)
            .attr('stroke-width', 3);

        // Icon
        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('font-size', '20px')
            .text(component.icon);

        // Label
        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '50px')
            .attr('font-family', 'Inter, sans-serif')
            .attr('font-size', '12px')
            .attr('font-weight', '600')
            .attr('fill', '#1A1A1A')
            .text(component.label);

        // Hover effects
        node.style('cursor', 'pointer')
            .on('mouseover', function() {
                d3.select(this).select('circle:nth-child(2)')
                    .transition()
                    .duration(200)
                    .attr('r', 30);
            })
            .on('mouseout', function() {
                d3.select(this).select('circle:nth-child(2)')
                    .transition()
                    .duration(200)
                    .attr('r', 25);
            });
    });

    // Add title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'Poppins, sans-serif')
        .attr('font-size', '18px')
        .attr('font-weight', '600')
        .attr('fill', '#1A1A1A')
        .text('Экосистема Angel Connect');

    // Add legend
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(50, ${height - 80})`);

    const legendItems = [
        { color: '#0066FF', label: 'Основной поток', type: 'solid' },
        { color: '#FF6B6B', label: 'MENA мост', type: 'solid' },
        { color: '#6B7280', label: 'Поддержка', type: 'dashed' }
    ];

    legendItems.forEach((item, i) => {
        const legendItem = legend.append('g')
            .attr('transform', `translate(${i * 120}, 0)`);

        legendItem.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 20)
            .attr('y2', 0)
            .attr('stroke', item.color)
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', item.type === 'dashed' ? '3,3' : 'none');

        legendItem.append('text')
            .attr('x', 25)
            .attr('y', 4)
            .attr('font-family', 'Inter, sans-serif')
            .attr('font-size', '10px')
            .attr('fill', '#6B7280')
            .text(item.label);
    });

    // Animate nodes entrance
    nodeGroup.selectAll('.ecosystem-node')
        .style('opacity', 0)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200)
        .style('opacity', 1)
        .attr('transform', function() {
            const currentTransform = d3.select(this).attr('transform');
            return currentTransform;
        });

    // Animate connections
    connectionGroup.selectAll('line')
        .attr('stroke-dasharray', function() {
            const length = this.getTotalLength();
            return length + ' ' + length;
        })
        .attr('stroke-dashoffset', function() {
            return this.getTotalLength();
        })
        .transition()
        .duration(2000)
        .delay(1000)
        .attr('stroke-dashoffset', 0)
        .on('end', function() {
            // Remove dash array for solid lines
            const currentDash = d3.select(this).attr('stroke-dasharray');
            if (!currentDash.includes('5,5')) {
                d3.select(this).attr('stroke-dasharray', 'none');
            }
        });
}

// Update progress fill when slide changes
function updateProgressFill(currentSlide, totalSlides) {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const progressPercent = (currentSlide / totalSlides) * 100;
        progressFill.style.width = `${progressPercent}%`;
    }
}

// Reinitialize charts when slides become visible
document.addEventListener('slideChanged', function(event) {
    const currentSlide = event.detail.slideNumber;
    
    // Reinitialize ecosystem diagram on slide 4
    if (currentSlide === 4) {
        setTimeout(() => {
            if (typeof d3 !== 'undefined') {
                setupEcosystemDiagram();
            }
        }, 100);
    }
    
    // Update any specific chart animations based on slide
    if (currentSlide === 7 || currentSlide === 10 || currentSlide === 11) {
        setTimeout(() => {
            // Trigger chart animations
            const charts = Chart.getChart ? Chart.instances : Chart.charts;
            if (charts) {
                Object.values(charts).forEach(chart => {
                    if (chart && chart.update) {
                        chart.update('active');
                    }
                });
            }
        }, 300);
    }
});

// CSS for ecosystem diagram styling
const ecosystemStyles = `
<style>
.ecosystem-chart-container {
    width: 100%;
    margin: 32px 0;
    padding: 20px;
    background: #F8FAFF;
    border-radius: 16px;
    border: 1px solid rgba(26, 26, 26, 0.1);
}

.ecosystem-description {
    margin-top: 32px;
}

.ecosystem-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
    margin-top: 24px;
}

.feature-item {
    background: white;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(26, 26, 26, 0.1);
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.feature-icon {
    font-size: 24px;
    margin-bottom: 8px;
    display: block;
}

.feature-item h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #1A1A1A;
}

.feature-item p {
    font-size: 14px;
    color: #6B7280;
    line-height: 1.4;
}

.ecosystem-node {
    transition: all 0.3s ease;
}

.ecosystem-node:hover {
    filter: drop-shadow(0 4px 12px rgba(0, 102, 255, 0.3));
}

@media (max-width: 768px) {
    .ecosystem-features {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }
    
    .feature-item {
        padding: 16px;
    }
}
</style>
`;

// Inject the styles
document.head.insertAdjacentHTML('beforeend', ecosystemStyles);