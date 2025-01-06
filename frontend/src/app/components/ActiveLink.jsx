import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`${isActive && "active"} ok`}>
      {children}
    </Link>
  );
}
