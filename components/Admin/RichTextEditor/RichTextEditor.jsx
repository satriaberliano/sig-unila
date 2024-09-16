import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function RichTextEditor({
  value,
  onChange,
  className,
  ...props
}) {
  const modules = {
    toolbar: [
      ["bold", "italic"], // Bold and italic formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["link", "image"], // Link and image insertion
      ["clean"], // Remove formatting button
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      className={className}
    />
  );
}
