"use client";
import "./NewHeader.css";
import React from "react";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useViewTransition } from "@/hooks/useViewTransition";

const NewHeader = () => {
  const pathname = usePathname();
  const { navigateWithTransition } = useViewTransition();

  const handleNavigation = (href, e) => {
    e.preventDefault();
    if (pathname === href) return;
    navigateWithTransition(href);
  };

  return (
    <header className="new-header">
      <div className="new-header-container">
        {/* Logo Section */}
        <a href="/" className="header-logo" onClick={(e) => handleNavigation("/", e)}>
          {/* Logo Icon Removed */}
          <div className="logo-text">
            <span className="logo-title">MEDIA<span className="dot">.</span>LEAD</span>
            <span className="logo-subtitle">маркетинг и разработка для бизнеса</span>
          </div>
        </a>

        {/* Navigation */}
        <nav className="new-header-nav">
          <div className="new-nav-item">
            <a href="/services" onClick={(e) => handleNavigation("/services", e)}>Услуги</a>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="dropdown-arrow"
            >
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <a href="/work" className="new-nav-link" onClick={(e) => handleNavigation("/work", e)}>Проекты</a>
          <a href="/#why-us" className="new-nav-link" onClick={(e) => handleNavigation("/#why-us", e)}>Почему мы</a>
          <a href="/contact" className="new-nav-link" onClick={(e) => handleNavigation("/contact", e)}>Контакты</a>
          <a href="/stories" className="new-nav-link" onClick={(e) => handleNavigation("/stories", e)}>Блог</a>
          <a href="/tender" className="new-nav-link" onClick={(e) => handleNavigation("/tender", e)}>Пригласить в тендер</a>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button className="search-btn" aria-label="Search">
            <IoSearch />
          </button>
          <button className="kp-btn">
            Получить КП
          </button>
          <button className="contact-btn" onClick={(e) => handleNavigation("/contact", e)}>
            <span className="dot"></span>
            Связаться с нами
          </button>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
