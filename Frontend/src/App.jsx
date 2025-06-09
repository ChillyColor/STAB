import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Features from "./components/features";
import Footer from "./components/footer";
import Contact from "./components/contact";
import Login from "./pages/Login";
function App() {
  return (
    <div>
      <main>
        <Navbar />
        <Hero />
        <Features />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
export default App;
