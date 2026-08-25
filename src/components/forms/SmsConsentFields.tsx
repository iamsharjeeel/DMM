import { Checkbox } from "@/components/forms/Checkbox";
import { compliance } from "@/config/compliance";

export function SmsConsentFields({
  variant,
  marketing,
  nonMarketing,
  onMarketingChange,
  onNonMarketingChange,
}: {
  variant: "prayer" | "speaking";
  marketing: boolean;
  nonMarketing: boolean;
  onMarketingChange: (checked: boolean) => void;
  onNonMarketingChange: (checked: boolean) => void;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-medium text-ink">
        Optional text messages
      </legend>
      <Checkbox
        id={`${variant}-smsMarketingConsent`}
        name="smsMarketingConsent"
        checked={marketing}
        onChange={onMarketingChange}
      >
        {compliance.marketingConsentLabel}
      </Checkbox>
      <Checkbox
        id={`${variant}-smsNonMarketingConsent`}
        name="smsNonMarketingConsent"
        checked={nonMarketing}
        onChange={onNonMarketingChange}
      >
        {compliance.nonMarketingConsentLabels[variant]}
      </Checkbox>
    </fieldset>
  );
}
