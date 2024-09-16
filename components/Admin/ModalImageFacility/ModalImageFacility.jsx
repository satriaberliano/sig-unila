import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { useImages } from "@/zustand/useImages";
import assets from "@/assets/assets";

const ModalImageFacility = () => {
  const { dataImages, setImage } = useImages();

  const closeHandler = () => {
    setImage();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-5/12 space-y-5 border-2 p-6 rounded-xl bg-white">
        <div className="flex justify-between items-center border-b-2 pb-4">
          <h2 className="font-semibold text-xl">Gambar Fasilitas</h2>
          <button className="text-3xl font-semibold" onClick={closeHandler}>
            <IoIosClose />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <Image
            alt="Gambar fasilitas"
            src={!dataImages ? assets.defaultImage : dataImages}
            className="w-64"
            width={125}
            height={125}
            quality={100}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default ModalImageFacility;
