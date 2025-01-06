import { FaPlus, FaTrash } from "react-icons/fa";

export default function Features({ features, setFeatures }) {
  const handleInputChange = (index, event) => {
    const values = features?.map((item, i) =>
      i === index ? { ...item, title: event.target.value } : item
    );
    setFeatures(values);
  };

  const handleAddFields = () => {
    if (isFormValid()) {
      setFeatures([...features, { title: "" }]);
    } else {
      alert("Please select title");
    }
  };

  const handleRemoveFields = (index) => {
    const values = [...features];
    values.splice(index, 1);
    setFeatures(values);
  };

  const isFormValid = () => {
    return features.every((entry) => entry.title !== "");
  };

  return (
    <div className="mt-3 flex flex-col gap-3 rounded border p-3">
      {features?.map((input, index) => (
        <div key={index} className="flex gap-2 text-sm">
          <input
            type="text"
            name="title"
            defaultValue={input.title}
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
        disabled={features?.length > 0 && !isFormValid()}
        className="flex w-max items-center gap-2 rounded bg-gray-500 px-4 py-2 text-sm text-base-100"
      >
        <FaPlus className="text-xs" /> Add Feature
      </button>
    </div>
  );
}
