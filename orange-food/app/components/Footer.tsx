import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="bg-card text-card-foreground py-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Yemek Sitesi. Tüm hakları saklıdır.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
