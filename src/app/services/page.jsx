"use client";
import "./services.css";
import React, { useState } from "react";
import Copy from "@/components/Copy/Copy";
import Footer from "@/components/Footer/Footer";
import CTACard from "@/components/CTACard/CTACard";
import { IoSearch } from "react-icons/io5";

const servicesData = [
  {
    id: 1,
    title: "Web sites",
    description:
      "We build websites that don't just look good — they actually bring in clients.",
    price: "30 000P",
    tags: ["#категория", "#категория", "#категория"],
    icon: "globe", // placeholder for logic
  },
  {
    id: 2,
    title: "Web sites",
    description:
      "We build websites that don't just look good — they actually bring in clients.",
    price: "30 000P",
    tags: ["#категория", "#категория", "#категория"],
    icon: "globe",
  },
  {
    id: 3,
    title: "Web sites",
    description:
      "We build websites that don't just look good — they actually bring in clients.",
    price: "30 000P",
    tags: ["#категория", "#категория", "#категория"],
    icon: "globe",
  },
  {
    id: 4,
    title: "Web sites",
    description:
      "We build websites that don't just look good — they actually bring in clients.",
    price: "30 000P",
    tags: ["#категория", "#категория", "#категория"],
    icon: "globe",
  },
];

const categories = [
  { id: "cat1", label: "# категория", active: false },
  { id: "cat2", label: "# категория", active: true }, // Red one in design
  { id: "cat3", label: "# категория", active: false },
  { id: "cat4", label: "# категория", active: false },
  { id: "cat5", label: "# категория", active: false },
];

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState("cat2");

  return (
    <>
      <div className="services-page">
        <div className="container">
          {/* Header Section */}
          <div className="services-hero">
            <Copy animateOnScroll={true} delay={0.2}>
              <h1>Services</h1>
            </Copy>
            <div className="services-hero-badge">
              <span className="dot"></span>
              <p>Get in touch</p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="services-filters">
            <div className="search-bar">
              <IoSearch className="search-icon" />
              <input type="text" placeholder="Поиск по названию" />
            </div>
            <div className="categories-list">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-pill ${
                    activeCategory === cat.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {servicesData.map((service, index) => (
              <div className="service-item-card" key={index}>
                <div className="card-icon-wrapper">
                  {/* Placeholder for the pink globe from design */}
                  <div className="pink-globe">
                     <svg viewBox="0 0 100 100" className="globe-svg">
                       <circle cx="50" cy="50" r="48" stroke="url(#grad1)" strokeWidth="2" fill="none" />
                       <ellipse cx="50" cy="50" rx="48" ry="20" stroke="url(#grad1)" strokeWidth="2" fill="none" />
                       <ellipse cx="50" cy="50" rx="20" ry="48" stroke="url(#grad1)" strokeWidth="2" fill="none" transform="rotate(90 50 50)" />
                       <line x1="50" y1="2" x2="50" y2="98" stroke="url(#grad1)" strokeWidth="2" />
                       <line x1="2" y1="50" x2="98" y2="50" stroke="url(#grad1)" strokeWidth="2" />
                       <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor:'#ff9a9e', stopOpacity:1}} />
                          <stop offset="100%" style={{stopColor:'#fecfef', stopOpacity:1}} />
                        </linearGradient>
                       </defs>
                     </svg>
                  </div>
                </div>
                
                <div className="card-content">
                    <h3>{service.title}</h3>
                    <p className="description">{service.description}</p>
                </div>

                <div className="card-tags">
                    {service.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                    ))}
                </div>

                <div className="card-footer">
                    <div className="price">
                        <span className="prefix">от</span> {service.price}
                    </div>
                    <button className="arrow-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <CTACard />
      <Footer />
    </>
  );
};

export default ServicesPage;
