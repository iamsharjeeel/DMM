import {
  FORM_GENERIC_ERROR,
  type AllowedForm,
  type FormApiResponse,
} from "./types";

export async function submitNativeForm(
  form: AllowedForm,
  payload: Record<string, unknown>,
): Promise<{ ok: true } | { ok: false; error: string; status: number }> {
  let response: Response;
  try {
    response = await fetch(`/api/forms/${form}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, error: FORM_GENERIC_ERROR, status: 0 };
  }

  let data: FormApiResponse | null = null;
  try {
    data = (await response.json()) as FormApiResponse;
  } catch {
    data = null;
  }

  if (response.ok && data && data.ok === true) {
    return { ok: true };
  }

  return {
    ok: false,
    error: FORM_GENERIC_ERROR,
    status: response.status,
  };
}
