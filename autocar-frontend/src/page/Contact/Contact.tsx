import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactBanner from "./components/ContactBanner/ContactBanner";
import useContact from "./hooks/useContact";
const cx = classNames.bind(styles);

const Contact = () => {
  const { userInfo } = useContact();
  return (
    <div className={cx("contact-page")}>
      <ContactBanner></ContactBanner>
      <ContactForm userInfo={userInfo ?? null}></ContactForm>
    </div>
  );
};

export default Contact;
