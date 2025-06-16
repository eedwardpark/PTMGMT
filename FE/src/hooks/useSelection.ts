import { useState, useCallback, useMemo } from "react";

export const useSelection = <T extends { id: number }>(items: T[]) => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelected(checked ? items.map((item) => item.id) : []);
    },
    [items],
  );

  const handleSelectOne = useCallback((id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  }, []);

  const selectionState = useMemo(
    () => ({
      selected,
      isSelected: (id: number) => selected.includes(id),
      isAllSelected: selected.length > 0 && selected.length === items.length,
      isIndeterminate: selected.length > 0 && selected.length < items.length,
    }),
    [selected, items],
  );

  return {
    selectionState,
    handleSelectAll,
    handleSelectOne,
    clearSelection: () => setSelected([]),
  };
};
