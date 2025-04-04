"use client";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { loggedUser, token } = useSelector((store) => store.user);

  useEffect(() => {
    if (!loggedUser && !token) {
      return router.push("/login");
    }
  }, [loggedUser]);

  if (loggedUser && token) return children;

  return <Spinner />;
}
