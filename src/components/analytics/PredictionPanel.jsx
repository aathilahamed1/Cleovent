import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useSimulation } from '../../context/SimulationContext';
import { generateRecommendations } from '../../data/mockData';
import { interventionTypes } from '../../data/mockData';
import './PredictionPanel.css';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const PredictionPanel = () => {
    const {
        totalEmissions,
        capturedCO2,
        emissionsReduction,
        zones,
        interventions,
        getZoneEmissions
    } = useSimulation();

    // Calculate emissions by zone type
    const emissionsByType = useMemo(() => {
        const byType = { residential: 0, commercial: 0, industrial: 0, traffic: 0 };
        zones.forEach(zone => {
            byType[zone.type] += getZoneEmissions(zone.id);
        });
        return byType;
    }, [zones, getZoneEmissions]);

    // Find highest emission type
    const highestEmissionType = Object.keys(emissionsByType).reduce((a, b) =>
        emissionsByType[a] > emissionsByType[b] ? a : b
    );

    const recommendations = generateRecommendations({ highestEmissionType });

    // Projection data
    const projectionData = useMemo(() => {
        const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'];
        const baseline = months.map(() => totalEmissions);
        const withInterventions = months.map((_, i) => {
            const reduction = capturedCO2 * (1 + i * 0.05); // Assume 5% improvement per month
            return Math.max(0, totalEmissions - reduction);
        });

        return {
            labels: months,
            datasets: [
                {
                    label: 'Baseline Emissions',
                    data: baseline,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.3
                },
                {
                    label: 'With Interventions',
                    data: withInterventions,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.3
                }
            ]
        };
    }, [totalEmissions, capturedCO2]);

    // Emissions by type chart
    const emissionsByTypeData = {
        labels: ['Residential', 'Commercial', 'Industrial', 'Traffic'],
        datasets: [
            {
                label: 'Emissions (t/day)',
                data: [
                    emissionsByType.residential,
                    emissionsByType.commercial,
                    emissionsByType.industrial,
                    emissionsByType.traffic
                ],
                backgroundColor: ['#93c5fd', '#fbbf24', '#f87171', '#94a3b8']
            }
        ]
    };

    // Cost effectiveness chart
    const costEffectivenessData = useMemo(() => {
        if (interventions.length === 0) return null;

        const data = interventionTypes.map(type => {
            const typeInterventions = interventions.filter(i => i.typeId === type.id);
            if (typeInterventions.length === 0) return 0;

            const totalCapture = typeInterventions.reduce((sum, int) => {
                return sum + type.baseCapacity * int.capacityMultiplier * type.efficiency;
            }, 0);

            const totalCost = typeInterventions.reduce((sum, int) => {
                return sum + (type.baseCost + type.maintenanceCost * 12) * int.capacityMultiplier;
            }, 0);

            return totalCost / (totalCapture * 365); // Cost per ton per year
        });

        return {
            labels: interventionTypes.map(t => t.name.split(' ')[0]), // Short names
            datasets: [
                {
                    label: 'Cost per Ton/Year ($)',
                    data: data,
                    backgroundColor: '#3b82f6'
                }
            ]
        };
    }, [interventions]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    };

    // Calculate annual metrics
    const annualCaptured = capturedCO2 * 365;
    const annualReduction = ((capturedCO2 / totalEmissions) * 100 * 365).toFixed(1);
    const airQualityImprovement = Math.min(emissionsReduction * 2, 100).toFixed(1);

    return (
        <div className="prediction-panel">
            <div className="panel-header">
                <h2>📈 Impact Analysis & Predictions</h2>
                <p>Analyze intervention effectiveness and projected outcomes</p>
            </div>

            {/* Before/After Comparison */}
            <div className="comparison-section">
                <div className="comparison-card before">
                    <div className="comparison-header">
                        <h3>❌ Before Interventions</h3>
                    </div>
                    <div className="comparison-stats">
                        <div className="comparison-stat">
                            <span className="stat-label">Daily Emissions</span>
                            <span className="stat-value large">{totalEmissions.toFixed(1)} t</span>
                        </div>
                        <div className="comparison-stat">
                            <span className="stat-label">Annual Emissions</span>
                            <span className="stat-value">{(totalEmissions * 365).toFixed(0)} t</span>
                        </div>
                        <div className="comparison-stat">
                            <span className="stat-label">CO₂ Captured</span>
                            <span className="stat-value">0 t</span>
                        </div>
                    </div>
                </div>

                <div className="comparison-arrow">→</div>

                <div className="comparison-card after">
                    <div className="comparison-header">
                        <h3>✅ After Interventions</h3>
                    </div>
                    <div className="comparison-stats">
                        <div className="comparison-stat">
                            <span className="stat-label">Daily Emissions</span>
                            <span className="stat-value large">{(totalEmissions - capturedCO2).toFixed(1)} t</span>
                        </div>
                        <div className="comparison-stat">
                            <span className="stat-label">Annual Reduction</span>
                            <span className="stat-value success">{emissionsReduction.toFixed(1)}%</span>
                        </div>
                        <div className="comparison-stat">
                            <span className="stat-label">CO₂ Captured/Year</span>
                            <span className="stat-value success">{annualCaptured.toFixed(0)} t</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon">📉</div>
                    <div className="metric-content">
                        <div className="metric-label">Emission Reduction</div>
                        <div className="metric-value">{emissionsReduction.toFixed(1)}%</div>
                        <div className="metric-detail">{capturedCO2.toFixed(1)} tons/day captured</div>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">🌬️</div>
                    <div className="metric-content">
                        <div className="metric-label">Air Quality Improvement</div>
                        <div className="metric-value">{airQualityImprovement}%</div>
                        <div className="metric-detail">Estimated AQI improvement</div>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">🌍</div>
                    <div className="metric-content">
                        <div className="metric-label">Carbon Captured (Annual)</div>
                        <div className="metric-value">{(annualCaptured / 1000).toFixed(1)}k</div>
                        <div className="metric-detail">tons per year</div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="charts-grid">
                <div className="chart-card">
                    <h3>Emission Projections (6 Months)</h3>
                    <div className="chart-container">
                        <Line data={projectionData} options={chartOptions} />
                    </div>
                </div>

                <div className="chart-card">
                    <h3>Emissions by Zone Type</h3>
                    <div className="chart-container">
                        <Doughnut data={emissionsByTypeData} options={chartOptions} />
                    </div>
                </div>

                {costEffectivenessData && interventions.length > 0 && (
                    <div className="chart-card full-width">
                        <h3>Cost Effectiveness Analysis</h3>
                        <div className="chart-container">
                            <Bar data={costEffectivenessData} options={chartOptions} />
                        </div>
                    </div>
                )}
            </div>

            {/* Recommendations */}
            <div className="recommendations-section">
                <h3>💡 Strategic Recommendations</h3>
                <div className="recommendations-grid">
                    {recommendations.map((rec, idx) => (
                        <div key={idx} className={`recommendation-card priority-${rec.priority}`}>
                            <div className="rec-header">
                                <span className={`priority-badge ${rec.priority}`}>
                                    {rec.priority.toUpperCase()}
                                </span>
                                <h4>{rec.title}</h4>
                            </div>
                            <p className="rec-description">{rec.description}</p>
                            <div className="rec-details">
                                <div className="rec-detail">
                                    <span className="detail-label">Impact:</span>
                                    <span className="detail-value">{rec.estimatedReduction}</span>
                                </div>
                                <div className="rec-detail">
                                    <span className="detail-label">Cost:</span>
                                    <span className="detail-value">{rec.cost}</span>
                                </div>
                                <div className="rec-detail">
                                    <span className="detail-label">Timeframe:</span>
                                    <span className="detail-value">{rec.timeframe}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PredictionPanel;
