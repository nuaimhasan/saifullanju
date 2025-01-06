"use client";
import { BiRightArrowAlt } from "react-icons/bi";
import { GrSecure } from "react-icons/gr";
import { useGetTrainingBySlugQuery } from "@/Redux/api/training/trainingApi";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAddTrainingOrderMutation } from "@/Redux/api/training/trainingOrderApi";
import Spinner from "@/app/components/Spinner";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function page() {
  const { slug } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("ssl");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [paymentAmount, setPaymentAmount] = useState(0);

  const router = useRouter();

  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
      setPhone(user?.phone);
      setGender(user?.gender);
    }
  }, [user]);

  const { data, isLoading } = useGetTrainingBySlugQuery(slug);
  const training = data?.data;

  useEffect(() => {
    if (training) {
      setPaymentAmount(training?.price);
    }
  }, [training]);

  const [addTrainingOrder, { isLoading: addIsLoading }] =
    useAddTrainingOrderMutation();

  const handlePyament = async () => {
    if (!name || !email || !phone || !gender) {
      return toast.error("Please fill up all the fields");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;

    if (!emailRegex.test(email)) return toast.error("Invalid email");
    if (!phoneRegex.test(phone)) return toast.error("Invalid phone number");

    const data = {
      training: training?._id,
      paymentMethod,
      paymentAmount,
      user: {
        name,
        email,
        phone,
        gender,
      },
    };

    const res = await addTrainingOrder(data);
    if (res?.data?.success) {
      toast.success("Payment completed successfully");
      router.push(`/training/download-ticket/${res?.data?.data?._id}`);
    } else {
      toast.error(res?.data?.message || "Something went wrong");
      console.log(res);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="py-5">
      <div className="container">
        <div className="bg-base-100 rounded shadow border p-4">
          <h2 className="text-neutral/90 text-lg font-bold border-b pb-3">
            Completed Payment
          </h2>

          <div className="mt-4 grid sm:grid-cols-2 items-start gap-6">
            <div className="border rounded p-4 shadow">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${training?.image}`}
                alt="training"
                width={100}
                height={100}
                className="rounded w-36 h-20 object-cover"
              />

              <h3 className="text-xl font-medium mt-2 text-neutral">
                {training?.title}
              </h3>

              <div className="p-2 mt-6">
                <h3 className="text-sm font-medium">Payment Details</h3>

                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-neutral">Training Price</p>
                    <p className="text-sm text-neutral">
                      ৳{" "}
                      {new Intl.NumberFormat("en-EN", {
                        minimumFractionDigits: 0,
                      }).format(training?.price)}
                    </p>
                  </div>

                  <div className="mt-1 pt-1 border-t flex justify-between items-center font-semibold">
                    <p className="text-sm text-neutral">Total Payment:</p>
                    <p className="text-sm text-neutral">
                      ৳{" "}
                      {new Intl.NumberFormat("en-EN", {
                        minimumFractionDigits: 0,
                      }).format(training?.price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-base-100 shadow p-2 rounded">
                <h2 className="font-semibold text-neutral">User Info</h2>
                <form className="border mt-2 p-3 rounded">
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                      <p>Full Name *</p>
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                    <div>
                      <p>Email *</p>
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <div>
                      <p>Phone Number *</p>
                      <input
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </div>
                    <div>
                      <p>Gender *</p>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">FeMale</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-4 bg-base-100 shadow p-4 rounded">
                <h2 className="font-semibold text-lg text-neutral">
                  Payment Method
                </h2>

                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center ps-4 border border-gray-200 rounded">
                    <input
                      id="bordered-radio-2"
                      type="radio"
                      value="ssl"
                      name="bordered-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      checked={paymentMethod === "ssl"}
                    />
                    <label
                      htmlFor="bordered-radio-2"
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
                    >
                      <img src="/ssl.png" alt="ssl" className="w-32" />
                    </label>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t flex justify-between items-center font-semibold">
                  <p className="text-sm text-neutral">Total Payment:</p>
                  <p className="text-sm text-neutral">
                    ৳{" "}
                    {new Intl.NumberFormat("en-EN", {
                      minimumFractionDigits: 0,
                    }).format(training?.price)}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    disabled={addIsLoading}
                    onClick={handlePyament}
                    className="primary_btn w-full text-sm flex items-center justify-center gap-2"
                  >
                    {addIsLoading ? (
                      "Loading..."
                    ) : (
                      <>
                        Completed Payment{" "}
                        <BiRightArrowAlt className="text-xl" />
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-3 flex items-center justify-center gap-2 text-xs text-neutral-content">
                  <GrSecure /> Secured payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
