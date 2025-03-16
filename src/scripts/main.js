// Voting history functionality
class VotingHistory {
    constructor() {
        this.votes = [];
        this.sortVotes();
    }

    addVote(vote) {
        this.votes.unshift(vote);
    }

    getLatestVotes(count = 3) {
        return this.votes.slice(0, count);
    }

    sortVotes() {
        const votes = Array.from(document.querySelectorAll('.card.mb-3'));
        if (!votes.length) return;

        // Sort votes by date, newest first
        votes.sort((a, b) => {
            const dateA = this.extractDate(a);
            const dateB = this.extractDate(b);
            return dateB - dateA;
        });

        // Get the container and stats section
        const statsSection = document.querySelector('.row.mb-5');
        if (!statsSection) return;

        // Remove and reinsert votes in sorted order
        votes.forEach(vote => {
            vote.remove();
            statsSection.insertAdjacentElement('afterend', vote);
        });
    }

    extractDate(voteElement) {
        const dateElement = voteElement.querySelector('.vote-date');
        if (!dateElement) return new Date(0);
        return new Date(dateElement.textContent);
    }
}

// Blog Posts Data
const blogPosts = [
    {
        title: "Reflections from Douala: Building Bridges in African Governance",
        category: "Community",
        date: "January 15, 2025",
        readTime: "4 min read",
        excerpt: "Insights and learnings from the Cardano governance workshop in Cameroon...",
        image: "https://picsum.photos/400/300"
    },
    {
        title: "Understanding CIP-1694: A Developer's Perspective",
        category: "Technical",
        date: "December 28, 2024",
        readTime: "7 min read",
        excerpt: "Breaking down the technical implications of the new governance system...",
        image: "https://picsum.photos/400/300"
    },
    {
        title: "The Role of DReps in Emerging Markets",
        category: "Governance",
        date: "December 15, 2024",
        readTime: "5 min read",
        excerpt: "How decentralized representation can empower developing economies...",
        image: "https://picsum.photos/400/300"
    }
];

// Load Blog Posts
function loadBlogPosts() {
    const blogGrid = document.getElementById('blog-posts');
    if (!blogGrid) return;

    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'col-md-4 mb-4';
        postElement.innerHTML = `
            <div class="card h-100">
                <img src="${post.image}" class="card-img-top" alt="${post.title}">
                <div class="card-body">
                    <span class="post-category">${post.category}</span>
                    <h3 class="card-title">${post.title}</h3>
                    <p class="post-meta">${post.date} • ${post.readTime}</p>
                    <p class="card-text">${post.excerpt}</p>
                    <a href="#" class="btn btn-outline-primary">Read More</a>
                </div>
            </div>
        `;
        blogGrid.appendChild(postElement);
    });
}

// Handle Newsletter Form
function handleNewsletterSubmit(event) {
    const form = event.target;
    if (form.classList.contains('newsletter-form')) {
        event.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            // Here you would typically send this to your backend
            alert('Thank you for subscribing! We\'ll keep you updated.');
            emailInput.value = '';
        }
    }
}

// Handle Resource Search
function handleResourceSearch(event) {
    const searchInput = event.target;
    if (!searchInput.id === 'resourceSearch') return;

    const searchTerm = searchInput.value.toLowerCase();
    const resourceItems = document.querySelectorAll('.resource-item');

    resourceItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
        item.style.display = isVisible ? 'block' : 'none';
    });
}

// Copy DRep ID functionality
function copyDrepId() {
    const drepId = 'drep1j4llv3mhppzqvu39xzfwj6p26rysc5fd3nqzrpefly3vx3ya34a';
    navigator.clipboard.writeText(drepId).then(() => {
        const button = document.querySelector('.cta-section button');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check me-2"></i>Copied!';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load blog posts if we're on the blog page
    loadBlogPosts();

    // Initialize voting history if we're on the votes page
    if (window.location.pathname.includes('votes.html')) {
        new VotingHistory();
    }

    // Handle newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Handle resource search
    const resourceSearchInput = document.getElementById('resource-search');
    if (resourceSearchInput) {
        resourceSearchInput.addEventListener('input', handleResourceSearch);
    }

    // Initialize copy DRep ID functionality
    const copyDrepIdButton = document.getElementById('copy-drep-id');
    if (copyDrepIdButton) {
        copyDrepIdButton.addEventListener('click', copyDrepId);
    }
});
