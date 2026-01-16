# Idle MMORPG

A hybrid idle/incremental MMORPG combining the relaxed gameplay of Milkyway Idle with the depth and complexity of EverQuest 2's class and stat systems.

## Features

### Core Systems

- **12 Unique Classes** based on EverQuest 2 (Shadowknight, Paladin, Monk, Assassin, Ranger, Enchanter, Summoner, Necromancer, Bard, Druid, Mystic, Cleric)
- **5 Primary Stats** (Strength, Stamina, Agility, Intelligence, Wisdom) with derived combat stats
- **70 Abilities per Class** spread across levels 1-99
- **4-Tier Ability System** (Apprentice → Adept → Expert → Master)
- **If/Then Ability Automation** - Configure when abilities activate
- **Auto-Combat System** - Hands-off gameplay with strategic depth

### UI Features

- **Milkyway Idle-Inspired Interface** - Clean, dark space theme with purple/blue accents
- **Top Bar** - Character info, XP bar, AA points, active buffs, guild info
- **Left Sidebar** - Navigation for combat, dungeons, gathering/crafting skills, social features
- **Combat View** - Zone selection, enemy display, player status, recent loot
- **Character Sheet** - Detailed stats, resistances, performance metrics
- **8-Slot Ability Bar** - Priority-based ability queue with customizable conditions
- **Modal System** - Configure abilities with complex If/Then conditions

### Combat System

- **Auto-Combat** - Abilities execute automatically based on conditions
- **Conditional Logic** - Set up to 3 conditions per ability (AND/OR logic)
- **Consumable Management** - Auto-use health/power potions based on thresholds
- **Real-time Updates** - Combat progresses even while AFK
- **Loot System** - Gold, materials, ability tomes, and equipment drops

### Progression Systems

- **Character Levels** (1-99)
- **Experience & AA Points**
- **Ability Tome Drops** - Upgrade abilities through loot
- **Gathering Skills** - Woodcutting, Mining, Foraging, Fishing
- **Crafting Skills** - Weaponsmithing, Armorsmithing, Scribing, Alchemy, Tailoring, Cooking

## Getting Started

### Installation

1. Clone the repository
2. Open `index.html` in a modern web browser
3. No build process or server required - it's a pure client-side application!

### Playing the Game

1. **Select a Zone** - Click on a zone in the left panel to start combat
2. **Configure Abilities** - Click the ⚙️ icon above any ability slot to set conditions
3. **Enable Auto-Combat** - Check the Auto-Combat box to begin automated combat
4. **Watch Progress** - Monitor your character's performance in real-time
5. **Collect Loot** - Ability tomes, equipment, and resources drop automatically
6. **Level Up** - Gain experience and unlock new abilities as you progress

### Configuring Abilities

Each ability slot can be configured with up to 3 conditions:

**Available Conditions:**
- Target HP (enemy health %)
- Self HP (your health %)
- Self Power (your mana %)
- Party Average HP (in group content)
- Combat Duration (time in current fight)

**Example Configuration:**
```
Ability: Bash III (Master)
Priority: 1 (highest)
Conditions:
  - Target HP > 80% AND
  - Self Power > 50%
```

This makes Bash III your opening attack when you have sufficient power.

## Technical Details

### Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid, animations
- **Vanilla JavaScript** - No frameworks, modular class-based architecture
- **LocalStorage** - Client-side data persistence

### Project Structure

```
/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Core styles, variables, layout
│   ├── combat.css         # Combat-specific styles
│   └── components.css     # Character sheet, ability bar, modals
├── js/
│   ├── main.js           # App initialization, navigation, modals
│   ├── abilities.js      # Ability management, If/Then system
│   └── combat.js         # Combat simulation, auto-combat loop
└── README.md             # This file
```

### Key Classes

- **GameUI** - Main application controller, navigation, view management
- **AbilityManager** - Ability slot configuration, If/Then conditions
- **CombatManager** - Combat simulation, enemy generation, loot drops
- **Utils** - Utility functions (formatting, notifications, progress bars)

## Design Philosophy

### Idle-First Design

- **Everything is Automatic** - Combat, abilities, consumables all auto-execute
- **Offline Progress** - Planned support for 12-24 hours of offline gains
- **Choice Over Execution** - Strategic depth through configuration, not button mashing
- **Visual Clarity** - Always know what's happening at a glance

### MMORPG Depth

- **Complex Class Systems** - 12 unique classes with distinct roles
- **Deep Stat Mechanics** - Primary stats, resistances, combat stats
- **Ability Progression** - 70 abilities per class with tier upgrades
- **Multiplayer Support** - Planned: parties, dungeons, raids, guilds

## Roadmap

### Phase 1: Core Systems ✅
- [x] UI Framework (Milkyway Idle style)
- [x] Combat View with zone selection
- [x] Character Sheet with stats
- [x] Ability Bar with 8 slots
- [x] If/Then ability configuration
- [x] Auto-combat simulation
- [x] Basic loot system

### Phase 2: Content (In Progress)
- [ ] All 12 classes implemented
- [ ] Full ability lists (70 per class)
- [ ] Crafting system (Expert tome creation)
- [ ] Gathering skills (background progression)
- [ ] Zone progression (starter → endgame)

### Phase 3: Multiplayer
- [ ] Party system
- [ ] Dungeon finder
- [ ] Raid content
- [ ] Guild system
- [ ] Trading post

### Phase 4: Polish
- [ ] Offline progress calculation
- [ ] Achievement system
- [ ] Quest system
- [ ] Daily/weekly content
- [ ] Leaderboards

## Design Inspirations

- **Milkyway Idle** - UI layout, idle mechanics, clean aesthetic
- **EverQuest 2** - Class system, stats, ability progression
- **RuneScape** - Gathering/crafting skills
- **Path of Exile** - Deep customization, build variety

## Contributing

This is a design document and prototype. Future contributions welcome!

## License

TBD

## Credits

- Inspired by Milkyway Idle's excellent UI design
- Based on EverQuest 2's classic class and stat systems
- Built with ❤️ for idle game and MMORPG fans

---

**Note:** This is a prototype/demo showcasing the UI framework and core systems. Full game content (all abilities, zones, multiplayer features) is planned for future development.
