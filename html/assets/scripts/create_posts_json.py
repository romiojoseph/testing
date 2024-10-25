import os
import json
import frontmatter
import re
from datetime import date

def generate_posts_json():
    # Define relative paths based on the script's location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, '..', '..'))
    posts_dir = os.path.join(project_root, 'posts')
    output_file = os.path.join(project_root, 'assets', 'posts.json')
    existing_posts = {}

    # Ensure the assets directory exists
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    # Load existing posts.json if it exists
    if os.path.exists(output_file):
        with open(output_file, 'r', encoding='utf-8') as f:
            existing_posts = {post['file']: post for post in json.load(f)}

    posts_data = []

    for root, _, files in os.walk(posts_dir):
        for file in files:
            if file.endswith(".md") and file != "terms-and-policies.md":
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, posts_dir)

                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        post = frontmatter.load(f)

                    if post.metadata:  # Check if frontmatter exists
                        post_data = {
                            "file": relative_path.replace("\\", "/").lower(),  # Store as relative path
                            "title": post.metadata.get("title"),
                            "description": post.metadata.get("description"),
                            "social_image": post.metadata.get("social_image"),
                            "author": post.metadata.get("author"),
                            "pub_date": str(post.metadata.get("pub_date")) if isinstance(post.metadata.get("pub_date"), date) else post.metadata.get("pub_date"),
                            "pub_time": post.metadata.get("pub_time"),
                            "updated_date": str(post.metadata.get("updated_date")) if isinstance(post.metadata.get("updated_date"), date) else post.metadata.get("updated_date"),
                            "updated_time": post.metadata.get("updated_time"),
                            "category": post.metadata.get("category"),
                            "post_type": "normal"
                        }

                        # Preserve post_type from existing posts.json
                        existing_post = existing_posts.get(post_data['file'])
                        if existing_post and 'post_type' in existing_post:
                            post_data['post_type'] = existing_post['post_type']

                        posts_data.append(post_data)

                except Exception as e:
                    print(f"Error processing {file}: {e}")

    # Rename files in posts_data and update file paths
    for post_data in posts_data:
        original_file = post_data['file']
        new_file = re.sub(r"\s+", "-", original_file.lower())
        new_file = re.sub(r"-+", "-", new_file)  # Remove multiple hyphens

        # Rename the actual file if it's different
        if original_file != new_file:
            os.rename(os.path.join(posts_dir, original_file), os.path.join(posts_dir, new_file))

        post_data['file'] = new_file

    # Save the updated posts.json
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(posts_data, f, indent=4)

if __name__ == "__main__":
    generate_posts_json()
    print("posts.json generated successfully!")
