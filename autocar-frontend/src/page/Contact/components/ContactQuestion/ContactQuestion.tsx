import classNames from "classnames/bind";
import styles from "./ContactQuestion.module.scss";
import { questionContactData } from "../../../../constants/contactShowroomData";
import type { QuestionContact } from "../../../../types/contact/contact.ui";
import useContactQuestion from "./hooks/useContactQuestion";

const cx = classNames.bind(styles);

const ContactQuestion = () => {
  const { activeIdx, onHandleQuestion } = useContactQuestion();
  return (
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
            <div className={cx("title")} onClick={() => onHandleQuestion(idx)}>
              <span>{ques.title}</span>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <p className={cx("content")}>{ques.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactQuestion;
