import React, { useRef, useEffect, useState } from "react";
import type { Accordion } from "../../pages/services/ServiceType";
interface AccordionItemProps {
  faq: Accordion;
  handleToggle: (id: number) => void;
  activeAcc: number | null;
}

const AccorditionItemFaq: React.FC<AccordionItemProps> = ({
  faq,
  handleToggle,
  activeAcc,
}) => {
  const { title, description, id } = faq;
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
    if (activeAcc === id && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [activeAcc, id]);

  return (
    <div
      className={`accrodion ${activeAcc === id ? "active" : ""}`}
      onClick={() => handleToggle(id)}
    >
      <div className="accrodion-title">
        <h4>{title}</h4>
      </div>

      <div
        ref={contentRef}
        className="accrodion-content"
        style={{ maxHeight: height }}
      >
        <div className="inner">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AccorditionItemFaq;