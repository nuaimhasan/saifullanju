"use client";
import { useEffect, useState } from "react";

export default function TrainingCheckoutEvent({ training, user }) {
  const [userIP, setUserIP] = useState("");

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        if (data?.ip) {
          setUserIP(data.ip);
        } else {
          setUserIP("null");
        }
      } catch (error) {
        console.error("Error fetching IP from ipify:", error);
      }
    };

    fetchIP();
  }, []);

  useEffect(() => {
    if (training && userIP) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "begin_checkout",
        customer: {
          ip: userIP,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          gender: user?.gender,
        },
        ecommerce: {
          type: "training",
          currency: "BDT",
          value: training?.price,
          items: [
            {
              item_id: training?._id,
              item_name: training?.title,
              quantity: 1,
              price: training?.price,
            },
          ],
        },
      });
    }
  }, [training, userIP]);

  return null;
}
