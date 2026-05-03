import os

files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html' and f != 'about.html']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<li><a href="contact.html">Contact</a></li>' in content and 'employee-login.html' not in content:
        print(f"Updating {file}")
        new_content = content.replace(
            '<li><a href="contact.html">Contact</a></li>',
            '<li><a href="contact.html">Contact</a></li>\n            <li><a href="employee-login.html">Employee Portal</a></li>'
        )
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
