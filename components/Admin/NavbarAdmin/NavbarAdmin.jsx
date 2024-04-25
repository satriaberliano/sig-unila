// ** Import Icons
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavbarAdmin() {
  return (
    <div className="bg-[#0F6EE3] fixed top-0 w-full border-b border-gray-300  p-5 flex justify-between items-center px-10 z-10">
      <GiHamburgerMenu className="text-white text-2xl cursor-pointer"/>

      <p className="text-white">Admin</p>
    </div>
  )
}
