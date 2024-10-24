import subprocess

def run_script(script_name):
    try:
        subprocess.run(['python', script_name], check=True)
        print(f"{script_name} executed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error executing {script_name}: {e}")

def main():
    # Run the first script
    run_script('create_posts_json.py')

    # Run the second script
    run_script('generate_rss.py')

if __name__ == "__main__":
    main()

input("Press Enter to exit...")