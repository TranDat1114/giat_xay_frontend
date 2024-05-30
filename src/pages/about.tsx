import { useSingleton } from "@/context/SingletonContext";
import { NavLink } from "react-router-dom";
import { getFullImageUrl, reasons } from "@/lib/utils"


const AboutPage = () => {
    const { laundryService } = useSingleton();
    const halfReason = Math.ceil(reasons.length / 2)

    return (
        <div>
            <div id="section-0" className="relative">
                <img className="z-0 top-0 left-0 bottom-0 right-0 h-52 w-full object-cover object-center" src="https://giatsaynhanh.vn/wp-content/uploads/2018/05/parallax-img-02.jpg" alt="" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-secondary">
                    <h1 className="text-4xl font-light my-2">Giặt Xấy Nhanh</h1>
                    <p className="text-lg">Chất lượng - Nhanh chóng - Tiện lợi</p>
                </div>
            </div>
            <div id="section-1" className="flex flex-col justify-center items-center px-32 py-12">
                <h1 className="text-3xl font-light">Giới Thiệu Giặt Xấy Nhanh</h1>
                <div className="prose mt-12">
                    <p>
                        <strong>Giặt Xấy Nhanh</strong> là cửa hàng chuyên về lĩnh vực giặt dân dụng và công nghiệp. Chúng tôi cung cấp các dịch vụ giặt sấy như: Giặt Sấy Nhanh trang phục và các đồ dùng khác cho cá nhân, gia đình và doanh nghiệp. <strong>Giặt Xấy Nhanh</strong> cam kết các chỉ tiêu:
                    </p>

                    <ul>
                        <li>
                            <p>
                                Hệ thống máy móc đồng bộ hiện đại.
                            </p>
                        </li>
                        <li>
                            <p>
                                Đảm bảo quần áo luôn sạch và thơm nhất.
                            </p>
                        </li>
                        <li>
                            <p>
                                Thời gian giặt và sấy nhanh nhất.
                            </p>
                        </li>
                        <li>
                            <p>
                                Tiết kiệm điện và nước.
                            </p>
                        </li>
                        <li>
                            <p>
                                Bảo vệ môi trường với các thiết bị giặt chuyên nghiệp.
                            </p>
                        </li>
                    </ul>
                </div>
                <img className="w-full" src="http://giatsaynhanh.vn/wp-content/uploads/2018/05/Xuong-GiatSayNhanh.jpg" alt="" />
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
    );
};

export default AboutPage;   