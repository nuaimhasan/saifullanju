"use client";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const { loggedUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (!loggedUser?.success && !token) {
      return router.push("/login");
    }
  }, [loggedUser]);

  if (loggedUser?.success && token) {
    return children;
  }

  return <Spinner />;
}
