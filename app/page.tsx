import HeroSection from '@/components/home/HeroSection'
import SearchBar from '@/components/home/SearchBar'
import ServicesGrid from '@/components/home/ServicesGrid'
import SectionDivider from '@/components/home/SectionDivider'
import DestinationsMarquee from '@/components/home/DestinationsMarquee'
import FeaturedPackages from '@/components/home/FeaturedPackages'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import HowItWorks from '@/components/home/HowItWorks'
import VisaSection from '@/components/home/VisaSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CtaSection from '@/components/home/CtaSection'

export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. SEARCH BAR — larger negative margin for clean overlay */}
      <div className="-mt-16 md:-mt-20 relative z-30">
        <SearchBar />
      </div>

      {/* 3. SERVICES */}
      <ServicesGrid />

      {/* 4. DIVIDER */}
      <SectionDivider />

      {/* 5. DESTINATIONS */}
      <DestinationsMarquee />

      {/* 6. PACKAGES */}
      <FeaturedPackages />

      {/* 7. WHY CHOOSE US */}
      <WhyChooseUs />

      {/* 8. HOW IT WORKS */}
      <HowItWorks />

      {/* 9. VISA */}
      <VisaSection />

      {/* 10. TESTIMONIALS */}
      <TestimonialsSection />

      {/* 11. CTA */}
      <CtaSection />
    </>
  )
}
