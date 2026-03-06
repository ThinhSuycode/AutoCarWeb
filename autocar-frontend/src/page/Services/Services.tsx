import classNames from "classnames/bind";
import styles from "./Services.module.scss";
import img from "../../assets/img/car-service.jpg";
import { useEffect, useState } from "react";
import { callApi } from "../../services/api";
import Button from "../../components/Button/Button";
import type { ServiceItem } from "../../types/services";
const cx = classNames.bind(styles);
const Services = () => {
  const [servicesData, setServicesData] = useState<ServiceItem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await callApi.getData("ServicesData");
      if (data && Array.isArray(data)) {
        setServicesData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={cx("services-page")}>
      <div className={cx("banner-inner")} data-aos="fade-right">
        <img src={img} alt="no img" />
        <div className={cx("info")}>
          <h2>VỀ AUTOVIET</h2>

          <p>
            AutoViet cung cấp giải pháp toàn diện cho chiếc xe của bạn. Từ bảo
            dưỡng, sửa chữa đến tư vấn tài chính và bảo hiểm.
          </p>
        </div>
      </div>
      <div className={cx("info-services")}>
        <div className={cx("list-info")}>
          {servicesData.map((item: ServiceItem, idx: number) => (
            <div className={cx("item")} data-aos="flip-right" key={idx}>
              <div className={cx("heading")}>
                <div>
                  <i className={`fa-solid fa-${item.icon}`}></i>
                </div>
                <h4>{item.title}</h4>
              </div>
              <div className={cx("desc")}>
                <p>{item.description}</p>
                <div className={cx("list-desc")}>
                  {item.features.map((feat: string) => (
                    <div className={cx("desc-item")}>
                      <span>
                        <i className="fa-regular fa-circle-check"></i>
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a href="" className={cx("cta-act")}>
                <span>{item.cta}</span>
                <span>
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("info-services2")}>
        <div className={cx("heading")} data-aos="fade-down">
          <div>QUY TRÌNH CHUYÊN NGHIỆP</div>
          <h3>Các Bước Thực Hiện</h3>
          <p>
            Quy trình làm việc minh bạch, rõ ràng giúp khách hàng yên tâm tuyệt
            đối khi sử dụng dịch vụ tại AutoViet.
          </p>
        </div>
        <div className={cx("list-item")} data-aos="fade-up">
          <div className={cx("item")}>
            <div className={cx("icon")}>
              <i className="fa-solid fa-phone"></i>
              <div className={cx("count")}>1</div>
            </div>
            <div className={cx("desc")}>
              <h4>Liên Hệ Tư Vấn</h4>
              <p>
                Gọi điện hoặc đặt lịch hẹn trực tuyến để được tư vấn miễn phí.
              </p>
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("icon")}>
              <i className="fa-regular fa-calendar"></i>
              <div className={cx("count")}>2</div>
            </div>
            <div className={cx("desc")}>
              <h4>Tiếp Nhận & Kiểm Tra</h4>
              <p>
                Đội ngũ kỹ thuật viên sẽ kiểm tra tổng quát và báo giá chi tiết.
              </p>
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("icon")}>
              <i className="fa-solid fa-hammer"></i>
              <div className={cx("count")}>3</div>
            </div>
            <div className={cx("desc")}>
              <h4>Thực Hiện Dịch Vụ</h4>
              <p>Tiến hành sửa chữa, bảo dưỡng với phụ tùng chính hãng.</p>
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("icon")}>
              <i className="fa-regular fa-circle-check"></i>
              <div className={cx("count")}>4</div>
            </div>
            <div className={cx("desc")}>
              <h4>Bàn Giao Xe</h4>
              <p>Kiểm tra lần cuối, vệ sinh xe và bàn giao cho khách hàng.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("info-contact")}>
        <div className={cx("contact-form")}>
          <div className={cx("left")} data-aos="fade-right">
            <p className={cx("heading")}>Liên Hệ Với Chúng Tôi</p>
            <div className={cx("content")}>
              <h3>Bạn Cần Tư Vấn Thêm?</h3>
              <p>
                Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng giải đáp mọi thắc
                mắc và hỗ trợ bạn tìm ra giải pháp tốt nhất cho chiếc xe của
                mình.
              </p>
            </div>
            <div className={cx("card-list")}>
              <div className={cx("card-item")}>
                <div className={cx("card-icon")}>
                  {" "}
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className={cx("card-info")}>
                  <p>Hotline tư vấn 24/7</p>
                  <p>0869114177</p>
                </div>
              </div>
              <div className={cx("card-item")}>
                <div className={cx("card-icon")}>
                  <i className="fa-solid fa-location"></i>
                </div>
                <div className={cx("card-info")}>
                  <p>Địa chỉ showroom</p>
                  <p>123 Nguyễn Văn Linh, Q.7, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("right")} data-aos="fade-left">
            <h4>Liên Hệ Người Bán</h4>
            <p>Để lại thông tin để được tư vấn chi tiết và đặt lịch xem xe.</p>
            <div className={cx("form-inner")}>
              <div className={cx("input-form")}>
                <p>Họ và tên</p>
                <input type="text" placeholder="Nhập họ và tên của bạn" />
              </div>
              <div className={cx("input-form")}>
                <p>Số điện thoại</p>
                <input type="text" placeholder="Nhập số điện thoại của bạn" />
              </div>
              <div className={cx("input-form")}>
                <p>Lời nhắn</p>
                <input
                  type="text"
                  placeholder="Gửi tư vấn mẫu xe đang quan tâm "
                />
              </div>
              <Button iconLeft={<i className="fa-regular fa-paper-plane"></i>}>
                Gửi yêu cầu
              </Button>
            </div>
            <div className={cx("phone-info")}>
              <p>Hoặc liên hệ trực tiếp qua hotline</p>
              <div>
                <span>
                  <i className="fa-solid fa-phone"></i>
                </span>
                <span>0869114177</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
