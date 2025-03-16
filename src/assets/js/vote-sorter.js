class VoteSorter {
    constructor() {
        this.container = document.querySelector('.container');
        this.votes = Array.from(document.querySelectorAll('.card.mb-3'));
    }

    extractDate(voteElement) {
        const dateElement = voteElement.querySelector('.vote-date');
        if (!dateElement) return new Date(0); // Default to oldest if no date found
        
        const dateText = dateElement.textContent;
        return new Date(dateText);
    }

    sortVotes() {
        // Sort votes by date, newest first
        this.votes.sort((a, b) => {
            const dateA = this.extractDate(a);
            const dateB = this.extractDate(b);
            return dateB - dateA;
        });

        // Get the container where votes should be inserted
        const votingHistorySection = document.querySelector('.container h1').parentElement;
        
        // Remove existing votes
        this.votes.forEach(vote => vote.remove());
        
        // Insert votes in sorted order after the stats section
        const statsSection = document.querySelector('.row.mb-5');
        if (statsSection) {
            this.votes.forEach(vote => {
                statsSection.insertAdjacentElement('afterend', vote);
            });
        }
    }
}

// Initialize vote sorter when DOM is ready
function initVoteSorter() {
    const sorter = new VoteSorter();
    sorter.sortVotes();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVoteSorter);
} else {
    initVoteSorter();
}
