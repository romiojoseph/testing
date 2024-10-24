---
title: Blogspot template documentation doc
description: This documentation explains how to set up and use the Blogspot template to create your own personal blog.
social_image: posts/images/image.png
author: Romio
pub_date: 2024-10-22
pub_time: 09:00 AM
updated_date: 2025-01-25
updated_time: 09:59 AM
category: blog
---

### 1. Project Structure

The project is structured as follows:

```
blog-project/
├── assets/
├── posts/
├── scripts/
│   └── main.js
├── styles/
│   ├── category.css
│   ├── main.css
│   └── post.css
├── category.html
├── index.html
└── post.html
```

### 2. Getting Started

1. Download  the repository:
```bash
https://github.com/romiojoseph/markdown-html-blog
```

2. Open `index.html` in your code editor and open it in the live server:
   This will display the main blog page. 

### 3. Adding Your Content

1. **Create your blog posts:**
   * Create new Markdown (`.md`) files in the `posts/` directory for each blog post using tools like Obsidian. I use it myself, and that's why I recommend it. It's great for writing blogs, notes, and more.
   * You can use the example `supported-styles.md` as a template.
   * **Frontmatter:** Each post should start with a YAML frontmatter block at the top enclosed in `---` to define metadata:
```yaml
 ---
 title: Blog title
 description: A brief summary of my post.
 social_image: images/my-post-image.jpg
 author: Your Name
 pub_date: 2024-10-26 
 category: Technology
 ---
```
Please note that all blog images are now being pulled from an `images` folder inside the `posts` directory, and the main blog items are from the `assets` folder in the root directory.

![alt text](./posts/images/image.png "optional title")

![alt text](/posts/images/image.png "optional title")

alt text](/images/image.png "optional title"

2. **Update `posts.json`:**
   * Add an entry for each of your blog posts to the `posts.json` file. 
   * The `file` property should match the filename of your Markdown file (e.g., `my-first-post.md`).
   * The other metadata (title, description, etc.) should be the same as in your Markdown frontmatter.

```json
[
   {
	   "file": "my-first-post.md",
	   "title": "My Awesome Blog Post",
	   "description": "A brief summary of my post.",
	   "social_image": "posts/images/my-post-image.jpg",
	   "author": "Your Name",
	   "pub_date": "2024-10-26",
	   "category": "Technology", 
	   "post_type": "normal" // Can be "main", "featured", or "normal"
   },
   // Add more posts here...
]
```

3. **Add images:**
   * Place any images for your posts in the `posts/images/` directory.
   * Reference the images in your Markdown files  (e.g., `posts/images/my-image.jpg`).
### 4. Customization

**Blog Name and Logo:**
   * Update the blog name in `index.html`, `category.html`, and `post.html`:
   * Replace `assets/favicon.png` with your own logo image in the HTML files and update the `alt` text accordingly.

**Social Media Links:**
   * Update the links in the footer and in the Telegram buttons to your own social media profiles or Telegram channel.

**About Section:**
   * Edit the content of the "About this blog" section in the footer of `index.html` to describe your blog and yourself.

**Categories:**
   * Edit blog post categories in `posts.json` and in the `posts` folder. 
   * Update `category.json` file in the `assets/` directory to provide descriptions for each category:
   
```json
 {
	 "Technology": {
		 "description": "Posts about the latest tech trends and gadgets."
	 },
	 "Travel": {
		 "description": "My adventures around the world." 
	 }
	 // Add more categories...
 }
```

**Styling:**
   * You can customize the look and feel of your blog by editing the CSS files in the `styles/` directory.
   * The `main.css` file contains the base styles, while `category.css` and `post.css` contain styles specific to the category and post pages respectively.

### 5. Deployment

You can deploy your blog to any web hosting service that supports static websites, such as GitHub Pages, Netlify, or Vercel. The steps for deployment will vary depending on the service you choose.

I built this specifically for GitHub Pages because I love the idea that anyone can code and present their ideas in a simple form. I think and believe [users need to own and have control over their content](https://romio.substack.com/p/open-design-tools-data-ownership-portability). To achieve this, we should own the code so we can be free to move anytime, anywhere. Full disclosure; I'm still running my blog on Substack, but I'm planning to move soon.

**Example: Deploying to GitHub Pages**

1. Create a new repository on GitHub.
2. Push your blog project to this repository.
3. Go to the **Settings** tab of your repository and scroll down to the **GitHub Pages** section.
4. Select the **main** branch and **root** folder as the source and click **Save**.
5. Your blog link will be displayed at the top of that page soon after GitHub completes the build.
### 6. Enjoy your blog!

You can now start writing and publishing your blog posts. The template provides a clean design, along with the flexibility to customize it to your liking. 
#### Important notes:

- I am a non-coder who uses LLMs (Claude, Mistral, Meta AI, ChatGPT, and Gemini) to generate scripts tailored to my needs. These resources are shared openly for anyone to use.
- Please keep in mind that I don't have formal coding knowledge, so the code structure, syntax, or best practices might not be optimal or conventional.
- I appreciate any feedback, suggestions, or contributions from experienced coders to improve these scripts and make them more efficient, readable, and maintainable.
<iframe 
    width="100%" 
    height="450" 
    style="
        border-radius: 24px; 
        margin: 24px 0; 
        overflow: hidden; 
        opacity: 1;
    " 
    src="https://www.youtube.com/embed/F_pInoR8Dcs?si=JGmVZr9ufT6lRj14" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen>
</iframe>

Tip: You can use the iframe embed code and link YouTube videos and Spotify podcasts/songs.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Copilot is the UI for AI, and with Copilot Studio, customers can easily create, manage, and connect agents to Copilot.<br><br>Today we announced new autonomous agent capabilities across Copilot Studio and Dynamics 365 to help scale the impact of every individual, team, and business…</p>&mdash; Satya Nadella (@satyanadella) <a href="https://twitter.com/satyanadella/status/1848310867709862137?ref_src=twsrc%5Etfw">October 21, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Copilot is the UI for AI, and with Copilot Studio, customers can easily create, manage, and connect agents to Copilot.<br><br>Today we announced new autonomous agent capabilities across Copilot Studio and Dynamics 365 to help scale the impact of every individual, team, and business…</p>&mdash; Satya Nadella (@satyanadella) <a href="https://twitter.com/satyanadella/status/1848310867709862137?ref_src=twsrc%5Etfw">October 21, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


> Hm… so from all the tests on local, apart from the issues with bad query plans where I had to rewrite the queries, Postgres seems to end up as the fastest option in most cases. I might have to actually pick it 🫣
> 
> Interesting… so I was going to post the numbers for firehose processing speed (with MySQL being 1/3 slower than Pg and SQLite), but I started digging and I found one hot point (missing index needed for post delete), and now all 3 are roughly equal (with SQLite also ~1/3 faster than before) 😅
> 
> <cite>- John Wick (Auth 1:02-05)</cite>

