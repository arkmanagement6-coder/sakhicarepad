$nav = @"
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
"@

$footer = @"
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
    
    # Replace Nav
    $newContent = $content -replace '(?s)<ul class="nav-links">.*?</ul>', $nav
    
    # Replace Footer
    if ($newContent -match '(?s)<footer>.*?</footer>') {
        $newContent = $newContent -replace '(?s)<footer>.*?</footer>', $footer
    } else {
        $newContent = $newContent -replace '</body>', "`n$footer`n</body>"
    }

    # Fix old phone numbers globally in the file
    $newContent = $newContent -replace '8821885577', '8076611842'
    $newContent = $newContent -replace 'contact@sakhicare.in', 'contact@sakhihub.in'
    
    # Fix Logo span if missing
    if ($newContent -match 'logo_icon.jpg" alt="Sakhi Hub Logo" style="height: 40px; border-radius: 50%;"> SAKHI HUB') {
        $newContent = $newContent -replace 'logo_icon.jpg" alt="Sakhi Hub Logo" style="height: 40px; border-radius: 50%;"> SAKHI HUB', 'logo_icon.jpg" alt="Sakhi Hub Logo" style="height: 45px; border-radius: 50%;"> <span>SAKHI HUB</span>'
    }

    $newContent | Set-Content $_.FullName -Encoding UTF8
}
