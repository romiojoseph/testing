---
title: Blogspot template doc
description: This documentation explains how to set up and use the Blogspot template to create your own personal blog.
social_image: posts/images/image.png
author: Romio
pub_date: 2024-10-22
pub_time: 09:00 AM
updated_date: 
updated_time: 
category: blog
---
*Welcome to the markdown to html blog documentation.*

# Credit where it’s due

This template works with the help of [Showdown](https://github.com/showdownjs/showdown).

Before we begin, let me clarify a few things straightforwardly. This is specifically created to run on GitHub Pages. If you need a different approach use any LLMs and make the appropriate changes. It is simple, if I can create this without any coding knowledge, you can too.

**Knowledge and resources needed:** [VS Code](https://code.visualstudio.com/), [GitHub](https://github.com/) and [GitHub Desktop](https://desktop.github.com/download/), [Python](https://www.python.org/) needs to be installed, and of course [Obsidian](https://obsidian.md/).

#### So, you need a blogging setup, right?
You should decide whether this is a good alternative or a starting point for your blogging journey. It can be a bit technical, but it's not too difficult; <mark>***if you read the documentation***</mark>, you'll understand it.

Of course, you can skip all this hassle and just start a blog on any of the existing platforms, like Substack, Beehiiv, WordPress, or even Framer.

Every solution and alternative has its pros and cons. All we need to do is find what we can control, knowing we’re okay even without everything else.

The project is structured as follows:

```shell
blogspot/
├── assets/
│   ├── scripts
|	│   ├── create_posts_json.py
|	│   ├── generate_rss.py
|	│   ├── one_click.py
│   ├── posts.json
│   └── favicon.svg
├── posts/
│   ├── category
|	│   ├── post.md
|	│   ├── post.md
│   ├── category
|	│   ├── post.md
|	│   ├── post.md
│   ├── legal
|	│   ├── terms-and-policies.md
├── scripts/
│   └── main.js
├── styles/
│   ├── main.css
│   └── post.css
├── feed.xml
├── index.html
└── post.html
└── .gitignore
```

## How it works

You write your blog posts in a tool like Obsidian, which saves the files in `md` format. These files should be stored in the `posts` folder of your project which means open that folder as a **vault**. After writing your post, you need to edit the front matter metadata, which will help with your SEO. The front matter is the data enclosed in the format shown below. It is available in the markdown template I attached.

```yaml
---
title: Your post title [Character Limit: 50-60 characters]
description: Your post description. Keep it within 160 characters for optimal visibility, as longer descriptions may be cut off in search results.
social_image: posts/images/image.avif
author: Your name
pub_date: 2024-10-22
pub_time: 09:00 AM
updated_date: 
updated_time:
category: blog
---
```

Make sure the date format is in this style: 09:00 AM. This is the default time, and it will only display the published date. If you need to change the updated date and updated time, ensure it follows the same format as the published date and time. Additionally, if you change the time from 09:00 AM to anything else, that time will also be shown.

If you’re using Obsidian, you can switch between source mode and preview mode. In preview mode, editing the meta properties is more user-friendly. You can cross-check by switching to source mode to see it in pure YAML format.

### One time edits

You need to make changes in the JavaScript file, the `json` file, and the RSS feed generator Python script.

#### 1. main.js

Make sure you edited this field in relative to your set up.

```javascript
// Configuration Variables (Update these with your GitHub username, repository name, and optionally folder name)

const githubUsername = "username";

const githubRepositoryName = "repo-name";

const folderName = "subfolder/blogspot"; // Only change this if you're creating a folder inside a repo; otherwise, delete that name and just leave the quotes as it is.
```

`Tip: You can either create a repository for your blog and push all files and folders to it, or create a folder structure inside your repository and make your changes there.`

#### 2. posts.json

```json
"post_type": "normal"

to

"post_type": "pinned"
```

By default, the script will create all post items as `normal`. After you set one post as pinned, you won’t need to worry about the `json` file again whenever you run this script, as long as you haven’t changed the details of the pinned post. <mark>**Make sure there’s only one `pinned` post.**</mark> If the `json` file contains multiple pinned posts, only the first one displayed will be taken into account.

#### 3. feed.xml

I created this template with the idea of ditching newsletters and using a Telegram channel to share your post updates. This way, people can subscribe to your blog without revealing any of their data while still staying connected with you.

RSS feeds are beneficial because not everyone wants email alerts. If you don’t need this feature, simply delete the Python script, the related file, and the buttons from the project.

If you chose to maintain this feature, simply edit some fields in the python script.

```python
channel_info = {
	'title': 'Blogspot',
	'link': 'https://username.github.io/repository',
	'description': 'Copy paste the meta description you used in the index.html',
	'language': 'en-us',
	'lastBuildDate': last_build_date
}
```

Make sure the `pub_date` and `pub_time` in the Markdown files are not empty, as the `lastBuildDate` is created using these properties. You can check the newly generated `feed.xml` file to see it in action.

After you finish writing your initial posts and editing these one-off tasks, all you need to do is run a Python script `one_click.py` or run the script separately, but keep in mind that `posts.json` is needed to generate RSS feed. **It will take only 1 to 2 seconds to create a `json` file for post listings and an `xml` file for the RSS feed**. You can pin a single post at the top by opening the `json` file in a code editor or even Notepad and changing the relevant setting.

Once you run the script, you’ll be ready to publish. However, please check the `feed.xml` and `posts.json` files to ensure everything is correct. It's always good to be your own fact-checker.


# Still here?

You think you can do it? It's not too difficult? Then let's start. 

<button onclick="window.open('https://github.com/romiojoseph/open-source/tree/main/blogspot', '_blank');">Clone this project to your PC</button>

1. Decide whether to push this project to a repository or a folder. Either way, you'll need a project folder to open in VS Code.
2. Create a folder and open it in VS Code: `File > Open Folder`.
3. Extract the project files from the downloaded zip and paste them into this folder.
4. Open `index.html` in your code editor and open it in the [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), this will display the main blog page.
5. Update the blog name, favicon, social image, navigation menu list, Telegram link, social links, and other personal and unique details in `index.html` and `post.html`.
6. If needed, customize the design. Font sizes and colors are set as variables, so adjustments are easy.
7. Modify `main.js` as needed (e.g., username, repository name, folder structure).
8. Set up your posts vault: `Open Obsidian > Manage vault > Open folder as vault` and select the `posts` folder. **Note:** Obsidian creates folders starting with a dot (`.`), so ensure `.gitignore` is in the project.
9. Create folders as categories and files as posts in Obsidian. Use lowercase for file and folder names.
10. Ensure the front matter is correct before deciding a post as finished. It's essential for loading posts, listings, and SEO.
11. You can use the example `supported-styles.md` in the docs folder as a template.
12.  Place any images for your posts in the `posts/images/` directory. Reference the images in your Markdown files  (e.g., `posts/images/image.avif`). [Why avif or webp?](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images/) But for social images jpg or png needed. 
13. Modify the `terms-and-policies.md` file in the `legal` folder before your first commit. Do not change the file name.
14. Only change the updated date and time if you're modifying a post. If you do, use the same format as the published date. GitHub tracks commit history, so use this feature carefully.
15. Each post needs a social image. If you don't have one, create a default image (1200x630 or 1.91:1 ratio), compress it using [Squoosh](https://squoosh.app/), convert it to `avif`, and replace `default-image.avif` in the `assets` folder. Do not rename the file.
16. Ensure you've made the necessary changes to `generate_rss.py` as mentioned earlier.
17. Run the Python script by double-clicking `one_click.py`. <mark>**Note:** The `create_posts_json.py` script will correct markdown file names (e.g., remove extra spaces and fix capitalization) but won't touch the content.</mark>
18. After the script generates `posts.json` and `feed.xml`, open them in VS Code. Pin your important post and ensure the RSS feed displays the latest post at the top.
19. Now you're ready to push this blog to your GitHub repository or the folder structure you chose.
20. This step is optional, but it’s something I do for safety. Consider using separate folders for staging and production. After you’ve set up your blog for the first time, copy the entire project folder. Create a new folder, like `blog-production`, and paste the copied project there. The original folder can be your staging area.
    
    You can also create a `staging` folder as a parent and sync it with an online drive using [Syncthing](https://syncthing.net/). This way, you’ll have a local backup, an online backup, and a GitHub backup. It’s handy if you have draft files you’re still working on. When you’re done, just copy the finished files to the production folder and run the script from there.
18. Make the repository public to enable GitHub Pages.
19. After your first commit, go to GitHub repository settings: `Settings > Pages > Branch > Root`, then save. If you’re using a folder structure, the project must be in a `docs` folder.
20. If the project is directly in the repository, your blog will be live at `your-username.github.io/repository` or add the remaining folders as you created.
21. When you need to update or publish a new post, copy the latest post or posts, or any new folders, into the production folder. Then run the `one_click.py` script to keep everything up to date. Finally, open GitHub Desktop, verify the changes (especially if any post metadata was updated), and push the commit.




![alt text](images/image.png "optional title")






# Enjoy your blog!

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



>Copilot is the UI for AI, and with Copilot Studio, customers can easily create, manage, and connect agents to Copilot.<br><br>Today we announced new autonomous agent capabilities across Copilot Studio and Dynamics 365 to help scale the impact of every individual, team, and business
> 
> <cite>- John Wick (Auth 1:02-05)</cite>

<button onclick="window.open('https://telegram.org', '_blank');">Explore more here</button>

<button class="btn-primary" onclick="window.open('https://telegram.org', '_blank');">Explore more here</button>

##### Disclosure

I built this with one aim in mind: users should have control over their files. I started thinking about this a long time ago. I run my blog on Substack, but one day, they accidentally disabled my account due to a bug and said my posts didn’t meet their policies. When I contacted them, they said it was a bug and fixed it in a few hours.

From that moment, I started taking backups whenever I published new posts, but their export isn’t very user-friendly. It’s provided in HTML, which isn’t great. So, I wrote a script (of course with the help of LLMs) to convert all that HTML to Markdown, and you can access it here. The reason I’m still on Substack is that even though I built this template, they don’t include video and audio in the export. Just text and embedded images. So, I feel it’s a task. If something like that happens again, I will seriously consider moving away.