import { FeatureVehicle } from "@/components/Home/FeatureVehicles"
import { HomeHero } from "@/components/Home/Hero"
import { ShortySection } from "@/components/Home/ShortySection"
import { WhyChooseUs } from "@/components/Home/WhyChooseUs"

 const Home = () => {
    return (
        <div>
        <HomeHero />
        <WhyChooseUs />
        <ShortySection />
        <FeatureVehicle />
        </div>
    )
}

export default Home