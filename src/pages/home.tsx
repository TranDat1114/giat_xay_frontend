import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import axios from "axios"
import Autoplay from "embla-carousel-autoplay"

import { useEffect, useState } from "react"
interface Image {
    url: string
    name: string
    groupType: string
}

const HomePage = () => {
    const [imageList, setImageList] = useState<Image[]>([]);

    useEffect(() => {
        axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/images`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            setImageList(response.data)

        }).catch((error) => {
            console.log(error);
        });
    }, [setImageList]);

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
                            <img className="object-cover object-top" src={`${import.meta.env.VITE_API_URL}${image.url}`} style={
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
                <div className="grid grid-cols-12 justify-center items-center mt-12 gap-x-4">
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