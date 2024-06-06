import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { SelectTrigger, Select, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { OrderStatus, Unit } from "@/lib/enums"
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
// {
//     "userName": "Nguyễn Văn A",
//     "email": "admin@example.com",
//     "address": "Số 1, Đường 1, Phường 1, Quận 1, TP.HCM",
//     "deliveryDate": "2024-06-06T13:37:23.7988009",
//     "phoneNumber": "0123456789",
//     "value": 8,
//     "unit": "Kg",
//     "note": "Giao hàng sau 1 ngày",
//     "status": "Done"
//   }

const UpdateOrderSchema = z.object({
    userName: z.string(),
    email: z.string().email(),
    address: z.string(),
    deliveryDate: z.date(),
    phoneNumber: z.string().max(15),
    value: z.number(
        {
            message: "Số lượng phải lớn hơn 0"
        }
    ),
    unit: z.string(),
    note: z.string().optional(),
    status: z.string()
});

const UpdateOrerPage = () => {
    const { guid } = useParams();
    const { accessToken } = useAuth();
    const form = useForm({
        resolver: zodResolver(UpdateOrderSchema),
        defaultValues: {
            userName: '',
            email: '',
            address: '',
            deliveryDate: new Date(),
            phoneNumber: '',
            value: 0,
            unit: '',
            note: '',
            status: ''
        }
    });


    useEffect(() => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/orders/${guid}`,
            headers: {
                'accept': '*/*'
            }
        };

        axios.request(config)
            .then((response) => {
                const data = response.data;
                form.setValue('userName', data.userName);
                form.setValue('email', data.email);
                form.setValue('address', data.address);
                form.setValue('deliveryDate', new Date(data.deliveryDate));
                form.setValue('phoneNumber', data.phoneNumber);
                form.setValue('value', data.value);
                form.setValue('unit', data.unit);
                form.setValue('note', data.note);
                form.setValue('status', data.status);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [form, guid])
    const onSubmit = async (values: z.infer<typeof UpdateOrderSchema>) => {
        console.log(values);

        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/orders/${guid}`,
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                ...values,
                deliveryDate: new Date(values.deliveryDate),
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                toast.success("Cập nhật đơn hàng thành công")
            })
            .catch((error) => {
                console.log(error);
                toast.error("Cập nhật đơn hàng thất bại")
            });
    }
    return (
        <div className="w-[500px] mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-y-1">
                                <FormLabel htmlFor="userName">Tên khách hàng</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập tên khách hàng..." type="text" id="userName" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Nhập tên khách hàng ở đây.
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
                                    <Input placeholder="Nhập email..." type="email" id="email" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Nhập email ở đây.
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
                                <FormLabel htmlFor="address">Địa chỉ</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập địa chỉ..." type="text" id="address" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Nhập địa chỉ ở đây.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="deliveryDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-y-1">
                                <FormLabel htmlFor="deliveryDate">Ngày giao hàng</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" id="deliveryDate"
                                        onChange={(e) => {
                                            const date = new Date(e.target.value);
                                            field.onChange(date);
                                        }}
                                        defaultValue={form.getValues().deliveryDate.toISOString().slice(0, 16)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Chọn ngày giao hàng ở đây.
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
                                    <Input placeholder="Nhập số điện thoại..." type="text" id="phoneNumber" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Nhập số điện thoại ở đây.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between items-center gap-x-2">
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-y-1 w-full">
                                    <FormLabel htmlFor="value">Số lượng / Kg</FormLabel>
                                    <FormControl>
                                        <Input type="number" id="value"
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                field.onChange(value);
                                            }}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Nhập số lượng hoặc kg ở đây.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="unit"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-y-1 w-full">
                                    <FormLabel htmlFor="unit">Đơn vị</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn trạng thái cần thay đổi" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    Object.keys(Unit).map((status) => {
                                                        return (
                                                            <SelectItem key={status} value={status}>
                                                                {status}
                                                            </SelectItem>
                                                        )
                                                    })

                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        Nhập đơn vị ở đây.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-x-2 mb-2">
                        <FormField
                            control={form.control}
                            name="note"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-y-1 w-full">
                                    <FormLabel htmlFor="note">Ghi chú</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập ghi chú..." type="text" id="note" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Nhập ghi chú ở đây.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-y-1 w-full">
                                    <FormLabel htmlFor="status">Trạng thái</FormLabel>
                                    <Select onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn trạng thái cần thay đổi" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                Object.keys(OrderStatus).map((status) => {
                                                    return (
                                                        <SelectItem key={status} value={status}>
                                                            {status}
                                                        </SelectItem>
                                                    )
                                                })

                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Nhập trạng thái ở đây.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Cập nhật</button>

                </form>
            </Form>
        </div>
    );
}

export default UpdateOrerPage;
