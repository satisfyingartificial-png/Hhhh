// Combat System
class CombatManager {
    constructor() {
        this.isInCombat = false;
        this.currentEnemy = null;
        this.player = this.loadPlayerData();
        this.combatInterval = null;
        this.tickRate = 1000; // 1 second per tick
        this.init();
    }

    init() {
        this.setupZoneSelection();
        this.setupCombatControls();

        // Start auto-combat if enabled
        if (this.player.autoCombatEnabled) {
            this.startCombat();
        }
    }

    // Setup zone selection
    setupZoneSelection() {
        const zoneItems = document.querySelectorAll('.zone-item');

        zoneItems.forEach(zone => {
            zone.addEventListener('click', () => {
                this.selectZone(zone);
            });
        });
    }

    selectZone(zoneElement) {
        // Remove active from all zones
        document.querySelectorAll('.zone-item').forEach(z => {
            z.classList.remove('active');
        });

        // Add active to selected
        zoneElement.classList.add('active');

        const zoneName = zoneElement.querySelector('.zone-name').textContent;
        this.player.currentZone = zoneName;

        // Load new enemy for this zone
        this.loadNewEnemy();

        if (window.utils) {
            window.utils.showNotification(`Traveling to ${zoneName}...`, 'info');
        }
    }

    // Setup combat controls
    setupCombatControls() {
        const autoCombatCheckbox = document.querySelector('input[type="checkbox"]');

        if (autoCombatCheckbox) {
            autoCombatCheckbox.addEventListener('change', (e) => {
                this.player.autoCombatEnabled = e.target.checked;
                this.savePlayerData();

                if (e.target.checked) {
                    this.startCombat();
                } else {
                    this.stopCombat();
                }
            });
        }
    }

    // Start combat
    startCombat() {
        if (this.isInCombat) return;

        this.isInCombat = true;
        this.loadNewEnemy();

        // Start combat loop
        this.combatInterval = setInterval(() => {
            this.combatTick();
        }, this.tickRate);

        console.log('Combat started');
    }

    // Stop combat
    stopCombat() {
        this.isInCombat = false;

        if (this.combatInterval) {
            clearInterval(this.combatInterval);
            this.combatInterval = null;
        }

        console.log('Combat stopped');
    }

    // Combat tick (main combat loop)
    combatTick() {
        if (!this.currentEnemy || !this.isInCombat) return;

        // Player attacks
        this.playerAttack();

        // Enemy attacks
        this.enemyAttack();

        // Check for death
        if (this.currentEnemy.currentHp <= 0) {
            this.enemyDied();
        } else if (this.player.currentHp <= 0) {
            this.playerDied();
        }

        // Update UI
        this.updateCombatUI();
    }

    // Player attacks enemy
    playerAttack() {
        // Get equipped abilities and execute them
        const abilities = window.abilityManager?.equippedAbilities || [];

        // Find first available ability
        const usableAbility = this.findUsableAbility(abilities);

        if (usableAbility) {
            const damage = this.calculatePlayerDamage(usableAbility);
            this.currentEnemy.currentHp -= damage;

            // Update last damage display
            const lastHitElement = document.querySelector('.damage-number');
            if (lastHitElement) {
                lastHitElement.textContent = `${Math.floor(damage)} dmg`;
            }

            // Update currently using ability
            const usingElement = document.querySelector('.ability-current');
            if (usingElement && usableAbility.abilityId) {
                const abilityData = this.getAbilityData(usableAbility.abilityId);
                usingElement.textContent = abilityData ? abilityData.name : 'Auto-attack';
            }
        }
    }

    // Find usable ability based on conditions
    findUsableAbility(abilities) {
        for (const ability of abilities) {
            if (this.checkAbilityConditions(ability)) {
                return ability;
            }
        }
        return null;
    }

    // Check if ability conditions are met
    checkAbilityConditions(ability) {
        if (!ability.conditions || ability.conditions.length === 0) {
            return true;
        }

        let result = this.evaluateCondition(ability.conditions[0]);

        for (let i = 1; i < ability.conditions.length; i++) {
            const condition = ability.conditions[i];
            const conditionResult = this.evaluateCondition(condition);

            if (ability.conditions[i - 1].logic === 'AND') {
                result = result && conditionResult;
            } else if (ability.conditions[i - 1].logic === 'OR') {
                result = result || conditionResult;
            }
        }

        return result;
    }

    // Evaluate a single condition
    evaluateCondition(condition) {
        let currentValue = 0;

        switch (condition.type) {
            case 'target-hp':
                currentValue = (this.currentEnemy.currentHp / this.currentEnemy.maxHp) * 100;
                break;
            case 'self-hp':
                currentValue = (this.player.currentHp / this.player.maxHp) * 100;
                break;
            case 'self-power':
                currentValue = (this.player.currentPower / this.player.maxPower) * 100;
                break;
            case 'party-hp':
                currentValue = 100; // Simplified
                break;
            case 'combat-duration':
                currentValue = this.currentEnemy.combatDuration || 0;
                break;
        }

        switch (condition.operator) {
            case '>':
                return currentValue > condition.value;
            case '<':
                return currentValue < condition.value;
            case '=':
                return Math.abs(currentValue - condition.value) < 1;
            case '>=':
                return currentValue >= condition.value;
            case '<=':
                return currentValue <= condition.value;
            default:
                return true;
        }
    }

    // Calculate player damage
    calculatePlayerDamage(ability) {
        const baseDamage = this.player.stats.attack + (Math.random() * 100);
        const tierMultiplier = this.getAbilityTierMultiplier(ability);

        return baseDamage * tierMultiplier;
    }

    // Get ability tier multiplier
    getAbilityTierMultiplier(ability) {
        const abilityData = this.getAbilityData(ability.abilityId);
        if (!abilityData) return 1.0;

        switch (abilityData.tier) {
            case 'M': return 1.75; // Master
            case 'E': return 1.50; // Expert
            case 'A': return 1.25; // Adept
            default: return 1.0; // Apprentice
        }
    }

    // Get ability data
    getAbilityData(abilityId) {
        if (!window.abilityManager) return null;
        return window.abilityManager.abilities.find(a => a.id === abilityId);
    }

    // Enemy attacks player
    enemyAttack() {
        const damage = this.calculateEnemyDamage();
        this.player.currentHp -= damage;

        // Use consumables if needed
        this.checkConsumables();
    }

    // Calculate enemy damage
    calculateEnemyDamage() {
        const baseDamage = this.currentEnemy.attack + (Math.random() * 50);
        const mitigated = baseDamage * (1 - this.player.stats.mitigation);

        return Math.max(1, mitigated);
    }

    // Check and use consumables
    checkConsumables() {
        // Health potion check (HP < 30%)
        if ((this.player.currentHp / this.player.maxHp) < 0.3) {
            this.useHealthPotion();
        }

        // Power potion check (Power < 20%)
        if ((this.player.currentPower / this.player.maxPower) < 0.2) {
            this.usePowerPotion();
        }
    }

    // Use health potion
    useHealthPotion() {
        if (this.player.consumables.healthPotions > 0) {
            this.player.currentHp = Math.min(
                this.player.currentHp + (this.player.maxHp * 0.3),
                this.player.maxHp
            );
            this.player.consumables.healthPotions--;
            this.updateConsumableDisplay();
        }
    }

    // Use power potion
    usePowerPotion() {
        if (this.player.consumables.powerPotions > 0) {
            this.player.currentPower = Math.min(
                this.player.currentPower + (this.player.maxPower * 0.3),
                this.player.maxPower
            );
            this.player.consumables.powerPotions--;
            this.updateConsumableDisplay();
        }
    }

    // Enemy died
    enemyDied() {
        console.log('Enemy defeated!');

        // Award XP
        this.player.experience += this.currentEnemy.xp;

        // Generate loot
        this.generateLoot();

        // Load new enemy
        setTimeout(() => {
            this.loadNewEnemy();
        }, 500);
    }

    // Player died
    playerDied() {
        console.log('You died!');
        this.stopCombat();

        // Respawn with full HP
        this.player.currentHp = this.player.maxHp;
        this.player.currentPower = this.player.maxPower;

        if (window.utils) {
            window.utils.showNotification('You have been defeated! Respawning...', 'danger');
        }

        // Restart combat after delay
        setTimeout(() => {
            if (this.player.autoCombatEnabled) {
                this.startCombat();
            }
        }, 2000);
    }

    // Load new enemy
    loadNewEnemy() {
        const enemy = this.generateEnemy();
        this.currentEnemy = enemy;
        this.updateEnemyDisplay();
    }

    // Generate enemy based on zone
    generateEnemy() {
        const level = 40 + Math.floor(Math.random() * 10);
        const isElite = Math.random() < 0.2;

        return {
            name: this.getRandomEnemyName(),
            level: level,
            maxHp: level * 200 * (isElite ? 1.5 : 1),
            currentHp: level * 200 * (isElite ? 1.5 : 1),
            attack: level * 10,
            isElite: isElite,
            xp: level * 50 * (isElite ? 2 : 1),
            combatDuration: 0
        };
    }

    // Get random enemy name
    getRandomEnemyName() {
        const names = [
            'Orc Warrior', 'Goblin Shaman', 'Dark Knight', 'Shadow Beast',
            'Fire Elemental', 'Ice Wraith', 'Stone Golem', 'Void Creature',
            'Demon Scout', 'Undead Champion', 'Dragon Whelp', 'Corrupted Treant'
        ];
        return names[Math.floor(Math.random() * names.length)];
    }

    // Generate loot
    generateLoot() {
        const loot = [];

        // Gold (always)
        const gold = this.currentEnemy.level * (10 + Math.floor(Math.random() * 10));
        loot.push({ type: 'gold', amount: gold, icon: '💰' });

        // Random materials (60% chance)
        if (Math.random() < 0.6) {
            loot.push({
                type: 'material',
                name: 'Iron Ore',
                amount: Math.floor(Math.random() * 5) + 1,
                icon: '⛏️'
            });
        }

        // Tome drop (15% chance)
        if (Math.random() < 0.15) {
            loot.push({
                type: 'tome',
                name: 'Bash II (Adept)',
                tier: 'Adept',
                icon: '📖'
            });
        }

        // Equipment drop (10% chance)
        if (Math.random() < 0.10) {
            loot.push({
                type: 'equipment',
                name: 'Rusty Sword',
                rarity: 'uncommon',
                icon: '⚔️'
            });
        }

        this.addLootToDisplay(loot);
        this.player.gold += gold;
    }

    // Add loot to display
    addLootToDisplay(loot) {
        const lootList = document.querySelector('.loot-list');
        if (!lootList) return;

        // Clear old loot (keep only last 4 items)
        while (lootList.children.length >= 4) {
            lootList.removeChild(lootList.firstChild);
        }

        // Add new loot
        loot.forEach(item => {
            const lootElement = document.createElement('div');
            lootElement.className = 'loot-item';

            if (item.type === 'tome') {
                lootElement.classList.add('loot-tome');
            } else if (item.type === 'equipment') {
                lootElement.classList.add('loot-equipment');
            }

            let itemText = item.name;
            if (item.amount > 1) {
                itemText += ` x${item.amount}`;
            }

            lootElement.innerHTML = `
                <span class="loot-icon">${item.icon}</span>
                <span class="loot-name">${itemText}</span>
                ${item.type === 'tome' ? '<button class="use-btn">USE</button>' : ''}
            `;

            lootList.appendChild(lootElement);

            // Animate in
            setTimeout(() => {
                lootElement.style.animation = 'slideInRight 0.3s ease';
            }, 10);
        });
    }

    // Update combat UI
    updateCombatUI() {
        this.updateEnemyDisplay();
        this.updatePlayerDisplay();
        this.updateConsumableDisplay();
    }

    // Update enemy display
    updateEnemyDisplay() {
        if (!this.currentEnemy) return;

        // Update enemy name
        const nameElement = document.querySelector('.enemy-name');
        if (nameElement) {
            const eliteSpan = this.currentEnemy.isElite ? '<span class="enemy-elite">⭐ Elite</span>' : '';
            nameElement.innerHTML = `${this.currentEnemy.name} ${eliteSpan}`;
        }

        // Update health bar
        const healthFill = document.querySelector('.current-combat-box .health-fill');
        const healthText = document.querySelector('.current-combat-box .health-text');

        if (healthFill && healthText) {
            const percent = (this.currentEnemy.currentHp / this.currentEnemy.maxHp) * 100;
            healthFill.style.width = `${percent}%`;
            healthText.textContent = `${Math.floor(this.currentEnemy.currentHp)} / ${this.currentEnemy.maxHp}`;
        }

        // Update level
        const levelElement = document.querySelector('.enemy-level');
        if (levelElement) {
            levelElement.textContent = `⚔️ Lv.${this.currentEnemy.level}`;
        }

        // Update victory timer
        const timerElement = document.querySelector('.victory-timer');
        if (timerElement) {
            const timeLeft = Math.ceil((this.currentEnemy.currentHp / this.player.stats.attack) * 2);
            timerElement.textContent = `⏱️ Victory in ~${timeLeft}s`;
        }
    }

    // Update player display
    updatePlayerDisplay() {
        // Health bar
        const healthBar = document.querySelector('.player-status-box .health-bar-small');
        if (healthBar) {
            const percent = (this.player.currentHp / this.player.maxHp) * 100;
            const fill = healthBar.querySelector('.progress-fill');
            const text = healthBar.querySelector('.progress-text');

            if (fill) fill.style.width = `${percent}%`;
            if (text) text.textContent = `${Math.floor(this.player.currentHp)} / ${this.player.maxHp} (${Math.floor(percent)}%)`;
        }

        // Power bar
        const powerBar = document.querySelector('.player-status-box .power-bar-small');
        if (powerBar) {
            const percent = (this.player.currentPower / this.player.maxPower) * 100;
            const fill = powerBar.querySelector('.progress-fill');
            const text = powerBar.querySelector('.progress-text');

            if (fill) fill.style.width = `${percent}%`;
            if (text) text.textContent = `${Math.floor(this.player.currentPower)} / ${this.player.maxPower} (${Math.floor(percent)}%)`;
        }

        // Regenerate power
        this.player.currentPower = Math.min(
            this.player.currentPower + (this.player.maxPower * 0.05),
            this.player.maxPower
        );
    }

    // Update consumable display
    updateConsumableDisplay() {
        const healthPotCount = document.querySelector('.consumable-slot:nth-child(1) .consumable-count');
        if (healthPotCount) {
            healthPotCount.textContent = this.player.consumables.healthPotions;
        }
    }

    // Load player data
    loadPlayerData() {
        const stored = localStorage.getItem('playerData');
        return stored ? JSON.parse(stored) : this.getDefaultPlayerData();
    }

    // Save player data
    savePlayerData() {
        localStorage.setItem('playerData', JSON.stringify(this.player));
    }

    // Get default player data
    getDefaultPlayerData() {
        return {
            name: 'Wisbe',
            class: 'Shadowknight',
            level: 45,
            experience: 0,
            currentZone: 'Cave Zone',
            autoCombatEnabled: true,
            maxHp: 15000,
            currentHp: 12540,
            maxPower: 5000,
            currentPower: 3200,
            gold: 0,
            stats: {
                strength: 245,
                stamina: 198,
                agility: 95,
                intelligence: 80,
                wisdom: 75,
                attack: 450,
                defense: 380,
                mitigation: 0.45,
                critChance: 0.12,
                critBonus: 0.28
            },
            consumables: {
                healthPotions: 15,
                powerPotions: 5,
                food: 8
            }
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.combatManager = new CombatManager();
    console.log('Combat Manager initialized');
});
