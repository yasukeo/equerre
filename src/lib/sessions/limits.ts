// Lengths the database checks, repeated where forms count them (DECISIONS.md, D-073 to D-075).

export const MAX_REQUEST_NOTE_LENGTH = 300;
export const MAX_REASON_LENGTH = 500;
export const MAX_EXCEPTION_NOTE_LENGTH = 120;
export const MAX_LOCATION_LENGTH = 200;
export const MAX_RECAP_LENGTH = 2000;
export const MAX_SESSION_HOMEWORK_LENGTH = 2000;
export const MAX_SESSION_TYPE_NAME_LENGTH = 80;
/** A weekly series covers at most a school year. */
export const MAX_SERIES_LENGTH = 52;
/** Requests a student may have waiting at once (public.request_session). */
export const MAX_PENDING_REQUESTS = 3;
