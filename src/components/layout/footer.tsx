import { Facebook ,Instagram,Github} from "lucide-react";
const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
            <nav className="grid grid-flow-col gap-4">
                <a className="link link-hover">Trang chủ</a>
                <a className="link link-hover">Giới thiệu</a>
                <a className="link link-hover">Liên hệ</a>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <Facebook />
                    </a>
                    <a>
                        <Instagram />
                    </a>
                    <a>
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