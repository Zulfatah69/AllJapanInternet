
import MainLayout from '../layouts/MainLayout'
import HeroSection from '../components/sections/HeroSection'
import PromoSection from '../components/sections/PromoSection'
import BestSellerSection from '../components/sections/BestSellerSection'
import ProductSection from '../components/sections/ProductSection'
import BenefitSection from '../components/sections/BenefitSection'
import AboutSection from '../components/sections/AboutSection'
import HowToOrderSection from '../components/sections/HowToOrderSection'
import GuideBookSection from '../components/sections/GuideBookSection'
import TestimonialSection from '../components/sections/TestimonialSection'
import TrackingSection from '../components/sections/TrackingSection'
import WisataSection from '../components/sections/WisataSection'
import TSSection from '../components/sections/TSSection'
import ContactSection from '../components/sections/ContactSection'

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <PromoSection />
      <BestSellerSection />
      <ProductSection />
      <BenefitSection />
      <AboutSection />
      <HowToOrderSection />
      <GuideBookSection />
      <TestimonialSection />
      <TrackingSection />
      <WisataSection />
      <TSSection />
      <ContactSection />
    </MainLayout>
  )
}
