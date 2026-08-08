import { useEffect, useRef, useState } from "react";
import { parseImages, transformImages } from "../utils/transformImages";
import classNames from "classnames/bind";
import styles from "../CarDetailForm.module.scss";

const cx = classNames.bind(styles);

interface ImagesEditorProps {
  value: string[];
  onChange: (value: string[]) => void;
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onAddImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const ImagesEditor = ({
  value,
  onChange,
  isUploading,
  fileInputRef,
  onAddImages,
  error,
}: ImagesEditorProps) => {
  const [text, setText] = useState(() => transformImages(value));
  const skipNextSync = useRef(false);

  // Chỉ đồng bộ lại text khi "value" thay đổi từ nguồn KHÁC textarea
  // (ví dụ: upload ảnh, xoá ảnh bằng nút X trên ảnh)
  useEffect(() => {
    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }
    setText(transformImages(value));
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const raw = e.target.value;
    setText(raw); // cập nhật UI ngay, không bị "nuốt" dòng trống
    skipNextSync.current = true; // đánh dấu để useEffect ở trên bỏ qua lần này
    onChange(parseImages(raw));
  };

  const handleRemoveImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={cx("images-list")}>
        {value.map((img, index) => (
          <div key={index} className={cx("image-item")}>
            <img src={img} alt="car" />
            <span onClick={() => handleRemoveImage(index)}>
              <i className="fa-solid fa-x"></i>
            </span>
          </div>
        ))}

        <div
          className={cx("image-add")}
          onClick={() => fileInputRef.current?.click()}
        >
          <i className="fa-solid fa-plus"></i>
          <span>{isUploading ? "Đang tải..." : "Thêm ảnh"}</span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={onAddImages}
        />
      </div>

      <small>Import bằng link:</small>
      <textarea
        rows={6}
        placeholder="Mỗi dòng là một URL ảnh..."
        value={text}
        onChange={handleTextChange}
      />

      {error && <span className={cx("error")}>{error}</span>}
    </>
  );
};
