"use client";
import { useEffect, useState } from "react";

export default function TrainingPurchaseEvent({ order }) {
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
    if (order && userIP) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "purchase",
        customer: {
          ip: userIP,
          name: order?.user?.name,
          email: order?.user?.email,
          phone: order?.user?.phone,
          gender: order?.user?.gender,
        },
        payment: {
          method: order?.payment?.paymentMethod,
          amount: order?.payment?.amount,
          accountNb: order?.payment?.accountNb,
          transactionId: order?.payment?.transactionId,
          date: order?.payment?.date,
        },
        ecommerce: {
          currency: "BDT",
          value: order?.training?.price,
          transaction_id: order?._id,
          ticketNumber: order?.ticketNumber,
          items: [
            {
              item_id: order?.training?._id,
              item_name: order?.training?.title,
              quantity: 1,
              price: order?.training?.price,
            },
          ],
        },
      });
    }
  }, [order, userIP]);

  return null;
}
