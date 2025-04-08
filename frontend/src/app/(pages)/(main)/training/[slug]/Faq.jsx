"use client";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Faq({ faq, i }) {
  const [toggleFAQ, setToggleFAQ] = useState(null);

  const handelToggleFAQ = (i) => {
    if (toggleFAQ === i) {
      return setToggleFAQ(null);
    }
    setToggleFAQ(i);
  };

  return (
    <div className="mb-2 border rounded text-lg">
      <button
        onClick={() => handelToggleFAQ(i)}
        className="w-full flex justify-between items-center p-4 font-medium text-neutral rounded bg-gray-50"
      >
        <h6>{faq?.question}</h6>
        <span>
          {toggleFAQ === i && "activeFAQ" ? (
            <IoIosArrowUp />
          ) : (
            <IoIosArrowDown />
          )}
        </span>
      </button>

      {/* Content/Ans */}
      <div
        className={`text-justify text-neutral/90 duration-500 faq-content ${
          toggleFAQ === i && "activeFAQ"
        }`}
      >
        <p className="pb-5 p-3">{faq?.ans}</p>
      </div>
    </div>
  );
}
