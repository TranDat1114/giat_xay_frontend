import Logo from "@/components/layout/logo";
import NavigationBar from "@/components/layout/navbar";
// import { useRef } from "react";




const Header = () => {

    //header sticky when scroll down

    // const headerRef = useRef<HTMLElement | null>(null); // Add type annotation to useRef

    // const scrollFunction = () => {
    //     if (headerRef.current !== null) {
    //         if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //             headerRef.current.classList.add("sticky" as never); // Add type assertion
    //         } else {
    //             headerRef.current.classList.remove("sticky" as never); // Add type assertion
    //         }
    //     }
    // }

    // window.onscroll = function () {
    //     scrollFunction();
    // };

    return (
        <header id="header" className="mx-auto lg:px-36 left-0 right-0 h-16 justify-between flex items-center text-primary top-0 z-10 fixed bg-white shadow-lg transition-all duration-300 ease-in-out"
        // ref={headerRef}
        >
            <Logo />
            <NavigationBar />
        </header>
    );
}

export default Header;