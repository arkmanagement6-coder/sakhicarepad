$navTemplate = @"
    <nav id="navbar" class="scrolled">
        <div class="logo">
            <img src="assets/branding/logo_icon.jpg" alt="Sakhi Hub Logo" style="height: 45px; border-radius: 50%;"> <span>SAKHI HUB</span>
        </div>
        <ul class="nav-links">
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
        </ul>
        <a href="hiring.html" class="btn btn-primary nav-btn">Join Mission</a>
    </nav>
"@

$footerTemplate = @"
    <footer>
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
    </footer>
"@

Get-ChildItem *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Replace entire Nav block
    $newContent = $content -replace '(?s)<nav.*?</nav>', $navTemplate
    
    # Replace entire Footer block
    $newContent = $newContent -replace '(?s)<footer.*?</footer>', $footerTemplate
    
    # Adjust index.html nav class
    if ($_.Name -eq "index.html") {
        $newContent = $newContent -replace 'nav id="navbar" class="scrolled"', 'nav id="navbar"'
    }

    $newContent | Set-Content $_.FullName -Encoding UTF8
}
