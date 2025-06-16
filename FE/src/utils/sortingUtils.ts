export const sortData = <T>(
  data: T[],
  orderBy: keyof T,
  orderDir: "asc" | "desc",
): T[] => {
  return [...data].sort((a, b) => {
    let aValue: any = a[orderBy];
    let bValue: any = b[orderBy];

    if (typeof aValue === "object" && aValue !== null) {
      aValue = aValue.acronym || aValue.toString();
    }
    if (typeof bValue === "object" && bValue !== null) {
      bValue = bValue.acronym || bValue.toString();
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      const dateA = new Date(aValue);
      const dateB = new Date(bValue);
      if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
        aValue = dateA;
        bValue = dateB;
      }
    }

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return orderDir === "asc" ? 1 : -1;
    if (bValue == null) return orderDir === "asc" ? -1 : 1;

    if (aValue < bValue) return orderDir === "asc" ? -1 : 1;
    if (aValue > bValue) return orderDir === "asc" ? 1 : -1;
    return 0;
  });
};
