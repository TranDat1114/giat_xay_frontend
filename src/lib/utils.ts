import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}

export function isLoggedIn() {
  return getAccessToken() !== null;
}

export function isAdmin() {
  return getUser().role === 'Admin';
}

export interface UserInfor {
  role: string;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}


export function getUser(): UserInfor {
  const user = sessionStorage.getItem('user-info');

  return JSON.parse(user || '{}');

}

export const getFullImageUrl = (imagePath) => {
  // Kiểm tra xem URL có phải là URL tuyệt đối không
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Nếu URL là URL tương đối, thêm tên miền của máy chủ vào
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  return `${baseUrl}${imagePath}`;
};
import { Truck, Heart, Leaf, SmilePlus, Phone, ThumbsUp, CircleUserRound, BookHeart } from "lucide-react"

interface Reasonable {
  title: string,
  description: string,
  icon?: React.FC<React.SVGProps<SVGSVGElement>>,
}

export const reasons: Reasonable[] = [
  {
    title: "Miễn phí giao nhận",
    description: "Chính xác, bạn không phải trả thêm bất kỳ khoản phí giao nhận nào khi sử dụng dịch vụ của Giặt Sấy Nhanh",
    icon: Truck,
  },
  {
    title: "Tiện lợi",
    description: "Khác với dịch vụ truyền thống, dịch vụ của Giặt Sấy Nhanh đảm bảo hoàn thành đơn hàng trong thời gian chỉ 12 giờ kể từ khi nhận.",
    icon: Heart,
  },
  {
    title: "Môi trường",
    description: "Tinh khiết và xanh, Giặt Sấy Nhanh sử dụng các nguyên liệu, bao bì Xanh, đảm bảo tái chế và thân thiện.",
    icon: Leaf
  },
  {
    title: "Chăm sóc làn da",
    description: "Bằng các hóa chất chuyên nghiệp, tiêu diệt đến 90% các chất gây dị ứng, phấn hoa và bụi cũng sẽ bị loại bỏ.",
    icon: SmilePlus
  },
  {
    title: "Dịch Vụ Khách Hàng",
    description: "Hỗ trợ 24/7 với các dịch vụ bới các nhân viên của Giặt Sấy Nhanh",
    icon: Phone
  },
  {
    title: "Cẩn Thận & Chất Lượng",
    description: "Mỗi trang phục của khác hàng được chăm sóc cẩn thận với tất cả sự chuyên nghiệp. Mỗi sản phẩm được xử lý bởi Giặt Sấy Nhanh sẽ luôn như mới.",
    icon: ThumbsUp
  },
  {
    title: "Riêng biệt",
    description: "Với quy trình chuyên nghiệp, mỗi khách hàng một lồng giặt riêng, đảm bảo vệ sinh và nói không với việc thất lạc đồ.",
    icon: CircleUserRound
  },
  {
    title: "Tận tâm",
    description: "Quy trình chuyên nghiệp và nhân sự được đào tạo chuyên nghiệp, mang đến sự hài lòng hoàn toàn cho khách hàng.",
    icon: BookHeart
  }
]
