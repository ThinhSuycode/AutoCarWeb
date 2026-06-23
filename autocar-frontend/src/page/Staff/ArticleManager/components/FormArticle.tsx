import classNames from "classnames/bind";

import styles from "../ArticleManager.module.scss";

import { useForm } from "react-hook-form";
import type { FormArticleType } from "../../../../types/articles";

const cx = classNames.bind(styles);

interface Props {
  mode: "create" | "update";
  defaultValues?: FormArticleType;
  onSubmit: (data: FormArticleType) => void;
  closeModal: () => void;
}

const FormArticle = ({ mode, defaultValues, onSubmit, closeModal }: Props) => {
  const { register, handleSubmit } = useForm<FormArticleType>({
    defaultValues,
  });

  return (
    <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
      <div className={cx("modal-header")}>
        <h3>{mode === "create" ? "Tạo bài viết" : "Chỉnh sửa bài viết"}</h3>

        <button onClick={closeModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cx("form-group")}>
          <label>Tiêu đề</label>

          <input type="text" {...register("title")} />
        </div>

        <div className={cx("form-group")}>
          <label>Mô tả ngắn</label>

          <textarea rows={3} {...register("excerpt")} />
        </div>

        <div className={cx("form-group")}>
          <label>Ảnh thumbnail</label>

          <input type="text" {...register("image")} />
        </div>

        <div className={cx("grid-2")}>
          <div className={cx("form-group")}>
            <label>Danh mục</label>
            <input type="text" {...register("category")} />
          </div>

          <div className={cx("form-group")}>
            <label>Thời gian đọc</label>

            <input type="text" {...register("readTime")} />
          </div>
        </div>

        <div className={cx("form-group")}>
          <label>Trạng thái</label>

          <select {...register("status")}>
            <option value="draft">Bản nháp</option>

            <option value="published">Đăng bài</option>
          </select>
        </div>

        <div className={cx("modal-actions")}>
          <button type="button" className={cx("cancel")} onClick={closeModal}>
            Huỷ
          </button>

          <button type="submit" className={cx("submit")}>
            {mode === "create" ? "Đăng bài" : "Cập nhật"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormArticle;
