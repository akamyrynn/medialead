"use client";
import "./stories.css";
import React, { useState } from "react";
import Copy from "@/components/Copy/Copy";
import Footer from "@/components/Footer/Footer";
import CTACard from "@/components/CTACard/CTACard";
import { IoSearch } from "react-icons/io5";

// Mock data
const storiesData = [
  {
    id: 1,
    title: "The Future of Web Design",
    description:
      "Exploring the upcoming trends in digital design and how they will shape user experiences in 2026.",
    tags: ["#design", "#trends", "#2026"],
    image: "/placeholder-story.jpg", 
  },
  {
    id: 2,
    title: "The Future of Web Design",
    description:
      "Exploring the upcoming trends in digital design and how they will shape user experiences in 2026.",
    tags: ["#design", "#trends", "#2026"],
    image: "/placeholder-story.jpg",
  },
  {
    id: 3,
    title: "The Future of Web Design",
    description:
      "Exploring the upcoming trends in digital design and how they will shape user experiences in 2026.",
    tags: ["#design", "#trends", "#2026"],
    image: "/placeholder-story.jpg",
  },
  {
    id: 4,
    title: "The Future of Web Design",
    description:
      "Exploring the upcoming trends in digital design and how they will shape user experiences in 2026.",
    tags: ["#design", "#trends", "#2026"],
    image: "/placeholder-story.jpg",
  },
  {
    id: 5,
    title: "The Future of Web Design",
    description:
      "Exploring the upcoming trends in digital design and how they will shape user experiences in 2026.",
    tags: ["#design", "#trends", "#2026"],
    image: "/placeholder-story.jpg",
  },
  {
    id: 6,
    title: "The Future of Web Design",
    description:
      "Exploring the upcoming trends in digital design and how they will shape user experiences in 2026.",
    tags: ["#design", "#trends", "#2026"],
    image: "/placeholder-story.jpg",
  },
];

const categories = [
  { id: "cat1", label: "# новости", active: true },
  { id: "cat2", label: "# статьи", active: false },
  { id: "cat3", label: "# инсайты", active: false },
];

const StoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState("cat1");

  return (
    <>
      <div className="stories-page">
        <div className="container">
          {/* Header Section */}
          <div className="stories-hero">
            <Copy animateOnScroll={true} delay={0.2}>
              <h1>Stories</h1>
            </Copy>
            <div className="stories-hero-badge">
              <span className="dot"></span>
              <p>Get in touch</p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="stories-filters">
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

          {/* Stories Grid (3 columns) */}
          <div className="stories-grid">
            {storiesData.map((story, index) => (
              <div className="story-item-card" key={index}>
                <div className="card-image-wrapper">
                    <div className="image-placeholder"></div> 
                </div>
                
                <div className="card-details">
                    <div className="card-tags">
                        {story.tags.map((tag, i) => (
                            <span key={i} className="tag">{tag}</span>
                        ))}
                    </div>

                    <h3>{story.title}</h3>
                    <p className="description">{story.description}</p>

                    <button className="read-more-btn">
                        Read more
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

export default StoriesPage;
