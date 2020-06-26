import _ from "lodash";

export function pagination(PageSize, PageNumber, items) {
  const startIndex = (PageNumber - 1) * PageSize;
  return _(items)
    .slice(startIndex, startIndex + PageSize)
    .value();
}
