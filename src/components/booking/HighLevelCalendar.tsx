import Script from "next/script";

const calendarId = "J5SZX8DnjPciWfZaFULf_1787667533067";

export function HighLevelCalendar() {
  return (
    <>
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/J5SZX8DnjPciWfZaFULf"
        allow="payment"
        scrolling="no"
        id={calendarId}
        title="Schedule a prayer call with Pastor Donald Mayes"
        className="block min-h-[780px] w-full border-0 sm:min-h-[720px]"
      />
      <Script
        id="highlevel-calendar-embed"
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
