"use client";
import { GiContract } from "react-icons/gi";
import { MdOutlinePayments } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import "@/app/styles/setting.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { IoLogoBuffer } from "react-icons/io";
import ActiveLink from "@/app/components/ActiveLink";

export default function AdminSettingLayout({ children }) {
  return (
    <div className="grid md:grid-cols-4 items-start gap-3">
      <nav className="rounded bg-base-100 p-4 sticky top-2">
        <ul className="setting_sidebar text-neutral/70">
          <li>
            <ActiveLink href="/admin/settings/profile">
              <MdAccountCircle className="text-lg" />
              Profile
            </ActiveLink>
          </li>

          <li>
            <ActiveLink href="/admin/settings/change-password">
              <RiLockPasswordLine />
              Change Password
            </ActiveLink>
          </li>

          <li>
            <ActiveLink href="/admin/settings/favicon">
              <GiContract />
              Favicon
            </ActiveLink>
          </li>

          <li>
            <ActiveLink href="/admin/settings/speech-section">
              <IoLogoBuffer />
              Speech Section
            </ActiveLink>
          </li>

          <li>
            <ActiveLink href="/admin/settings/shipping-configuration">
              <FaShippingFast />
              Shipping Configuration
            </ActiveLink>
          </li>

          <li>
            <ActiveLink href="/admin/settings/manual-payment-instruction">
              <MdOutlinePayments />
              Manual Payment Instruction
            </ActiveLink>
          </li>
        </ul>
      </nav>

      <div className="md:col-span-3 rounded bg-base-100 p-3">{children}</div>
    </div>
  );
}
