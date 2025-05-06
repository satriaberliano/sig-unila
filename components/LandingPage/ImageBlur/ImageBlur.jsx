// import Image from "next/image";
// import { getPlaiceholder } from "plaiceholder";

// const ImageBlur = async ({ src, name }) => {
//   const buffer = await fetch(src).then(async (res) => {
//     return Buffer.from(await res.arrayBuffer());
//   });

//   const { base64 } = await getPlaiceholder(buffer);

//   return (
//     <Image
//       src={src}
//       fill
//       className="aspect-video object-cover"
//       alt={`${name} image`}
//       placeholder="blur"
//       blurDataURL={base64}
//     />
//   );
// };

// export default ImageBlur;
