import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import { BannerContactData, questionContactData } from "../../data/contactData";
import FormContact from "../../components/FormContact/FormContact";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMeApi } from "../../services/auth.service";
import type { UserType } from "../../types/user/user.type";
import type {
  BannerContact,
  QuestionContact,
} from "../../types/contact/contact.ui";
const cx = classNames.bind(styles);

const Contact = () => {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [activeIdx, setActiveIdx] = useState<number[]>([]);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getMeApi();
        setUserInfo(data);
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu user!!");
        return;
      }
    };
    fetchUserInfo();
  }, []);

  const onHandleQuestion = useCallback((idx: number) => {
    setActiveIdx((prev) => {
      if (prev.includes(idx)) {
        return prev.filter((item: number) => item !== idx);
      }
      return [...prev, idx];
    });
  }, []);

  return (
    <div className={cx("contact-page")}>
      <div className={cx("contact-banner")}>
        <div className={cx("banner-top")}>
          <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
          <p>
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với
            AutoViet ngay hôm nay để nhận được sự tư vấn tận tình nhất.
          </p>
        </div>
        <div className={cx("banner-bottom")}>
          <div className={cx("list-item")}>
            {BannerContactData.map((item: BannerContact, idx: number) => (
              <div className={cx("item")} key={idx}>
                <div className={cx("icon")}>
                  <i className={item.icon}></i>
                </div>
                <h4>{item.heading}</h4>
                <p>{item.desc.desc1}</p>
                <p>{item.desc.desc2}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={cx("contact-wrapper")}>
        <div className={cx("form-content")}>
          <div className={cx("form-heading")}>
            <h3>Gửi Tin Nhắn</h3>
            <p>
              Điền thông tin vào biểu mẫu bên dưới, đội ngũ tư vấn của chúng tôi
              sẽ liên hệ lại với bạn trong thời gian sớm nhất.
            </p>
          </div>
          <FormContact userInfo={userInfo}></FormContact>
        </div>
        <div className={cx("google-map")}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d431.4287952842424!2d109.18553550202886!3d13.833059382484514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1svi!2sus!4v1776584028668!5m2!1svi!2sus"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div className={cx("contact-question")}>
        <div className={cx("question-heading")}>
          <h3>CÂU HỎI THƯỜNG GẶP</h3>
          <p>
            Giải đáp nhanh những thắc mắc phổ biến của khách hàng khi đến với
            AutoViet.
          </p>
        </div>
        <div className={cx("list-question")}>
          {questionContactData.map((ques: QuestionContact, idx: number) => (
            <div
              className={cx(
                "question-wrapper",
                activeIdx.includes(idx) && "showContent",
              )}
              key={idx}
            >
              <div
                className={cx("title")}
                onClick={() => onHandleQuestion(idx)}
              >
                <span>{ques.title}</span>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
              <p className={cx("content")}>{ques.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
