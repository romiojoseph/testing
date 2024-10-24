import json
import os
from datetime import datetime
from xml.sax.saxutils import escape

def load_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def format_date(date_str, time_str):
    date_time_str = f"{date_str} {time_str}"
    date_time_obj = datetime.strptime(date_time_str, "%Y-%m-%d %I:%M %p")
    return date_time_obj.strftime("%a, %d %b %Y %H:%M:%S +0000")

def generate_rss(posts, channel_info):
    rss_items = []
    for post in posts:
        pub_date = format_date(post['pub_date'], post['pub_time'])
        link = f"{channel_info['link']}/post.html?post={post['file']}"
        description = escape(post['description'])
        rss_items.append(f"""
    <item>
      <title>{post['title']}</title>
      <link>{link}</link>
      <description>{description}</description>
      <pubDate>{pub_date}</pubDate>
    </item>
        """)

    rss_feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>{channel_info['title']}</title>
    <link>{channel_info['link']}</link>
    <description>{channel_info['description']}</description>
    <language>{channel_info['language']}</language>
    <lastBuildDate>{channel_info['lastBuildDate']}</lastBuildDate>
    {''.join(rss_items)}
  </channel>
</rss>
    """
    return rss_feed

def save_rss_feed(rss_feed, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(rss_feed)

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_file_path = os.path.join(script_dir, '..', 'posts.json')
    posts = load_json(json_file_path)

    # Sort posts by publication date and time
    posts.sort(key=lambda x: (x['pub_date'], x['pub_time']), reverse=True)

    # Get the most recent publication date and time for lastBuildDate
    if posts:
        latest_post = posts[0]
        last_build_date = format_date(latest_post['pub_date'], latest_post['pub_time'])
    else:
        last_build_date = format_date('2024-01-01', '00:00 AM')  # Default value if no posts

    channel_info = {
        'title': 'Blogspot',
        'link': 'https://romiojoseph.github.io/testing',
        'description': 'A simple markdown to html blog',
        'language': 'en-us',
        'lastBuildDate': last_build_date
    }

    rss_feed = generate_rss(posts, channel_info)
    save_rss_feed(rss_feed, os.path.join(script_dir, '..', '..', 'feed.xml'))

if __name__ == "__main__":
    main()
