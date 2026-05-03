import os
import re

footer_content = """    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <div class="logo" style="color: var(--white); margin-bottom: 1.5rem;">
                        <img src="assets/branding/logo_icon.jpg" alt="Sakhi Hub Logo" style="height: 40px; border-radius: 50%; filter: brightness(10);"> <span>SAKHI HUB</span>
                    </div>
                    <p style="color: #ccc;">Empowering women through health, education, and economic independence.</p>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="programs.html">Programs</a></li>
                        <li><a href="products.html">Products</a></li>
                        <li><a href="hiring.html">Join Us</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Programs</h4>
                    <ul>
                        <li><a href="programs.html">Health Awareness</a></li>
                        <li><a href="programs.html">Employment</a></li>
                        <li><a href="programs.html">Skill Training</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Contact Us</h4>
                    <ul>
                        <li><i class="fab fa-whatsapp"></i> +91 8076611842</li>
                        <li><i class="fas fa-phone"></i> +91 8076611842</li>
                        <li><i class="fas fa-envelope"></i> contact@sakhihub.in</li>
                    </ul>
                </div>
            </div>
            <div style="border-top: 1px solid #333; padding-top: 2rem; text-align: center; color: #777;">
                &copy; 2026 Sakhi Hub. All rights reserved.
            </div>
        </div>
    </footer>"""

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # If footer exists, replace it. Otherwise, insert before </body>
        if '<footer>' in content:
            new_content = re.sub(r'<footer>.*?</footer>', footer_content, content, flags=re.DOTALL)
        else:
            new_content = content.replace('</body>', footer_content + '\n</body>')
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
