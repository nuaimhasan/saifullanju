"use client";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { loggedUser, token } = useSelector((store) => store.user);

  useEffect(() => {
    if (!loggedUser && !token && loggedUser?.role !== "admin") {
      return router.push("/login");
    }
  }, [loggedUser]);

  if (loggedUser && token && loggedUser?.role == "admin") {
    return children;
  }

  return <Spinner />;
}
