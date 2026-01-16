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
- Total: ~2500 lines of code for all placeholders

This creates a fully navigable UI shell ready for backend integration.
