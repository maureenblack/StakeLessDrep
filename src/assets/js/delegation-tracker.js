// Cardano delegation tracking
class DelegationTracker {
    constructor() {
        this.drepId = 'drep1j4llv3mhppzqvu39xzfwj6p26rysc5fd3nqzrpefly3vx3ya34a';
        this.cardanoscanUrl = `https://cardanoscan.io/drep/${this.drepId}`;
        this.delegationAmount = 0;
        this.lastUpdateTime = null;
    }

    async fetchDelegatedAda() {
        try {
            // First try to fetch the page content
            const response = await fetch(this.cardanoscanUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const html = await response.text();
            console.log('Got Cardanoscan response');

            // Create a temporary element to parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Find the voting power element
            // This will need to be adjusted based on the actual HTML structure
            const votingPowerElement = doc.querySelector('.voting-power');
            if (votingPowerElement) {
                const votingPower = parseFloat(votingPowerElement.textContent.replace(/[^0-9.]/g, ''));
                this.delegationAmount = votingPower;
                this.lastUpdateTime = new Date();
                console.log('Total ADA delegated:', this.delegationAmount);
            } else {
                console.log('Could not find voting power element, using link instead');
                // If we can't get the value directly, provide a link
                const statNumber = document.querySelector('[data-type="ada-delegated"]');
                if (statNumber) {
                    statNumber.innerHTML = `<a href="${this.cardanoscanUrl}" target="_blank" class="btn btn-sm btn-primary">View on Cardanoscan</a>`;
                }
                return null;
            }
            
            // Update the UI
            this.updateUI();
            return this.delegationAmount;
        } catch (error) {
            console.error('Error fetching delegation data:', error);
            const statNumber = document.querySelector('[data-type="ada-delegated"]');
            if (statNumber) {
                statNumber.innerHTML = `<a href="${this.cardanoscanUrl}" target="_blank" class="btn btn-sm btn-primary">View on Cardanoscan</a>`;
            }
            return null;
        }
    }

    updateUI() {
        console.log('Updating UI...');
        const statNumber = document.querySelector('[data-type="ada-delegated"]');
        if (statNumber) {
            if (this.delegationAmount > 0) {
                // Format the number with commas for better readability
                const formattedNumber = Math.floor(this.delegationAmount).toLocaleString();
                statNumber.innerHTML = `
                    <div>${formattedNumber}</div>
                    <small><a href="${this.cardanoscanUrl}" target="_blank">View on Cardanoscan</a></small>
                `;
            } else {
                statNumber.innerHTML = `<a href="${this.cardanoscanUrl}" target="_blank" class="btn btn-sm btn-primary">View on Cardanoscan</a>`;
            }
            
            // Update the time if we have a value
            if (this.delegationAmount > 0) {
                const updateTime = document.querySelector('.update-time');
                if (updateTime) {
                    updateTime.textContent = `Last updated: ${this.lastUpdateTime.toLocaleTimeString()}`;
                }
            }
        } else {
            console.error('Could not find element with data-type="ada-delegated"');
        }
    }

    startTracking() {
        // Initial fetch immediately
        this.fetchDelegatedAda();
        
        // Update every 30 seconds
        setInterval(() => {
            this.fetchDelegatedAda();
        }, 30000);
    }
}

// Initialize tracker when DOM is ready
const initTracker = () => {
    console.log('Initializing delegation tracker...');
    const tracker = new DelegationTracker();
    tracker.startTracking();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracker);
} else {
    initTracker();
}
