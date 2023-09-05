import Link from "next/link";
import React from "react";
import MessageIcon from "remixicon-react/Message2lineIcon";
import ImageIcon from "remixicon-react/ImageEditLineIcon";
import VideoIcon from "remixicon-react/VideoChatLineIcon";


const SideBar: React.FC = () => {
  return (
    <div>
        <Link href="/chat">
            <MessageIcon size="1em" /> Chat
        </Link>
        <Link href="/image">
            <ImageIcon size="1em" /> Image
        </Link>
        <Link href="/video">
            <VideoIcon size="1em" /> Video
        </Link>
    </div>
  );
};
export default SideBar;
