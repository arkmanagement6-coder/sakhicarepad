import os

def fix_mojibake(content):
    try:
        # Try to fix the common ANSI/UTF-8 mojibake
        return content.encode('latin-1').decode('utf-8')
    except:
        return content

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        # Read the corrupted file as latin-1 to get the raw bytes-as-chars
        with open(filename, 'r', encoding='latin-1') as f:
            content = f.read()
        
        # This is likely the state: UTF-8 bytes were read as ANSI and then written back
        # We need to reverse that.
        # But wait, my previous script read it correctly but WROTE it as 'UTF8' (with BOM).
        
        # Let's try to just find the corrupted strings and replace them with literals.
        replacements = {
            "Ã Â¤Â¹Ã Â¤Â° Ã Â¤Â®Ã Â¤Â¹Ã Â¤Â¿Ã Â¤Â²Ã Â¤Â¾": "हर महिला",
            "Ã Â¤Â¸Ã Â¥Â Ã Â¤ÂµÃ Â¤Â¸Ã Â¥Â Ã Â¤Â¥": "स्वस्थ",
            "Ã Â¤Â¸Ã Â¤Â¶Ã Â¤â€¢Ã Â¥Â Ã Â¤Â¤": "सशक्त",
            "Ã Â¤Â®Ã Â¤Â¹Ã Â¤Â¿Ã Â¤Â²Ã Â¤Â¾Ã Â¤â€œÃ Â¤â€š": "महिलाओं",
            "Ã Â¤â€¢Ã Â¥â€¡": "के",
            "Ã Â¤Â¬Ã Â¤Â¾Ã Â¤Â°Ã Â¥â€¡": "बारे",
            "Ã Â¤Â®Ã Â¥â€¡Ã Â¤â€š": "में",
            "Ã Â¤Â¸Ã Â¤â€¢Ã Â¤Â¾Ã Â¤Â°Ã Â¤Â¾Ã Â¤Â¤Ã Â¥Â Ã Â¤Â®Ã Â¤â€¢": "सकारात्मक",
            "Ã Â¤Â¬Ã Â¤Â¦Ã Â¤Â²Ã Â¤Â¾Ã Â¤Âµ": "बदलाव",
            "Ã Â¤Â²Ã Â¤Â¾Ã Â¤Â¨Ã Â¥â€¡": "लाने",
            "Ã Â¤ÂµÃ Â¤Â¾Ã Â¤Â²Ã Â¤Â¾": "वाला",
            "Ã Â¤Â Ã Â¤â€¢": "एक",
            "Ã Â¤Â¸Ã Â¤Â¾Ã Â¤Â®Ã Â¤Â¾Ã Â¤Å“Ã Â¤Â¿Ã Â¤â€¢": "सामाजिक",
            "Ã Â¤â€ Ã Â¤Â°": "और",
            "Ã Â¤â€ Ã Â¤Â°Ã Â¥Â Ã Â¤Â¥Ã Â¤Â¿Ã Â¤â€¢": "आर्थिक",
            "Ã Â¤â€ Ã Â¤â€šÃ Â¤Â¦Ã Â¥â€¹Ã Â¤Â²Ã Â¤Â¨": "आंदोलन"
        }
        
        new_content = content
        for k, v in replacements.items():
            new_content = new_content.replace(k, v)
        
        # Save as clean UTF-8
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
