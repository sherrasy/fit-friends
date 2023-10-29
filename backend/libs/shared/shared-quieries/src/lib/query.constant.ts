export const DefaultQueryParam = {
  SortBy:'createdDate',
  SortWorkouts:'price',
  Limit: 50,
} as const;

export const sortDirections = ['asc', 'desc'];

export const orderSortings = ['amountOrdered', 'priceOrdered']
