import {
    ChevronLeft,
    ChevronRight,
    Copy,
    // CreditCard,
    File,
    ListFilter,
    MoreVertical,
    Truck,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
// import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { DashboardNav } from "@/components/ui/dashboard-nav"
import { ApiResponse, Order, InCome } from "@/lib/types"
import { useEffect, useState } from "react"
import { formatDate, formatVNDPrice } from "@/lib/utils"
import axios from "axios"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"

const DashboardHomePage = () => {
    const { accessToken } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [orderIndex, setOrderIndex] = useState<number>(0)
    const [income, setIncome] = useState<InCome>(
        {
            totalIncomeThisWeek: 0,
            totalIncomeThisMonth: 0,
            totalIncomeThisYear: 0,
            totalIncome: 0,
            totalOrders: 0,
            totalOrdersThisMonth: 0,
            totalOrdersThisWeek: 0,
            totalOrdersThisYear: 0
        }
    )
    const changeOrder = (index: number) => {
        if (index === orderIndex) {
            return
        }
        console.log(index)
        setOrderIndex(index)
    }

    useEffect(() => {
        axios.request<ApiResponse<Order>>({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/orders`,
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setOrders(response.data.result?.data || [])
            })
            .catch((error) => {
                console.log(error);
                toast.error("Lỗi lấy dữ liệu đơn hàng")
            });

        axios.request<InCome>({
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5091/income',
            headers: {}
        },
        ).then((response) => {
            console.log(response.data)
            setIncome(response.data)
        }).catch((error) => {
            console.log(error);
            toast.error("Lỗi lấy dữ liệu thu nhập")
        })
    }, [accessToken])


    return (
        <DashboardNav>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <Card
                            className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                        >
                            <CardHeader className="pb-3">
                                <CardTitle>Đơn hàng</CardTitle>
                                <CardDescription className="max-w-lg text-balance leading-relaxed">
                                    Trang quản lý,phân tích tình trạng và số lượng đơn hàng của cửa hàng
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button>Tạo đơn hàng</Button>
                            </CardFooter>
                        </Card>
                        <Card x-chunk="dashboard-05-chunk-1">
                            <CardHeader className="pb-2">
                                <CardDescription>Tuần này</CardDescription>
                                <CardTitle className="text-4xl">{formatVNDPrice(income?.totalIncomeThisWeek)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">
                                    {/* +25% from last week */}
                                </div>
                            </CardContent>
                            <CardFooter>
                                {/* <Progress value={25} aria-label="25% increase" /> */}
                            </CardFooter>
                        </Card>
                        <Card x-chunk="dashboard-05-chunk-2">
                            <CardHeader className="pb-2">
                                <CardDescription>Tháng này</CardDescription>
                                <CardTitle className="text-4xl">{formatVNDPrice(income?.totalIncomeThisMonth)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">
                                    {/* +10% from last month */}
                                </div>
                            </CardContent>
                            <CardFooter>
                                {/* <Progress value={12} aria-label="12% increase" /> */}
                            </CardFooter>
                        </Card>
                    </div>
                    <Tabs defaultValue="week">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="week">Week</TabsTrigger>
                                <TabsTrigger value="month">Month</TabsTrigger>
                                <TabsTrigger value="year">Year</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-7 gap-1 text-sm"
                                        >
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only">Filter</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked>
                                            Fulfilled
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Declined
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Refunded
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 gap-1 text-sm"
                                >
                                    <File className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">Export</span>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="week">
                            <Card x-chunk="dashboard-05-chunk-3">
                                <CardHeader className="px-7">
                                    <CardTitle>Các đơn hàng</CardTitle>
                                    <CardDescription>
                                        Các đơn hàng hiện tại trong cửa hàng của bạn
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Khách hàng</TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Loại dịch vụ
                                                </TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Trạng thái
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Ngày tạo
                                                </TableHead>
                                                <TableHead className="text-right">Tổng tiền</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                orders.map((order, index) => (
                                                    <TableRow key={index} className={`cursor-pointer`}
                                                        onClick={() => changeOrder(index)}
                                                    >
                                                        <TableCell>
                                                            <div className="font-medium">{order.userName}</div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                {order.email}
                                                            </div>
                                                            <br />
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                {order.phoneNumber}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="font-medium">
                                                                {order.laundryServiceName}
                                                            </div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                {order.laundryServiceTypeDescription}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="hidden sm:table-cell">
                                                            <Badge className="text-xs" variant="secondary">
                                                                {order.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            {formatDate(order.createdAt)}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {formatVNDPrice(order.totalPrice)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
                <div>
                    {
                        orders.length > 0 && (
                            <Card
                                className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
                            >
                                <CardHeader className="flex flex-row items-start bg-muted/50">
                                    <div className="grid gap-0.5">
                                        <CardTitle className="group flex items-center gap-2 text-lg">
                                            Mã đơn hàng: {orders[orderIndex].orderId}
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                            >
                                                <Copy className="h-3 w-3" />
                                                <span className="sr-only" onClick={
                                                    () => {
                                                        const copyText = orders[orderIndex].orderId.toString()
                                                        navigator.clipboard.writeText(
                                                            copyText
                                                        ).then(() => {
                                                            toast.success("Đã sao chép mã đơn hàng")
                                                        }).catch(() => {
                                                            toast.error("Lỗi sao chép mã đơn hàng")
                                                        }
                                                        );
                                                    }
                                                }>Sao chép mã đơn hàng</span>
                                            </Button>
                                        </CardTitle>
                                        <CardDescription>Ngày tạo: {formatDate(orders[orderIndex].createdAt)}</CardDescription>
                                    </div>
                                    <div className="ml-auto flex items-center gap-1">
                                        <Button size="sm" variant="outline" className="h-8 gap-1">
                                            <Truck className="h-3.5 w-3.5" />
                                            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                                Track Order
                                            </span>
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="outline" className="h-8 w-8">
                                                    <MoreVertical className="h-3.5 w-3.5" />
                                                    <span className="sr-only">More</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Export</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Trash</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 text-sm">
                                    <div className="grid gap-3">
                                        <div className="font-semibold">Chi tiết đơn hàng</div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    {orders[orderIndex].laundryServiceName}({orders[orderIndex].laundryServiceTypeDescription}) x <span>{orders[orderIndex].value} {orders[orderIndex].unit}</span>
                                                </span>
                                                <span>                                                            {formatVNDPrice(orders[orderIndex].totalPrice)}
                                                </span>
                                            </li>
                                        </ul>
                                        <Separator className="my-2" />
                                        <ul className="grid gap-3">
                                            {/* <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span>$299.00</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Shipping</span>
                                                <span>$5.00</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Tax</span>
                                                <span>$25.00</span>
                                            </li> */}
                                            <li className="flex items-center justify-between font-semibold">
                                                <span className="text-muted-foreground">Tổng tiền</span>
                                                <span>                                                        {formatVNDPrice(orders[orderIndex].totalPrice)}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-3">
                                            <div className="font-semibold">Địa chỉ nhận đồ giặt</div>
                                            <address className="grid gap-0.5 not-italic text-muted-foreground">
                                                <div>{orders[orderIndex].address}</div>
                                                {/* <div>{orders[order].city}</div>
                                                <div>{orders[order].country}</div> */}
                                            </address>
                                        </div>
                                        <div className="grid auto-rows-max gap-3">
                                            <div className="font-semibold">Địa chỉ giao</div>
                                            <div className="text-muted-foreground">
                                                Giống như địa chỉ nhận hàng
                                            </div>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="grid gap-3">
                                        <div className="font-semibold">Thông tin khách hàng</div>
                                        <dl className="grid gap-3">
                                            <div className="flex items-center justify-between">
                                                <dt className="text-muted-foreground">Khách hàng</dt>
                                                <dd>
                                                    {orders[orderIndex].userName}
                                                </dd>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <dt className="text-muted-foreground">Email</dt>
                                                <dd>
                                                    <a href="mailto:">{orders[orderIndex].email}</a>
                                                </dd>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <dt className="text-muted-foreground">Phone</dt>
                                                <dd>
                                                    <a href="tel:">{orders[orderIndex].phoneNumber}</a>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="grid gap-3">
                                        <div className="font-semibold">Thông tin thành toán</div>
                                        <dl className="grid gap-3">
                                            <div className="flex items-center justify-between">
                                                {/* <dt className="flex items-center gap-1 text-muted-foreground">
                                                    <CreditCard className="h-4 w-4" />
                                                    Visa
                                                </dt>
                                                <dd>**** **** **** 4532</dd> */}
                                                <dt className="text-muted-foreground">Phương thức thanh toán</dt>
                                                <dd>Thanh toán khi nhận hàng</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                                    <div className="text-xs text-muted-foreground">
                                        Updated <time dateTime="2023-11-23">November 23, 2023</time>
                                    </div>
                                    <Pagination className="ml-auto mr-0 w-auto">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <Button size="icon" variant="outline" className="h-6 w-6">
                                                    <ChevronLeft className="h-3.5 w-3.5" />
                                                    <span className="sr-only">Previous Order</span>
                                                </Button>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <Button size="icon" variant="outline" className="h-6 w-6">
                                                    <ChevronRight className="h-3.5 w-3.5" />
                                                    <span className="sr-only">Next Order</span>
                                                </Button>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </CardFooter>
                            </Card>
                        )
                    }
                </div>
            </main>
        </DashboardNav>
    )
}

const DashboardOrderPage = () => {
    return (
        <main>

        </main>
    )
};

export { DashboardHomePage, DashboardOrderPage };
