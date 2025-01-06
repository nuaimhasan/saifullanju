import { FaPlus, FaTrash } from "react-icons/fa";

export default function FAQs({ faqs, setFaqs }) {
  const handleInputChange = (index, event) => {
    const values = faqs?.map((item, i) =>
      i === index ? { ...item, [event.target.name]: event.target.value } : item
    );
    setFaqs(values);
  };

  const handleAddFields = () => {
    if (isFormValid()) {
      setFaqs([...faqs, { question: "", ans: "" }]);
    } else {
      alert("Please select a question and answer for the previous FAQ");
    }
  };

  const handleRemoveFields = (index) => {
    const values = [...faqs];
    values.splice(index, 1);
    setFaqs(values);
  };

  const isFormValid = () => {
    return faqs.every((entry) => entry.title !== "");
  };

  return (
    <div className="mt-3 flex flex-col gap-3 rounded border p-3">
      {faqs?.map((input, index) => (
        <div key={index} className="flex gap-2 text-sm">
          <input
            type="text"
            name="question"
            defaultValue={input.question}
            onChange={(event) => handleInputChange(index, event)}
          />
          <input
            type="text"
            name="ans"
            defaultValue={input.ans}
            onChange={(event) => handleInputChange(index, event)}
          />
          <button
            type="button"
            onClick={() => handleRemoveFields(index)}
            className="flex w-20 items-center justify-center rounded-md bg-red-500 text-white"
          >
            <FaTrash />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddFields}
        disabled={faqs?.length > 0 && !isFormValid()}
        className="flex w-max items-center gap-2 rounded bg-gray-500 px-4 py-2 text-sm text-base-100"
      >
        <FaPlus className="text-xs" /> Add FAQ
      </button>
    </div>
  );
}
