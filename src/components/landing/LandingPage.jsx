import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title fade-in">
                            Cleovent
                        </h1>
                        <p className="hero-subtitle fade-in">
                            CO₂ Capture Simulation Platform for Tamil Nadu - Model, visualize, and optimize carbon capture interventions before real-world deployment
                        </p>
                        <button
                            className="btn btn-primary btn-lg cta-button fade-in"
                            onClick={() => navigate('/dashboard')}
                        >
                            Launch Simulation
                            <span className="arrow">→</span>
                        </button>
                    </div>

                    <div className="hero-visual fade-in">
                        <div className="city-illustration">
                            <div className="building building-1"></div>
                            <div className="building building-2"></div>
                            <div className="building building-3"></div>
                            <div className="building building-4"></div>
                            <div className="building building-5"></div>
                            <div className="tree tree-1">🌳</div>
                            <div className="tree tree-2">🌳</div>
                            <div className="emission-cloud">💨</div>
                            <div className="capture-unit">🏭</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="problem-statement">
                <div className="container">
                    <h2>The Urban Carbon Challenge</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">🏙️</div>
                            <div className="stat-value">70%</div>
                            <div className="stat-label">of global CO₂ from urban areas</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">📈</div>
                            <div className="stat-value">2.5B</div>
                            <div className="stat-label">more urban residents by 2050</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🌡️</div>
                            <div className="stat-value">1.5°C</div>
                            <div className="stat-label">target to limit warming</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Overview */}
            <section className="solution">
                <div className="container">
                    <h2>Digital-First Carbon Intervention</h2>
                    <p className="section-subtitle">
                        Test and optimize carbon capture strategies in a risk-free digital environment
                    </p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🗺️</div>
                            <h3>Interactive City Model</h3>
                            <p>Visualize emission hotspots across residential, commercial, industrial, and traffic zones</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">⚙️</div>
                            <h3>Emission Simulation</h3>
                            <p>Model CO₂ generation from transport, industry, and households with real-time adjustments</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🌿</div>
                            <h3>Intervention Testing</h3>
                            <p>Deploy digital capture units, green walls, and biofilters to evaluate effectiveness</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Impact Analytics</h3>
                            <p>Compare scenarios with predictive models and cost-effectiveness analysis</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Users */}
            <section className="target-users">
                <div className="container">
                    <h2>Built For Decision Makers</h2>
                    <div className="users-grid">
                        <div className="user-badge">
                            <span className="user-icon">👷</span>
                            <span className="user-label">Urban Planners</span>
                        </div>
                        <div className="user-badge">
                            <span className="user-icon">🔬</span>
                            <span className="user-label">Environmental Engineers</span>
                        </div>
                        <div className="user-badge">
                            <span className="user-icon">🏛️</span>
                            <span className="user-label">Policy Makers</span>
                        </div>
                        <div className="user-badge">
                            <span className="user-icon">📚</span>
                            <span className="user-label">Researchers & Students</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="final-cta">
                <div className="container text-center">
                    <h2>Ready to Optimize Your Carbon Strategy?</h2>
                    <p>Start simulating interventions in minutes</p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate('/dashboard')}
                    >
                        Launch Simulation Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2026 Cleovent - CO₂ Capture Platform</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
