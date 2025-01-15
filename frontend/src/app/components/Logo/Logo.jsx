import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/favicon.jpg"
        className="w-8 h-8 rounded-full"
        width={50}
        height={50}
      />
      <h2 className="text-2xl font-semibold">Saiful Lanju</h2>
    </Link>
  );
}
