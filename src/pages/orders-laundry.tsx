import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useParams } from 'react-router-dom';
import axios from "axios"
import { toast } from "sonner"
import { LaundryService } from "@/lib/types"
import { useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { useSingleton } from "@/context/SingletonContext"
import { formatVNDPrice, formatUnit, getUser } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import { v4 as uuidv4 } from 'uuid';
const laundryServiceSchema = z.object({
    guid: z.string().optional(),
    quantity: z.number(
        {
            message: "Số lượng cần phải là số nguyên dương"
        }
    ).int().positive().optional()
})

const formSchema = z.object({
    phoneNumber: z.string().regex(/^[0-9]{10}$/, {
        message: "Số điện thoại không hợp lệ"
    }),
    address: z.string().min(1, {
        message: "Địa chỉ cần phải nhập"
    }),
    note: z.string().optional(),
    listLaundryServicesType: z.array(laundryServiceSchema).optional()
});

const OrderLaundryPage = () => {
    const { guid } = useParams()
    const { accessToken } = useAuth()
    const { laundryService } = useSingleton()
    const laundryServices = laundryService.find((service) => service.guid === guid) as LaundryService

    const user = getUser()

    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: "",
            address: "",
            note: "",
            listLaundryServicesType: [
                {
                    guid: "",
                    quantity: 1
                } as z.infer<typeof laundryServiceSchema>
            ]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "listLaundryServicesType"
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/orders`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        }
        const currentDay = new Date()
        const tomorrow = new Date(currentDay)
        tomorrow.setDate(currentDay.getDate() + 1)
        if (laundryServices.name != "Giặt Hấp Chất lượng cao") {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { listLaundryServicesType, ...requestValues } = values
            const emptyGuid: string = uuidv4();
            axios.request(
                {
                    ...config,
                    data: {
                        ...requestValues,
                        laundryServiceGuid: guid,
                        deliveryDate: tomorrow,
                        email: user.email,
                        userName: user.unique_name,
                        laundryServiceTypeGuid: emptyGuid.toString(),
                    }
                }
            ).then((response) => {
                toast.success("Đặt hàng thành công")
                console.log(response.data)
                navigate("/complete-orders-laundry")
            }).catch((error) => {
                console.log(error);
                toast.error("Đặt hàng thất bại")
                console.log("No service")
            });
        }
        else {
            if (values.listLaundryServicesType == undefined || values.listLaundryServicesType.length === 0) {
                toast.error("Vui lòng chọn ít nhất một dịch vụ")
                return
            } else {
                values.listLaundryServicesType.map((service) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { listLaundryServicesType, ...requestValues } = values

                    axios.request(
                        {
                            ...config,
                            data: {
                                ...requestValues,
                                laundryServiceGuid: guid,
                                value: service.quantity,
                                laundryServiceTypeGuid: service.guid,
                                deliveryDate: tomorrow,
                                email: user.email,
                                userName: user.unique_name,
                                unit: "Bộ",
                            }
                        }
                    )
                        .then((response) => {
                            toast.success("Đặt hàng thành công")
                            console.log(response.data)
                            navigate("/complete-orders-laundry")
                        })
                        .catch((error) => {
                            console.log(error);
                            toast.error("Đặt hàng thất bại")
                            console.log("No")
                        });
                })
            }

        }
    }

    return (
        <div className="w-full flex justify-center flex-col items-center">
            <div className="flex justify-between gap-x-4">
                <Card className="w-full">
                    <CardHeader>
                        {/* <CardTitle>{laundryService.name}</CardTitle> */}
                        <CardDescription>{laundryServices.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-y-1">
                                            <FormLabel htmlFor="phoneNumber">Số điện thoại</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nhập số điện thoại của bạn..." type="text" id="phoneNumber" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Nhập số điện thoại của bạn ở đây.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-y-1">
                                            <FormLabel htmlFor="deliveryAddress">Địa chỉ nhận/trả đồ</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nhập địa chỉ trả đồ đã giặt..." type="text" id="deliveryAddress" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Nhập địa chỉ của bạn.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {laundryServices.name === "Giặt Hấp Chất lượng cao" ? (
                                    <div id="select-service-types">
                                        <div className="flex justify-start gap-4 my-2">
                                            <Button type="button"
                                                variant={"default"}
                                                onClick={() =>
                                                    append({
                                                        guid: "",
                                                        quantity: 1
                                                    })
                                                }
                                                className="">Thêm dịch vụ</Button>
                                            <Button type="button"
                                                variant={"destructive"}
                                                onClick={() => {
                                                    remove(fields.length - 1)
                                                }}
                                                className="">Xóa dịch vụ</Button>
                                        </div>

                                        {
                                            fields.map((serviceType, index) => (
                                                <div key={index} className="flex gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name={`listLaundryServicesType.${index}.guid` as const}
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col gap-y-1 w-2/3">
                                                                <FormLabel htmlFor={`guid-${index}`}>Dịch vụ</FormLabel>
                                                                <FormControl id={`guid-${index}`}>
                                                                    <Select
                                                                        onValueChange={
                                                                            (value) => {
                                                                                field.onChange(value)
                                                                            }
                                                                        }
                                                                    >
                                                                        <SelectTrigger >
                                                                            <SelectValue placeholder="Chọn dịch vụ" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {laundryServices.laundryServiceTypes.map((type, index) => (
                                                                                <SelectItem key={index} value={type.guid}>
                                                                                    {type.description}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormDescription>
                                                                    Chọn dịch vụ bạn muốn.
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`listLaundryServicesType.${index}.quantity` as const}
                                                        render={({ field }) => (
                                                            <FormControl>
                                                                <FormItem className="flex flex-col gap-y-1 1/3">
                                                                    <FormLabel htmlFor={`quantity-${index}`}>Số lượng</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="Nhập số lượng..."
                                                                            type="number"
                                                                            id={`quantity-${index}`}
                                                                            onChange={
                                                                                (e) => {
                                                                                    field.onChange(parseInt(e.target.value))

                                                                                }
                                                                            }
                                                                        />
                                                                    </FormControl>
                                                                    <FormDescription>
                                                                        Nhập số lượng của dịch vụ.
                                                                    </FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            </FormControl>
                                                        )}
                                                    />
                                                </div>
                                            ))
                                        }

                                    </div>
                                )
                                    : (
                                        <>
                                        </>
                                    )
                                }

                                <FormField
                                    control={form.control}
                                    name="note"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-y-1">
                                            <FormLabel htmlFor="note">Ghi chú</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nhập ghi chú..." type="text" id="note" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Nhập ghi chú nếu có.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="bg-primary text-white py-2 rounded-lg">Xác nhận</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <Card className="w-[500px]">
                    <CardHeader>
                        <CardTitle>Bảng giá chi tiết {laundryServices.name}</CardTitle>
                        <CardDescription>{laundryServices.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-y-2">
                            {
                                laundryServices.laundryServiceTypes.map((serviceType, index) => (
                                    <div key={index}>
                                        <p className="text-sm">
                                            {serviceType.description} : {formatVNDPrice(serviceType.price)} / {serviceType.unitValue} {formatUnit(serviceType.unitType)}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div id="home-section-2" className="flex flex-col items-center bg-[#f8f8f8] p-24 mt-12">
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
                                Nhân viên cửa hàng giặt sấy tự động GiatXayNhanh.vn sẽ có mặt ngay thời điểm được hẹn để tiếp nhận hàng hóa một cách chuyên nghiệp nhất.
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
                                Nhân viên cửa hàng giặt sấy tự động GiatXayNhanh.vn sẽ có mặt ngay thời điểm được hẹn để tiếp nhận hàng hóa một cách chuyên nghiệp nhất.
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
                <div>
                    <h2 className="text-2xl font-semibold mt-12">Đơn hàng của bạn sẽ được xác nhận thông tin và ghi lại khi đã kiểm tra</h2>
                </div>
            </div>
        </div >
    )
}

export default OrderLaundryPage

