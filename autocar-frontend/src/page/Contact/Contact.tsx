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
