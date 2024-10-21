// Helper function to format the date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Format date as "Oct 19, 2024"
}

async function loadPosts() {
    const response = await fetch('posts/posts.json');
    const posts = await response.json();

    // Sort posts by publication date (descending)
    posts.sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));

    // 1. Main Post (first post with post_type: "main")
    const mainPost = posts.find(post => post.post_type === "main");
    const mainPostElement = document.getElementById('main-post');
    if (mainPost) {
        mainPostElement.innerHTML += ` 
            <div class="main-post"> 
                <p class="post-image"><img src="${mainPost.social_image || 'assets/default-image.png'}" alt="${mainPost.title} image" class="main-image"></p>
                <div class="main-top">
                    <div class="post-info">
                        <p class="category"><a href="category.html?category=${mainPost.category}">${mainPost.category}</a></p>
                        <p class="main-post-pub-date">${formatDate(mainPost.pub_date)}</p>
                    </div>
                    <h2 class="main-post-heading"><a href="post.html?post=${mainPost.file}">${mainPost.title}</a></h2>
                    <p class="main-post-subtitle">${mainPost.description}</p>
                </div>

                <a href="post.html?post=${mainPost.file}">
                    <button class="read-btn">
                        Read<i class="ph ph-caret-right"></i>
                    </button>
                </a>
            </div>
        `;
    } else {
        mainPostElement.innerHTML += "<p>No main post found.</p>";
    }

    // 2. Featured Posts (up to 4 posts with post_type: "featured")
    const featuredPosts = posts.filter(post => post.post_type === "featured").slice(0, 4);
    const featuredPostsElement = document.getElementById('featured-posts');


    if (featuredPosts.length > 0) {
        featuredPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <div class="featured-post">
                    <p class="post-image"><img src="${post.social_image || 'assets/default-image.png'}" alt="${post.title} image" class="featured-image"></p>
                    <div class="feature-top">
                        <h4 class="featured-post-heading"><a href="post.html?post=${post.file}">${post.title}</a></h3>
                        <p class="featured-post-subtitle">${post.description}</p>
                    </div>
                    <div class="post-info">
                        <p class="category"><a href="category.html?category=${post.category}">${mainPost.category}</a></p>
                        <p class="main-post-pub-date">${formatDate(post.pub_date)}</p>
                    </div>
                </div>
            `;
            featuredPostsElement.appendChild(postElement);
        });
    } else {
        featuredPostsElement.innerHTML += "<p>No featured posts found.</p>";
    }

    // 3. Category Sections (max 4 posts per category) 
    const categorySections = document.getElementById('category-sections');
    const categories = [...new Set(posts.map(post => post.category))]; // Get unique categories from ALL posts

    // Sort categories alphabetically
    categories.sort();

    categories.forEach(category => {
        const categoryPosts = posts.filter(post => post.category === category).slice(0, 4); // Get LATEST 4 posts in the category

        const section = document.createElement('section');
        section.classList.add('category-section');
        section.innerHTML = `
            <div class="category-heading">
                <h4 class="featured-post-heading">${category}</h4>
                <a href="category.html?category=${category}" class="view-all-button">View All</a>
            </div>
            <div class="category-posts"></div>
        `;

        const categoryPostsElement = section.querySelector('.category-posts');
        categoryPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <div class="normal-post">
                    <p class="post-image"><img src="${post.social_image || 'assets/default-image.png'}" alt="${post.title} image" class="normal-image"></p>
                    <p class="main-post-pub-date">${formatDate(post.pub_date)}</p> 
                    <div class="normal-top">
                        <h5 class="normal-post-heading"><a href="post.html?post=${post.file}">${post.title}</a></h5>
                        <p class="normal-post-subtitle">${post.description}</p>
                    </div>
                </div> 
            `;
            categoryPostsElement.appendChild(postElement);
        });
        categorySections.appendChild(section);
    });
}

async function loadPostsByCategory(category) {
    const response = await fetch('posts/posts.json');
    const posts = await response.json();

    // Fetch category.json
    const categoryResponse = await fetch('assets/category.json');
    const categories = await categoryResponse.json();

    // Get category description
    const categoryDescription = categories[category]?.description || "";

    // Set category name, description, and meta tags
    document.getElementById('category-name').textContent = category;
    document.getElementById('category-description').textContent = categoryDescription;
    document.getElementById('meta-title').textContent = category;
    document.getElementById('meta-description').content = categoryDescription;

    const filteredPosts = posts.filter(post => post.category === category);
    const postListElement = document.getElementById('post-list');

    if (filteredPosts.length === 0) {
        postListElement.innerHTML = '<p>No posts found for this category.</p>';
        return;
    }

    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('article-teaser');

        // Use default image if post.social_image is missing
        postElement.innerHTML = `
            <div class="category-post-list">
                <p class="post-image"><img src="${post.social_image || 'assets/default-image.png'}" alt="${post.title} image" class="normal-image"></p> 
                <div class="category-post-info">
                    <p class="main-post-pub-date">${formatDate(post.pub_date)}</p> 
                    <div class="category-title">
                        <h5 class="normal-post-heading"><a href="post.html?post=${post.file}">${post.title}</a></h5>
                        <p class="normal-post-subtitle">${post.description}</p>
                    </div>
                </div>
            </div>
        `;

        postListElement.appendChild(postElement);
    });
}

function loadMarkdown(file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(mdText => {
            // More robust metadata extraction
            const metadataStartIndex = mdText.indexOf('---');
            const metadataEndIndex = mdText.indexOf('---', metadataStartIndex + 3);

            let metadata = {};
            let content = mdText;

            if (metadataStartIndex !== -1 && metadataEndIndex !== -1) {
                const metadataString = mdText.substring(metadataStartIndex + 3, metadataEndIndex);
                metadata = metadataString.split('\n').reduce((acc, line) => {
                    const [key, value] = line.split(': ');
                    if (key && value) {
                        acc[key.trim()] = value.trim();
                    }
                    return acc;
                }, {});

                content = mdText.substring(metadataEndIndex + 3);
            }

            // Set title and metadata
            document.title = metadata.title || "Blog Post";
            document.getElementById('post-category').textContent = metadata.category || "Uncategorized";
            document.getElementById('post-title').textContent = metadata.title || "Untitled Post";
            document.getElementById('post-description').textContent = metadata.description || "";

            // Format the date using the formatDate function
            document.getElementById('post-author-date').textContent = "Published on " + formatDate(metadata.pub_date) + " by " + (metadata.author || "Unknown Author");

            // Set meta tags for SEO and social sharing
            document.getElementById('og-title').content = metadata.title || "Blog Post";
            document.getElementById('og-description').content = metadata.description || "";
            document.getElementById('og-image').content = metadata.social_image || "";
            document.getElementById('meta-author').content = metadata.author || "Unknown Author";
            document.getElementById('meta-description').content = metadata.description || "";

            // Convert Markdown content to HTML 
            const updatedContent = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
                return `![${alt}](posts/${src})`;
            });

            // Enable Showdown options for tables and other features
            const converter = new showdown.Converter({
                tables: true,
                simplifiedAutoLink: true,
                strikethrough: true,
                tasklists: true
            });

            let html = converter.makeHtml(updatedContent);

            // Add target="_blank" to all links in the generated HTML
            html = html.replace(/<a href="/g, '<a target="_blank" href="');

            document.getElementById('post-content').innerHTML = html;

            // Highlight code blocks using highlight.js
            hljs.highlightAll();
        })
        .catch(error => {
            console.error('Error loading Markdown file:', error);
            document.getElementById('post-content').innerHTML = '<p>Failed to load post content.</p>';
        });
}

// Event listeners to trigger loading functions based on the page
if (window.location.pathname.endsWith('index.html')) {
    loadPosts();
} else if (window.location.pathname.endsWith('category.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        loadPostsByCategory(category);
    } else {
        document.getElementById('post-list').innerHTML = '<p>No category specified.</p>';
    }
} else if (window.location.pathname.endsWith('post.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get('post');
    if (postFile) {
        loadMarkdown(`posts/${postFile}`);
    } else {
        document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
    }
}