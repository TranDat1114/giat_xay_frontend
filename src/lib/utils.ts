import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from "jwt-decode";
import { Unit } from "@/lib/enums";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAdmin() {

  return getUser().role.includes('Admin');
}

export interface jwtDecode {
  unique_name: string;
  email: string;
  nameid: string;
  role: string[];
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export function isTokenExpired(token: string) {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây

    // Kiểm tra thời gian hết hạn
    if (!decodedToken.exp) {
      return true; // Token không có thời gian hết hạn
    }

    if (decodedToken.exp < currentTime) {
      return true; // Token đã hết hạn
    } else {
      return false; // Token vẫn còn hiệu lực
    }
  } catch (error) {
    return true; // Token không hợp lệ hoặc không thể giải mã
  }
}

export function getUser(): jwtDecode {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return {
      unique_name: '',
      email: '',
      nameid: '',
      role: [],
      nbf: 0,
      exp: 0,
      iat: 0,
      iss: '',
      aud: ''
    };
  }
  const decodedToken = jwtDecode(token) as jwtDecode;
  return decodedToken;
}

export function formatUnit(unit: Unit | number): string {
  switch (unit) {
    case Unit.Weight:
      return 'Kg';
    case Unit.Unit:
      return 'Bộ';
    case Unit.Time:
      return 'Lần';
    default:
      return '';
  }
}



export function formatDateTime(dateTime: Date): string {

  const date = new Date(dateTime);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  return date.toLocaleDateString('vi-VN', options);
}

export function formatDate(dateTime: Date): string {

  const date = new Date(dateTime);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('vi-VN', options);
}

export function formatVNDPrice(price: number | string): string {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numericPrice);
}

export const getFullImageUrl = (imagePath: string) => {
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
