import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import banner1 from "@/assets/GiatSayNhanh-main-banner.jpg"
import banner2 from "@/assets/GiatSayNhanh-banner-2.jpg"
import banner3 from "@/assets/GiatSayNhanh-banner-3a.jpg"
interface Image {
    src: string

}
const imageList: Image[] = [
    {
        src: banner1
    },
    {
        src: banner2
    },
    {
        src: banner3
    }
]

const HomePage = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <Carousel id="home-section-1" className="w-full" opts={
                {
                    align: "start",
                    loop: true,
                }
            }
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
            >
                <CarouselContent>
                    {imageList.map((image, index) => (
                        <CarouselItem key={index}>
                            <img className="object-cover object-top" src={image.src} style={
                                {
                                    width: "100%",
                                    height: "550px",
                                }
                            } />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-12" />
                <CarouselNext className="right-12" />
            </Carousel>
            <div id="home-section-2" className="flex flex-col items-center">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Quy trình giao nhận đơn giản</h2>
                <div className="grid grid-cols-12 justify-center items-center mt-12">
                    <div className="col-span-3">
                        <img src="https://giatsaynhanh.vn/wp-content/uploads/2018/03/Quy-Trnh-Giao-Nhn-Bc-1-GiatSayNhanh.png" alt="" />
                    </div>
                    <div className="col-span-3">
                        <img src="https://giatsaynhanh.vn/wp-content/uploads/2018/03/Quy-Trnh-Giao-Nhn-Bc-2-GiatSayNhanh.png" alt="" />
                    </div>
                    <div className="col-span-3">
                        <img src="https://giatsaynhanh.vn/wp-content/uploads/2018/05/buoc-3-giat-quan-ao.png" alt="" />
                    </div>
                    <div className="col-span-3">
                        <img src="https://giatsaynhanh.vn/wp-content/uploads/2018/03/Quy-Trnh-Giao-Nhn-Bc-4-GiatSayNhanh.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage