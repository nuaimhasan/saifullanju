"use client";
import { useEffect, useState } from "react";

const PageViewClient = ({ title, url }) => {
  const [userIP, setUserIP] = useState("");

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error("Error fetching IP from ipify:", error);
      }
    };

    fetchIP();
  }, []);

  useEffect(() => {
    if (userIP) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "pageview",
        page: {
          title: title,
          url: process.env.NEXT_PUBLIC_FRONTEND_URL + url,
          ip: userIP,
        },
      });
    }
  }, [title, url, userIP]);

  return null;
};

export default PageViewClient;
