"use client";
import "./home.css";
import Button from "@/components/Button/Button";
import Showreel from "@/components/Showreel/Showreel";
import FeaturedWork from "@/components/FeaturedWork/FeaturedWork";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTACard from "@/components/CTACard/CTACard";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import TeamCards from "@/components/TeamCards/TeamCards";
import AnimatedCopy from "@/components/HighlightText/HighlightText";
import Map from "@/components/Map/map";
import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import ThreeBackground from "@/components/ThreeBack/ThreeBackground";
import dynamic from "next/dynamic";

const ThreeBackgroundClient = dynamic(
  () => import("@/components/ThreeBack/ThreeBackground"),
  { ssr: false }
);

const Page = () => {
  const heroRef = useRef(null);
  const principlesRef = useRef(null);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (!heroRef.current || !principlesRef.current) return;

    const ctx = gsap.context(() => {
      // Hero sticky animation
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: () => `+=${principlesRef.current.offsetHeight}`,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        onLeave: () => {
          gsap.set(heroRef.current, { position: "relative" });
        },
        onEnterBack: () => {
          gsap.set(heroRef.current, { position: "fixed" });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ThreeBackgroundClient />
      <Preloader />
      <section className="hero" ref={heroRef}>
        <div className="container">
          <div className="hero-content-main">
            <div className="hero-badge">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 5.75 : 0.75}>
                <p className="sm">Дисциплина процесса<br/>— это гарантия успеха</p>
              </Copy>
            </div>

            <div className="hero-header">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 5.85 : 0.85}>
                <h1>точный</h1>
                <h1 className="outline">digital-маркетинг</h1>
                <h1>на результат</h1>
              </Copy>
            </div>

            <div className="hero-buttons">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 6.05 : 1.05}>
                <button className="hero-button primary">
                  <span className="dot"></span>
                  Связаться с нами
                </button>
              </Copy>
              <Button delay={isInitialLoad ? 6.05 : 1.05} href="/work" className="hero-button-link">
                Проекты
              </Button>
            </div>

            <div className="hero-footer-text">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 6.15 : 1.15}>
                <p>С 2019 года нам доверяют за системность и точность.<br/>
                Разработка и меркетинг в одной структуре.<br/>
                Держим слово и доводим до результата.</p>
              </Copy>
            </div>

            <div className="hero-scroll">
              <button aria-label="Scroll down">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="principles-section" ref={principlesRef}>
        <div className="container">
          <div className="white-wrapper">
            <div className="mw_container">
              <div className="mw_left">
                <div className="badge principles-badge">
                  <span></span>
                  <p className="sm">Главные принципы</p>
                </div>
                <div className="principles-image-wrapper">
                  <img src="/thing.png" alt="Principles" className="principles-image" />
                </div>
              </div>
              
              <div className="mw_right">
                <div className="principles-content">
                  <AnimatedCopy colorInitial="#dddddd" colorAccent="#f489f2" colorFinal="#000000">
                    <h1>Без стресса.</h1>
                    <h1 className="underline">Без потери времени.</h1>
                  </AnimatedCopy>
                  
                  <AnimatedCopy colorInitial="#dddddd" colorAccent="#f489f2" colorFinal="#000000">
                    <p className="principles-intro">
                      <span className="bold">Вы</span> приходите с задачей — <span className="bold">мы</span> берём ответственность <span className="gray">и доводим до результата</span>
                    </p>
                  </AnimatedCopy>
                  
                  <AnimatedCopy colorInitial="#dddddd" colorAccent="#f489f2" colorFinal="#000000">
                    <p className="principles-description">
                      Чёткий процесс, точные сроки, прозрачный контроль и сильное исполнение — наши базовые принципы
                    </p>
                  </AnimatedCopy>
                  
                  <div className="principles-bottom">
                    <Copy animateOnScroll={true} delay={0.55}>
                      <button className="principles-button">
                        <span className="dot"></span>
                        Чем будем полезны
                      </button>
                    </Copy>
                    
                      <div className="principles-social">
                      <button aria-label="VK">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 14.41h-1.41c-.54 0-.71-.43-1.68-1.4-0.85-.83-1.23-.94-1.44-.94-0.29 0-.38.09-.38.52v1.28c0 .34-.11.54-1 .54-1.48 0-3.12-.89-4.27-2.55-1.73-2.37-2.2-4.16-2.2-4.52 0-.21.09-.4.52-.4h1.41c.39 0 .54.18.69.59.76 2.2 2.03 4.13 2.55 4.13.2 0 .29-.09.29-.59v-2.28c-.06-.99-.58-1.08-.58-1.43 0-.17.14-.34.37-.34h2.21c.33 0 .45.18.45.56v3.08c0 .33.15.45.24.45.2 0 .36-.12.73-.49 1.14-1.28 1.95-3.26 1.95-3.26.11-.23.28-.4.67-.4h1.41c.42 0 .51.21.42.56-.15.82-1.91 3.59-1.91 3.59-.17.28-.23.4 0 .71.17.23.73.71 1.1 1.14.68.78 1.2 1.43 1.34 1.88.14.45-.08.68-.53.68z"/>
                        </svg>
                      </button>
                      <button aria-label="Telegram">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 4-1.74 6.68-2.88 8.03-3.44 3.82-1.59 4.61-1.87 5.13-1.87.11 0 .37.03.54.17.14.11.18.26.2.37.01.08.03.29.01.45z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="services-header">
            <div className="mw_container">
              <div className="mw_left">
                <div className="badge">
                  <span></span>
                  <p className="sm">Услуги</p>
                </div>
                <Copy animateOnScroll={true} delay={0.35}>
                  <h2>от идей до реализации</h2>
                </Copy>
              </div>
              <div className="mw_right">
                <Copy animateOnScroll={true} delay={0.25}>
                  <h1>Включаемся в задачи</h1>
                </Copy>
              </div>
            </div>
            <div className="services-nav">
              <button aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="services-cards">
            <div className="service-card">
              <div className="service-card-icon">
              </div>
              <Copy animateOnScroll={true}>
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
              </Copy>
              <div className="service-card-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            <div className="service-card gradient">
              <div className="service-card-icon">
              </div>
              <Copy animateOnScroll={true}>
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
              </Copy>
              <div className="service-card-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            <div className="service-card">
              <div className="service-card-icon">
              </div>
              <Copy animateOnScroll={true}>
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
              </Copy>
              <div className="service-card-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>

            <div className="service-card">
              <div className="service-card-icon">
              </div>
              <Copy animateOnScroll={true}>
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
              </Copy>
              <div className="service-card-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-header mw_container">
            <div className="mw_left">
              <div className="badge">
                <span></span>
                <p className="sm">Реализованные проекты</p>
              </div>
            </div>
            <div className="mw_right">
              <Copy animateOnScroll={true} delay={0.25}>
                <h1>Проекты</h1>
                <p className="lg">Результаты, за которые нас выбирают</p>
              </Copy>
            </div>
          </div>

          <div className="projects-grid mw_container">
            <div className="mw_left">
              <div className="project-card">
                <div className="project-card-image">
                  {/* Placeholder для изображения проекта */}
                </div>
                <div className="project-card-content">
                  <Copy animateOnScroll={true}>
                    <h3>Lorem Ipsum Dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </Copy>
                  <a href="/sample-project" className="button">Подробнее</a>
                </div>
              </div>
            </div>
            
            <div className="mw_right">
              <div className="project-card">
                <div className="project-card-image">
                  {/* Placeholder для изображения проекта */}
                </div>
                <div className="project-card-content">
                  <Copy animateOnScroll={true}>
                    <h3>Lorem Ipsum Amet</h3>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </Copy>
                  <a href="/sample-project" className="button">Подробнее</a>
                </div>
              </div>
            </div>
          </div>

          <div className="projects-grid mw_container">
            <div className="mw_left">
              <div className="project-card">
                <div className="project-card-image">
                  {/* Placeholder для изображения проекта */}
                </div>
                <div className="project-card-content">
                  <Copy animateOnScroll={true}>
                    <h3>Lorem Consectetur</h3>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur.</p>
                  </Copy>
                  <a href="/sample-project" className="button">Подробнее</a>
                </div>
              </div>
            </div>
            
            <div className="mw_right">
              <div className="project-card">
                <div className="project-card-image">
                  {/* Placeholder для изображения проекта */}
                </div>
                <div className="project-card-content">
                  <Copy animateOnScroll={true}>
                    <h3>Lorem Adipiscing</h3>
                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </Copy>
                  <a href="/sample-project" className="button">Подробнее</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="how-we-work-section">
        <div className="how-we-work-wrapper white-wrapper">
          <div className="mw_container">
            <div className="mw_left">
              <div className="badge">
                <span></span>
                <p className="sm">Как мы работаем</p>
              </div>
              <div className="text-bottom">
                <Copy animateOnScroll={true} delay={0.25}>
                  <h2>Запускаем <span>быстро.</span></h2>
                  <h2>Делаем <span>надолго.</span></h2>
                  <h2>Чётко и <span>по делу.</span></h2>
                </Copy>
                <Copy animateOnScroll={true}>
                  <p className="description">У вас не будет "висит в работе". Мы на связи даже в нерабочее время, понимаем с полуслова и тащим проект до результата.</p>
                </Copy>
              </div>
            </div>
            
            <div className="mw_right">
              <div className="work-cards-grid">
                <div className="work-card">
                  <div className="work-card-icon red">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                    </svg>
                  </div>
                  <Copy animateOnScroll={true}>
                    <h3>Сроки<br/>— это обязательство</h3>
                    <p>Фиксируем план работ и соблюдаем дедлайны. Без «сдвинулось» и «почти готово».</p>
                  </Copy>
                </div>

                <div className="work-card">
                  <div className="work-card-icon purple">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <Copy animateOnScroll={true}>
                    <h3>Контроль<br/>и прозрачность</h3>
                    <p>Показываем, что сделано, что в работе и что дальше — без сюрпризов и лишних созвонов.</p>
                  </Copy>
                </div>

                <div className="work-card">
                  <div className="work-card-icon purple">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <Copy animateOnScroll={true}>
                    <h3>Доводим до цели</h3>
                    <p>Не сдаём «по факту выполнения задач». Закрываем бизнес-результат: заявки, продажи, процессы, качество.</p>
                  </Copy>
                </div>

                <div className="work-card">
                  <div className="work-card-icon red">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <Copy animateOnScroll={true}>
                    <h3>Технологии — только<br/>те, что дают эффект</h3>
                    <p>Используем сильные инструменты и автоматизацию там, где они реально ускоряют и усиливают результат.</p>
                  </Copy>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="world-map-section">
        <div className="black-wrapper">
          <div className="mw_container">
              <div className="mw_left">
                <div className="badge">
                <span></span>
                <p className="sm">География</p>
              </div>
                <Copy animateOnScroll={true} delay={0.35}>
                  <h2>по всем миру</h2>
                </Copy>
              </div>
              <div className="mw_right">
                <Copy animateOnScroll={true} delay={0.25}>
                  <h1>Работаем с компаниями</h1>
                </Copy>
              </div>
            </div>
          <div className="world-map-container">
            <Map />
          </div>
        </div>
      </section>
       

      
      {/* Stats Section */}
      <section className="stats-section">
        <div className="white-wrapper">
          <div className="mw_container">
            <div className="mw_left">
              <div className="stat-card dark">
                <Copy animateOnScroll={true}>
                  <h1 className="stat-number">100%</h1>
                  <h3>фокус<br/>на проектах</h3>
                </Copy>
                <Copy animateOnScroll={true}>
                  <p>Мы не распыляемся. </p>
                  <p> Ведём ограниченное число проектов одновременно,</p>
                  <p>поэтому держим темп, качество и сроки.</p>
                </Copy>
              </div>
            </div>

            <div className="mw_right">
              <div className="stats-right-grid">
                <div className="stat-card light">
                  <Copy animateOnScroll={true}>
                    <h1 className="stat-number">30+</h1>
                    <h3>решений в одной<br/>экосистеме</h3>
                  </Copy>
                  <Copy animateOnScroll={true}>
                    <p>Маркетинг, разработка, аналитика и интеграции — связываем в единую систему, чтобы всё работало как одно целое.</p>
                  </Copy>
                </div>

                <div className="stat-card light">
                  <Copy animateOnScroll={true}>
                    <h1 className="stat-number">5+</h1>
                    <h3>лет<br/>в продакшене</h3>
                  </Copy>
                  <Copy animateOnScroll={true}>
                    <p>С 2019 года: процесс, сроки, качество. Без сюрпризов — только предсказуемый результат.</p>
                  </Copy>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & News Section */}
      <section className="blog-section">
        <div className="black-wrapper">
          <div className="blog-header mw_container">
            <div className="mw_left">
              <div className="blog-nav">
                <button aria-label="Previous">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button aria-label="Next">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mw_right">
              <Copy animateOnScroll={true} delay={0.25}>
                <h1>Блог & Новости</h1>
              </Copy>
            </div>
          </div>

          <div className="blog-grid mw_container">
            <div className="mw_left">
              <div className="blog-card">
                <div className="blog-card-image">
                  {/* Placeholder для изображения */}
                </div>
                <div className="blog-card-content">
                  <Copy animateOnScroll={true}>
                    <h3>Lorem Ipsum Dolor Sit Amet</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                  </Copy>
                  <a href="#" className="button">Читать</a>
                </div>
              </div>
            </div>
            
            <div className="mw_right">
              <div className="blog-card">
                <div className="blog-card-image">
                  {/* Placeholder для изображения */}
                </div>
                <div className="blog-card-content">
                  <Copy animateOnScroll={true}>
                    <h3>Lorem Consectetur Adipiscing</h3>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                  </Copy>
                  <a href="#" className="button">Читать</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="studio-header">
        <div className="container">
          <div className="studio-header-row">
            <Copy animateOnScroll={true} delay={0.3}>
              <h1>Достигаем результатов</h1>
            </Copy>
          </div>

          <div className="studio-header-row">
            <Copy animateOnScroll={true} delay={0.45}>
              <h1>Вместе с вами</h1>
            </Copy>
          </div>
        </div>
      </section>

      <section className="client-reviews-header-container">
        <div className="container">
          <div className="client-reviews-header-content">
            <div className="client-reviews-header">
              <Copy animateOnScroll={true} delay={0.25}>
                <h1>Клиенты о нас</h1>
              </Copy>
            </div>

            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 32 32"
                fill="none"
                className="icon"
              >
                <path
                  d="M16 26.6665L16 5.33317"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M22.6667 19.9999L16 26.6665L9.33337 19.9998"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>

            <div className="client-reviews-header-copy">
              <Copy animateOnScroll={true} delay={0.25}>
                <p className="lg">
                  Честные отзывы от тех, с кем мы работали. Без фильтров и
                  приукрашиваний — только реальный опыт сотрудничества.
                </p>
              </Copy>
            </div>
          </div>
        </div>
      </section>

      <ClientReviews />

      <Spotlight />
<TeamCards />

      <CTACard />

      <Footer />
    </>
  );
};

export default Page;
