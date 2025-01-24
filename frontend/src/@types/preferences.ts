export interface AddPreferenceResponse {
  message: string;
  preference: Preference;
}

export interface Preference {
  source: string;
  category: string;
  author: string;
  user_id: number;
  updated_at: Date;
  created_at: Date;
  id: number;
}
export type AddPreferenceRequest = Omit<
  Preference,
  "id" | "user_id" | "updated_at" | "created_at"
>;
export type UpdatePreferences = Partial<AddPreferenceRequest>;

export interface PreferencesResponse {
  preferences: Preference;
}

export type UpdateBodyRequest = Omit<
  Preference,
  "user_id" | "updated_at" | "created_at"
>;
export type UpdatePreferenceBody = Partial<UpdateBodyRequest>;
export interface UpdatePreferenceRequest {
  body: UpdatePreferenceBody;
  id: number;
}

export interface Author {
  author: string;
}
