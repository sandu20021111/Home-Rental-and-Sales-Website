import React from "react";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import FeaturedProperties from "../components/FeaturedProperties.jsx";
import Faq from "../components/Faq.jsx";
import Cta from "../components/Cta.jsx";
import Testimonial from "../components/Testimonial.jsx";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-[#fffbee]">
      <Hero />
      <About />
      <FeaturedProperties />
      <Faq />
      <Cta />
      <Testimonial />
    </div>
  );
};

export default Home;
