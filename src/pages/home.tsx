import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import Autoplay from "embla-carousel-autoplay"
import { useSingleton } from "@/context/SingletonContext"
import { getFullImageUrl,reasons } from "@/lib/utils"
import { NavLink } from "react-router-dom"


const HomePage = () => {
    const { bannerList, laundryService } = useSingleton();
    const halfReason = Math.ceil(reasons.length / 2)
    return (
        <div className="flex flex-col">
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
                    {bannerList.map((image, index) => (
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
            <div id="home-section-2" className="flex flex-col items-center bg-[#f8f8f8] p-32">
                <h1 className="text-3xl font-light">Quy trình giao nhận đơn giản</h1>
                <div className="grid grid-cols-12 justify-center items-start mt-12 gap-x-8 container">
                    <div className="col-span-3 flex flex-col items-center gap-4 relative">
                        <img className="h-32 hover:animate-spin p-4" src="https://giatsaynhanh.vn/wp-content/uploads/2018/03/Quy-Trnh-Giao-Nhn-Bc-1-GiatSayNhanh.png" alt="" />
                        <div className="flex justify-center z-[1] items-center w-8 h-8  bg-primary mt-2">
                            <p className="text-white ">1</p>
                        </div>
                        <Separator className="absolute top-[166px] bg-muted-foreground w-1/2" />
                        <div className="flex flex-col justify-center items-center text-center gap-y-2">
                            <p className="font-semibold">
                                Thu gom quần áo bẩn của bạn
                            </p>
                            <p className="text-wrap">
                                Chọn các phương thức ở các góc trang để được Giặt Sấy Nhanh hồ trợ
                            </p>
                        </div>

                    </div>
                    <div className="col-span-3 flex flex-col items-center gap-4 relative">
                        <img className="h-32 hover:animate-spin p-4" src="https://giatsaynhanh.vn/wp-content/uploads/2018/03/Quy-Trnh-Giao-Nhn-Bc-2-GiatSayNhanh.png" alt="" />
                        <div className="flex justify-center items-center h-8 w-8 z-[1] bg-primary mt-2">
                            <p className="text-white">2</p>
                        </div>
                        <Separator className="absolute top-[166px] bg-muted-foreground w-1/2" />
                        <div className="flex flex-col justify-center items-center text-center gap-y-2">
                            <p className="font-semibold">
                                Giặt quần áo
                            </p>
                            <p className="text-wrap">
                                Nhân viên cửa hàng giặt sấy tự động GiatSayNhanh.vn sẽ có mặt ngay thời điểm được hẹn để tiếp nhận hàng hóa một cách chuyên nghiệp nhất.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-3 flex flex-col items-center gap-4 relative">
                        <img className="h-32 hover:animate-spin p-4" src="https://giatsaynhanh.vn/wp-content/uploads/2018/05/buoc-3-giat-quan-ao.png" alt="" />
                        <div className="flex justify-center items-center h-8 w-8 z-[1] bg-primary mt-2">
                            <p className="text-white">3</p>
                        </div>
                        <Separator className="absolute top-[166px] bg-muted-foreground w-1/2" />

                        <div className="flex flex-col justify-center items-center text-center gap-y-2">
                            <p className="font-semibold">
                                Nhận hàng
                            </p>
                            <p className="text-wrap">
                                Nhân viên cửa hàng giặt sấy tự động GiatSayNhanh.vn sẽ có mặt ngay thời điểm được hẹn để tiếp nhận hàng hóa một cách chuyên nghiệp nhất.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-3 flex flex-col items-center gap-4 relative">
                        <img className="h-32 hover:animate-spin p-4" src="https://giatsaynhanh.vn/wp-content/uploads/2018/03/Quy-Trnh-Giao-Nhn-Bc-4-GiatSayNhanh.png" alt="" />
                        <div className="flex justify-center items-center h-8 w-8 z-[1] bg-primary mt-2">
                            <p className="text-white">4</p>
                        </div>
                        <Separator className="absolute top-[166px] bg-muted-foreground w-1/2" />

                        <div className="flex flex-col justify-center items-center text-center gap-y-2">
                            <p className="font-semibold">
                                Gấp và Giao Quần Áo
                            </p>
                            <p className="text-wrap">
                                Những bộ quần áo sạch sẽ, gọn hàng sẽ được giặt ủi giao nhận nơi cho khách hàng
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="section-3" className="flex flex-col items-center p-32">
                <h1 className="text-3xl font-light">Dịch vụ</h1>
                <div className="container grid grid-cols-3 justify-center items-start gap-8 mt-8">
                    {
                        laundryService.map((service, index) => (
                            <NavLink
                                key={index}
                                to={`/orders-laundry/${service.guid}`}>
                                <div className="col-span-1 flex flex-col gap-y-2 animate-border-w">
                                    <img className="w-full h-80 object-cover object-center" src={getFullImageUrl(service.imageUrl) ?? ""} alt={service.description} />
                                    <div className="text-center">
                                        <h2 className="text-xl">{service.name}</h2>
                                    </div>
                                    <div className="h-1 bg-primary transition-all mt-6 m-auto border-bar"></div>
                                </div>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
            <div id="section-4" className="flex flex-col items-center p-32">
                <h1 className="text-3xl font-light">Tại Sao Chọn Chúng Tôi</h1>
                <div className="container grid grid-cols-3 justify-center gap-8 mt-8">
                    <div className={`col-span-1 grid grid-rows-${halfReason} grid-flow-row gap-4`}>
                        {
                            reasons.slice(0, halfReason).map((reason, index) => (
                                <div key={index} className="col-span-1 row-span-1 grid grid-cols-12">
                                    <div className="col-span-2">
                                        {reason.icon && <reason.icon className="h-12 w-12 text-primary"
                                            strokeWidth={1}
                                        />}
                                    </div>
                                    <div className="col-span-10">
                                        <h3 className="text-lg font-medium">
                                            {reason.title}
                                        </h3>
                                        <p>
                                            {reason.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-span-1">
                        <img src="https://giatsaynhanh.vn/wp-content/uploads/2018/05/dich-vu-giat-giay-nhanh.png" alt="" />
                    </div>
                    <div className={`col-span-1 grid grid-rows-${halfReason} grid-flow-row gap-4`}>
                        {
                            reasons.slice(halfReason).map((reason, index) => (
                                <div key={index} className="col-span-1 grid grid-cols-12">
                                    <div className="col-span-2">
                                        {reason.icon && <reason.icon className="h-12 w-12 text-primary"
                                            strokeWidth={1}
                                        />}
                                    </div>
                                    <div className="col-span-10">
                                        <h3 className="text-lg font-medium">
                                            {reason.title}
                                        </h3>
                                        <p>
                                            {reason.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage