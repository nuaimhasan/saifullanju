import { useGetPaymentInstructionQuery } from "@/Redux/api/paymentInstructionApi";
import parser from "html-react-parser";

export default function ManualPaymentInstruction() {
  const { data } = useGetPaymentInstructionQuery();
  const paymentInstruction = data?.data;

  return (
    <div className="mt-10">
      <h2 className="text-center text-primary italic font-semibold text-3xl">
        Manual Payment Instruction
      </h2>

      <div className="mt-5 text-[15px] text-neutral/80">
        {paymentInstruction?.description &&
          parser(paymentInstruction?.description)}
      </div>
    </div>
  );
}
