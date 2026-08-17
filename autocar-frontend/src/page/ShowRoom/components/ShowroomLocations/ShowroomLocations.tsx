import classNames from "classnames/bind";
import styles from "./ShowroomLocations.module.scss";
import { showrooms } from "../../constants/showroomData";
import { Button } from "../../../../components/Button/Button";
import useShowRoom from "../../hooks/useShowRoom";
import type { ShowroomType } from "../../../../types/showroom/showroom.type";

const cx = classNames.bind(styles);

const ShowroomLocations = () => {
  const { activeAddress, setActiveAddress } = useShowRoom();
  return (
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
  );
};

export default ShowroomLocations;
