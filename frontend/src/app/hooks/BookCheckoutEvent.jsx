"use client";
import { useEffect, useState } from "react";

export default function BookCheckoutEvent({ book, user, quantity }) {
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
    if (book && userIP) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "begin_checkout",
        customer: {
          ip: userIP,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          address: user?.address,
        },
        ecommerce: {
          type: "book",
          currency: "BDT",
          value: book?.price * quantity,
          items: [
            {
              item_id: book?._id,
              item_name: book?.title,
              quantity: quantity,
              price: book?.price,
            },
          ],
        },
      });
    }
  }, [book, userIP]);

  return null;
}
