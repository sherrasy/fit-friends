export const DefaultQueryParam = {
  SortBy:'createdDate',
  SortWorkouts:'price',
  Direction: 'desc',
  Limit: 50,
} as const;

export const sortDirections = ['asc', 'desc'];

export const orderSortings = ['amountOrdered', 'priceOrdered']
