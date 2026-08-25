import type { AllowedForm } from "./types";

export function logFormEvent(input: {
  requestId: string;
  form: AllowedForm | string;
  result: "ok" | "error";
  status: number;
}) {
  console.info(
    JSON.stringify({
      scope: "forms",
      requestId: input.requestId,
      form: input.form,
      result: input.result,
      status: input.status,
      timestamp: new Date().toISOString(),
    }),
  );
}
