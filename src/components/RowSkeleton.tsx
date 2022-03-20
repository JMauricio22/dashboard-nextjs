type RowSkeletonProps = {
  colCount: number;
  rowCount: number;
};

export default function RowsSkeleton({ rowCount, colCount }: RowSkeletonProps) {
  const rows = [...new Array(rowCount)];
  const cols = [...new Array(colCount)];

  return (
    <>
      {rows.map((val, rowIndex) => (
        <tr key={`Row-skeleton-${rowIndex}`}>
          {cols.map((value, colIndex) => (
            <td className="px-6 py-6 whitespace-nowrap" key={`Col-skeleton-${colIndex}`}>
              <div className="w-28 h-2 bg-gray-200 dark:bg-gray-400 bg-repeat-y bg-left-top bg-50-200 bg-gradiente-skeleton animate-shink" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
