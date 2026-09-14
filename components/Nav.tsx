"use client";

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navWrap">
      <nav className="nav container">
        <a className="brand" href="#top" aria-label="LiveSell home">
          <span className="brandMark">L</span>
          <span>LiveSell</span>
        </a>

        <button
          className="menuToggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "×" : "☰"}
        </button>

        <div className={`navLinks ${open ? "open" : ""}`}>
          <a href="#how" onClick={() => setOpen(false)}>How it works</a>
          <a href="#brands" onClick={() => setOpen(false)}>For brands</a>
          <a href="#hosts" onClick={() => setOpen(false)}>For hosts</a>
          <a href="#apply" className="navCta" onClick={() => setOpen(false)}>Sell with us</a>
        </div>
      </nav>
    </header>
  );
}
