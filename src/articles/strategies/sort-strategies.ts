export interface SortOption {
  [key: string]: any;
}

class SortByDateDesc implements SortOption {
  publishedAt = -1;
}

class SortByDateAsc implements SortOption {
  publishedAt = 1;
}

class SortByAlphaAsc implements SortOption {
  title = 1;
}

class SortByAlphaDesc implements SortOption {
  title = -1;
}

export const sortStrategies: { [key: string]: SortOption } = {
  dateDesc: new SortByDateDesc(),
  dateAsc: new SortByDateAsc(),
  alphaDesc: new SortByAlphaDesc(),
  alphaAsc: new SortByAlphaAsc(),
};
