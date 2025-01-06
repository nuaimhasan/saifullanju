"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/Redux/api/user/userSlice";

export default function useUserCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/loggedUser`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            dispatch(
              userLoggedIn({
                data: data,
              })
            );
          }
        })
        .finally(() => {
          setAuthChecked(true);
        });
    } else {
      setAuthChecked(true);
    }
  }, [dispatch, setAuthChecked, token]);

  return authChecked;
}
