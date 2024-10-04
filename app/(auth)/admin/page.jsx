// ** Import Assets
import assets from "@/assets/assets";
import FormLogin from "@/components/Auth/Form/FormLogin";

//  ** Import Next
import Image from "next/image";

export default function Admin() {
  return (
    <div className="flex justify-center items-center flex-col space-y-10 bg-white py-16 w-[30rem] rounded-lg border-b-2 border-[#0F6EE3]">
      <Image
        src={assets.logoUnila}
        alt="Universitas Lampung logo"
        className="w-16"
      />
      <h3 className="text-xl font-semibold">Admin</h3>
      <FormLogin />
    </div>
  );
}
