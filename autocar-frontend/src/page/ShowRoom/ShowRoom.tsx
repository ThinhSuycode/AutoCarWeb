import Button from "../../components/Button/Button";
import {
  galleryImages,
  showrooms,
  whyVisitData,
  type Showroom,
  type WhyVisitType,
} from "../../services/data/carsData";
import styles from "./ShowRoom.module.scss";
import classNames from "classnames/bind";
import imgBanner from "../../assets/img/showroom1.jpg";
import { useCallback, useEffect, useState } from "react";
const cx = classNames.bind(styles);

const generateDateOptions = () => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const value = date.toISOString().split("T")[0];
    const label = date.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return { value, label };
  });
};

const generateTimeOptions = () => {
  const slots: { value: string; label: string }[] = [];
  for (let h = 8; h <= 17; h++) {
    for (const m of [0, 30]) {
      if (h === 17 && m === 30) break;
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      const period = h < 12 ? "AM" : "PM";
      const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      slots.push({ value: `${hh}:${mm}`, label: `${h12}:${mm} ${period}` });
    }
  }
  return slots;
};

const dateOptions = generateDateOptions();
const timeOptions = generateTimeOptions();
interface BannerData {
  id: string;
  image: string;
}
const imgBannerData: BannerData[] = [
  {
    id: "0",
    image: imgBanner,
  },
  {
    id: "1",
    image:
      "https://n.ssgroup.com.vn/api/original/media/NEWS/Lamborghini/fenomeno/1200_x_628_14_bhwjJyTq3M.webp",
  },
  {
    id: "2",
    image: imgBanner,
  },
  {
    id: "3",
    image:
      "https://n.ssgroup.com.vn/api/original/media/NEWS/Lamborghini/fenomeno/1200_x_628_14_bhwjJyTq3M.webp",
  },
];

const ShowRoom = () => {
  const [currentBanner, setCurrentBanner] = useState<BannerData>({
    id: imgBannerData[0].id,
    image: imgBannerData[0].image,
  });
  const [activeAddress, setActiveAddress] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left",
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const nextImage = setInterval(() => {
      if (!isDragging && !isTransitioning) {
        changeSlide("next");
      }
    }, 1500);
    return () => clearInterval(nextImage);
  }, [isDragging, isTransitioning]);

  const changeSlide = (direction: "next" | "prev") => {
    setSlideDirection(direction === "next" ? "left" : "right");
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentBanner((prev) => {
        const currentIndex = Number(prev.id);
        let newIndex;

        if (direction === "next") {
          newIndex = (currentIndex + 1) % imgBannerData.length;
        } else {
          newIndex =
            currentIndex === 0 ? imgBannerData.length - 1 : currentIndex - 1;
        }

        return {
          id: String(newIndex),
          image: imgBannerData[newIndex].image,
        };
      });
      setTimeout(() => setIsTransitioning(false), 50);
    }, 450);
  };

  const onHandleNavActive = useCallback(
    (id: string, img: string) => {
      if (isTransitioning) return;

      const currentIndex = Number(currentBanner.id);
      const targetIndex = Number(id);

      setSlideDirection(targetIndex > currentIndex ? "left" : "right");
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentBanner({
          id: id,
          image: img,
        });
        setTimeout(() => setIsTransitioning(false), 50);
      }, 450);
    },
    [currentBanner.id, isTransitioning],
  );

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isTransitioning) return;
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || isTransitioning) return;

    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - startX;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const threshold = 50;

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        changeSlide("prev");
      } else {
        changeSlide("next");
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const getImageStyle = (): React.CSSProperties => {
    let transform = "translateX(0)";
    let transition = "none";

    if (isDragging) {
      transform = `translateX(${dragOffset}px)`;
      transition = "none";
    } else if (isTransitioning) {
      transform =
        slideDirection === "left" ? "translateX(-100%)" : "translateX(100%)";
      transition = "transform 0.7s ease-in-out";
    }

    return {
      transform,
      transition,
      userSelect: "none",
      pointerEvents: "none",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    };
  };

  return (
    <div className={cx("showRoom-page")}>
      <div
        className={cx("banner-showRoom")}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={currentBanner.image}
          alt="noimg"
          style={getImageStyle()}
          draggable={false}
        />
        <div className={cx("nav-act")}>
          {imgBannerData.map((img: BannerData) => (
            <div
              className={cx("item", { active: currentBanner.id === img.id })}
              onClick={() => onHandleNavActive(img.id, img.image)}
              key={img.id}
            ></div>
          ))}
        </div>
        {/* <div className={cx("info")}>
          <div className={cx("heading")}>
            <h2>
              <span>Hệ thống </span>
              <span>ShowRoom mới</span>
            </h2>
            <p>
              3 showroom hiện đại tại TP.HCM, Hà Nội và Đà Nẵng. Ghé thăm để
              trải nghiệm và lái thử xe ngay hôm nay.
            </p>
          </div>
          <div className={cx("list-params")}>
            <div className={cx("params-item")}>
              <h3>3</h3>
              <p>Showroom</p>
            </div>
            <div className={cx("params-item")}>
              <h3>450 +</h3>
              <p>Xe trưng bày</p>
            </div>
            <div className={cx("params-item")}>
              <h3>50 +</h3>
              <p>Nhân viên</p>
            </div>
          </div>
        </div> */}
      </div>

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
            {showrooms.map((item: Showroom) => (
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
                      <i className="fa-solid fa-bullseye"></i>
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
                          <i className="fa-solid fa-location-dot"></i>
                        </span>
                        <span>{item.address}</span>
                      </div>
                      <div className={cx("item")}>
                        <span>
                          <i className="fa-solid fa-phone"></i>
                        </span>
                        <span>{item.phone}</span>
                      </div>
                      <div className={cx("item")}>
                        <span>
                          <i className="fa-regular fa-clock"></i>
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
                      iconLeft={<i className="fa-solid fa-location-arrow"></i>}
                    >
                      Chỉ đường
                    </Button>
                    <Button iconLeft={<i className="fa-solid fa-phone"></i>}>
                      Gọi ngay
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={cx("register-visit")}>
        <div className={cx("heading")}>
          <h3>Đặt Lịch Xem Xe</h3>
          <p>
            Đặt lịch trước để được phục vụ tốt nhất và lái thử xe bạn quan tâm
          </p>
        </div>
        <div className={cx("form-register")}>
          <div className={cx("info-user")}>
            <div className={cx("form-input")}>
              <p>
                Họ và tên{" "}
                <span className={cx("attention-icon")}>
                  <i className="fa-solid fa-star-of-life"></i>
                </span>
              </p>
              <input type="text" placeholder="Trần Quý A" />
            </div>
            <div className={cx("form-input")}>
              <p>
                Số điện thoại{" "}
                <span className={cx("attention-icon")}>
                  <i className="fa-solid fa-star-of-life"></i>
                </span>
              </p>
              <input type="text" placeholder="0869114177" />
            </div>
          </div>

          <div className={cx("option-showRoom")}>
            <p>
              Chọn showroom{" "}
              <span className={cx("attention-icon")}>
                <i className="fa-solid fa-star-of-life"></i>
              </span>
            </p>
            <select name="showRoomAddress" id="showRoomAddress">
              <option value="">Chọn showroom</option>
              <option value="saigon">AutoViet Sài Gòn - TP. Hồ Chí Minh</option>
              <option value="binhdinh">
                AutoViet Qui Nhơn - TP. Bình Định
              </option>
              <option value="hanoi">AutoViet Hà Nội - TP. Hà Nội</option>
            </select>
          </div>

          <div className={cx("date-register")}>
            <div className={cx("option-showRoom")}>
              <p>
                Ngày hẹn{" "}
                <span className={cx("attention-icon")}>
                  <i className="fa-solid fa-star-of-life"></i>
                </span>
              </p>
              <select name="dateRegister" id="dateRegister">
                <option value="">Chọn ngày</option>
                {dateOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx("option-showRoom")}>
              <p>
                Giờ hẹn{" "}
                <span className={cx("attention-icon")}>
                  <i className="fa-solid fa-star-of-life"></i>
                </span>
              </p>
              <select name="timeRegister" id="timeRegister">
                <option value="">Chọn giờ</option>
                {timeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={cx("note-register")}>
            <p>Ghi chú</p>
            <textarea
              name="noteRegister"
              id="noteRegister"
              className={cx("note")}
              placeholder="Xe bạn quan tâm"
            ></textarea>
          </div>
          <Button large>Xác nhận đặt lịch</Button>
        </div>
      </div>
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

      <div className={cx("why-visit")}>
        <div className={cx("heading")}>
          <h3>Tại sao nên ghé thăm Showroom?</h3>
        </div>
        <div className={cx("main")}>
          <div className={cx("list-features")}>
            {whyVisitData.map((item: WhyVisitType) => (
              <div key={item.title} className={cx("features-item")}>
                <div className={cx("icon")}>
                  <i className={`fa-solid ${item.icon}`}></i>
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
