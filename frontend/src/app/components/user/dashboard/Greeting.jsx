"use client";
import { useSelector } from "react-redux";

export default function Greeting() {
  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser;

  return (
    <h1 className="text-lg font-medium text-neutral/80">
      Welcome back <span className="text-primary">{user?.name}</span>, ready for
      your next lesson?
    </h1>
  );
}
