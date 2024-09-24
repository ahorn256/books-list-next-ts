import React from "react";
import { IFetchError } from "./FetchError";
import styles from './ErrorMessage.module.scss';
import { useTranslations } from "next-intl";

type Props = {
  error: IFetchError|null,
};

const ErrorMessage:React.FC<Props> = ({error}) => {
  const t = useTranslations();

  return (
    <div className={styles.error}>
      <h3 className={styles.title}>Error</h3>
      <p className={styles.body}>{error?.message && t(error.message, error.messageParams)}</p>
    </div>
  );
}

export default ErrorMessage;
