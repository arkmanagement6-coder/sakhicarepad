import os
import re

files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<h4>Programs</h4>' in content:
        print(f"Updating {file}")
        # Regex to find the div containing <h4>Programs</h4>
        # We look for <div class="footer-col">...<h4>Programs</h4>...</div>
        # Using a non-greedy match for the content between footer-col and the next </div>
        pattern = r'<div class="footer-col">\s*<h4>Programs</h4>[\s\S]*?</div>'
        new_content = re.sub(pattern, '', content)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
