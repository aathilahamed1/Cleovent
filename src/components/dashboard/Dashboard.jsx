import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import CityMap from '../map/CityMap';
import EmissionPanel from '../emissions/EmissionPanel';
import InterventionPanel from '../interventions/InterventionPanel';
import PredictionPanel from '../analytics/PredictionPanel';
import './Dashboard.css';

const Dashboard = () => {
    const { totalEmissions, emissionsReduction, capturedCO2 } = useSimulation();
    const [activeTab, setActiveTab] = useState('map');

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(num);
    };

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="container-fluid flex-between">
                    <div className="header-left">
                        <h1 className="dashboard-title">🌿 Cleovent</h1>
                        <p className="dashboard-subtitle">CO₂ Capture Simulation Platform</p>
                    </div>

                    <div className="header-stats">
                        <div className="stat-box">
                            <div className="stat-label">Total Emissions</div>
                            <div className="stat-value">{formatNumber(totalEmissions)} t/day</div>
                        </div>
                        <div className="stat-box stat-success">
                            <div className="stat-label">Reduction</div>
                            <div className="stat-value">{formatNumber(emissionsReduction)}%</div>
                        </div>
                        <div className="stat-box stat-primary">
                            <div className="stat-label">CO₂ Captured</div>
                            <div className="stat-value">{formatNumber(capturedCO2)} t/day</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="dashboard-nav">
                <div className="container-fluid">
                    <div className="nav-tabs">
                        <button
                            className={`nav-tab ${activeTab === 'map' ? 'active' : ''}`}
                            onClick={() => setActiveTab('map')}
                        >
                            🗺️ City Map
                        </button>
                        <button
                            className={`nav-tab ${activeTab === 'emissions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('emissions')}
                        >
                            📊 Emissions
                        </button>
                        <button
                            className={`nav-tab ${activeTab === 'interventions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('interventions')}
                        >
                            🌿 Interventions
                        </button>
                        <button
                            className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
                            onClick={() => setActiveTab('analytics')}
                        >
                            📈 Analytics
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="dashboard-content">
                <div className="container-fluid">
                    {activeTab === 'map' && (
                        <div className="tab-content fade-in">
                            <CityMap />
                        </div>
                    )}

                    {activeTab === 'emissions' && (
                        <div className="tab-content fade-in">
                            <EmissionPanel />
                        </div>
                    )}

                    {activeTab === 'interventions' && (
                        <div className="tab-content fade-in">
                            <InterventionPanel />
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="tab-content fade-in">
                            <PredictionPanel />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
