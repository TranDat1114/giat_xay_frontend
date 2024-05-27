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
import { cn, isAdmin, isLoggedIn } from '@/lib/utils';
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

import { LaundryService } from '@/lib/types';
import axios from "axios";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


const NavigationBar = () => {
    const [laundryService, setLaundryService] = useState<LaundryService[]>([]);

    useEffect(() => {

        axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/laundry-services`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            setLaundryService(response.data)

        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const { logout } = useAuth();
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
                            {laundryService.map((service) => (
                                <NavLink to={`/orders-laundry/${service.guid}`}
                                    key={service.guid}>
                                    <ListItem

                                        title={service.name}
                                    >

                                        {service.description}
                                    </ListItem>
                                </NavLink>
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
                    <NavLink to="/orders-laundry" >
                        <p className={`text-lg font-semibold bg-primary/80 px-4 py-2 rounded-lg mx-2 text-background hover:bg-primary`}>
                            Giặt ngay
                        </p>
                    </NavLink>
                </NavigationMenuItem>
                {
                    isAdmin() == true ?
                        <NavigationMenuItem>
                            <p className={navigationMenuTriggerStyle()}>
                                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                                    Dashboard
                                </NavLink>
                            </p>
                        </NavigationMenuItem>
                        : <></>
                }
                {
                    isLoggedIn() == true ?
                        <NavigationMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="overflow-hidden rounded-full"
                                    >
                                        <img
                                            src="https://pbs.twimg.com/profile_images/1787107492436258816/rlEsw_te_400x400.jpg"
                                            width={36}
                                            height={36}
                                            alt="Avatar"
                                            className="overflow-hidden rounded-full"
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Support</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={logout}
                                        >
                                            Đăng xuất
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </NavigationMenuItem>
                        :
                        <NavigationMenuItem>
                            <NavLink to="/signin" >
                                <Button variant="outline" >
                                    Đăng nhập
                                </Button>
                            </NavLink>
                        </NavigationMenuItem>
                }
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