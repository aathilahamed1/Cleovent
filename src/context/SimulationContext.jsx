import React, { createContext, useContext, useState, useEffect } from 'react';
import { cityZones, interventionTypes, historicalEmissions } from '../data/mockData';

const SimulationContext = createContext();

export const useSimulation = () => {
    const context = useContext(SimulationContext);
    if (!context) {
        throw new Error('useSimulation must be used within SimulationProvider');
    }
    return context;
};

export const SimulationProvider = ({ children }) => {
    // Core simulation state
    const [zones, setZones] = useState(cityZones);
    const [selectedZone, setSelectedZone] = useState(null);
    const [interventions, setInterventions] = useState([]);

    // Emission controls
    const [emissionFactors, setEmissionFactors] = useState({
        transport: 1.0,
        industry: 1.0,
        residential: 1.0,
        commercial: 1.0
    });

    // Time simulation
    const [timeScale, setTimeScale] = useState('day'); // hour, day, month
    const [currentTime, setCurrentTime] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);

    // Wind and dispersion
    const [windDirection, setWindDirection] = useState('NE');
    const [windSpeed, setWindSpeed] = useState(5);

    // Calculated metrics
    const [totalEmissions, setTotalEmissions] = useState(0);
    const [emissionsReduction, setEmissionsReduction] = useState(0);
    const [capturedCO2, setCapturedCO2] = useState(0);

    // Calculate total emissions based on zones and factors
    useEffect(() => {
        let total = 0;
        zones.forEach(zone => {
            const factor = emissionFactors[zone.type] || 1.0;
            total += zone.baseline_co2 * factor;
        });
        setTotalEmissions(total);
    }, [zones, emissionFactors]);

    // Calculate intervention impact
    useEffect(() => {
        let totalCaptured = 0;
        interventions.forEach(intervention => {
            const type = interventionTypes.find(t => t.id === intervention.typeId);
            if (type) {
                const capacity = type.baseCapacity * intervention.capacityMultiplier * type.efficiency;
                totalCaptured += capacity;
            }
        });
        setCapturedCO2(totalCaptured);

        const reduction = totalEmissions > 0 ? (totalCaptured / totalEmissions) * 100 : 0;
        setEmissionsReduction(reduction);
    }, [interventions, totalEmissions]);

    // Add intervention
    const addIntervention = (typeId, zoneId, capacityMultiplier = 1.0) => {
        const newIntervention = {
            id: `int-${Date.now()}`,
            typeId,
            zoneId,
            capacityMultiplier,
            createdAt: new Date().toISOString()
        };
        setInterventions([...interventions, newIntervention]);
    };

    // Remove intervention
    const removeIntervention = (interventionId) => {
        setInterventions(interventions.filter(i => i.id !== interventionId));
    };

    // Update emission factor
    const updateEmissionFactor = (type, factor) => {
        setEmissionFactors(prev => ({
            ...prev,
            [type]: factor
        }));
    };

    // Reset simulation
    const resetSimulation = () => {
        setInterventions([]);
        setEmissionFactors({
            transport: 1.0,
            industry: 1.0,
            residential: 1.0,
            commercial: 1.0
        });
        setCurrentTime(0);
        setIsSimulating(false);
    };

    // Get zone emissions (with dispersion)
    const getZoneEmissions = (zoneId) => {
        const zone = zones.find(z => z.id === zoneId);
        if (!zone) return 0;

        const factor = emissionFactors[zone.type] || 1.0;
        let emissions = zone.baseline_co2 * factor;

        // Subtract captured CO2 from interventions in this zone
        const zoneInterventions = interventions.filter(i => i.zoneId === zoneId);
        zoneInterventions.forEach(intervention => {
            const type = interventionTypes.find(t => t.id === intervention.typeId);
            if (type) {
                const captured = type.baseCapacity * intervention.capacityMultiplier * type.efficiency;
                emissions -= captured;
            }
        });

        return Math.max(0, emissions);
    };

    // Get intervention cost
    const getTotalCost = () => {
        let totalCost = 0;
        let totalMaintenance = 0;

        interventions.forEach(intervention => {
            const type = interventionTypes.find(t => t.id === intervention.typeId);
            if (type) {
                totalCost += type.baseCost * intervention.capacityMultiplier;
                totalMaintenance += type.maintenanceCost * intervention.capacityMultiplier;
            }
        });

        return { initial: totalCost, monthly: totalMaintenance };
    };

    const value = {
        // State
        zones,
        selectedZone,
        setSelectedZone,
        interventions,
        emissionFactors,
        timeScale,
        setTimeScale,
        currentTime,
        isSimulating,
        setIsSimulating,
        windDirection,
        setWindDirection,
        windSpeed,
        setWindSpeed,

        // Metrics
        totalEmissions,
        emissionsReduction,
        capturedCO2,

        // Actions
        addIntervention,
        removeIntervention,
        updateEmissionFactor,
        resetSimulation,
        getZoneEmissions,
        getTotalCost
    };

    return (
        <SimulationContext.Provider value={value}>
            {children}
        </SimulationContext.Provider>
    );
};
