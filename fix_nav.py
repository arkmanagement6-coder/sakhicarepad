import os
import re

nav_replacement = """        <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li class="dropdown">
                <a href="about.html">About <i class="fas fa-chevron-down" style="font-size: 0.7rem;"></i></a>
                <ul class="dropdown-menu">
                    <li><a href="programs.html">Programs</a></li>
                    <li><a href="campaign.html">Campaign</a></li>
                </ul>
            </li>
            <li><a href="products.html">Product</a></li>
            <li class="dropdown">
                <a href="#">Career <i class="fas fa-chevron-down" style="font-size: 0.7rem;"></i></a>
                <ul class="dropdown-menu">
                    <li><a href="hiring.html">Hiring</a></li>
                    <li><a href="delivery-partner.html">Delivery Partner</a></li>
                </ul>
            </li>
            <li><a href="contact.html">Contact</a></li>
        </ul>"""

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Match the old ul pattern (multi-line)
        new_content = re.sub(r'<ul class="nav-links">.*?</ul>', nav_replacement, content, flags=re.DOTALL)
        
        # Also fix the logo span if missing
        if 'logo_icon.jpg" alt="Sakhi Hub Logo" style="height: 40px; border-radius: 50%;"> SAKHI HUB' in new_content:
             new_content = new_content.replace('logo_icon.jpg" alt="Sakhi Hub Logo" style="height: 40px; border-radius: 50%;"> SAKHI HUB', 'logo_icon.jpg" alt="Sakhi Hub Logo" style="height: 45px; border-radius: 50%;"> <span>SAKHI HUB</span>')

        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
