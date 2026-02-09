# Cleovent - Quick Start Guide

## 🚀 Running the Application

### Development Mode
```bash
cd "c:\Project\Co2 Final"
npm run dev
```
Opens at: `http://localhost:5173`

### Production Build
```bash
npm run build
```
Creates optimized build in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Overview

**What You Have**: Cleovent - A full-stack responsive web application for simulating CO₂ emissions across Tamil Nadu and testing carbon capture interventions.

**Tech Stack**:
- React 18 + Vite
- React Router v6
- Chart.js for visualizations
- Vanilla CSS with design system

## 🎯 Key Features

### 1. Landing Page (`/`)
- Hero with animated city illustration
- Problem statement with statistics
- Feature overview
- Target user personas
- Call-to-action buttons

### 2. Dashboard (`/dashboard`)

#### 🗺️ City Map Tab
- Interactive canvas-based city with 10 zones
- Click zones to select and view details
- Toggle CO₂ concentration heatmap
- Real-time emission display per zone

#### 📊 Emissions Tab
- Control 4 emission sources with sliders:
  - 🚗 Transport
  - 🏭 Industry
  - 🏠 Residential
  - 🏢 Commercial
- Set wind direction (8 directions)
- Adjust wind speed (0-20 m/s)
- View total emissions breakdown

#### 🌿 Interventions Tab
- Deploy 4 types of carbon capture:
  - Roadside CO₂ Capture Units
  - Vertical Gardens / Green Walls
  - Industrial Biofilter Systems
  - Urban Green Belts
- Configure capacity (0.5x - 3x)
- View cost analysis
- Manage active interventions

#### 📈 Analytics Tab
- Before/After comparison cards
- Key metrics dashboard
- 3 interactive charts:
  - Emission projections (6 months)
  - Emissions by zone type
  - Cost-effectiveness analysis
- Strategic recommendations

## 🎨 Design Highlights

- **Colors**: Green (#10b981) and Blue (#3b82f6) theme
- **Font**: Inter (Google Fonts)
- **Responsive**: Desktop, tablet, mobile
- **Animations**: Fade-ins, hover effects, smooth transitions
- **Icons**: Emoji-based for clarity

## 📊 Simulation Capabilities

### Emission Modeling
- Baseline emissions per zone
- Adjustable emission factors (0-200%)
- Wind-based dispersion
- Real-time total calculations

### Intervention Impact
- Capacity-based CO₂ capture
- Efficiency factors (65-85%)
- Cost calculations (initial + maintenance)
- Zone-specific effectiveness

### Predictions
- 6-month emission projections
- Annual reduction estimates
- Air quality improvement index
- Cost per ton analysis

## 🧪 Example Use Cases

### Scenario 1: Industrial Focus
1. Navigate to dashboard
2. Go to Emissions tab
3. Increase Industrial factor to 150%
4. Switch to Interventions tab
5. Deploy 2-3 Biofilter Systems in industrial zones
6. Check Analytics to see 30-40% reduction

### Scenario 2: Traffic Corridors
1. Increase Transport factor to 180%
2. Deploy Roadside Capture Units on traffic zones
3. Toggle heatmap to see dispersion
4. View cost-effectiveness in Analytics

### Scenario 3: Mixed Strategy
1. Deploy multiple intervention types
2. Adjust capacities for each
3. Compare cost per ton in charts
4. Follow strategic recommendations

## 📝 Code Structure

```
src/
├── components/          # UI components
│   ├── landing/        # Landing page
│   ├── dashboard/      # Main dashboard
│   ├── map/            # City map + heatmap
│   ├── emissions/      # Emission controls
│   ├── interventions/  # Intervention deployment
│   └── analytics/      # Charts and analysis
├── context/            # React Context (state)
├── utils/              # Emission calculations
├── data/               # Mock data
├── styles/             # CSS design system
├── App.jsx             # Routes
└── main.jsx            # Entry point
```

## 🔧 Customization

### Add New Zones
Edit `src/data/mockData.js` → `cityZones` array

### Add Intervention Types
Edit `src/data/mockData.js` → `interventionTypes` array

### Modify Colors
Edit `src/styles/index.css` → CSS variables in `:root`

### Adjust Calculations
Edit `src/utils/emissionModel.js` for emission/dispersion logic

## 🚢 Deployment

### Option 1: Static Hosting (Recommended)
```bash
npm run build
```
Upload `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Option 2: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
```

## 📦 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.3",
  "chart.js": "^4.4.8",
  "react-chartjs-2": "^5.3.0"
}
```

## 🎓 Educational Value

Perfect for:
- **Hackathons**: Complete demo-ready application
- **Academic Projects**: Evidence-based simulations
- **Portfolios**: Full-stack skills showcase
- **Presentations**: Professional UI/UX

## ✅ What's Included

✅ All 6 core pages/modules requested
✅ Interactive digital twin simulation
✅ Emission modeling with wind dispersion
✅ 4 intervention types with costs
✅ Before/after impact analysis
✅ Chart.js visualizations
✅ Strategic recommendations
✅ Responsive design
✅ Production build ready
✅ Clean, modular code

## 🎯 Next Steps

1. **Test locally**: `npm run dev`
2. **Explore features**: Try all tabs and controls
3. **Customize**: Add your own zones/interventions
4. **Deploy**: Build and host on your platform
5. **Present**: Use for demos and pitches

## 💡 Tips

- Start with the landing page to understand the value proposition
- Experiment with emission sliders to see real-time updates
- Deploy interventions one at a time to see incremental impact
- Use Analytics tab to make data-driven decisions
- Check recommendations for strategic guidance

---

**Built with**: React + Vite + Chart.js
**Build time**: 3.58s
**Bundle size**: 144KB gzipped
**Status**: ✅ Production Ready
