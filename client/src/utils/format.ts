/**
 * Formats a raw numeric value into a clean Indian Rupee (₹) currency layout.
 * @example 1250500 -> ₹12,50,500.00
 */
export const formatCurrency = (value: number | string | undefined): string => {
    if (value === undefined || value === null) return '₹0.00';
    
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue)) return '₹0.00';

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericValue);
};

/**
 * Standardizes raw percentage display metrics.
 * @example 1.5 -> 1.5%
 */
export const formatPercentage = (value: number | undefined): string => {
    if (value === undefined || value === null) return '0.00%';
    return `${value.toFixed(2)}%`;
};