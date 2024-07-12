import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

// import styles from '../styles/Home.module.css'







export default function Home() {
  return (
      <>
     
     
     
{/*
    - main container
  */}
<div className="container">
  {/*
- #HEADER
    */}
  <header>
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="h1">
          LetWorkBeDone
        </h1>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="#home">Top seller</a>
        </li>
        <li className="nav-item">
          <a href="#about">Catagories</a>
        </li>
        <li className="nav-item">
          <a href="#course">About us</a>
        </li>
        <li className="nav-item">
          <a href="#blog">Blog</a>
        </li>
        <li className="nav-item">
          <a href="#contact">Contact Us</a>
        </li>
      </ul>
      <button className="btn btn-primary">
        <p className="btn-text">Try for free</p>
        <span className="square" />
      </button>
      <button className="nav-toggle-btn">
        <span className="one" />
        <span className="two" />
        <span className="three" />
      </button>
    </nav>
  </header>
  <main>
    {/*
  - #HOME SECTION
*/}
    <section className="home" id="home">
      <div className="deco-shape shape-1">
        <img src="../assets/images/shape-1.png" alt="art shape" width={70} />
      </div>
      <div className="deco-shape shape-2">
        <img src="../assets/images/shape-2.png" alt="art shape" width={55} />
      </div>
      <div className="deco-shape shape-3">
        <img src="../assets/images/shape-3.png" alt="art shape" width={120} />
      </div>
      <div className="deco-shape shape-4">
        <img src="../assets/images/shape-4.png" alt="art shape" width={30} />
      </div>
      <div className="home-left">
        <p className="section-subtitle">Freelancing website </p><h1 className="grt">that makes bridge to</h1>Buyers and sellers<p />
        <h1 className="main-heading">
          Start checking
          <span className="underline-img">Sellers<img src="../assets/images/banner-line.png" alt="line" /></span>
        </h1>
        <div className="home-btn-group">
          <button className="btn btn-primary">
            <p className="btn-text">Explore Courses</p>
            <span className="square" />
          </button>
          <button className="btn btn-secondary">
            <p className="btn-text">Contact Us</p>
            <span className="square" />
          </button>
        </div>
      </div>
      <div className="home-right">
        <div className="img-box">
          <img src="../assets/images/banner-img-bg.png" alt="colorful background shape" className="background-shape" />
          <img src="../assets/images/banner-img.png" alt="banner image" className="banner-img" />
          <img src="../assets/images/banner-aliment-icon-1.png" alt className="icon-1 smooth-zigzag-anim-1" width={250} />
          <img src="../assets/images/banner-aliment-icon-2.png" alt className="icon-2 smooth-zigzag-anim-2" width={240} />
          <img src="../assets/images/banner-aliment-icon-3.png" alt className="icon-3 smooth-zigzag-anim-3" width={195} />
          <img src="../assets/images/banner-aliment-icon-4.png" alt className="icon-4 drop-anim" />
        </div>
      </div>
    </section>
    {/*
  - #COURSE CATEGORY SECTION
*/}
    <section className="category">
      <p className="section-subtitle">Skills Category</p>
      <h2 className="section-title">Skills Our Freelancers Have</h2>
      <ul className="course-item-group">
        <li className="course-category-item">
          <div className="wrapper">
            <img src="../assets/images/course-category-icon-1.png" alt="category icon" className="category-icon default" />
            <img src="../assets/images/course-category-icon-1-w.png" alt="category icon white" className="category-icon hover" />
          </div>
          <div className="course-category-content">
            <h3 className="category-title">
              <a href="#">Learn Data Science</a>
            </h3>
            <p className="category-subtitle">Data is Everything</p>
          </div>
        </li>
        <li className="course-category-item">
          <div className="wrapper">
            <img src="../assets/images/course-category-icon-2.png" alt="category icon" className="category-icon default" />
            <img src="../assets/images/course-category-icon-2-w.png" alt="category icon white" className="category-icon hover" />
          </div>
          <div className="course-category-content">
            <h3 className="category-title">
              <a href="#">Business Strategy</a>
            </h3>
            <p className="category-subtitle">Improve your business</p>
          </div>
        </li>
        <li className="course-category-item">
          <div className="wrapper">
            <img src="../assets/images/course-category-icon-3.png" alt="category icon" className="category-icon default" />
            <img src="../assets/images/course-category-icon-3-w.png" alt="category icon white" className="category-icon hover" />
          </div>
          <div className="course-category-content">
            <h3 className="category-title">
              <a href="#">Learn Art &amp; Design</a>
            </h3>
            <p className="category-subtitle">Fun &amp; Challenging</p>
          </div>
        </li>
        <li className="course-category-item">
          <div className="wrapper">
            <img src="../assets/images/course-category-icon-4.png" alt="category icon" className="category-icon default" />
            <img src="../assets/images/course-category-icon-4-w.png" alt="category icon white" className="category-icon hover" />
          </div>
          <div className="course-category-content">
            <h3 className="category-title">
              <a href="#">Learn Lifestyle</a>
            </h3>
            <p className="category-subtitle">New Skills, New You</p>
          </div>
        </li>
        <li className="course-category-item">
          <div className="wrapper">
            <img src="../assets/images/course-category-icon-5.png" alt="category icon" className="category-icon default" />
            <img src="../assets/images/course-category-icon-5-w.png" alt="category icon white" className="category-icon hover" />
          </div>
          <div className="course-category-content">
            <h3 className="category-title">
              <a href="#">Learn Marketing</a>
            </h3>
            <p className="category-subtitle">Improve your business</p>
          </div>
        </li>
        <li className="course-category-item">
          <div className="wrapper">
            <img src="../assets/images/course-category-icon-6.png" alt="category icon" className="category-icon default" />
            <img src="../assets/images/course-category-icon-6-w.png" alt="category icon white" className="category-icon hover" />
          </div>
          <div className="course-category-content">
            <h3 className="category-title">
              <a href="#">Learn Finance</a>
            </h3>
            <p className="category-subtitle">Fun &amp; Challenging</p>
          </div>
        </li>
      </ul>
    </section>
    {/*
  - #ABOUT SECTION
*/}
    <section className="about" id="about">
      <div className="about-left">
        <div className="img-box">
          <img src="../assets/images/about-img-bg.png" alt="about bg" className="about-bg" />
          <img src="../assets/images/about-img.png" alt="about person" className="about-img" />
          <img src="../assets/images/banner-aliment-icon-1.png" alt className="icon-1 smooth-zigzag-anim-1" width={250} />
          <img src="../assets/images/banner-aliment-icon-3.png" alt className="icon-2 smooth-zigzag-anim-3" width={195} />
        </div>
      </div>
      <div className="about-right">
        <p className="section-subtitle">About Us</p>
        <h2 className="section-title">We Have The Best Freelancing System</h2>
        <p className="section-text">
          We help you to make your freelancing cariare for innovative
          And yet amazing 
        </p>
        <ul className="about-ul">
          <li>
            <ion-icon name="checkmark-circle" />
            <p>Will be with you to 1levell seller to Topseller</p>
          </li>
          <li>
            <ion-icon name="checkmark-circle" />
            <p>Chat and other offer to buyers</p>
          </li>
          <li>
            <ion-icon name="checkmark-circle" />
            <p>We always be there when you need</p>
          </li>
        </ul>
        <button className="btn btn-primary">
          <p className="btn-text">Explore More</p>
          <span className="square" />
        </button>
      </div>
    </section>
    {/*
  - #COURSE SECTION
*/}
    <section className="course" id="course">
      <p className="section-subtitle">Get The Job Done</p>
      <h2 className="section-title">Find The Right Offer For You</h2>
      <div className="course-grid">
        <div className="course-card">
          <div className="course-banner">
            <img src="../assets/images/course-1.jpg" alt="course banner" />
            <div className="course-tag-box">
              <a href="#" className="badge-tag orange">Business</a>
              <a href="#" className="badge-tag blue">Marketing</a>
            </div>
          </div>
          <div className="course-content">
            <h3 className="card-title">
              <a href="#">Become product manager learn skills.</a>
            </h3>
            <div className="wrapper border-bottom">
              <div className="author">
                <img src="../assets/images/course-instructor-img.jpg" alt="course instructor image" className="author-img" />
                <a href="#" className="author-name">Lillian Wals</a>
              </div>
              <div className="rating">
                <ion-icon name="star" />
                <p>5.0 (2k)</p>
              </div>
            </div>
            <div className="wrapper">
              <div className="course-price">$50.00</div>
              <div className="enrolled">
                <div className="icon-user">
                  <img src="../assets/images/student-icon.png" alt="user icon" />
                </div>
                <p>600k</p>
              </div>
            </div>
          </div>
        </div>
        <div className="course-card">
          <div className="course-banner">
            <img src="../assets/images/course-2.jpg" alt="course banner" />
            <div className="course-tag-box">
              <a href="#" className="badge-tag orange">Business</a>
              <a href="#" className="badge-tag blue">Marketing</a>
            </div>
          </div>
          <div className="course-content">
            <h3 className="card-title">
              <a href="#">Fashion and luxury fashion in a changing.</a>
            </h3>
            <div className="wrapper border-bottom">
              <div className="author">
                <img src="../assets/images/course-instructor-img.jpg" alt="course instructor image" className="author-img" />
                <a href="#" className="author-name">Lillian Wals</a>
              </div>
              <div className="rating">
                <ion-icon name="star" />
                <p>4.7 (5k)</p>
              </div>
            </div>
            <div className="wrapper">
              <div className="course-price">$80.00</div>
              <div className="enrolled">
                <div className="icon-user">
                  <img src="../assets/images/student-icon.png" alt="user icon" />
                </div>
                <p>545k</p>
              </div>
            </div>
          </div>
        </div>
        <div className="course-card">
          <div className="course-banner">
            <img src="../assets/images/course-3.jpg" alt="course banner" />
            <div className="course-tag-box">
              <a href="#" className="badge-tag orange">Business</a>
              <a href="#" className="badge-tag blue">Marketing</a>
            </div>
          </div>
          <div className="course-content">
            <h3 className="card-title">
              <a href="#">Learning to write as a professional.</a>
            </h3>
            <div className="wrapper border-bottom">
              <div className="author">
                <img src="../assets/images/course-instructor-img.jpg" alt="course instructor image" className="author-img" />
                <a href="#" className="author-name">Lillian Wals</a>
              </div>
              <div className="rating">
                <ion-icon name="star" />
                <p>4.1 (3k)</p>
              </div>
            </div>
            <div className="wrapper">
              <div className="course-price">$29.90</div>
              <div className="enrolled">
                <div className="icon-user">
                  <img src="../assets/images/student-icon.png" alt="user icon" />
                </div>
                <p>317k</p>
              </div>
            </div>
          </div>
        </div>
        <div className="course-card">
          <div className="course-banner">
            <img src="../assets/images/course-4.jpg" alt="course banner" />
            <div className="course-tag-box">
              <a href="#" className="badge-tag orange">Business</a>
              <a href="#" className="badge-tag blue">Marketing</a>
            </div>
          </div>
          <div className="course-content">
            <h3 className="card-title">
              <a href="#">Improving accessibility of Your markdown.</a>
            </h3>
            <div className="wrapper border-bottom">
              <div className="author">
                <img src="../assets/images/course-instructor-img.jpg" alt="course instructor image" className="author-img" />
                <a href="#" className="author-name">Lillian Wals</a>
              </div>
              <div className="rating">
                <ion-icon name="star" />
                <p>4.8 (3.9k)</p>
              </div>
            </div>
            <div className="wrapper">
              <div className="course-price">$49.90</div>
              <div className="enrolled">
                <div className="icon-user">
                  <img src="../assets/images/student-icon.png" alt="user icon" />
                </div>
                <p>891k</p>
              </div>
            </div>
          </div>
        </div>
        <div className="course-card">
          <div className="course-banner">
            <img src="../assets/images/course-5.jpg" alt="course banner" />
            <div className="course-tag-box">
              <a href="#" className="badge-tag orange">Business</a>
              <a href="#" className="badge-tag blue">Marketing</a>
            </div>
          </div>
          <div className="course-content">
            <h3 className="card-title">
              <a href="#">Master query in a short period of time.</a>
            </h3>
            <div className="wrapper border-bottom">
              <div className="author">
                <img src="../assets/images/course-instructor-img.jpg" alt="course instructor image" className="author-img" />
                <a href="#" className="author-name">Lillian Wals</a>
              </div>
              <div className="rating">
                <ion-icon name="star" />
                <p>3.8 (1k)</p>
              </div>
            </div>
            <div className="wrapper">
              <div className="course-price">$89.00</div>
              <div className="enrolled">
                <div className="icon-user">
                  <img src="../assets/images/student-icon.png" alt="user icon" />
                </div>
                <p>204k</p>
              </div>
            </div>
          </div>
        </div>
        <div className="course-card">
          <div className="course-banner">
            <img src="../assets/images/course-6.jpg" alt="course banner" />
            <div className="course-tag-box">
              <a href="#" className="badge-tag orange">Business</a>
              <a href="#" className="badge-tag blue">Marketing</a>
            </div>
          </div>
          <div className="course-content">
            <h3 className="card-title">
              <a href="#">Business Intelligence analyst Course 2022.</a>
            </h3>
            <div className="wrapper border-bottom">
              <div className="author">
                <img src="../assets/images/course-instructor-img.jpg" alt="course instructor image" className="author-img" />
                <a href="#" className="author-name">Lillian Wals</a>
              </div>
              <div className="rating">
                <ion-icon name="star" />
                <p>4.9 (23k)</p>
              </div>
            </div>
            <div className="wrapper">
              <div className="course-price">$199.00</div>
              <div className="enrolled">
                <div className="icon-user">
                  <img src="../assets/images/student-icon.png" alt="user icon" />
                </div>
                <p>1.3M</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary">
        <p className="btn-text">View All Gigs</p>
        <span className="square" />
      </button>
    </section>
    {/*
  - #EVENT SECTION
*/}
    <section className="event">
      <div className="event-left">
        <div className="event-banner">
          <img src="../assets/images/event-img.jpg" alt="event banner" className="banner-img" />
        </div>
        <button className="play smooth-zigzag-anim-1">
          <div className="play-icon pulse-anim">
            <ion-icon name="play-circle" />
          </div>
          <p>Watch Us !</p>
        </button>
      </div>
      <div className="event-right">
        <p className="section-subtitle">Our Updates</p>
        <h2 className="section-title">Join Our Upcoming Updates and Events</h2>
        <div className="event-card-group">
          <div className="event-card">
            <div className="content-left">
              <p className="day">28</p>
              <p className="month">Feb, 2022</p>
            </div>
            <div className="content-right">
              <div className="schedule">
                <p className="time">10:30am To 2:30pm</p>
                <p className="place">Poland</p>
              </div>
              <a href="#" className="event-name">Business creativity workshops</a>
            </div>
          </div>
          <div className="event-card">
            <div className="content-left">
              <p className="day">15</p>
              <p className="month">Mar, 2022</p>
            </div>
            <div className="content-right">
              <div className="schedule">
                <p className="time">10:30am To 2:30pm</p>
                <p className="place">Poland</p>
              </div>
              <a href="#" className="event-name">Street Performance: Call for Art.</a>
            </div>
          </div>
          <div className="event-card">
            <div className="content-left">
              <p className="day">20</p>
              <p className="month">May, 2022</p>
            </div>
            <div className="content-right">
              <div className="schedule">
                <p className="time">10:30am To 2:30pm</p>
                <p className="place">Poland</p>
              </div>
              <a href="#" className="event-name">Digital transformation conference</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*
  - #FEATURES SECTION
*/}
    <section className="features">
      <div className="features-left">
        <p className="section-subtitle">Core Features</p>
        <h2 className="section-title">See What Our Mission Are</h2>
        <ul>
          <li className="features-item">
            <div className="item-icon-box blue">
              😊
            </div>
            <div className="wrapper">
              <h3 className="item-title">Happy Buyer And Seller</h3>
              <p className="item-text">We will try our best to make a bridge to Buyers and Sellers</p>
            </div>
          </li>
          <li className="features-item">
            <div className="item-icon-box pink">
              <img src="../assets/images/feature-icon-2.png" alt="feature icon" />
            </div>
            <div className="wrapper">
              <h3 className="item-title">Communication with Buyers and Sellers</h3>
              <p className="item-text">Communications is our most important priority</p>
            </div>
          </li>
          <li className="features-item">
            <div className="item-icon-box purple">
              <img src="../assets/images/feature-icon-3.png" alt="feature icon" />
            </div>
            <div className="wrapper">
              <h3 className="item-title">24x7 Program</h3>
              <p className="item-text">We will 24×7 and continue helping you</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="features-right">
        <img src="../assets/images/coure-features-img.jpg" alt="core features image" />
      </div>
    </section>
    {/*
  - #INSTRUCTOR SECTION
*/}
    <section className="instructor">
      <p className="section-subtitle">Top sellers</p>
      <h2 className="section-title">Our Expert Freelancers</h2>
      <div className="instructor-grid">
        <div className="instructor-card">
          <div className="instructor-img-box">
            <img src="../assets/images/instructor-1.jpg" alt="instructor louis sullivan" />
            <div className="social-link">
              <a href="#" className="facebook">
                <ion-icon name="logo-facebook" />
              </a>
              <a href="#" className="instagram">
                <ion-icon name="logo-instagram" />
              </a>
              <a href="#" className="twitter">
                <ion-icon name="logo-twitter" />
              </a>
            </div>
          </div>
          <h4 className="instructor-name">Louis Sullivan</h4>
          <p className="instructor-title">Instructor</p>
        </div>
        <div className="instructor-card">
          <div className="instructor-img-box">
            <img src="../assets/images/instructor-2.jpg" alt="instructor camden david" />
            <div className="social-link">
              <a href="#" className="facebook">
                <ion-icon name="logo-facebook" />
              </a>
              <a href="#" className="instagram">
                <ion-icon name="logo-instagram" />
              </a>
              <a href="#" className="twitter">
                <ion-icon name="logo-twitter" />
              </a>
            </div>
          </div>
          <h4 className="instructor-name">Camden David</h4>
          <p className="instructor-title">Instructor</p>
        </div>
        <div className="instructor-card">
          <div className="instructor-img-box">
            <img src="../assets/images/instructor-3.jpg" alt="instructor fiona dean" />
            <div className="social-link">
              <a href="#" className="facebook">
                <ion-icon name="logo-facebook" />
              </a>
              <a href="#" className="instagram">
                <ion-icon name="logo-instagram" />
              </a>
              <a href="#" className="twitter">
                <ion-icon name="logo-twitter" />
              </a>
            </div>
          </div>
          <h4 className="instructor-name">Fiona Dean</h4>
          <p className="instructor-title">Instructor</p>
        </div>
        <div className="instructor-card">
          <div className="instructor-img-box">
            <img src="../assets/images/instructor-4.jpg" alt="instructor cherish sosa" />
            <div className="social-link">
              <a href="#" className="facebook">
                <ion-icon name="logo-facebook" />
              </a>
              <a href="#" className="instagram">
                <ion-icon name="logo-instagram" />
              </a>
              <a href="#" className="twitter">
                <ion-icon name="logo-twitter" />
              </a>
            </div>
          </div>
          <h4 className="instructor-name">Cherish Sosa</h4>
          <p className="instructor-title">Instructor</p>
        </div>
      </div>
    </section>
    {/*
  - #TESTIMONIALS
*/}
    <section className="testimonials">
      <div className="testimonials-left">
        <p className="section-subtitle">Testimonial</p>
        <h2 className="section-title">What Our Client Says About Us</h2>
        <p className="section-text">
          Proin et lacus eu odio tempor porttitor id vel augue. Vivamus volutpat vehicula sem, et imperdiet enim
          tempor id.
          Phasellus lobortis efficitur nisl eget vehicula. Donec viverra blandit nunc, nec tempor ligula ullamcorper
          venenatis.
        </p>
      </div>
      <div className="testimonials-right">
        <div className="testimonials-card">
          <img src="../assets/images/quote.png" alt="quote icon" className="quote-img" />
          <p className="testimonials-text">
            Proin feugiat tortor non neque eleifend, at fermentum est elementum. Ut mollis leo odio vulputate rutrum.
            Nunc sagittis
            sit amet ligula ut eleifend. Mauris consequat mauris sit amet turpis commodo fermentum. Quisque consequat
            tortor ut nisl
            finibus
          </p>
          <div className="testimonials-client">
            <div className="client-img-box">
              <img src="../assets/images/client.jpg" alt="client christine rose" />
            </div>
            <div className="client-detail">
              <h4 className="client-name">Christine Rose</h4>
              <p className="client-title">Customer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*
  - #BLOG
*/}
    <section className="blog" id="blog">
      <p className="section-subtitle">Our Blog</p>
      <h2 className="section-title">Latest Blog &amp; News</h2>
      <div className="blog-grid">
        <div className="blog-card">
          <div className="blog-banner-box">
            <img src="../assets/images/blog-1.jpg" alt="blog banner" />
          </div>
          <div className="blog-content">
            <h3 className="blog-title">
              <a href="#">Proin feugiat tortor non neque eleifend.</a>
            </h3>
            <div className="wrapper">
              <div className="blog-publish-date">
                <img src="../assets/images/calendar.png" alt="calendar icon" />
                <a href="#">07 Jan, 2022</a>
              </div>
              <div className="blog-comment">
                <img src="../assets/images/comment.png" alt="comment icon" />
                <a href="#">3 Comments</a>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-card">
          <div className="blog-banner-box">
            <img src="../assets/images/blog-2.jpg" alt="blog banner" />
          </div>
          <div className="blog-content">
            <h3 className="blog-title">
              <a href="#">Proin feugiat tortor non neque eleifend.</a>
            </h3>
            <div className="wrapper">
              <div className="blog-publish-date">
                <img src="../assets/images/calendar.png" alt="calendar icon" />
                <a href="#">04 Jan, 2022</a>
              </div>
              <div className="blog-comment">
                <img src="../assets/images/comment.png" alt="comment icon" />
                <a href="#">10 Comments</a>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-card">
          <div className="blog-banner-box">
            <img src="../assets/images/blog-3.jpg" alt="blog banner" />
          </div>
          <div className="blog-content">
            <h3 className="blog-title">
              <a href="#">Proin feugiat tortor non neque eleifend.</a>
            </h3>
            <div className="wrapper">
              <div className="blog-publish-date">
                <img src="../assets/images/calendar.png" alt="calendar icon" />
                <a href="#">01 Jan, 2022</a>
              </div>
              <div className="blog-comment">
                <img src="../assets/images/comment.png" alt="comment icon" />
                <a href="#">5 Comments</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*
  - #CONTACT
*/}
    <section className="contact">
      <div className="contact-card" id="contact">
        <img src="../assets/images/cta-bg-img.png" alt="shape" className="contact-card-bg" />
        <h2>Start a new freelancing journey never before</h2>
        <button className="btn btn-primary">
          <p className="btn-text">Contact Us</p>
          <span className="square" />
        </button>
      </div>
    </section>
  </main>
  {/*
- #FOOTER
    */}
  <footer>
    <div className="footer-grid">
      <div className="grid-item">
        <div className="footer-logo">
          <h1 className="h1">
            LetWorkBeDone
          </h1>
        </div>
        <p className="footer-text">
          We are being better everyday for your support            
        </p>
        <div className="social-link">
          <a href="#">
            <ion-icon name="logo-facebook" />
          </a>
          <a href="#">
            <ion-icon name="logo-instagram" />
          </a>
          <a href="#">
            <ion-icon name="logo-twitter" />
          </a>
          <a href="#">
            <ion-icon name="logo-youtube" />
          </a>
        </div>
      </div>
      <ul className="grid-item">
        <h4 className="item-heading">Our Link</h4>
        <li className="list-item">
          <a href="#home">TopSeller</a>
        </li>
        <li className="list-item">
          <a href="#about">Catagories</a>
        </li>
        <li className="list-item">
          <a href="#course">Home</a>
        </li>
        <li className="list-item">
          <a href="#blog">About Us</a>
        </li>
        <li className="list-item">
          <a href="#contact">Contact Us</a>
        </li>
      </ul>
      <ul className="grid-item">
        <h4 className="item-heading">Other Link</h4>
        <li className="list-item">
          <a href="#">Instructor</a>
        </li>
        <li className="list-item">
          <a href="#">FAQ</a>
        </li>
        <li className="list-item">
          <a href="#">Event</a>
        </li>
        <li className="list-item">
          <a href="#">Privacy Policy</a>
        </li>
        <li className="list-item">
          <a href="#">Term &amp; Condition</a>
        </li>
      </ul>
      <div className="grid-item">
        <h4 className="item-heading">Subscribe Now</h4>
        <div className="wrapper">
          <input type="text" name="subscribe" placeholder="Email Address" />
          <button className="send-btn">
            <ion-icon name="paper-plane" />
          </button>
        </div>
      </div>
    </div>
    {/* <hr> */}
    <div id="hr" />
    <p className="copyright">
      Copyright © 2022 <a href="#">LetWorkBeDone</a>All rights reserved.
    </p>
  </footer>
</div>     
     
     
     
     
     
     
     
     
        <Script
            type="text/javascript" src="https://cdn.jsdelivr.net/gh/Harry1o1/Demo/nextjs/education-website/assets/js/script.js"
            strategy="beforeInteractive"
      />
      
      
      
      
      <Head>
        <title>LetWorkBeDone</title>
        <meta name="description" content="Generated by create next app" />

        <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet' />
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
        
        
        
        <link href="https://cdn.jsdelivr.net/gh/Harry1o1/Demo/nextjs//education-website/assets/css/animation.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/gh/Harry1o1/Demo/nextjs//education-website/assets/css/media_queries.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/gh/Harry1o1/Demo/nextjs//education-website/assets/css/style.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/gh/Harry1o1/Demo/nextjs//education-website/assets/css/variable.css" rel="stylesheet" />

        
        
        

      </Head>

      
      
      </>
  )
}
