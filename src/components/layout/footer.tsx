import { Facebook, Instagram, Github } from "lucide-react";
import { NavLink } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
            <nav className="grid grid-flow-col gap-4">
                <NavLink to={"/"} className="link link-hover">Trang chủ</NavLink>
                <NavLink to={"/about"} className="link link-hover">Giới thiệu</NavLink>
                <NavLink to={"/contact"} className="link link-hover">Liên hệ</NavLink>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://www.facebook.com/giangit15" target="_blank">
                        <Facebook />
                    </a>
                    <a href="https://www.instagram.com/yangg_it01" target="_blank">
                        <Instagram />
                    </a>
                    <a href="https://github.com/yangsadboi" target="_blank">
                        <Github />
                    </a>
                </div>
            </nav>
            <aside>
                <p>Copyright © 2024 - GiatXayNhanh</p>
            </aside>
        </footer>
    );
}

export default Footer;