// Get all navigation links
const navLinks = document.querySelectorAll('#category-navigation a');

// Add event listener to each link
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        // Remove active class from all links
        navLinks.forEach((otherLink) => {
            otherLink.classList.remove('active');
        });

        // Add active class to the clicked link
        link.classList.add('active');
    });
});

// Helper function to format the date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Format date as "Oct 19, 2024"
}

// Helper function to format the time
function formatTime(timeString) {
    const [hours, minutes, ampm] = timeString.split(/:| /);
    return `${hours}:${minutes} ${ampm}`;
}

async function loadPosts() {
    const response = await fetch('https://raw.githubusercontent.com/romiojoseph/testing/refs/heads/main/md-to-html-blog/assets/posts.json');
    const posts = await response.json();

    // 1. Find the Pinned Post (if any)
    const pinnedPost = posts.find(post => post.post_type === "pinned");
    const pinnedPostElement = document.getElementById('pinned-post');

    if (pinnedPost) {
        pinnedPostElement.innerHTML = ` 
            <div class="main-post"> 
                <p class="post-image"><img src="${pinnedPost.social_image || 'assets/default-image.png'}" alt="${pinnedPost.title} image" class="main-image"></p>
                <div class="main-top">
                    <div class="post-info">
                        <p class="category"><a href="#">${pinnedPost.category || 'Blogging'}</a></p> 
                        <p class="main-post-pub-date">${formatDate(pinnedPost.pub_date)}</p>
                    </div>
                    <h2 class="main-post-heading"><a href="post.html?post=${pinnedPost.file}">${pinnedPost.title}</a></h2>
                    <p class="main-post-subtitle">${pinnedPost.description}</p>
                </div>

                <a href="post.html?post=${pinnedPost.file}">
                    <button class="read-btn">
                        Read<i class="ph ph-caret-right"></i>
                    </button>
                </a>
            </div>
        `;
    } else {
        pinnedPostElement.innerHTML = ''; // Clear the pinned post section if no pinned post is found
    }

    // 2. All Other Posts (including "normal" posts, sorted by date) 
    const otherPosts = posts.filter(post => post.post_type !== "pinned");
    otherPosts.sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));

    const allPostsElement = document.getElementById('all-posts');
    otherPosts.forEach(post => {
        const postElement = document.createElement('div');
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
        allPostsElement.appendChild(postElement);
    });

    // 3. Category Navigation 
    const categoryLinks = document.querySelectorAll('#category-navigation a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedCategory = link.dataset.category.toLowerCase();

            // Filter posts based on category (case-insensitive), including "normal" posts as "blogging"
            const filteredPosts = posts.filter(post =>
                (post.category && post.category.toLowerCase() === selectedCategory) ||
                (post.post_type === "normal" && selectedCategory === "blogging")
            );

            // Update the displayed posts with the filtered posts
            allPostsElement.innerHTML = ''; // Clear current posts

            if (filteredPosts.length === 0) {
                // Display "No posts found" message
                const noPostsMessage = document.createElement('p');
                noPostsMessage.textContent = "Hmm... nothing to read in this category right now.";
                noPostsMessage.className = 'normal-post-subtitle';
                allPostsElement.appendChild(noPostsMessage);
            } else {
                // Display filtered posts
                filteredPosts.forEach(post => {
                    const postElement = document.createElement('div');
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
                    allPostsElement.appendChild(postElement);
                });
            }
        });
    });
}

// Copy button functionality with error handling and fallback
function setupCopyButton() {
    const copyButton = document.getElementById('copy-link');

    if (copyButton) {
        const currentLink = window.location.href;

        copyButton.addEventListener('click', () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                // Use Clipboard API (modern browsers)
                navigator.clipboard.writeText(currentLink)
                    .then(() => {
                        alert('Link copied to clipboard!');
                    })
                    .catch(err => {
                        console.error('Error copying text (Clipboard API):', err);
                        fallbackCopyToClipboard(currentLink); // Call fallback if Clipboard API fails
                    });
            } else {
                // Fallback to document.execCommand('copy') (older browsers)
                fallbackCopyToClipboard(currentLink);
            }
        });
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    } catch (err) {
        console.error('Error copying text (fallback):', err);
        alert('Failed to copy link. Please manually select and copy the text.');
    }
    document.body.removeChild(textArea);
}

// Event listener to trigger loading functions based on the page
if (window.location.pathname.endsWith('index.html')) {
    loadPosts();
} else if (window.location.pathname.endsWith('post.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get('post');
    if (postFile) {
        loadMarkdown(`posts/${postFile}`);
        setupCopyButton(); // Set up the copy button when on post page
    } else {
        document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
    }
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

            // Format the date and time 
            let dateString = "Published on " + formatDate(metadata.pub_date);
            if (metadata.pub_time && metadata.pub_time !== "09:00 AM") {
                dateString += " at " + formatTime(metadata.pub_time);
            }
            dateString += " by " + (metadata.author || "Unknown Author");

            // Handle updated date and time 
            if (metadata.updated_date && metadata.updated_date.trim() !== "") {
                const pubDate = new Date(metadata.pub_date);
                const updatedDate = new Date(metadata.updated_date);

                if (updatedDate >= pubDate) {
                    let updatedDateString = "Updated on " + formatDate(metadata.updated_date);
                    if (metadata.updated_time && metadata.updated_time !== "09:00 AM") {
                        updatedDateString += " at " + formatTime(metadata.updated_time);
                    }
                    dateString += " (" + updatedDateString + ")";
                } else {
                    dateString += " (Error in fetching Updated date)";
                }
            }

            document.getElementById('post-author-date').textContent = dateString;

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

            // Hide the "detail-post-heading" section
            const detailPostHeading = document.querySelector('.detail-post-heading');
            if (detailPostHeading) {
                detailPostHeading.style.display = "none";
            }
        });
}

// Event listener for "Terms, and polices" link (assuming it's in the footer)
const termsLink = document.getElementById('terms-and-policies');

if (termsLink) {
    termsLink.addEventListener('click', (event) => {
        event.preventDefault();
        // Assuming the MD file is in a subfolder named 'legal'
        window.location.href = `post.html?post=legal/terms-and-policies.md`;
    });
}

document.getElementById('logo').addEventListener('click', () => {
    window.location.href = 'index.html';
});
