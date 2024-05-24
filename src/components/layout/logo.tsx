import { NavLink } from "react-router-dom";

const Logo = () => {
    return (
        <div className="">
            <NavLink to={"/"}>
                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-primary">Giặt xấy nhanh</h2>
            </NavLink>
        </div>
    );
}

export default Logo;