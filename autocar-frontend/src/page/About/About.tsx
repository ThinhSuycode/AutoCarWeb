import classNames from "classnames/bind";
import styles from "./About.module.scss";
import Button from "../../components/Button/Button";
import { config } from "../../config";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
const cx = classNames.bind(styles);

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  return (
    <div className={cx("about-inner")}>
      <div className={cx("banner-about")} data-aos="fade-right">
        <div className={cx("info-banner")}>
          <div className={cx("heading")}>
            <h2>
              VỀ <span>AUTO VIET</span>
            </h2>
            <p>
              Hành trình 15 năm kiến tạo niềm tin và mang đến những chiếc xe
              chất lượng nhất cho người Việt. Chúng tôi không chỉ bán xe, chúng
              tôi trao gửi sự an tâm.
            </p>
          </div>
          <div className={cx("btn-act")}>
            <Button href="">LIÊN HỆ NGAY</Button>
            <Button href={config.Routes.ShowRoom}>XEM SHOWROOM</Button>
          </div>
        </div>
      </div>
      <div className={cx("info-history")}>
        <div className={cx("left")}>
          <h3 className={cx("title")} data-aos="fade-down">
            Câu Chuyện Của Chúng Tôi
          </h3>
          <div className={cx("desc")} data-aos="fade-up">
            <p>
              Được thành lập vào năm 2009, AutoViet khởi đầu từ một gara nhỏ với
              niềm đam mê cháy bỏng về ô tô. Trải qua 15 năm phát triển, chúng
              tôi đã vươn lên trở thành hệ thống kinh doanh xe đã qua sử dụng uy
              tín hàng đầu tại Việt Nam.
            </p>
            <p>
              Với triết lý kinh doanh "Chữ Tín Quý Hơn Vàng", mỗi chiếc xe tại
              AutoViet đều trải qua quy trình kiểm định nghiêm ngặt 150 điểm.
              Chúng tôi hiểu rằng, mua một chiếc xe không chỉ là giao dịch tài
              chính, mà là sự đầu tư cho an toàn và hạnh phúc của gia đình bạn.
            </p>
            <p>
              Đến nay, AutoViet tự hào đã phục vụ hơn 10,000 khách hàng trên
              khắp cả nước, với hệ thống 3 showroom hiện đại tại TP.HCM, Hà Nội
              và Đà Nẵng.
            </p>
          </div>
          <div className={cx("role")}>
            <div data-aos="flip-up">
              <span>
                <i className="fa-solid fa-circle-check"></i>
              </span>
              <span>Minh bạch pháp lý</span>
            </div>
            <div data-aos="flip-down">
              <span>
                <i className="fa-solid fa-circle-check"></i>
              </span>
              <span>Giá cả cạnh tranh</span>
            </div>
            <div data-aos="flip-down">
              <span>
                <i className="fa-solid fa-circle-check"></i>
              </span>
              <span>Hỗ trợ trọn đời</span>
            </div>
            <div data-aos="flip-up">
              <span>
                <i className="fa-solid fa-circle-check"></i>
              </span>
              <span>Giao xe toàn quốc</span>
            </div>
          </div>
        </div>
        <div className={cx("right")} data-aos="fade-left">
          <img
            src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80"
            alt=""
          />
          <div className={cx("img-info")}>
            <p>" Chất lượng tạo nên thương hiệu "</p>
            <p>- Phương châm hoạt động suốt 15 năm qua -</p>
          </div>
        </div>
      </div>
      <div className={cx("info-statistical")} ref={ref}>
        <div className={cx("list-info")}>
          <div className={cx("info-item")}>
            <div className={cx("heading")}>
              <span> {inView && <CountUp end={15} duration={2} />}</span>
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
            </div>
            <p>Năm kinh nghiệm</p>
          </div>
          <div className={cx("info-item")}>
            <div className={cx("heading")}>
              <span> {inView && <CountUp end={10000} duration={2} />}</span>
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
            </div>
            <p>Xe đã bán</p>
          </div>
          <div className={cx("info-item")}>
            <div className={cx("heading")}>
              <span> {inView && <CountUp end={8500} duration={2} />}</span>
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
            </div>
            <p>Khách hàng hài lòng</p>
          </div>
          <div className={cx("info-item")}>
            <div className={cx("heading")}>
              <span> {inView && <CountUp end={3} duration={2} />}</span>
            </div>
            <p>Showroom toàn quốc</p>
          </div>
        </div>
      </div>
      <div className={cx("info-cost")}>
        <div className={cx("heading")} data-aos="fade-down">
          <h3>GIÁ TRỊ CỐT LỖI</h3>
          <p>
            Những nguyên tắc định hình văn hóa và cách chúng tôi phục vụ khách
            hàng mỗi ngày
          </p>
        </div>
        <div className={cx("list-info")}>
          <div className={cx("info-item")} data-aos="flip-right">
            <div>
              <i className="fa-solid fa-check"></i>
            </div>
            <h4>Uy Tín Hàng Đầu</h4>
            <p>
              Cam kết minh bạch về nguồn gốc và chất lượng xe. Nói không với xe
              đâm đụng, ngập nước.
            </p>
          </div>
          <div className={cx("info-item")} data-aos="flip-right">
            <div>
              <i className="fa-regular fa-star"></i>
            </div>
            <h4>Chất Lượng Cao</h4>
            <p>
              Quy trình kiểm định 150 điểm nghiêm ngặt. Chỉ những xe đạt chuẩn
              mới được đưa vào kinh doanh.
            </p>
          </div>
          <div className={cx("info-item")} data-aos="flip-right">
            <div>
              <i className="fa-solid fa-headphones"></i>
            </div>
            <h4>Dịch Vụ Tận Tâm</h4>
            <p>
              Đội ngũ tư vấn chuyên nghiệp, hỗ trợ 24/7. Đồng hành cùng khách
              hàng trong suốt quá trình sử dụng.
            </p>
          </div>
          <div className={cx("info-item")} data-aos="flip-right">
            <div>
              <i className="fa-regular fa-lightbulb"></i>
            </div>
            <h4>Đổi Mới Sáng Tạo</h4>
            <p>
              Luôn cập nhật công nghệ và xu hướng mới nhất để mang lại trải
              nghiệm mua sắm tiện lợi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
