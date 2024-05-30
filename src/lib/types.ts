interface LaundryService {
    guid: string,
    name: string,
    description: string,
    imageUrl?: string,
}
interface Image {
    url: string
    name: string
    groupType: string
}
interface ApiResponse<T> {
    success: boolean;
    data: Data<T>;
    message: null;
    errors: null;
}

interface Data<T> {
    result: T[];
    total: number;
    page: number;
    pageSize: number;
    keyword: null;
}


interface Order {
    orderId: number;
    userName: string;
    email: string;
    pickupAddress: string;
    pickupDate: Date;
    deliveryAddress: string;
    deliveryDate: Date;
    phoneNumber: string;
    weight: number;
    unit: string;
    totalPrice: number;
    note: string;
    status: string;
    description: string;
    laundryServiceTypeGuid: string;
    laundryServiceGuid: string;
    guid: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}

export type { LaundryService, Image, Order, ApiResponse, Data }