import React from "react";

const FootBanner = () => {
  return (
    <div className="mt-10 relative w-full overflow-hidden bg-card">
      {/* Kaydırma Animasyonu */}
      <div className="flex animate-marquee">
        {/* Resim */}
        <img
          src="/banner.jpg" // Resminizin yolu
          alt="FootBanner"
          className="h-auto w-full object-cover"
        />
        {/* Aynı Resim Yeniden, Sonsuz Döngü İçin */}
        <img
          src="/banner.jpg" // Resminizin yolu
          alt="FootBanner"
          className="h-auto w-full object-cover"
        />
      </div>
    </div>
  );
};

export default FootBanner;
