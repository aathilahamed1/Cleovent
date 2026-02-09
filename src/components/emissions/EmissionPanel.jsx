import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import './EmissionPanel.css';

const EmissionPanel = () => {
    const {
        emissionFactors,
        updateEmissionFactor,
        zones,
        totalEmissions,
        windDirection,
        setWindDirection,
        windSpeed,
        setWindSpeed
    } = useSimulation();

    const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    const getEmissionsByType = (type) => {
        return zones
            .filter(zone => zone.type === type)
            .reduce((sum, zone) => sum + zone.baseline_co2 * emissionFactors[type], 0);
    };

    const emissionSources = [
        {
            type: 'transport',
            label: 'Transport',
            icon: '🚗',
            description: 'Traffic density & vehicle emissions',
            color: '#94a3b8'
        },
        {
            type: 'industry',
            label: 'Industry',
            icon: '🏭',
            description: 'Factories & power plants',
            color: '#f87171'
        },
        {
            type: 'residential',
            label: 'Residential',
            icon: '🏠',
            description: 'Household energy consumption',
            color: '#93c5fd'
        },
        {
            type: 'commercial',
            label: 'Commercial',
            icon: '🏢',
            description: 'Office buildings & businesses',
            color: '#fbbf24'
        }
    ];

    return (
        <div className="emission-panel">
            <div className="panel-header">
                <h2>📊 Emission Modeling & Simulation</h2>
                <p>Adjust emission factors to simulate different scenarios</p>
            </div>

            <div className="emission-grid">
                {/* Emission Sources */}
                <div className="emission-sources">
                    <h3>Emission Sources</h3>

                    {emissionSources.map(source => (
                        <div key={source.type} className="source-card">
                            <div className="source-header">
                                <div className="source-title">
                                    <span className="source-icon">{source.icon}</span>
                                    <div>
                                        <h4>{source.label}</h4>
                                        <p className="source-desc">{source.description}</p>
                                    </div>
                                </div>
                                <div className="source-emissions">
                                    {Math.round(getEmissionsByType(source.type))} t/day
                                </div>
                            </div>

                            <div className="slider-control">
                                <div className="slider-header">
                                    <label>Emission Factor</label>
                                    <span className="slider-value">{(emissionFactors[source.type] * 100).toFixed(0)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="0.1"
                                    value={emissionFactors[source.type]}
                                    onChange={(e) => updateEmissionFactor(source.type, parseFloat(e.target.value))}
                                    className="slider"
                                    style={{
                                        background: `linear-gradient(to right, ${source.color} 0%, ${source.color} ${emissionFactors[source.type] * 50}%, var(--color-neutral-200) ${emissionFactors[source.type] * 50}%, var(--color-neutral-200) 100%)`
                                    }}
                                />
                                <div className="slider-labels">
                                    <span>0%</span>
                                    <span>100%</span>
                                    <span>200%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Environmental Conditions */}
                <div className="environmental-controls">
                    <h3>Environmental Conditions</h3>

                    {/* Wind Direction */}
                    <div className="control-card">
                        <h4>💨 Wind Direction</h4>
                        <div className="wind-compass">
                            {windDirections.map(dir => (
                                <button
                                    key={dir}
                                    className={`wind-dir-btn ${windDirection === dir ? 'active' : ''}`}
                                    onClick={() => setWindDirection(dir)}
                                    style={{
                                        gridArea: dir.toLowerCase()
                                    }}
                                >
                                    {dir}
                                </button>
                            ))}
                            <div className="compass-center">
                                <div className="compass-needle" style={{
                                    transform: `rotate(${windDirections.indexOf(windDirection) * 45}deg)`
                                }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Wind Speed */}
                    <div className="control-card">
                        <h4>🌬️ Wind Speed</h4>
                        <div className="slider-control">
                            <div className="slider-header">
                                <label>Speed</label>
                                <span className="slider-value">{windSpeed} m/s</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                step="1"
                                value={windSpeed}
                                onChange={(e) => setWindSpeed(parseInt(e.target.value))}
                                className="slider"
                            />
                            <div className="slider-labels">
                                <span>Calm</span>
                                <span>Moderate</span>
                                <span>Strong</span>
                            </div>
                        </div>
                    </div>

                    {/* Total Summary */}
                    <div className="control-card summary-card">
                        <h4>Total Emissions</h4>
                        <div className="total-value">{Math.round(totalEmissions)} t/day</div>
                        <div className="total-breakdown">
                            {emissionSources.map(source => {
                                const value = getEmissionsByType(source.type);
                                const percentage = ((value / totalEmissions) * 100).toFixed(1);
                                return (
                                    <div key={source.type} className="breakdown-row">
                                        <span className="breakdown-label">{source.icon} {source.label}</span>
                                        <span className="breakdown-value">{percentage}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmissionPanel;
