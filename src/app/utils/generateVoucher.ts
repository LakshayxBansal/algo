'use server';

type VoucherConfig = {
    voucherNumber: boolean;
    prefix: string;
    suffix: string;
    length: string; // Length of the number part
    prefillWithZero: boolean;
};

export default async function generateVoucher(config: VoucherConfig, number: number): Promise<string | null> {
    // Check if voucherNumber is enabled
    if (config.voucherNumber) {
        // Extract prefix, suffix, length, and zero-fill flag
        const prefix = config.prefix || "";
        const suffix = config.suffix || "";
        const length = parseInt(config.length, 10) || 0; // Parse length as a number (default to 0 if invalid)
        const prefillWithZero = config.prefillWithZero;

        // Pre-fill the number with zeros if required
        const numberPart = prefillWithZero
            ? number.toString().padStart(length, "0")
            : number.toString();

        // Combine prefix, number part, and suffix
        return `${prefix}${numberPart}${suffix}`;
    }

    // Return null if voucherNumber is not true
    return null;
}
