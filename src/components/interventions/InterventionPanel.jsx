import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { interventionTypes } from '../../data/mockData';
import './InterventionPanel.css';

const InterventionPanel = () => {
    const {
        zones,
        interventions,
        addIntervention,
        removeIntervention,
        getTotalCost
    } = useSimulation();

    const [selectedType, setSelectedType] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [capacityMultiplier, setCapacityMultiplier] = useState(1.0);

    const handleAddIntervention = () => {
        if (selectedType && selectedZone) {
            addIntervention(selectedType.id, selectedZone.id, capacityMultiplier);
            setCapacityMultiplier(1.0);
        }
    };

    const getInterventionDetails = (intervention) => {
        const type = interventionTypes.find(t => t.id === intervention.typeId);
        const zone = zones.find(z => z.id === intervention.zoneId);
        return { type, zone };
    };

    const costs = getTotalCost();

    const getZonesByType = (type) => {
        if (!type || !type.bestFor) return zones;
        return zones.filter(zone => type.bestFor.includes(zone.type));
    };

    return (
        <div className="intervention-panel">
            <div className="panel-header">
                <h2>🌿 Carbon Capture Interventions</h2>
                <p>Deploy and manage carbon capture solutions across the city</p>
            </div>

            <div className="intervention-grid">
                {/* Add New Intervention */}
                <div className="add-intervention-section">
                    <h3>Deploy New Intervention</h3>

                    {/* Step 1: Select Intervention Type */}
                    <div className="deployment-step">
                        <h4>Step 1: Select Intervention Type</h4>
                        <div className="type-grid">
                            {interventionTypes.map(type => (
                                <div
                                    key={type.id}
                                    className={`type-card ${selectedType?.id === type.id ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedType(type);
                                        setSelectedZone(null);
                                    }}
                                >
                                    <div className="type-icon">{type.icon}</div>
                                    <h5>{type.name}</h5>
                                    <p className="type-description">{type.description}</p>
                                    <div className="type-stats">
                                        <div className="stat-item">
                                            <span className="stat-label">Capacity</span>
                                            <span className="stat-value">{type.baseCapacity} t/day</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Cost</span>
                                            <span className="stat-value">${(type.baseCost / 1000).toFixed(0)}k</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Efficiency</span>
                                            <span className="stat-value">{(type.efficiency * 100).toFixed(0)}%</span>
                                        </div>
                                    </div>
                                    <div className="type-best-for">
                                        <strong>Best for:</strong> {type.bestFor.join(', ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Select Zone */}
                    {selectedType && (
                        <div className="deployment-step fade-in">
                            <h4>Step 2: Select Deployment Zone</h4>
                            <select
                                className="select"
                                value={selectedZone?.id || ''}
                                onChange={(e) => {
                                    const zone = zones.find(z => z.id === e.target.value);
                                    setSelectedZone(zone);
                                }}
                            >
                                <option value="">-- Select a zone --</option>
                                {getZonesByType(selectedType).map(zone => (
                                    <option key={zone.id} value={zone.id}>
                                        {zone.name} ({zone.type})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Step 3: Configure Capacity */}
                    {selectedType && selectedZone && (
                        <div className="deployment-step fade-in">
                            <h4>Step 3: Configure Capacity</h4>
                            <div className="slider-control">
                                <div className="slider-header">
                                    <label>Capacity Multiplier</label>
                                    <span className="slider-value">{capacityMultiplier.toFixed(1)}x</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="3"
                                    step="0.1"
                                    value={capacityMultiplier}
                                    onChange={(e) => setCapacityMultiplier(parseFloat(e.target.value))}
                                    className="slider"
                                />
                                <div className="capacity-preview">
                                    <div className="preview-row">
                                        <span>Actual Capacity:</span>
                                        <strong>{(selectedType.baseCapacity * capacityMultiplier * selectedType.efficiency).toFixed(1)} t/day</strong>
                                    </div>
                                    <div className="preview-row">
                                        <span>Installation Cost:</span>
                                        <strong>${((selectedType.baseCost * capacityMultiplier) / 1000).toFixed(0)}k</strong>
                                    </div>
                                    <div className="preview-row">
                                        <span>Monthly Maintenance:</span>
                                        <strong>${((selectedType.maintenanceCost * capacityMultiplier) / 1000).toFixed(1)}k</strong>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary btn-lg"
                                onClick={handleAddIntervention}
                                style={{ width: '100%', marginTop: 'var(--space-lg)' }}
                            >
                                Deploy Intervention
                            </button>
                        </div>
                    )}
                </div>

                {/* Active Interventions */}
                <div className="active-interventions-section">
                    <h3>Active Interventions ({interventions.length})</h3>

                    {interventions.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">🌱</div>
                            <p>No interventions deployed yet</p>
                            <p className="empty-hint">Select an intervention type to get started</p>
                        </div>
                    ) : (
                        <>
                            {/* Cost Summary */}
                            <div className="cost-summary-card">
                                <h4>💰 Total Investment</h4>
                                <div className="cost-row">
                                    <span>Initial Cost:</span>
                                    <strong className="cost-value">${(costs.initial / 1000).toFixed(0)}k</strong>
                                </div>
                                <div className="cost-row">
                                    <span>Monthly Maintenance:</span>
                                    <strong className="cost-value">${(costs.monthly / 1000).toFixed(1)}k</strong>
                                </div>
                                <div className="cost-row total">
                                    <span>Annual Cost:</span>
                                    <strong className="cost-value">${((costs.initial + costs.monthly * 12) / 1000).toFixed(0)}k</strong>
                                </div>
                            </div>

                            {/* Intervention List */}
                            <div className="intervention-list">
                                {interventions.map(intervention => {
                                    const { type, zone } = getInterventionDetails(intervention);
                                    if (!type || !zone) return null;

                                    const actualCapacity = type.baseCapacity * intervention.capacityMultiplier * type.efficiency;

                                    return (
                                        <div key={intervention.id} className="intervention-card">
                                            <div className="intervention-header">
                                                <div className="intervention-title">
                                                    <span className="intervention-icon">{type.icon}</span>
                                                    <div>
                                                        <h5>{type.name}</h5>
                                                        <p className="intervention-zone">{zone.name}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    className="btn-remove"
                                                    onClick={() => removeIntervention(intervention.id)}
                                                    title="Remove intervention"
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            <div className="intervention-stats">
                                                <div className="stat-row">
                                                    <span>Capturing:</span>
                                                    <strong>{actualCapacity.toFixed(1)} t/day</strong>
                                                </div>
                                                <div className="stat-row">
                                                    <span>Capacity:</span>
                                                    <span>{intervention.capacityMultiplier.toFixed(1)}x</span>
                                                </div>
                                                <div className="stat-row">
                                                    <span>Efficiency:</span>
                                                    <span>{(type.efficiency * 100).toFixed(0)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InterventionPanel;
