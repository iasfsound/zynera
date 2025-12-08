import { useState } from "react";
import { Hero } from "./components/Hero";
import { FlowFinder } from "./components/FlowFinder";
import { Services } from "./components/Services";
import { HowItWorks } from "./components/HowItWorks";
import { WhyZynera } from "./components/WhyZynera";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { NeuralBackground } from "./components/NeuralBackground";
import { Navbar } from "./components/Navbar";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { LegalNotice } from "./components/LegalNotice";
import { CookiePolicy } from "./components/CookiePolicy";
import { CookieBanner } from "./components/CookieBanner";
import { FormProvider } from "./context/FormContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "terms" | "privacy" | "legal" | "cookies">("home");

  return (
    <FormProvider>
      <div className="relative bg-white overflow-hidden">
        <NeuralBackground />
        <Navbar setCurrentPage={setCurrentPage} />
        
        {currentPage === "home" ? (
          <>
            <Hero />
            <FlowFinder />
            <Services />
            <HowItWorks />
            <WhyZynera />
            <Testimonials />
            <CTA />
            <Footer setCurrentPage={setCurrentPage} />
          </>
        ) : currentPage === "terms" ? (
          <>
            <TermsAndConditions setCurrentPage={setCurrentPage} />
            <Footer setCurrentPage={setCurrentPage} />
          </>
        ) : currentPage === "privacy" ? (
          <>
            <PrivacyPolicy setCurrentPage={setCurrentPage} />
            <Footer setCurrentPage={setCurrentPage} />
          </>
        ) : currentPage === "legal" ? (
          <>
            <LegalNotice setCurrentPage={setCurrentPage} />
            <Footer setCurrentPage={setCurrentPage} />
          </>
        ) : (
          <>
            <CookiePolicy setCurrentPage={setCurrentPage} />
            <Footer setCurrentPage={setCurrentPage} />
          </>
        )}

        {/* Cookie Banner */}
        <CookieBanner setCurrentPage={setCurrentPage} />
      </div>
    </FormProvider>
  );
}