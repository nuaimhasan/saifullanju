"use client";
import {
  useAddPaymentInstructionMutation,
  useGetPaymentInstructionQuery,
  useUpdatePaymentInstructionMutation,
} from "@/Redux/api/paymentInstructionApi";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ManualPaymentInstruction() {
  const ref = useRef();
  const [description, setDescription] = useState("");

  const { data } = useGetPaymentInstructionQuery();
  const paymentInstruction = data?.data;

  const id = paymentInstruction?._id;

  useEffect(() => {
    if (paymentInstruction) {
      setDescription(paymentInstruction?.description);
    }
  }, [paymentInstruction]);

  const [addPaymentInstruction, { isLoading }] =
    useAddPaymentInstructionMutation();

  const [updatePaymentInstruction, { isLoading: uLoading }] =
    useUpdatePaymentInstructionMutation();

  const handlePaymentInstruction = async (e) => {
    e.preventDefault();

    if (id) {
      const res = await updatePaymentInstruction({ id, data: { description } });
      if (res?.data?.success) {
        setDescription("");
        toast.success("Payment instruction update successfully");
      } else {
        toast.error("Failed to update payment instruction");
        console.log(res);
      }
    } else {
      const res = await addPaymentInstruction({ description });
      if (res?.data?.success) {
        setDescription("");
        toast.success("Payment instruction added successfully");
      } else {
        toast.error("Failed to add payment instruction");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="border-b p-2">
        <h3 className="font-medium text-neutral">Payment Instruction</h3>
      </div>

      <form onSubmit={handlePaymentInstruction} className="p-2">
        <div className="flex flex-col gap-4">
          <div className="h400">
            <p className="mb-1">Instruction</p>
            <JoditEditor
              ref={ref}
              value={description}
              onBlur={(newContent) => setDescription(newContent)}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            disabled={isLoading || uLoading}
            className="primary_btn text-sm"
          >
            {isLoading || uLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
