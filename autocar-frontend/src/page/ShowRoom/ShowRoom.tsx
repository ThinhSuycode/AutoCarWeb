import styles from "./ShowRoom.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import type { ShowroomType, WhyVisitType } from "../../types/showroom";
import { imgBannerData, showrooms, whyVisitData } from "../../data/ShowRoom";
import { Button } from "../../components/Button/Button";
import Banner from "../../components/Banner/Banner";
import { galleryImages } from "../../data/social";
import AppointmentForm from "./components/AppointmentForm/AppointmentForm";

const cx = classNames.bind(styles);

interface AppointmentForm {
  name: string;
  phone: string;
  location: string;
  type: string;
  date: string;
  time: string;
  note: string;
}

const ShowRoom = () => {
  const [activeAddress, setActiveAddress] = useState<string>("");

  return (
    <div className={cx("showRoom-page")}>
      <Banner dataImg={imgBannerData} />

      {/* Địa điểm Showroom */}
      <div className={cx("address-inner")}>
        <div className={cx("heading")}>
          <h3>Địa điểm Showroom</h3>
          <p>
            Chọn showroom gần bạn nhất để đặt lịch xem xe và trải nghiệm dịch vụ
            tốt nhất
          </p>
        </div>
        <div className={cx("content")}>
          <div className={cx("list-address")}>
            {showrooms.map((item: ShowroomType) => (
              <div
                key={item.name}
                className={cx("address-item", {
                  activeAddress: item.name === activeAddress,
                })}
                onClick={() => setActiveAddress(item.name)}
              >
                <div className={cx("img-address")}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={cx("info-address")}>
                  {activeAddress === item.name && (
                    <div className={cx("check-address")}>
                      <i className="fa-solid fa-bullseye" />
                    </div>
                  )}
                  <div className={cx("top")}>
                    <h4>{item.name}</h4>
                    <p>{item.city}</p>
                  </div>
                  <div className={cx("main")}>
                    <div className={cx("list-item")}>
                      <div className={cx("item")}>
                        <span>
                          <i className="fa-solid fa-location-dot" />
                        </span>
                        <span>{item.address}</span>
                      </div>
                      <div className={cx("item")}>
                        <span>
                          <i className="fa-solid fa-phone" />
                        </span>
                        <span>{item.phone}</span>
                      </div>
                      <div className={cx("item")}>
                        <span>
                          <i className="fa-regular fa-clock" />
                        </span>
                        <span>
                          <p>{item.hours.saturday}</p>
                          <p>{item.hours.sunday}</p>
                          <p>{item.hours.weekday}</p>
                        </span>
                      </div>
                    </div>
                    <div className={cx("list-tags")}>
                      {item.features.map((feat: string) => (
                        <p key={feat}>{feat}</p>
                      ))}
                    </div>
                  </div>
                  <div className={cx("controls-act")}>
                    <Button
                      iconLeft={<i className="fa-solid fa-location-arrow" />}
                    >
                      Chỉ đường
                    </Button>
                    <Button iconLeft={<i className="fa-solid fa-phone" />}>
                      Gọi ngay
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form đặt lịch */}
      <div className={cx("register-visit")}>
        <div className={cx("heading")}>
          <h3>Đặt Lịch Xem Xe</h3>
          <p>
            Đặt lịch trước để được phục vụ tốt nhất và lái thử xe bạn quan tâm
          </p>
        </div>
        <AppointmentForm />
      </div>

      {/* Hình ảnh showroom */}
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

      {/* Tại sao nên ghé */}
      <div className={cx("why-visit")}>
        <div className={cx("heading")}>
          <h3>Tại sao nên ghé thăm Showroom?</h3>
        </div>
        <div className={cx("main")}>
          <div className={cx("list-features")}>
            {whyVisitData.map((item: WhyVisitType) => (
              <div key={item.title} className={cx("features-item")}>
                <div className={cx("icon")}>
                  <i className={`fa-solid ${item.icon}`} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRoom;
