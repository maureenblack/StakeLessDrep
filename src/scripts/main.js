// Voting history functionality
class VotingHistory {
    constructor() {
        this.votes = [];
    }

    addVote(vote) {
        this.votes.unshift(vote);
    }

    getLatestVotes(count = 3) {
        return this.votes.slice(0, count);
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load blog posts if we're on the blog page
    loadBlogPosts();

    // Add event listeners
    document.addEventListener('submit', handleNewsletterSubmit);
    
    // Add search functionality if we're on the resources page
    const searchInput = document.getElementById('resourceSearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleResourceSearch);
    }
});
