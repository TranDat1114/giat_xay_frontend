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
import { cn, getUser, isAdmin } from '@/lib/utils';
import { NavLink } from "react-router-dom";
import { isLogin, useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useSingleton } from "@/context/SingletonContext";

const NavigationBar = () => {
    const { laundryService } = useSingleton();
    const userInfor = getUser()

    const { logout } = useAuth();
    // const navigate = useNavigate();
    return (
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">

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
                        <NavigationMenuTrigger>
                            <NavLink to="/orders-laundry" className={({ isActive }) => isActive ? "active" : ""}>
                                Dịch vụ
                            </NavLink>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {laundryService.map((service) => (
                                    <li key={service.guid}>
                                        <NavigationMenuLink asChild>
                                            <NavLink
                                                to={`/orders-laundry/${service.guid}`}
                                                className={cn(
                                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",

                                                )}
                                            >
                                                <div className="text-sm font-medium leading-none">{service.name}</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    {service.description}
                                                </p>
                                            </NavLink>
                                        </NavigationMenuLink>
                                    </li>
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
                    {/* <NavigationMenuItem>
                    <NavLink to="/orders-laundry" >
                        <p className={`text-lg font-semibold bg-primary/80 px-4 py-2 rounded-lg mx-2 text-background hover:bg-primary`}>
                            Giặt ngay
                        </p>
                    </NavLink>
                </NavigationMenuItem> */}
                    {
                        isAdmin() == true ?
                            <NavigationMenuItem>
                                <p className={navigationMenuTriggerStyle()}>
                                    <NavLink to="/dashboard-home" className={({ isActive }) => isActive ? "active" : ""}>
                                        Dashboard
                                    </NavLink>
                                </p>
                            </NavigationMenuItem>
                            : <></>
                    }
                    {
                        isLogin() == true ?
                            <NavigationMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-full"
                                        >
                                            <img
                                                src="https://pbs.twimg.com/profile_images/1787107492436258816/rlEsw_te_400x400.jpg"
                                                width={36}
                                                height={36}
                                                alt="Avatar"
                                                className="rounded-full"
                                            />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>{userInfor.email}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Trang cá nhân</DropdownMenuItem>
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
        </div>
    );
}
export default NavigationBar;