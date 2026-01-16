// Ability Management System
class AbilityManager {
    constructor() {
        this.abilities = this.loadAbilities();
        this.equippedAbilities = this.loadEquippedAbilities();
        this.currentSlot = null;
        this.init();
    }

    init() {
        this.setupAbilitySlots();
        this.setupConsumables();
        this.setupModalControls();
    }

    // Setup ability slot click handlers
    setupAbilitySlots() {
        const slots = document.querySelectorAll('.ability-slot');

        slots.forEach((slot, index) => {
            const settingsBtn = slot.querySelector('.ability-settings');
            if (settingsBtn) {
                settingsBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openAbilityConfig(index + 1);
                });
            }

            // Click on slot to view details
            slot.addEventListener('click', () => {
                this.showAbilityDetails(index + 1);
            });
        });
    }

    // Setup consumable slot handlers
    setupConsumables() {
        const consumables = document.querySelectorAll('.consumable-slot');

        consumables.forEach((consumable, index) => {
            const settingsBtn = consumable.querySelector('.consumable-settings');
            if (settingsBtn) {
                settingsBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openConsumableConfig(index + 1);
                });
            }
        });
    }

    // Open ability configuration modal
    openAbilityConfig(slotNumber) {
        this.currentSlot = slotNumber;
        const modal = document.getElementById('ability-config-modal');
        const slotNumberSpan = document.getElementById('modal-slot-number');

        if (slotNumberSpan) {
            slotNumberSpan.textContent = slotNumber;
        }

        // Load current ability data for this slot
        this.loadAbilityConfigData(slotNumber);

        if (window.gameUI) {
            window.gameUI.openModal('ability-config-modal');
        }
    }

    // Load ability configuration data
    loadAbilityConfigData(slotNumber) {
        const ability = this.equippedAbilities[slotNumber - 1];
        if (!ability) return;

        // Populate modal with ability data
        const abilitySelect = document.querySelector('.ability-select');
        const prioritySelect = document.querySelector('.priority-select');

        if (abilitySelect) {
            abilitySelect.value = ability.id;
        }

        if (prioritySelect) {
            prioritySelect.value = slotNumber;
        }

        // Load conditions
        this.loadConditions(ability.conditions || []);
    }

    // Load conditions into modal
    loadConditions(conditions) {
        const container = document.querySelector('.conditions-container');
        if (!container) return;

        // Clear existing conditions except first one
        const existingRows = container.querySelectorAll('.condition-row');
        for (let i = 1; i < existingRows.length; i++) {
            existingRows[i].remove();
        }

        // Populate conditions
        conditions.forEach((condition, index) => {
            if (index === 0) {
                this.setConditionValues(existingRows[0], condition);
            } else {
                this.addConditionRow(condition);
            }
        });
    }

    // Set condition values in a row
    setConditionValues(row, condition) {
        const typeSelect = row.querySelector('.condition-type');
        const operatorSelect = row.querySelector('.condition-operator');
        const valueInput = row.querySelector('.condition-value');

        if (typeSelect) typeSelect.value = condition.type;
        if (operatorSelect) operatorSelect.value = condition.operator;
        if (valueInput) valueInput.value = condition.value;
    }

    // Setup modal controls
    setupModalControls() {
        const modal = document.getElementById('ability-config-modal');
        if (!modal) return;

        // Add Condition button
        const addConditionBtn = modal.querySelector('.btn-add-condition');
        if (addConditionBtn) {
            addConditionBtn.addEventListener('click', () => {
                this.addConditionRow();
            });
        }

        // Remove Condition buttons (delegated event)
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-remove-condition')) {
                this.removeConditionRow(e.target);
            }
        });

        // Save Changes button
        const saveBtn = modal.querySelector('.modal-footer .btn-primary');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveAbilityConfig();
            });
        }

        // Reset to Default button
        const resetBtn = modal.querySelector('.modal-footer .btn-secondary:nth-child(2)');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetToDefault();
            });
        }

        // Cancel button
        const cancelBtn = modal.querySelector('.modal-footer .btn-secondary:last-child');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                if (window.gameUI) {
                    window.gameUI.closeModal('ability-config-modal');
                }
            });
        }
    }

    // Add a new condition row
    addConditionRow(condition = null) {
        const container = document.querySelector('.conditions-container');
        const existingRows = container.querySelectorAll('.condition-row');

        if (existingRows.length >= 3) {
            if (window.utils) {
                window.utils.showNotification('Maximum 3 conditions per ability', 'warning');
            }
            return;
        }

        // Add logic operator if this isn't the first condition
        if (existingRows.length >= 1) {
            const logic = document.createElement('div');
            logic.className = 'condition-logic';
            logic.innerHTML = `
                <select class="logic-operator">
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                </select>
            `;
            container.appendChild(logic);
        }

        const row = document.createElement('div');
        row.className = 'condition-row';
        row.innerHTML = `
            <span class="condition-label">Condition ${existingRows.length + 1}:</span>
            <select class="condition-type">
                <option value="target-hp">Target HP</option>
                <option value="self-hp">Self HP</option>
                <option value="self-power">Self Power</option>
                <option value="party-hp">Party Avg HP</option>
                <option value="combat-duration">Combat Duration</option>
            </select>
            <select class="condition-operator">
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
                <option value="=">=</option>
                <option value=">=">&gt;=</option>
                <option value="<=">&lt;=</option>
            </select>
            <input type="number" class="condition-value" value="50" min="0" max="100">
            <span>%</span>
            <button class="btn-remove-condition">✕</button>
        `;

        container.appendChild(row);

        if (condition) {
            this.setConditionValues(row, condition);
        }
    }

    // Remove a condition row
    removeConditionRow(btn) {
        const row = btn.closest('.condition-row');
        const container = row.closest('.conditions-container');
        const logic = row.previousElementSibling;

        // Remove logic operator if it exists
        if (logic && logic.classList.contains('condition-logic')) {
            logic.remove();
        }

        row.remove();

        // Re-number remaining conditions
        this.renumberConditions();
    }

    // Renumber condition labels
    renumberConditions() {
        const rows = document.querySelectorAll('.condition-row');
        rows.forEach((row, index) => {
            const label = row.querySelector('.condition-label');
            if (label) {
                label.textContent = `Condition ${index + 1}:`;
            }
        });
    }

    // Save ability configuration
    saveAbilityConfig() {
        if (!this.currentSlot) return;

        const abilitySelect = document.querySelector('.ability-select');
        const prioritySelect = document.querySelector('.priority-select');
        const conditionRows = document.querySelectorAll('.condition-row');
        const logicOperators = document.querySelectorAll('.logic-operator');

        // Collect conditions
        const conditions = [];
        conditionRows.forEach((row, index) => {
            const type = row.querySelector('.condition-type').value;
            const operator = row.querySelector('.condition-operator').value;
            const value = row.querySelector('.condition-value').value;

            conditions.push({
                type,
                operator,
                value: parseFloat(value)
            });

            // Add logic operator if not last condition
            if (index < conditionRows.length - 1 && logicOperators[index]) {
                conditions[index].logic = logicOperators[index].value;
            }
        });

        // Create ability config
        const config = {
            slot: this.currentSlot,
            abilityId: abilitySelect.value,
            priority: parseInt(prioritySelect.value),
            conditions: conditions
        };

        // Save to equipped abilities
        this.equippedAbilities[this.currentSlot - 1] = config;
        this.saveEquippedAbilities();

        // Update UI
        this.updateAbilitySlotDisplay(this.currentSlot);

        // Show notification
        if (window.utils) {
            window.utils.showNotification('Ability configuration saved!', 'success');
        }

        // Close modal
        if (window.gameUI) {
            window.gameUI.closeModal('ability-config-modal');
        }
    }

    // Reset ability to default
    resetToDefault() {
        if (!this.currentSlot) return;

        const defaultAbility = this.getDefaultAbility(this.currentSlot);
        this.equippedAbilities[this.currentSlot - 1] = defaultAbility;

        // Reload modal data
        this.loadAbilityConfigData(this.currentSlot);

        if (window.utils) {
            window.utils.showNotification('Reset to default configuration', 'info');
        }
    }

    // Update ability slot display
    updateAbilitySlotDisplay(slotNumber) {
        const slot = document.querySelector(`.ability-slot[data-slot="${slotNumber}"]`);
        if (!slot) return;

        const ability = this.equippedAbilities[slotNumber - 1];
        if (!ability) return;

        // Update slot display (simplified)
        console.log(`Updated slot ${slotNumber}:`, ability);
    }

    // Show ability details
    showAbilityDetails(slotNumber) {
        const ability = this.equippedAbilities[slotNumber - 1];
        if (!ability) return;

        console.log(`Showing details for slot ${slotNumber}:`, ability);
    }

    // Open consumable configuration
    openConsumableConfig(consumableNumber) {
        console.log(`Opening consumable config for slot ${consumableNumber}`);
        // Consumable config can be implemented similarly to abilities
    }

    // Data Loading/Saving (localStorage for now)
    loadAbilities() {
        // Load from localStorage or return default
        const stored = localStorage.getItem('availableAbilities');
        return stored ? JSON.parse(stored) : this.getDefaultAbilities();
    }

    loadEquippedAbilities() {
        const stored = localStorage.getItem('equippedAbilities');
        return stored ? JSON.parse(stored) : this.getDefaultEquippedAbilities();
    }

    saveEquippedAbilities() {
        localStorage.setItem('equippedAbilities', JSON.stringify(this.equippedAbilities));
    }

    // Default ability data
    getDefaultAbilities() {
        return [
            { id: 'bash-3', name: 'Bash III', tier: 'M', icon: '⚔️' },
            { id: 'defensive-2', name: 'Defensive Stance II', tier: 'A', icon: '🛡️' },
            { id: 'lifetap-4', name: 'Lifetap IV', tier: 'E', icon: '💉' },
            { id: 'soulfire-2', name: 'Soulfire II', tier: 'A', icon: '🔥' },
            { id: 'fear-1', name: 'Fear I', tier: 'A', icon: '💀' },
            { id: 'stun-3', name: 'Stun III', tier: 'A', icon: '⚡' },
            { id: 'harm-5', name: 'Harm Touch V', tier: 'M', icon: '🌟' },
            { id: 'stab-1', name: 'Stab I', tier: 'A', icon: '🗡️' },
        ];
    }

    getDefaultEquippedAbilities() {
        return [
            {
                slot: 1,
                abilityId: 'bash-3',
                priority: 1,
                conditions: [
                    { type: 'target-hp', operator: '>', value: 80 },
                    { type: 'self-power', operator: '>', value: 50, logic: 'AND' }
                ]
            },
            {
                slot: 2,
                abilityId: 'defensive-2',
                priority: 2,
                conditions: [
                    { type: 'self-hp', operator: '<', value: 60 }
                ]
            },
            // More default abilities...
        ];
    }

    getDefaultAbility(slotNumber) {
        const defaults = this.getDefaultEquippedAbilities();
        return defaults.find(a => a.slot === slotNumber) || {
            slot: slotNumber,
            abilityId: null,
            priority: slotNumber,
            conditions: []
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.abilityManager = new AbilityManager();
    console.log('Ability Manager initialized');
});
