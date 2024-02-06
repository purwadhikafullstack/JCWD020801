import { Navbar } from "../navbar"
import fruitsImg from "../../assets/about/fruits.png"

export const About = () => {
    return (
        <>
            <Navbar />
            <section className="w-full h-screen bg-[#FCCF5E] px-[16px] md:px-[32px] lg:px-[160px]">
                <img src={fruitsImg} alt="" className="h-[20rem] w-max" />
            </section>
        </>
    )
}