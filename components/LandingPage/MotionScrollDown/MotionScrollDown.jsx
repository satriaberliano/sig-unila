// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// const MotionScrollDown = ({ children }) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

//   return (
//     <motion.div
//       ref={ref}
//       style={{
//         opacity,
//         scale,
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default MotionScrollDown;

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const MotionScrollDown = ({ children }) => {
  const ref = useRef(null);
  const [hasAppeared, setHasAppeared] = useState(false);

  // Mengambil scroll progress dari elemen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.7 1", "1 1"], // Elemen akan mulai muncul saat 80% di luar layar
  });

  // Animasi opacity dan scale
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  // useEffect untuk mendeteksi kapan animasi selesai
  useEffect(() => {
    // Ketika scrollYProgress mencapai 1 (elemen sepenuhnya terlihat), simpan status
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest === 1 && !hasAppeared) {
        setHasAppeared(true);
      }
    });

    return () => unsubscribe(); // Bersihkan event listener saat komponen unmount
  }, [scrollYProgress, hasAppeared]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: hasAppeared ? 1 : opacity, // Tetap muncul setelah animasi
        scale: hasAppeared ? 1 : scale, // Tetap dalam skala 1 setelah animasi
      }}
      whileInView={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionScrollDown;
