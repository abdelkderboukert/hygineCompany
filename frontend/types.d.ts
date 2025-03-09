export type ContextType = {
  text: string;
};

export interface Product {
  id?: string;
  name: string;
  description?: string;
  images: string[];
  url?: string;
  ref?: number;
  subtitle?: string;
  file?: string;
}
