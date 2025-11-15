// Utility function to normalize Nigerian phone numbers
export const normalizeNigerianPhone = (phone: string): string | null => {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.length !== 11 || !digitsOnly.startsWith("0")) {
    return null; // Invalid, let Zod validation handle it
  }

  // Remove leading 0, add +234
  const normalized = "+234" + digitsOnly.slice(1);

  // Format with spaces: +234 XXX XXX XXXX
  const formatted = normalized.replace(
    /(\+234)(\d{3})(\d{3})(\d{4})/,
    "$1 $2 $3 $4"
  );

  return formatted;
};
