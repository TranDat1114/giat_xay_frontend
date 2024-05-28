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
import { useForm } from "react-hook-form"

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
import { useEffect, useState } from "react"
import { LaundryService } from "@/lib/types"
import { useNavigate } from "react-router-dom"
const formSchema = z.object({
    name: z.string(),
    email: z.string().email({}).optional(),
    phoneNumber: z.string().regex(/^[0-9]{10}$/, {
        message: "Số điện thoại không hợp lệ"
    }),
    pickupAddress: z.string().min(1, {
        message: "Địa chỉ cần phải nhập"
    }),
    deliveryAddress: z.string().min(1, {
        message: "Địa chỉ cần phải nhập"
    }),
    note: z.string().optional(),
});
const OrderLaundryPage = () => {
    const { guid } = useParams()

    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phoneNumber: "",
            pickupAddress: "",
            deliveryAddress: "",
            note: "",
        }
    })



    const [laundryService, setLaundryService] = useState<LaundryService>({
        guid: "",
        name: "",
        description: ""
    });

    useEffect(() => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/laundry-services/${guid}`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
        axios.request(config)
            .then((response) => {
                setLaundryService(response.data)
            })
            .catch((error) => {
                console.log(error);
                toast.error("Không tìm thấy dịch vụ giặt ủi này.")
            });
    }, [guid]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/orders`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                ...values,
                laundryServiceGuid: guid
            }
        };
        axios.request(config)
            .then((response) => {
                toast.success("Đặt hàng thành công")
                console.log(response.data)
                navigate("/complete-orders-laundry")
            })
            .catch((error) => {
                console.log(error);
                toast.error("Đặt hàng thất bại")
            });

    }

    return (
        <div className="w-full flex justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>{laundryService.name}</CardTitle>
                    <CardDescription>{laundryService.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-y-1">
                                        <FormLabel htmlFor="name">Họ và tên</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập tên của bạn..." type="text" id="name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Nhập họ và tên của bạn ở đây.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-y-1">
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập email của bạn..." type="text" id="email" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Nhập email của bạn ở đây.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                name="pickupAddress"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-y-1">
                                        <FormLabel htmlFor="pickupAddress">Địa chỉ nhận đồ cần giặt</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập địa chỉ nhận đồ giặt..." type="text" id="pickupAddress" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Nhập địa chỉ chúng tôi có thể nhận đồ cần giặt từ bạn.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deliveryAddress"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-y-1">
                                        <FormLabel htmlFor="deliveryAddress">Địa chỉ trả đồ đã giặt</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nhập địa chỉ trả đồ đã giặt..." type="text" id="deliveryAddress" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Nhập địa chỉ chúng tôi đã giặt cho bạn.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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

        </div>
    )
}

export default OrderLaundryPage