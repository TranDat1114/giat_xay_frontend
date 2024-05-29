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
interface Order {
    orderId: number;
    name: null;
    email: null;
    pickupAddress: string;
    deliveryAddress: string;
    phoneNumber: string;
    note: string;
    status: string;
    laundryServiceGuid: string;
    laundryService: null;
    guid: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data: Data<T>;
    message: null;
    errors: null;
}

export interface Data<T> {
    result: T[];
    total: number;
    page: number;
    pageSize: number;
    keyword: null;
}

export type { LaundryService, Image, Order }