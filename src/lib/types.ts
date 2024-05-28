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

export type { LaundryService, Image}