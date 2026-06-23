import classNames from "classnames/bind";
import styles from "../ShowRoom.module.scss";
import { galleryImages } from "../../../data/social";

const cx = classNames.bind(styles);

const ShowroomGallery = () => {
  return (
    <div className={cx("image-showroom")}>
      <div className={cx("heading")}>
        <h3>Hình Ảnh Showroom</h3>
        <p>Không gian hiện đại, chuyên nghiệp với đầy đủ tiện nghi</p>
      </div>
      <div className={cx("list-img")}>
        {galleryImages.map((img: string, idx: number) => (
          <div key={idx}>
            <img src={img} alt="no img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowroomGallery;
