// Main Application Controller
class GameUI {
    constructor() {
        this.currentView = 'combat';
        this.currentTab = 'combat-zones';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupTabs();
        this.setupModals();
        this.loadView('combat');
    }

    // Navigation System
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const viewName = item.getAttribute('data-view');
                if (viewName) {
                    this.loadView(viewName);
                    this.setActiveNav(item);
                }
            });
        });
    }

    setActiveNav(activeItem) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked item
        activeItem.classList.add('active');
    }

    loadView(viewName) {
        // Hide all views
        document.querySelectorAll('.view-container').forEach(view => {
            view.classList.remove('active');
        });

        // Show requested view
        const viewMap = {
            'character-sheet': 'character-sheet-view',
            'combat': 'combat-view',
            'dungeons': 'combat-view', // Navigates to Combat view with Dungeons tab
            'raids': 'combat-view', // Navigates to Combat view with Raids tab
            'party-finder': 'combat-view', // Navigates to Combat view with Find Party tab
            // Gathering Skills
            'woodcutting': 'woodcutting-view',
            'mining': 'mining-view',
            'foraging': 'foraging-view',
            'fishing': 'fishing-view',
            // Crafting Skills
            'weaponsmithing': 'weaponsmithing-view',
            'armorsmithing': 'armorsmithing-view',
            'scribing': 'scribing-view',
            'alchemy': 'alchemy-view',
            'tailoring': 'tailoring-view',
            'cooking': 'cooking-view',
            // Social Views
            'guild': 'guild-view',
            'trading': 'trading-view',
            'mail': 'mail-view',
            'friends': 'friends-view',
            'leaderboards': 'leaderboards-view',
            // System Views
            'quests': 'quests-view',
            'achievements': 'achievements-view',
        };

        const viewId = viewMap[viewName] || 'combat-view';
        const targetView = document.getElementById(viewId);

        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewName;
        }
    }

    // Tab System
    setupTabs() {
        const tabs = document.querySelectorAll('.tab');

        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = tab.getAttribute('data-tab');
                this.switchTab(tabName);
                this.setActiveTab(tab);
            });
        });
    }

    setActiveTab(activeTab) {
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Add active class to clicked tab
        activeTab.classList.add('active');
    }

    switchTab(tabName) {
        this.currentTab = tabName;

        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Show the selected tab content
        const targetContent = document.querySelector(`[data-tab-content="${tabName}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        console.log(`Switched to tab: ${tabName}`);
    }

    // Modal System
    setupModals() {
        const modal = document.getElementById('ability-config-modal');
        const closeBtn = modal.querySelector('.modal-close');

        // Close modal on X button
        closeBtn.addEventListener('click', () => {
            this.closeModal('ability-config-modal');
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal('ability-config-modal');
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal('ability-config-modal');
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }
}

// Utility Functions
class Utils {
    static formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    static formatPercent(value, total) {
        return Math.floor((value / total) * 100);
    }

    static updateProgressBar(elementId, current, max) {
        const element = document.getElementById(elementId);
        if (element) {
            const percent = this.formatPercent(current, max);
            const fill = element.querySelector('.progress-fill');
            const text = element.querySelector('.progress-text');

            if (fill) fill.style.width = `${percent}%`;
            if (text) text.textContent = `${current} / ${max} (${percent}%)`;
        }
    }

    static showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--bg-secondary);
            border: 2px solid var(--accent-primary);
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Helper function to switch to Find Party tab (used by buttons in dungeons/raids/party views)
function switchToFindPartyTab() {
    if (window.gameUI) {
        // Switch to find-party tab
        const findPartyTab = document.querySelector('.tab[data-tab="find-party"]');
        if (findPartyTab) {
            window.gameUI.switchTab('find-party');
            window.gameUI.setActiveTab(findPartyTab);
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameUI = new GameUI();
    window.utils = Utils;

    console.log('Game UI initialized');
});
