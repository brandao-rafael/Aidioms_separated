import Link from "next/link";
import React from "react";
import styles from "./styles/sideBar.module.scss";
import MessageIcon from "remixicon-react/Message2lineIcon";
import ImageIcon from "remixicon-react/ImageEditLineIcon";
import VideoIcon from "remixicon-react/VideoLineIcon";
import BubbleIcon from "remixicon-react/BubbleChartLineIcon";

const SideBar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <BubbleIcon size="3em" />
      </div>
      <Link href="/chat" className={styles.link}>
        <MessageIcon size="1.5em" />
      </Link>
      <Link href="/imageGenerator" className={styles.link}>
        <ImageIcon size="1.5em" />
      </Link>
      <Link href="/videoPhrase" className={styles.link}>
        <VideoIcon size="1.5em" />
      </Link>
    </div>
  );
};
export default SideBar;
