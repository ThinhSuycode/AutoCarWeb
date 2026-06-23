import classNames from "classnames/bind";
import styles from "./ArticleSave.module.scss";
import ListArticle from "../../components/ListArticle/ListArticle";
import useArticleSave from "./hooks/useArticleSave";

const cx = classNames.bind(styles);
const ArticleSave = () => {
  const { articleSave } = useArticleSave();

  return (
    <div className={cx("articleSave-page")}>
      <ListArticle
        heading={`Bài viết đã lưu (${articleSave?.length})`}
        data={articleSave}
        hiddenBtn
      ></ListArticle>
    </div>
  );
};

export default ArticleSave;
