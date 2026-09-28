// Lengths and bounds the database checks, repeated where forms count them (DECISIONS.md, D-087).

export const MAX_PLAN_NAME_LENGTH = 80;
export const MAX_PAYMENT_LABEL_LENGTH = 120;
export const MAX_PAYMENT_NOTE_LENGTH = 500;
export const MAX_VOID_REASON_LENGTH = 300;
/** numeric(10, 2): the largest amount a payment or a plan can carry. */
export const MAX_AMOUNT_DIGITS = 8;
/** numeric(6, 2) and the check: a pack credits at most this many hours. */
export const MAX_HOURS = 500;
export const MAX_PERIOD_MONTHS = 12;
