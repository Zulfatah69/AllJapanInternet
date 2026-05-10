"use client";

import { useEffect, useState } from "react";

import "../../styles/Hero.css";
import "../../styles/Theme.css";

export default function HeroSection() {

  const [theme, setTheme] = useState("theme-default");

  useEffect(() => {

    document.body.className = theme;
    localStorage.setItem("theme", theme);

  }, [theme]);

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }

  }, []);

  return (
    <section className="hero-section">

      <div className="container-custom">

        {/* THEME SWITCHER */}
        <div className="theme-switcher">

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="theme-select"
          >
            <option value="theme-default">
  🌐 Default
</option>

<option value="theme-summer">
  ☀️ Summer
</option>

<option value="theme-winter">
  ❄️ Winter
</option>

<option value="theme-fall">
  🍂 Fall
</option>

<option value="theme-spring">
  🌸 Spring
</option>
          </select>

        </div>

        <div className="hero-grid">

          <div>

            <div className="hero-badge">
              Internet untuk WNI di Jepang
            </div>

            <h1 className="hero-title">

              <div className="hero-title-main">
                All Japan Internet
              </div>

              <div className="hero-title-sub">
                SIM Card & Pocket WiFi
              </div>

            </h1>

            <p className="hero-description">
              Termudah, Tercepat, dan Terpercaya
            </p>

            <div className="hero-buttons">

              <button className="hero-btn-primary">
                Lihat Produk
              </button>

              <button className="hero-btn-secondary">
                WhatsApp
              </button>

            </div>

          </div>

          <div>

            <div className="hero-image" />

          </div>

        </div>

      </div>

    </section>
  );
}