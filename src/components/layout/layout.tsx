import React from "react";
import Header from "@/components/layout/header";
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <div className="w-full shadow-lg rounded-lg mb-16">
                <Header />
            </div>
            <main className="my-2">{children}</main> {/* Main content */}
            <footer> {/* Footer content */} </footer>
        </div>
    );
};

export default Layout;