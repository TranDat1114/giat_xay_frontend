
interface LaundryService {
    name: string;
    description: string;
    imageUrl: string;
    laundryServiceTypes: LaundryServiceType[];
    guid: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}

interface LaundryServiceType {
    price: number;
    unitValue: number;
    conditionValue: number;
    conditionType: number;
    unitType: number;
    description: string;
    laundryServiceGuid: string;
    laundryService: null;
    guid: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}

interface Image {
    url: string
    name: string
    groupType: string
}
interface ApiResponse<T> {
    success: boolean;
    result: Result<T> | null;
    message: string;
    errors: null;
}

interface Result<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}


interface Order {
    userName: string;
    email: string;
    address: string;
    deliveryDate: Date;
    phoneNumber: string;
    value: number;
    unit: string;
    totalPrice: number;
    note: string;
    status: string;
    laundryServiceTypeGuid: string;
    laundryServiceGuid: string;
    laundryServiceTypeDescription: string;
    laundryServiceName: string;
    guid: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}

interface InCome {
    totalIncome: number;
    totalIncomeThisWeek: number;
    totalIncomeThisMonth: number;
    totalIncomeThisYear: number;
    totalOrders: number;
    totalOrdersThisWeek: number;
    totalOrdersThisMonth: number;
    totalOrdersThisYear: number;
}


export type { LaundryService, Image, Order, ApiResponse, Result, InCome, LaundryServiceType }