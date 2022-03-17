type RowSkeletonProps = {
  colCount: number;
  rowCount: number;
};

export default function RowsSkeleton({ rowCount, colCount }: RowSkeletonProps) {
  const rows = [...new Array(rowCount)];
  const cols = [...new Array(colCount)];

  return (
    <>
      {rows.map((val, index) => (
        <tr key={`Row-skeleton-${index}`}>
          {cols.map((value, index) => (
            <td
              className="px-6 py-6 whitespace-nowrap"
              key={`Col-skeleton-${index}`}
            >
              <div className="w-24 h-4 bg-gray-200 bg-repeat-y bg-left-top bg-50-200 bg-gradiente-skeleton animate-shink"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
