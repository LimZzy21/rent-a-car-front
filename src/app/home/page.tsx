import { CustomerReviews } from "@/components/Home/CustomerReview"
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
        <CustomerReviews />
        </div>
    )
}

export default Home