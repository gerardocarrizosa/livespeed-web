export type User = {
  id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photoURL?: string;
};

export type PagedList<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
