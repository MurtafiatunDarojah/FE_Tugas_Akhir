import React from "react";
import Button from "../Elements/Button";

const Table = (props) => {
  const { columns, data, actions } = props;

  return (
    <div className="relative shadow-md sm:rounded-lg">
      <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column, index) => (
              <th scope="col" key={index} className="px-6 py-3">
                {column.title}
              </th>
            ))}
            {actions && (
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {column.accessor ? row[column.accessor] : row[column.title]}
                </td>
              ))}
              {actions && (
                <td key="actions" className="flex items-center gap-2 px-6 py-4">
                  {actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      type="button"
                      onClick={() =>
                        action.label === "Lihat"
                          ? action.onClick(row.uuid)
                          : action.onClick(row[action.dataId])
                      }
                      width="w-fit"
                      bg={action.bg}
                    >
                      {action.label}
                    </Button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
