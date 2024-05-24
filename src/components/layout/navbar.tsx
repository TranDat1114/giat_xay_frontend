// import { useNavigate } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils';
import React from 'react';
import { NavLink } from "react-router-dom";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Giặt xấy nhanh",
        href: "/docs/primitives/alert-dialog",
        description:
            "Dịch vụ Giặt Sấy Nhanh. Miễn phí giao nhận tận nơi đơn hàng trên 200k",
    },
    {
        title: "Giặt hấp",
        href: "/docs/primitives/hover-card",
        description:
            "Dịch vụ Giặt Hấp Chất lượng cao",
    },
    {
        title: "Giặt ủi spa, nhà hàng, khách sạn",
        href: "/docs/primitives/progress",
        description:
            "Dịch vụ Giặt ủi Spa, Nhà hàng, Khách sạn. Chuyên Nghiệp - Uy Tín - Giá cả cạnh tranh",
    }
]
const NavigationBar = () => {
    // const navigate = useNavigate();
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <p className={navigationMenuTriggerStyle()}>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                            Trang chủ
                        </NavLink>
                    </p>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Dịch vụ</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <p className={navigationMenuTriggerStyle()}>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
                            Giới thiệu
                        </NavLink>
                    </p>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <p className={navigationMenuTriggerStyle()}>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
                            Liên hệ
                        </NavLink>
                    </p>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavLink to="/callnow" >
                        <p className={`text-lg font-semibold bg-primary/80 px-4 py-2 rounded-lg mx-2 text-background hover:bg-primary`}>
                            Giặt ngay
                        </p>
                    </NavLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
export default NavigationBar;