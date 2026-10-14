Casudaba: Interactive Educational WebGIS for Sustainable Agriculture

**Casudaba** is a hybrid educational WebGIS platform centered in the Casamance region of Senegal (*Ziguinchor, Cap Skirring, Sédhiou, and Kolda*). The application bridges traditional local farming knowledge with modern geospatial technology, integrating Geographic Information Systems (GIS), Earth Observation (EO) concepts, and spatial tracking into an engaging, gamified map environment.

---

## Mission & Educational Vision
Casudaba aims to empower youth and community members across Casamance with accessible digital tools for sustainable agriculture, environmental stewardship, and cultural preservation. 

By combining real-world spatial exploration with interactive quest systems and an embedded AI guide, the project fosters:
- **Environmental Stewardship:** Understanding regional crop dynamics, water corridors, and soil management.
- **Geospatial Literacy:** Practical experience with WebGIS tools, coordinate tracking, and distance estimation.
- **Community & Economic Empowerment:** Real-world connection to agricultural resources and sustainable practices.

---

##  Key Features

### 1. Interactive Map Interface
- Built with **Leaflet.js** and **OpenStreetMap** tile layers.
- Centered on the Casamance regional hub (**Ziguinchor**) with spatial bounds covering **Cap Skirring**, **Sédhiou**, and **Kolda**.
- Custom markers, safe zones, and visual proximity radiuses.

### 2. Gamified Objective & Quest System (`GameHandler`)
- Modular progression tracking across three sequential learning stages (`START` → `MID` → `LEARN`).
- **Proximity-based completion triggers:** Uses Leaflet distance calculations (`L.latLng.distanceTo`) to detect when players visit key spatial markers.
- Dynamic HUD overlay updating active mission statuses (` Active` vs ` Complete`).

### 3. Kono AI Guide & Spatial Search (`AIComponent`)
- Integrated intelligent guide providing regional context, farming insight, and quest hints.
- **Real-Time Spatial Search:** Evaluates natural language queries (e.g., *"Where is the nearest sugar farm?"*), calculates physical distance from the player base in kilometers, drops map pins, and auto-pans the map viewport.

### 4. Patrol & Boundary AI Monitoring (`AIHandler`)
- Simulates regional trade caravans and scout units patrolling Casamance river corridors.
- Monitors unit boundaries and logs perimeter status warnings in real time.

### 5. Player Actions & Hero Controls (`PlayerHandler` & `HeroHandler`)
- Interactive HUD control buttons for player actions (` Scout`, ` Harvest`, ` Rest`).
- Tool/Hero selection toggles for switching active units.


