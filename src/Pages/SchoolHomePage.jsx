import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import carousel1 from "../Assets/Images/1.jpg"
import carousel2 from "../Assets/Images/2.jpg";


const SchoolHomepage = () => {
  const [schoolData] = useState({
    name: "School Name",
    established: 2000,
    motto: "Growing, Learning, and Exploring Together",
    statistics: {
      students: 850,
      teachers: 65,
      classrooms: 35,
      afterSchoolPrograms: 12,
    },
    achievements: [
      "Best Elementary School Award 2024",
      "Outstanding Early Childhood Education",
      "Safe and Nurturing Environment Award",
    ],
  });

  const carouselImages = [
    {
      image: carousel1,
      title: "Fun Learning Spaces",
      description: "Colorful and engaging classrooms",
    },
    {
      image: carousel2,
      title: "Interactive Learning",
      description: "Hands-on educational experiences",
    },
    {
      image:
        "https://images.unsplash.com/photo-1588072393525-19d2627724c0?q=80&w=1200&h=700&auto=format",
      title: "Creative Activities",
      description: "Art, music, and exploration",
    },
  ];

  const educationalPrograms = [
    {
      name: "Early Childhood Education",
      ages: "PreKG - 1st Grade",
      focus: ["Play-based learning", "Social skills", "Basic literacy"],
      icon: "🌈",
    },
    {
      name: "Primary Education",
      ages: "2nd - 5th Grade",
      focus: [
        "Core academic skills",
        "Critical thinking",
        "Character development",
      ],
      icon: "📚",
    },
    {
      name: "Middle School",
      ages: "6th - 10th Grade",
      focus: ["Advanced learning", "Leadership", "Preparation for high school"],
      icon: "🚀",
    },
  ];

  const extracurricularActivities = [
    {
      name: "Art Club",
      description: "Creativity and self-expression",
      days: "Tuesdays & Thursdays",
    },
    {
      name: "Sports Academy",
      description: "Physical fitness and teamwork",
      days: "Mondays & Wednesdays",
    },
    {
      name: "Science Explorers",
      description: "Hands-on scientific discovery",
      days: "Fridays",
    },
  ];

  const upcomingEvents = [
    {
      title: "Science Fair",
      date: "March 15, 2025",
      description: "Student science projects showcase",
    },
    {
      title: "Annual Sports Day",
      date: "April 22, 2025",
      description: "Inter-class sports competitions",
    },
    {
      title: "Cultural Fest",
      date: "May 10, 2025",
      description: "Talent show and cultural performances",
    },
  ];

  return (
    <div
      className="container-fluid p-0"
      style={{
        background: "linear-gradient(to bottom, #f0f4f8, #ffffff)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Hero Carousel */}
      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="1000" // Fast interval: 1 second
      >
        <div className="carousel-inner">
          {carouselImages.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div
                className="carousel-image"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "85vh",
                  position: "relative",
                }}
              >
                <div
                  className="carousel-caption d-md-block text-start"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderRadius: "10px",
                    padding: "20px",
                    maxWidth: "500px",
                    left: "5%",
                    bottom: "20%",
                  }}
                >
                  <h1 className="display-4 fw-bold text-white mb-3">
                    {slide.title}
                  </h1>
                  <p className="lead text-white">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* School Overview */}
      <section className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-md-6 order-md-1 order-2">
            <div className="p-4 bg-white shadow-sm rounded">
              <h2 className="display-5 mb-4 text-primary">{schoolData.name}</h2>
              <p className="lead text-muted">{schoolData.motto}</p>
              <div className="mt-4">
                <h4 className="text-secondary">Our Achievements</h4>
                {schoolData.achievements.map((achievement, index) => (
                  <div key={index} className="alert alert-success" role="alert">
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6 order-md-2 order-1">
            <div className="row g-3 text-center">
              {Object.entries(schoolData.statistics).map(([key, value]) => (
                <div key={key} className="col-6 col-md-6 mb-3">
                  <div className="bg-white shadow-sm p-3 rounded">
                    <h3 className="display-6 text-primary">{value}</h3>
                    <p className="text-muted text-uppercase small">
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Educational Programs */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-primary">
            Our Educational Journey
          </h2>
          <div className="row">
            {educationalPrograms.map((program, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center p-4">
                    <div className="display-4 mb-3">{program.icon}</div>
                    <h4 className="card-title">{program.name}</h4>
                    <p className="card-text">Ages: {program.ages}</p>
                    <div className="mt-3">
                      <h5>Focus Areas:</h5>
                      {program.focus.map((area, i) => (
                        <span key={i} className="badge bg-primary me-2 mb-2">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extracurricular Activities */}
      <section className="container py-5">
        <h2 className="text-center mb-5 text-primary">
          Extracurricular Adventures
        </h2>
        <div className="row">
          {extracurricularActivities.map((activity, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title">{activity.name}</h4>
                  <p className="card-text">{activity.description}</p>
                  <div className="mt-3">
                    <span className="badge bg-success">
                      Days: {activity.days}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-primary">Exciting Events</h2>
          <div className="row">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h4 className="card-title">{event.title}</h4>
                    <p className="card-text">{event.description}</p>
                    <div className="mt-3">
                      <span className="badge bg-primary">
                        Date: {event.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolHomepage;
