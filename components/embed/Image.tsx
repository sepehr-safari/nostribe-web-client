import Embed from "./index";
import Modal from "../modal/Modal";
import {MouseEventHandler, useState} from "react";
import ProxyImg from "@/components/ProxyImg";

const Image: Embed = {
  regex: /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp)(?:\?\S*)?)/gi,
  component: ({ match, index, key }) => {
    // dis bad?
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showModal, setShowModal] = useState(false);
    const onClick: MouseEventHandler<HTMLElement> = (e) => {
      e.stopPropagation();
      setShowModal(true);
    }
    return (
      <div key={key}>
        <div
          className="relative w-full overflow-hidden object-contain my-2"
        >
          <ProxyImg onClick={onClick} className="rounded max-h-[70vh] md:max-h-96 max-w-full cursor-pointer" src={
            match
          } />
        </div>
        {showModal ? (
          <Modal onClose={() => setShowModal(false)}>
            <ProxyImg className="rounded max-h-[90vh] max-w-[90vw]" src={match} />
          </Modal>
        ) : ''}
      </div>
    );
  },
}

export default Image;
