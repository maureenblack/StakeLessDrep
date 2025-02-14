class BlogLoader {
    constructor() {
        this.apiUrl = 'http://localhost:1337/api'; // This would be your Strapi URL
        this.articlesPerPage = 6;
    }

    async fetchArticles(page = 1) {
        try {
            const response = await fetch(`${this.apiUrl}/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${this.articlesPerPage}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching articles:', error);
            return null;
        }
    }

    createArticleCard(article) {
        return `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${article.attributes.coverImage.data.attributes.url}" class="card-img-top" alt="${article.attributes.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.attributes.title}</h5>
                        <p class="card-text">${article.attributes.excerpt}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">${new Date(article.attributes.publishedAt).toLocaleDateString()}</small>
                            <a href="/blog/${article.attributes.slug}" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadArticles(containerId, page = 1) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = await this.fetchArticles(page);
        if (!data) {
            container.innerHTML = '<div class="alert alert-danger">Failed to load articles</div>';
            return;
        }

        const articlesHtml = data.data.map(article => this.createArticleCard(article)).join('');
        container.innerHTML = `
            <div class="row">
                ${articlesHtml}
            </div>
            ${this.createPagination(data.meta.pagination)}
        `;

        // Setup pagination clicks
        this.setupPaginationHandlers(containerId);
    }

    createPagination(pagination) {
        const pages = [];
        for (let i = 1; i <= pagination.pageCount; i++) {
            pages.push(`
                <li class="page-item ${pagination.page === i ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `);
        }

        return `
            <nav aria-label="Blog navigation" class="mt-4">
                <ul class="pagination justify-content-center">
                    ${pages.join('')}
                </ul>
            </nav>
        `;
    }

    setupPaginationHandlers(containerId) {
        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(e.target.dataset.page);
                this.loadArticles(containerId, page);
                window.scrollTo(0, 0);
            });
        });
    }
}
