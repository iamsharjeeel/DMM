import Link from "next/link";
import { compliance } from "@/config/compliance";

export function FormLegalFooter() {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-ink-soft">
      <p>{compliance.formAcknowledgment}</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        <li>
          <Link
            href={compliance.privacyPath}
            className="text-blue underline underline-offset-4 hover:text-blue-hover"
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            href={compliance.termsPath}
            className="text-blue underline underline-offset-4 hover:text-blue-hover"
          >
            Terms of Service
          </Link>
        </li>
        <li>
          <Link
            href={compliance.smsTermsPath}
            className="text-blue underline underline-offset-4 hover:text-blue-hover"
          >
            SMS Terms
          </Link>
        </li>
      </ul>
    </div>
  );
}
