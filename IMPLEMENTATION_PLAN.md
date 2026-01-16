# Comprehensive UI Implementation Plan
## Idle MMORPG - Missing Screens & Placeholder Requirements

---

## Overview
This document outlines all missing screens and menus that need placeholder implementations before backend systems are built. Each placeholder should provide visual feedback and basic UI structure.

---

## Current State

### ✅ Completed Screens
- **Character Sheet** - Full view with stats display
- **Combat Zones Tab** - Zone selection, enemy grid, combat flow

### 🚧 Partially Complete
- **Combat View** - Has tabs but missing 4 tab content areas

---

## Backend Integration Guidelines

### Code Marker Convention

All placeholder implementations should include clear markers for backend integration:

```javascript
// ========== BACKEND HOOK: [Hook Name] ==========
// API Endpoint: [endpoint URL]
// Method: [GET/POST/PUT/DELETE]
// Expected Response: { ... }
// WebSocket Event: [event name] (if applicable)
// State: [what state to update]
// TODO: Replace mock data with actual API call
// ========== END BACKEND HOOK ==========
```

### HTML Data Attributes

Use data attributes to mark elements that will receive dynamic data:

```html
<!-- BACKEND: Populate from API -->
<div class="dungeon-card" data-backend-source="dungeons-list" data-dungeon-id="">
    <!-- Dynamic content here -->
</div>

<!-- BACKEND: Real-time update via WebSocket -->
<span class="player-status" data-ws-event="player-status-update" data-player-id="">
    Online
</span>

<!-- BACKEND: Submit action -->
<button class="action-btn" data-backend-action="start-gathering" data-resource-id="">
    Start Gathering
</button>
```

### Expected Backend Systems

#### 1. REST API Endpoints

**Authentication & Player Data:**
- `GET /api/player/profile` - Get player character data
- `GET /api/player/stats` - Get combat stats
- `POST /api/player/action` - Submit player action (gather, craft, etc.)

**Combat Systems:**
- `GET /api/zones` - Get available combat zones
- `GET /api/zones/:id/enemies` - Get enemies for a zone
- `POST /api/combat/start` - Start combat encounter
- `POST /api/combat/flee` - Flee from combat
- `GET /api/combat/status` - Get current combat status

**Dungeon & Raid Systems:**
- `GET /api/dungeons` - List all dungeons
- `GET /api/dungeons/:id` - Get dungeon details
- `POST /api/dungeons/:id/enter` - Enter dungeon (requires party)
- `GET /api/raids` - List all raids
- `GET /api/raids/:id/lockout` - Check weekly lockout status

**Party & Social:**
- `GET /api/party/current` - Get current party info
- `POST /api/party/create` - Create new party
- `POST /api/party/invite/:playerId` - Invite player
- `POST /api/party/leave` - Leave party
- `GET /api/party/finder` - Get party finder listings
- `POST /api/party/finder/create` - Create party listing

**Gathering & Crafting:**
- `GET /api/gathering/:skill/nodes` - Get gathering nodes
- `POST /api/gathering/:skill/start` - Start gathering
- `GET /api/crafting/:skill/recipes` - Get available recipes
- `POST /api/crafting/:skill/craft` - Craft item

**Guild & Social:**
- `GET /api/guild/current` - Get player's guild
- `GET /api/guild/:id/members` - Get guild members
- `GET /api/guild/:id/bank` - Get guild bank contents
- `GET /api/friends` - Get friends list
- `POST /api/friends/add/:playerId` - Send friend request

**Trading & Economy:**
- `GET /api/trading/listings` - Get auction house listings
- `POST /api/trading/buy/:listingId` - Purchase item
- `POST /api/trading/sell` - Create listing
- `GET /api/mail/inbox` - Get mail messages
- `POST /api/mail/send` - Send mail

**Progression Systems:**
- `GET /api/quests` - Get active/available quests
- `POST /api/quests/:id/accept` - Accept quest
- `POST /api/quests/:id/complete` - Complete quest
- `GET /api/achievements` - Get achievement progress
- `GET /api/leaderboards/:category` - Get leaderboard rankings

#### 2. WebSocket Events

**Real-Time Combat Updates:**
```javascript
// BACKEND WebSocket: combat-update
socket.on('combat-update', (data) => {
    // { playerHp, playerPower, enemyHp, lastDamage, abilityUsed }
    // Update combat UI in real-time
});

// BACKEND WebSocket: combat-ended
socket.on('combat-ended', (data) => {
    // { victory: bool, xp: number, loot: [], newLevel: number }
    // Show victory/defeat screen
});
```

**Party & Social Updates:**
```javascript
// BACKEND WebSocket: party-update
socket.on('party-update', (data) => {
    // { members: [], leader: string, status: string }
    // Update party UI
});

// BACKEND WebSocket: party-invite
socket.on('party-invite', (data) => {
    // { inviterName: string, partyId: string }
    // Show party invite modal
});

// BACKEND WebSocket: friend-status
socket.on('friend-status', (data) => {
    // { playerId: string, online: bool, activity: string }
    // Update friend online status
});

// BACKEND WebSocket: guild-chat
socket.on('guild-chat', (data) => {
    // { sender: string, message: string, timestamp: number }
    // Add message to guild chat
});
```

**Gathering & Crafting:**
```javascript
// BACKEND WebSocket: gathering-progress
socket.on('gathering-progress', (data) => {
    // { progress: 0-100, timeRemaining: number }
    // Update progress bar
});

// BACKEND WebSocket: gathering-complete
socket.on('gathering-complete', (data) => {
    // { item: {}, quantity: number, xp: number }
    // Show loot notification
});

// BACKEND WebSocket: crafting-complete
socket.on('crafting-complete', (data) => {
    // { item: {}, success: bool, xp: number }
    // Show craft result
});
```

**Economy & Mail:**
```javascript
// BACKEND WebSocket: mail-received
socket.on('mail-received', (data) => {
    // { mailId: string, sender: string, subject: string }
    // Show notification badge
});

// BACKEND WebSocket: item-sold
socket.on('item-sold', (data) => {
    // { itemName: string, price: number, buyerName: string }
    // Show notification
});
```

#### 3. State Management Pattern

Create `js/state.js` for centralized state:

```javascript
const GameState = {
    player: {
        // BACKEND: Populated from /api/player/profile
        id: null,
        name: '',
        class: '',
        level: 1,
        hp: 0,
        maxHp: 0,
        power: 0,
        maxPower: 0,
        stats: {},
        inventory: [],
        gold: 0
    },

    combat: {
        // BACKEND: Updated via WebSocket combat-update
        inCombat: false,
        currentEnemy: null,
        playerHp: 0,
        enemyHp: 0,
        combatLog: []
    },

    party: {
        // BACKEND: Populated from /api/party/current
        inParty: false,
        members: [],
        leader: null,
        lootSettings: 'round-robin'
    },

    gathering: {
        // BACKEND: Updated via WebSocket gathering-progress
        active: false,
        skill: null,
        node: null,
        progress: 0
    },

    social: {
        // BACKEND: Populated from /api/friends, /api/guild/current
        friends: [],
        guild: null,
        mailUnread: 0
    }
};

// BACKEND: Initialize state from API
async function initializeState() {
    // TODO: Fetch from backend
    const response = await fetch('/api/player/profile');
    const data = await response.json();
    GameState.player = data;
}
```

#### 4. Service Layer Pattern

Create service modules for each system in `js/services/`:

**Example: `js/services/combatService.js`**
```javascript
class CombatService {
    // ========== BACKEND HOOK: Get Available Zones ==========
    // API Endpoint: GET /api/zones
    // Expected Response: [{ id, name, levelRange, enemies: [] }]
    // State: Update GameState.zones
    // TODO: Replace mock data with actual API call
    // ========== END BACKEND HOOK ==========
    async getZones() {
        // MOCK DATA - Replace with API call
        return MOCK_DATA.zones;

        // FUTURE IMPLEMENTATION:
        // const response = await fetch('/api/zones');
        // return response.json();
    }

    // ========== BACKEND HOOK: Start Combat ==========
    // API Endpoint: POST /api/combat/start
    // Request Body: { zoneId, enemyId }
    // Expected Response: { combatId, enemy: {}, initialDamage }
    // WebSocket Event: Listen for combat-update
    // State: Update GameState.combat
    // TODO: Replace mock data with actual API call
    // ========== END BACKEND HOOK ==========
    async startCombat(zoneId, enemyId) {
        // MOCK IMPLEMENTATION
        GameState.combat.inCombat = true;

        // FUTURE IMPLEMENTATION:
        // const response = await fetch('/api/combat/start', {
        //     method: 'POST',
        //     body: JSON.stringify({ zoneId, enemyId })
        // });
        // const data = await response.json();
        // GameState.combat = data;
        // socket.on('combat-update', this.handleCombatUpdate);
    }

    // ========== BACKEND HOOK: Combat Update Handler ==========
    // WebSocket Event: combat-update
    // Event Data: { playerHp, enemyHp, lastDamage, abilityUsed }
    // State: Update GameState.combat in real-time
    // TODO: Implement WebSocket listener
    // ========== END BACKEND HOOK ==========
    handleCombatUpdate(data) {
        // FUTURE IMPLEMENTATION
        GameState.combat.playerHp = data.playerHp;
        GameState.combat.enemyHp = data.enemyHp;
        this.updateCombatUI();
    }
}
```

**Example: `js/services/partyService.js`**
```javascript
class PartyService {
    // ========== BACKEND HOOK: Get Party Finder Listings ==========
    // API Endpoint: GET /api/party/finder
    // Query Params: { role, contentType, minLevel, maxLevel }
    // Expected Response: [{ id, name, leader, roles: {}, members: [] }]
    // State: Update UI list
    // TODO: Replace mock data with actual API call
    // ========== END BACKEND HOOK ==========
    async getFinderListings(filters) {
        // MOCK DATA
        return MOCK_DATA.partyListings;
    }

    // ========== BACKEND HOOK: Create Party ==========
    // API Endpoint: POST /api/party/create
    // Request Body: { name, contentType, roleRequirements }
    // Expected Response: { partyId, members: [] }
    // WebSocket Event: Listen for party-update
    // State: Update GameState.party
    // TODO: Replace mock data with actual API call
    // ========== END BACKEND HOOK ==========
    async createParty(config) {
        // FUTURE IMPLEMENTATION
    }
}
```

#### 5. Component Update Pattern

Each UI component should have update methods that consume backend data:

```javascript
class DungeonListComponent {
    // ========== BACKEND HOOK: Render Dungeon List ==========
    // Data Source: dungeonService.getDungeons()
    // Updates On: Page load, dungeon completion
    // TODO: Call API instead of using mock data
    // ========== END BACKEND HOOK ==========
    async render() {
        const dungeons = await dungeonService.getDungeons(); // BACKEND CALL
        const container = document.getElementById('dungeon-list');

        dungeons.forEach(dungeon => {
            const element = this.createDungeonCard(dungeon);
            // BACKEND: Add data-dungeon-id for future interactions
            element.setAttribute('data-dungeon-id', dungeon.id);
            container.appendChild(element);
        });
    }

    // ========== BACKEND HOOK: Handle Dungeon Selection ==========
    // Triggers: dungeonService.selectDungeon(dungeonId)
    // State: Update GameState.selectedDungeon
    // TODO: Fetch detailed info from /api/dungeons/:id
    // ========== END BACKEND HOOK ==========
    selectDungeon(dungeonId) {
        // FUTURE IMPLEMENTATION
    }
}
```

#### 6. Error Handling Pattern

All backend calls should include error handling:

```javascript
async function backendCall(endpoint, options = {}) {
    try {
        const response = await fetch(endpoint, options);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Backend call failed:', error);

        // Show user-friendly error notification
        showNotification('Server error. Please try again.', 'error');

        // Return mock data as fallback during development
        if (window.MOCK_MODE) {
            return getMockData(endpoint);
        }

        throw error;
    }
}
```

#### 7. Environment Configuration

Create `js/config.js`:

```javascript
const CONFIG = {
    // Toggle between mock and real backend
    USE_MOCK_DATA: true, // Set to false when backend is ready

    // API Base URLs
    API_BASE_URL: process.env.API_URL || 'http://localhost:3000/api',
    WS_BASE_URL: process.env.WS_URL || 'ws://localhost:3000',

    // Feature Flags (enable/disable based on backend readiness)
    FEATURES: {
        COMBAT_SYSTEM: false,
        PARTY_SYSTEM: false,
        GATHERING_SYSTEM: false,
        CRAFTING_SYSTEM: false,
        GUILD_SYSTEM: false,
        TRADING_SYSTEM: false,
        MAIL_SYSTEM: false,
        REAL_TIME_UPDATES: false
    }
};

// Utility to check if feature is enabled
function isFeatureEnabled(feature) {
    if (CONFIG.USE_MOCK_DATA) return true; // All features work in mock mode
    return CONFIG.FEATURES[feature];
}
```

---

## Implementation Roadmap

---

## 1. COMBAT VIEW TABS (High Priority)

### 1.1 Dungeons Tab
**Location:** Combat View → Dungeons Tab
**Purpose:** 4-player instanced content

**Placeholder Components:**
- **Left Panel:**
  - Dungeon list (similar to zone list)
  - Each dungeon shows:
    - Name (e.g., "Tomb of Shadows")
    - Level requirement (e.g., "Lv.40-50")
    - Player count (4/4)
    - Difficulty indicator (Normal/Hard/Expert)
- **Right Panel:**
  - Dungeon details card:
    - Boss list (3-5 bosses)
    - Recommended composition (1 Tank, 1 Healer, 2 DPS)
    - Estimated clear time
    - Notable loot drops
  - "Find Group" button (opens Find Party tab)
  - "Enter Dungeon" button (disabled if not in party)

**Placeholder Data:**
```
- Sunken Temple (Lv.15-20)
- Crystal Caverns (Lv.25-30)
- Shadow Fortress (Lv.40-45)
- Flame Citadel (Lv.55-60)
- Void Sanctum (Lv.75-80)
- Endgame Dungeon (Lv.95-99)
```

**Backend Integration Points:**
```javascript
// ========== BACKEND HOOK: Load Dungeon List ==========
// API Endpoint: GET /api/dungeons
// Expected Response: [{ id, name, levelMin, levelMax, bosses: [], difficulty, requiredPartySize }]
// Triggers: When Dungeons tab is clicked
// HTML Element: <div id="dungeon-list" data-backend-source="dungeons-list">
// TODO: Replace MOCK_DATA.dungeons with API call
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Select Dungeon ==========
// API Endpoint: GET /api/dungeons/:id
// Expected Response: { id, name, description, bosses: [{ name, hp, abilities }], loot: [], composition }
// Triggers: When dungeon card is clicked
// HTML Element: <div class="dungeon-card" data-backend-action="select-dungeon" data-dungeon-id="">
// TODO: Fetch detailed dungeon info
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Enter Dungeon ==========
// API Endpoint: POST /api/dungeons/:id/enter
// Request Body: { partyId }
// Expected Response: { instanceId, party: [], startingRoom }
// Triggers: When "Enter Dungeon" button is clicked
// Requirements: Must be in party of 4 with correct composition
// HTML Element: <button data-backend-action="enter-dungeon" data-dungeon-id="">
// TODO: Validate party, create instance, start dungeon combat
// ========== END BACKEND HOOK ==========
```

---

### 1.2 Raids Tab
**Location:** Combat View → Raids Tab
**Purpose:** 8-player large-scale content

**Placeholder Components:**
- **Left Panel:**
  - Raid list
  - Each raid shows:
    - Name (e.g., "Dragon's Lair")
    - Level requirement (e.g., "Lv.80+")
    - Player count (8/8)
    - Lockout status (e.g., "Weekly: 2/3 bosses defeated")
- **Right Panel:**
  - Raid details card:
    - Boss encounter list
    - Recommended composition (2 Tanks, 2 Healers, 4 DPS)
    - Estimated clear time (1-2 hours)
    - Epic/Legendary loot table preview
  - Weekly lockout timer
  - "Find Raid Group" button
  - "Enter Raid" button (disabled if not in raid group)

**Placeholder Data:**
```
- Temple of the Ancients (Lv.50+) - 3 bosses
- Dragon's Ascent (Lv.65+) - 4 bosses
- Shadowlord's Throne (Lv.80+) - 5 bosses
- The Void Nexus (Lv.95+) - 6 bosses (endgame)
```

**Backend Integration Points:**
```javascript
// ========== BACKEND HOOK: Load Raid List ==========
// API Endpoint: GET /api/raids
// Expected Response: [{ id, name, levelMin, bosses: [], lockout: { weekly: bool, progress: { killed: [], total: number } } }]
// Triggers: When Raids tab is clicked
// HTML Element: <div id="raid-list" data-backend-source="raids-list">
// TODO: Replace MOCK_DATA.raids with API call
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Check Raid Lockout ==========
// API Endpoint: GET /api/raids/:id/lockout
// Expected Response: { locked: bool, bossesKilled: [], resetTime: timestamp }
// Triggers: When raid is selected
// HTML Element: <div class="lockout-status" data-backend-source="raid-lockout" data-raid-id="">
// TODO: Fetch player's lockout status for this raid
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Enter Raid ==========
// API Endpoint: POST /api/raids/:id/enter
// Request Body: { partyId }
// Expected Response: { instanceId, party: [], difficulty }
// Requirements: Must be in raid group of 8 with 2T/2H/4D composition
// HTML Element: <button data-backend-action="enter-raid" data-raid-id="">
// TODO: Validate raid group, check lockout, create instance
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Weekly Reset Timer ==========
// WebSocket Event: raid-lockout-reset
// Event Data: { playerId, raidsReset: [] }
// Triggers: Server-side weekly reset (typically Tuesday maintenance)
// TODO: Listen for reset event and clear lockout UI indicators
// ========== END BACKEND HOOK ==========
```

---

### 1.3 Find Party Tab
**Location:** Combat View → Find Party Tab
**Purpose:** Group finder / LFG system

**Placeholder Components:**
- **Left Panel:**
  - Role selector:
    - Tank checkbox
    - Healer checkbox
    - DPS checkbox
  - Content type dropdown:
    - Dungeons
    - Raids
    - World Bosses
  - Level range slider (min-max)
  - "Start Queue" button
  - Queue status indicator

- **Right Panel:**
  - "Create Your Own Group" section:
    - Group name input
    - Content selection dropdown
    - Difficulty selection
    - Role requirements (1T, 1H, 2D or 2T, 2H, 4D)
    - "Create Listing" button

  - "Open Groups" list:
    - Each listing shows:
      - Group name
      - Content type
      - Roles needed (icons: 🛡️ Tank, ❤️ Healer, ⚔️ DPS)
      - Average party level
      - "Request Join" button

**Placeholder Data:**
```
Current Open Groups:
- "Sunken Temple Quick Run" - Need 1 Healer (Lv.18-22)
- "Crystal Caverns Farm" - Need 1 Tank, 1 DPS (Lv.25-30)
- "Shadow Fortress Prog" - Need 2 DPS (Lv.42-45)
```

**Backend Integration Points:**
```javascript
// ========== BACKEND HOOK: Load Party Finder Listings ==========
// API Endpoint: GET /api/party/finder?role=&contentType=&minLevel=&maxLevel=
// Expected Response: [{ id, name, leader, contentType, roles: { tank: 0/1, healer: 0/1, dps: 2/2 }, avgLevel }]
// Triggers: When Find Party tab is clicked, or when filters change
// HTML Element: <div id="party-listings" data-backend-source="party-finder">
// TODO: Replace MOCK_DATA.partyListings with API call with filters
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Create Party Listing ==========
// API Endpoint: POST /api/party/finder/create
// Request Body: { name, contentType, difficulty, roleRequirements: { tank, healer, dps } }
// Expected Response: { listingId, party: { id, members: [] } }
// Triggers: When "Create Listing" button is clicked
// HTML Element: <button data-backend-action="create-party-listing">
// TODO: Create listing and auto-invite creator as leader
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Request Join Party ==========
// API Endpoint: POST /api/party/finder/:listingId/request
// Request Body: { playerId, role }
// Expected Response: { requestId, status: 'pending' }
// Triggers: When "Request Join" button is clicked on a listing
// HTML Element: <button data-backend-action="request-join-party" data-listing-id="">
// TODO: Send join request to party leader
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Queue for Auto-Match ==========
// API Endpoint: POST /api/party/queue/start
// Request Body: { roles: [], contentType, levelRange: { min, max } }
// Expected Response: { queueId, position, estimatedWait }
// Triggers: When "Start Queue" button is clicked
// HTML Element: <button data-backend-action="start-queue">
// WebSocket Event: queue-status-update (for position updates)
// WebSocket Event: queue-match-found (when group is formed)
// TODO: Implement matchmaking queue system
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Party Invite Received ==========
// WebSocket Event: party-invite
// Event Data: { inviterName, inviterId, partyId, contentType }
// Triggers: When another player invites you to party
// TODO: Show invite modal with Accept/Decline buttons
// ========== END BACKEND HOOK ==========
```

---

### 1.4 My Party Tab
**Location:** Combat View → My Party Tab
**Purpose:** Current party management

**Placeholder Components:**
- **Party Status Card:**
  - "Not in a party" message (if solo)
  - OR Party member list (if grouped):
    - Each member shows:
      - Character name
      - Class icon + name
      - Level
      - Role (Tank/Healer/DPS)
      - Health bar
      - Power bar
      - Online status indicator
      - "Kick" button (if party leader)

  - Party leader indicator (👑 crown icon)
  - "Leave Party" button
  - "Disband Party" button (leader only)

- **Party Settings (if leader):**
  - Loot distribution dropdown:
    - Free-for-all
    - Round-robin
    - Need before Greed
    - Master Looter
  - "Public" vs "Private" toggle
  - Instance difficulty selector

**Placeholder Data:**
```
Current Party (4/4):
👑 Shadowknight (Lv.45) - Tank - YOU
   Wisbe (Lv.43) - Healer
   DarkMage (Lv.44) - DPS
   StealthBoi (Lv.45) - DPS
```

**Backend Integration Points:**
```javascript
// ========== BACKEND HOOK: Load Current Party ==========
// API Endpoint: GET /api/party/current
// Expected Response: { id, leader, members: [{ id, name, class, level, role, hp, maxHp, power, maxPower, online }], lootSettings, isPublic }
// Triggers: When My Party tab is clicked, or when joining a party
// HTML Element: <div id="party-members" data-backend-source="current-party">
// TODO: If not in party, show "Not in a party" message
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Real-Time Party Updates ==========
// WebSocket Event: party-update
// Event Data: { members: [], leader, lootSettings }
// Triggers: When any party member joins/leaves, or settings change
// TODO: Update party member list UI in real-time
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Real-Time Member Stats ==========
// WebSocket Event: party-member-stats
// Event Data: { playerId, hp, power, buffsList, inCombat }
// Triggers: During combat or when member stats change
// HTML Elements: <div class="member-hp-bar" data-ws-event="party-member-stats" data-player-id="">
// TODO: Update HP/Power bars for party members in real-time
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Leave Party ==========
// API Endpoint: POST /api/party/leave
// Expected Response: { success: true }
// Triggers: When "Leave Party" button is clicked
// HTML Element: <button data-backend-action="leave-party">
// TODO: Remove player from party, update UI to "Not in a party"
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Kick Member ==========
// API Endpoint: POST /api/party/kick/:playerId
// Request Body: { playerId }
// Expected Response: { success: true, newMembers: [] }
// Triggers: When leader clicks "Kick" button on a member
// HTML Element: <button data-backend-action="kick-member" data-player-id="">
// Requirements: Must be party leader
// TODO: Remove player from party, broadcast party-update event
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Update Loot Settings ==========
// API Endpoint: POST /api/party/settings/loot
// Request Body: { lootMode: 'round-robin' | 'need-before-greed' | 'master-looter' }
// Expected Response: { success: true }
// Triggers: When leader changes loot distribution dropdown
// HTML Element: <select data-backend-action="update-loot-settings">
// Requirements: Must be party leader
// TODO: Update party settings, broadcast to all members
// ========== END BACKEND HOOK ==========

// ========== BACKEND HOOK: Disband Party ==========
// API Endpoint: POST /api/party/disband
// Expected Response: { success: true }
// Triggers: When leader clicks "Disband Party" button
// HTML Element: <button data-backend-action="disband-party">
// Requirements: Must be party leader
// TODO: Dissolve party, notify all members
// ========== END BACKEND HOOK ==========
```

---

## 2. GATHERING SKILLS (4 Views)

### 2.1 Woodcutting View
**Purpose:** Gather wood from trees

**Placeholder Layout:**
- **Left Panel:**
  - Tree list (similar to zone list):
    - Normal Tree (Lv.1-10)
    - Oak Tree (Lv.10-20)
    - Maple Tree (Lv.20-35)
    - Elder Tree (Lv.40-60)
    - Ancient Tree (Lv.70-99)
  - Currently selected tree highlighted

- **Right Panel:**
  - Resource display:
    - Tree sprite/icon
    - Tree name and level requirement
    - Gather time (e.g., "4.5s per log")
    - Experience per gather
  - "Start Gathering" button
  - Progress bar (fills during gathering)
  - Recent drops section (shows last 10 items)

- **Bottom Stats:**
  - Total logs gathered this session
  - Experience per hour
  - Time spent gathering

---

### 2.2 Mining View
**Purpose:** Gather ore from rocks

**Placeholder Layout:**
- **Left Panel:**
  - Rock/Ore list:
    - Copper Ore (Lv.1-10)
    - Iron Ore (Lv.10-25)
    - Silver Ore (Lv.25-40)
    - Gold Ore (Lv.40-60)
    - Mithril Ore (Lv.60-80)
    - Adamantite Ore (Lv.80-99)

- **Right Panel:**
  - Similar to Woodcutting:
    - Ore sprite/icon
    - Mining time
    - Experience display
    - Progress bar
    - Recent drops

---

### 2.3 Foraging View
**Purpose:** Gather herbs and plants

**Placeholder Layout:**
- **Left Panel:**
  - Plant list:
    - Common Herbs (Lv.1-10)
    - Wildflowers (Lv.10-20)
    - Medicinal Herbs (Lv.20-35)
    - Rare Plants (Lv.40-60)
    - Ancient Herbs (Lv.70-99)

- **Right Panel:**
  - Similar structure to other gathering skills

---

### 2.4 Fishing View
**Purpose:** Catch fish

**Placeholder Layout:**
- **Left Panel:**
  - Fishing spot list:
    - Pond (Lv.1-10)
    - River (Lv.10-25)
    - Lake (Lv.25-45)
    - Ocean (Lv.45-70)
    - Deep Sea (Lv.70-99)

- **Right Panel:**
  - Fishing rod display
  - "Cast Line" button
  - Fishing progress bar
  - Recent catches (with fish sprites)
  - Rare catch notification area

---

## 3. CRAFTING SKILLS (6 Views)

### Universal Crafting View Template
**All crafting views follow this structure:**

**Left Panel:**
- Recipe list:
  - Grouped by level tier
  - Each recipe shows:
    - Item name + icon
    - Level requirement
    - Materials needed (with owned/required count)
    - Craftable indicator (green if have mats)

**Right Panel:**
- Selected recipe details:
  - Large item icon
  - Item stats preview
  - Material requirements (detailed)
  - Experience gained
  - Success rate (if applicable)
  - "Craft" button
  - "Craft x10" button
  - Progress bar during crafting

---

### 3.1 Weaponsmithing View
**Items:** Swords, Axes, Daggers, Bows, Staves
**Materials:** Metal Bars, Leather, Wood
**Placeholder Recipes:**
```
Tier 1 (Lv.1-10):
- Bronze Sword, Bronze Axe, Bronze Dagger

Tier 2 (Lv.10-25):
- Iron Sword, Iron Axe, Iron Bow

Tier 3 (Lv.25-45):
- Steel Weapons

Tier 4 (Lv.45-70):
- Mithril Weapons

Tier 5 (Lv.70-99):
- Legendary Weapons
```

---

### 3.2 Armorsmithing View
**Items:** Helmets, Chest, Legs, Boots, Gloves, Shields
**Materials:** Metal Bars, Leather
**Similar structure to Weaponsmithing**

---

### 3.3 Scribing View
**Items:** Ability Tomes (Adept, Expert, Master upgrades)
**Materials:** Paper, Ink, Rare Reagents
**Special:** Shows tome upgrade paths for each class

---

### 3.4 Alchemy View
**Items:** Potions, Elixirs, Flasks
**Materials:** Herbs, Water, Vials
**Placeholder Recipes:**
```
- Health Potion (restore 500 HP)
- Power Potion (restore 200 Power)
- Strength Elixir (+10% attack for 30m)
- Defense Flask (+15% mitigation for 1h)
```

---

### 3.5 Tailoring View
**Items:** Cloth armor, Bags
**Materials:** Cloth, Thread, Leather

---

### 3.6 Cooking View
**Items:** Food buffs
**Materials:** Fish, Meat, Vegetables
**Placeholder Recipes:**
```
- Grilled Fish (+5% HP for 30m)
- Roasted Meat (+5% Strength for 30m)
- Vegetable Stew (+10% HP regen for 1h)
- Feast (+All stats for 2h)
```

---

## 4. SOCIAL FEATURES (5 Views)

### 4.1 Guild View
**Placeholder Layout:**

**If Not in Guild:**
- "Join a Guild" section:
  - Guild browser list
  - Search bar
  - Each guild shows:
    - Guild name + tag
    - Member count (45/50)
    - Level requirement
    - Description
    - "Request Join" button

**If In Guild:**
- **Guild Info Card:**
  - Guild name, tag, level
  - Member list (name, class, level, rank, online status)
  - Guild perks/buffs active
  - "Leave Guild" button

- **Guild Bank Tab:**
  - Shared storage grid
  - Deposit/withdraw logs

- **Guild Chat:**
  - Message list
  - Input box

---

### 4.2 Trading Post View
**Purpose:** Player marketplace / auction house

**Placeholder Layout:**
- **Left Panel:**
  - Category filters:
    - Weapons
    - Armor
    - Consumables
    - Materials
    - Tomes
  - Level range filter
  - Rarity filter
  - Search bar

- **Right Panel:**
  - Listings grid:
    - Each listing shows:
      - Item icon + name
      - Seller name
      - Price (gold)
      - Time remaining
      - "Buy" button

  - "My Listings" tab:
    - Active sales
    - "Create Listing" button

---

### 4.3 Mail View
**Placeholder Layout:**
- **Left Panel:**
  - Inbox list:
    - Each mail shows:
      - Sender name
      - Subject
      - Timestamp
      - Unread indicator
      - Attachment icon (if has items/gold)
  - "New Mail" button

- **Right Panel:**
  - Selected mail content:
    - From: [name]
    - Subject: [text]
    - Message body
    - Attachments (items + gold)
    - "Take Attachments" button
    - "Reply" button
    - "Delete" button

**Placeholder Data:**
```
System Mail:
- "Welcome to the Game!"
- "Daily Login Reward" (100 gold attached)
- "Level 45 Achievement" (item attached)
```

---

### 4.4 Friends View
**Placeholder Layout:**
- **Friends List:**
  - Each friend shows:
    - Character name
    - Class + Level
    - Online status (green/red indicator)
    - Current activity (e.g., "In Sunken Temple")
    - "Whisper" button
    - "Invite to Party" button
    - "Remove" button

- **Add Friend Section:**
  - Name input
  - "Send Friend Request" button

- **Pending Requests:**
  - Incoming requests
  - "Accept" / "Decline" buttons

**Placeholder Data:**
```
Friends (4/50):
🟢 Wisbe (Mystic Lv.43) - In Combat Zone
🟢 DarkMage (Summoner Lv.44) - Crafting
🔴 StealthBoi (Assassin Lv.45) - Offline 2h
🟢 TankMaster (Paladin Lv.47) - In Dungeon
```

---

### 4.5 Leaderboards View
**Placeholder Layout:**
- **Tab Selection:**
  - Overall Level
  - Combat Zones Cleared
  - Dungeons Completed
  - Raids Completed
  - Gathering Skills
  - Crafting Skills

- **Leaderboard Table:**
  - Rank | Name | Class | Level | Value
  - Top 100 players
  - Current player rank highlighted

**Placeholder Data:**
```
Overall Level Leaderboard:
1. LegendPlayer (Shadowknight Lv.99)
2. ProGamer (Cleric Lv.98)
3. EliteWarrior (Paladin Lv.97)
...
247. YOU (Shadowknight Lv.45)
```

---

## 5. SYSTEMS (2 Views)

### 5.1 Quests View
**Placeholder Layout:**
- **Left Panel:**
  - Quest list (grouped):
    - Main Story Quests
    - Side Quests
    - Daily Quests
    - Weekly Quests
  - Each quest shows:
    - Quest name
    - Level
    - Progress (3/5 items collected)
    - Rewards preview
    - "Track" checkbox

- **Right Panel:**
  - Selected quest details:
    - Quest title + level
    - Description/lore
    - Objectives with checkboxes
    - Rewards (XP, gold, items)
    - "Abandon Quest" button

**Placeholder Data:**
```
Main Story:
- "The Calling" (Lv.1) - Meet your trainer
- "First Blood" (Lv.5) - Defeat 10 enemies
- "Journey Begins" (Lv.10) - Clear your first dungeon

Daily Quests (Reset: 23h 45m):
- "Gather Resources" - Collect 20 herbs (12/20)
- "Slay Monsters" - Defeat 50 enemies (50/50) ✓
- "Dungeon Challenge" - Complete any dungeon (0/1)
```

---

### 5.2 Achievements View
**Placeholder Layout:**
- **Left Panel:**
  - Category filters:
    - Combat
    - Dungeons & Raids
    - Gathering
    - Crafting
    - Social
    - Exploration
  - Progress bar (234/500 achievements)

- **Right Panel:**
  - Achievement grid:
    - Each achievement shows:
      - Icon
      - Name
      - Description
      - Progress bar (if progressive)
      - Points value
      - Completion status (locked/unlocked)
      - Reward (title, mount, pet, etc.)

**Placeholder Data:**
```
Combat Achievements:
🏆 "First Victory" - Defeat your first enemy (5 pts) ✓
🏆 "Hundred Slayer" - Defeat 100 enemies (10 pts) ✓
🔒 "Thousand Slayer" - Defeat 1000 enemies (25 pts) 567/1000
🔒 "Elite Hunter" - Defeat 50 elite enemies (30 pts) 12/50

Dungeon Achievements:
🏆 "Dungeon Delver" - Complete your first dungeon (10 pts) ✓
🔒 "Dungeon Master" - Complete all dungeons (50 pts) 3/6
🔒 "Speed Runner" - Complete any dungeon in under 10 minutes (25 pts)
```

---

## 6. TECHNICAL REQUIREMENTS

### 6.1 View Container Pattern
All new views should follow this HTML structure:

```html
<div id="[view-name]-view" class="view-container">
    <div class="view-header">
        <h2>[View Title]</h2>
        <!-- Optional: tabs or filters -->
    </div>

    <div class="view-content">
        <!-- View-specific layout -->
    </div>
</div>
```

### 6.2 JavaScript Integration
Update `js/main.js` viewMap:

```javascript
const viewMap = {
    'character-sheet': 'character-sheet-view',
    'combat': 'combat-view',
    'woodcutting': 'woodcutting-view',
    'mining': 'mining-view',
    // ... add all view mappings
};
```

### 6.3 Styling Guidelines
- Use existing CSS variables from `:root`
- Match the dark space theme (--bg-primary, --bg-secondary, --bg-tertiary)
- Use consistent spacing (--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg)
- Follow the established card pattern (border-radius, box-shadow)
- Use accent colors (--accent-primary) for interactive elements

### 6.4 Placeholder Interactions
For all placeholder views:
- Buttons should show "Coming Soon" notifications when clicked
- Progress bars should animate on action
- Lists should be scrollable
- Filters/tabs should switch visual state
- No actual backend calls (all mock data)

---

## 7. IMPLEMENTATION PRIORITY

### Phase 1 (Critical - Complete Combat View)
1. Dungeons Tab content
2. Raids Tab content
3. Find Party Tab content
4. My Party Tab content

### Phase 2 (High - Core Features)
5. All 4 Gathering skill views
6. Guild view
7. Friends view
8. Quests view

### Phase 3 (Medium - Enhancement Features)
9. All 6 Crafting skill views
10. Trading Post view
11. Achievements view
12. Leaderboards view

### Phase 4 (Low - Nice to Have)
13. Mail view

---

## 8. MOCK DATA CONSTANTS

Create `js/mockData.js` to store all placeholder data:

```javascript
const MOCK_DATA = {
    dungeons: [
        { name: "Sunken Temple", level: "15-20", bosses: 3, ... },
        // ...
    ],
    raids: [ /* ... */ ],
    gatheringNodes: { /* ... */ },
    recipes: { /* ... */ },
    achievements: [ /* ... */ ],
    // etc.
};
```

---

## SUMMARY

**Total Views Needed:** 21
- ✅ 2 Complete (Character, Combat Zones)
- 🚧 4 Combat Tabs
- 📝 4 Gathering Views
- 📝 6 Crafting Views
- 📝 5 Social Views
- 📝 2 System Views

**Estimated Placeholder Implementation:**
- ~50-100 lines of HTML per view
- ~30-50 lines of CSS per view
- ~20-30 lines of JS per view
- ~10-20 backend hook markers per view
- Total: ~2500 lines of code + ~400 backend markers for all placeholders

This creates a fully navigable UI shell ready for backend integration.

---

## 9. BACKEND INTEGRATION PATTERNS FOR REMAINING VIEWS

**Note:** The Dungeons, Raids, Find Party, and My Party tabs have detailed backend hooks documented above. All remaining views should follow the same pattern. Below are the expected integration points for each view category.

### Gathering Skills (Woodcutting, Mining, Foraging, Fishing)

**Common Backend Hooks for All Gathering Skills:**
```javascript
// ========== BACKEND HOOK: Load Gathering Nodes ==========
// API Endpoint: GET /api/gathering/{skill}/nodes
// Expected Response: [{ id, name, levelRequired, xpPerGather, gatherTime, drops: [] }]
// HTML: <div id="{skill}-nodes-list" data-backend-source="gathering-nodes">

// ========== BACKEND HOOK: Start Gathering ==========
// API Endpoint: POST /api/gathering/{skill}/start
// Request Body: { nodeId }
// Expected Response: { sessionId, gatherTime, xpPerGather }
// WebSocket Event: gathering-progress (for progress bar updates)
// HTML: <button data-backend-action="start-gathering" data-node-id="">

// ========== BACKEND HOOK: Gathering Complete ==========
// WebSocket Event: gathering-complete
// Event Data: { item: {}, quantity, xp, newLevel }
// HTML: <div class="loot-notification" data-ws-event="gathering-complete">
// TODO: Show loot popup, update inventory, update XP bar
```

### Crafting Skills (Weaponsmithing, Armorsmithing, Scribing, Alchemy, Tailoring, Cooking)

**Common Backend Hooks for All Crafting Skills:**
```javascript
// ========== BACKEND HOOK: Load Recipes ==========
// API Endpoint: GET /api/crafting/{skill}/recipes
// Expected Response: [{ id, name, level, materials: [{ itemId, quantity }], result: {}, xp }]
// HTML: <div id="{skill}-recipes" data-backend-source="crafting-recipes">

// ========== BACKEND HOOK: Craft Item ==========
// API Endpoint: POST /api/crafting/{skill}/craft
// Request Body: { recipeId, quantity: 1 }
// Expected Response: { success: bool, item: {}, xp, newLevel }
// HTML: <button data-backend-action="craft-item" data-recipe-id="">
// TODO: Check inventory for materials, consume materials, create item, grant XP

// ========== BACKEND HOOK: Batch Craft ==========
// API Endpoint: POST /api/crafting/{skill}/craft
// Request Body: { recipeId, quantity: 10 }
// WebSocket Event: crafting-progress (for batch progress)
// HTML: <button data-backend-action="batch-craft" data-recipe-id="" data-quantity="10">
```

### Guild View

**Backend Hooks:**
```javascript
// ========== BACKEND HOOK: Load Guild Info ==========
// API Endpoint: GET /api/guild/current
// Expected Response: { id, name, tag, level, members: [], perks: [], bank: [] }
// HTML: <div id="guild-info" data-backend-source="guild-current">

// ========== BACKEND HOOK: Guild Chat ==========
// WebSocket Event: guild-chat
// Event Data: { sender, message, timestamp }
// HTML: <div id="guild-chat-messages" data-ws-event="guild-chat">

// ========== BACKEND HOOK: Guild Bank Operations ==========
// API Endpoint: POST /api/guild/bank/deposit
// API Endpoint: POST /api/guild/bank/withdraw
// HTML: <button data-backend-action="guild-bank-deposit" data-item-id="">
```

### Trading Post View

**Backend Hooks:**
```javascript
// ========== BACKEND HOOK: Load Auction Listings ==========
// API Endpoint: GET /api/trading/listings?category=&minLevel=&maxLevel=&search=
// Expected Response: [{ id, item: {}, seller, price, timeRemaining }]
// HTML: <div id="auction-listings" data-backend-source="trading-listings">

// ========== BACKEND HOOK: Buy Item ==========
// API Endpoint: POST /api/trading/buy/:listingId
// Expected Response: { success: bool, item: {}, goldSpent }
// HTML: <button data-backend-action="buy-item" data-listing-id="">

// ========== BACKEND HOOK: Create Listing ==========
// API Endpoint: POST /api/trading/sell
// Request Body: { itemId, price, duration }
// HTML: <button data-backend-action="create-listing">

// ========== BACKEND HOOK: Item Sold Notification ==========
// WebSocket Event: item-sold
// Event Data: { itemName, price, buyerName }
// TODO: Show notification, update gold, remove from "My Listings"
```

### Mail View

**Backend Hooks:**
```javascript
// ========== BACKEND HOOK: Load Inbox ==========
// API Endpoint: GET /api/mail/inbox
// Expected Response: [{ id, from, subject, body, attachments: [], read: bool, timestamp }]
// HTML: <div id="mail-inbox" data-backend-source="mail-inbox">

// ========== BACKEND HOOK: Send Mail ==========
// API Endpoint: POST /api/mail/send
// Request Body: { to, subject, body, attachments: [] }
// HTML: <button data-backend-action="send-mail">

// ========== BACKEND HOOK: Take Attachments ==========
// API Endpoint: POST /api/mail/:id/take-attachments
// Expected Response: { items: [], gold }
// HTML: <button data-backend-action="take-attachments" data-mail-id="">

// ========== BACKEND HOOK: New Mail Received ==========
// WebSocket Event: mail-received
// Event Data: { mailId, from, subject }
// HTML: <div class="mail-notification" data-ws-event="mail-received">
// TODO: Show notification badge, increment unread count
```

### Friends View

**Backend Hooks:**
```javascript
// ========== BACKEND HOOK: Load Friends List ==========
// API Endpoint: GET /api/friends
// Expected Response: [{ id, name, class, level, online: bool, activity: string }]
// HTML: <div id="friends-list" data-backend-source="friends-list">

// ========== BACKEND HOOK: Add Friend ==========
// API Endpoint: POST /api/friends/add/:playerId
// Expected Response: { success: bool, requestSent: bool }
// HTML: <button data-backend-action="send-friend-request">

// ========== BACKEND HOOK: Friend Online Status ==========
// WebSocket Event: friend-status
// Event Data: { playerId, online: bool, activity: string }
// HTML: <span class="friend-status" data-ws-event="friend-status" data-player-id="">
// TODO: Update online indicator (green/red dot)
```

### Leaderboards View

**Backend Hooks:**
```javascript
// ========== BACKEND HOOK: Load Leaderboard ==========
// API Endpoint: GET /api/leaderboards/:category?limit=100
// Expected Response: [{ rank, playerId, name, class, value }]
// HTML: <div id="leaderboard-table" data-backend-source="leaderboard" data-category="">

// ========== BACKEND HOOK: Get Player Rank ==========
// API Endpoint: GET /api/leaderboards/:category/my-rank
// Expected Response: { rank, value }
// HTML: <div class="my-rank" data-backend-source="my-rank">
```

### Quests View

**Backend Hooks:**
```javascript
// ========== BACKEND HOOK: Load Quest Log ==========
// API Endpoint: GET /api/quests
// Expected Response: { active: [], available: [], completed: [] }
// HTML: <div id="quest-log" data-backend-source="quest-log">

// ========== BACKEND HOOK: Accept Quest ==========
// API Endpoint: POST /api/quests/:id/accept
// Expected Response: { success: bool, quest: {} }
// HTML: <button data-backend-action="accept-quest" data-quest-id="">

// ========== BACKEND HOOK: Complete Quest ==========
// API Endpoint: POST /api/quests/:id/complete
// Expected Response: { success: bool, rewards: { xp, gold, items: [] } }
// HTML: <button data-backend-action="complete-quest" data-quest-id="">

// ========== BACKEND HOOK: Quest Progress Update ==========
// WebSocket Event: quest-progress
// Event Data: { questId, objectiveIndex, current, required }
// HTML: <div class="quest-objective" data-ws-event="quest-progress" data-quest-id="">
// TODO: Update progress bars for active quest objectives
```

### Achievements View

**Backend Hooks:**
```javascript
// ========== BACKEND HOOK: Load Achievements ==========
// API Endpoint: GET /api/achievements?category=
// Expected Response: [{ id, name, description, category, progress, required, unlocked: bool, reward: {} }]
// HTML: <div id="achievements-list" data-backend-source="achievements">

// ========== BACKEND HOOK: Achievement Unlocked ==========
// WebSocket Event: achievement-unlocked
// Event Data: { achievementId, name, description, reward }
// TODO: Show achievement toast notification with animation
// HTML: <div class="achievement-toast" data-ws-event="achievement-unlocked">
```

---

## 10. FILE STRUCTURE FOR BACKEND INTEGRATION

Create organized service files:

```
js/
├── config.js              (API URLs, feature flags)
├── state.js               (Centralized game state)
├── mockData.js            (All placeholder data)
├── api/
│   └── client.js          (HTTP client with error handling)
├── services/
│   ├── combatService.js   (Combat, zones, enemies)
│   ├── dungeonService.js  (Dungeons & raids)
│   ├── partyService.js    (Party finder, management)
│   ├── gatheringService.js (All gathering skills)
│   ├── craftingService.js  (All crafting skills)
│   ├── guildService.js     (Guild operations)
│   ├── tradingService.js   (Auction house)
│   ├── mailService.js      (Mail system)
│   ├── socialService.js    (Friends, leaderboards)
│   └── questService.js     (Quests & achievements)
└── websocket/
    └── socketManager.js    (WebSocket connection & event handlers)
```

---

## 11. IMPLEMENTATION CHECKLIST

When implementing each placeholder view, ensure:

- [ ] All HTML elements have appropriate `data-backend-*` attributes
- [ ] Backend hook comments are added to all interactive functions
- [ ] Mock data is properly structured to match expected API responses
- [ ] Service methods are created with commented API endpoints
- [ ] WebSocket event listeners are documented
- [ ] Error handling is included for all backend calls
- [ ] Loading states are shown during async operations
- [ ] Success/error notifications are displayed to users
- [ ] State is updated after successful operations
- [ ] UI reflects state changes immediately

This comprehensive backend integration plan ensures that when the backend is ready, developers can search for `BACKEND HOOK` comments and easily replace mock data with real API calls.
