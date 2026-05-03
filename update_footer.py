import os

policies_html = """                <div class="footer-col">
                    <h4>Policies</h4>
                    <ul>
                        <li><a href="privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="terms-conditions.html">Terms & Conditions</a></li>
                        <li><a href="refund-policy.html">Refund Policy</a></li>
                        <li><a href="shipping-policy.html">Shipping Policy</a></li>
                        <li><a href="disclaimer.html">Disclaimer</a></li>
                    </ul>
                </div>
"""

files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<h4>Contact Us</h4>' in content and 'privacy-policy.html' not in content:
        print(f"Updating {file}")
        # Find the div containing Contact Us
        parts = content.split('<div class="footer-col">')
        for i, part in enumerate(parts):
            if '<h4>Contact Us</h4>' in part:
                parts.insert(i, policies_html)
                break
        
        new_content = '<div class="footer-col">'.join(parts)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
