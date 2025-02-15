"use client";

import {
  useAddShippingConfigMutation,
  useGetShippingConfigQuery,
  useUpdateShippingConfigMutation,
} from "@/Redux/api/shippingConfigApi";
import toast from "react-hot-toast";

export default function ShippingConfiguration() {
  const { data } = useGetShippingConfigQuery();
  const shippingConfig = data?.data;
  const id = shippingConfig?._id;

  const [addShippingConfig, { isLoading }] = useAddShippingConfigMutation();
  const [updateShippingConfig, { isLoading: uLoading }] =
    useUpdateShippingConfigMutation();

  const handleShippingConfig = async (e) => {
    e.preventDefault();
    const charge = e.target.charge.value;

    if (id) {
      const res = await updateShippingConfig({ id, data: { charge } });
      if (res?.data?.success) {
        toast.success("Shipping configuration updated successfully");
      } else {
        toast.error("Failed to update shipping configuration");
        console.log(res);
      }
    } else {
      const res = await addShippingConfig({ charge });
      if (res?.data?.success) {
        toast.success("Shipping configuration added successfully");
      } else {
        toast.error("Failed to add shipping configuration");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="border-b p-2">
        <h3 className="font-medium text-neutral">Shipping Configuration</h3>
      </div>

      <form onSubmit={handleShippingConfig} className="p-2">
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-1">Shipping Charge</p>
            <input
              type="number"
              name="charge"
              defaultValue={shippingConfig?.charge}
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
