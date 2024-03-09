import { Card, Typography } from "@material-tailwind/react";

function ReferralCodesTable({ columns, rows, handleActiveStatusToggle }) {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {column.headerName}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-blue-gray-50/50">
              {columns.map((value, index) =>
                value.field === "active" ? (
                  <td className="p-4" key={index}>
                    <button
                      className={`${
                        row[value.field] === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white px-3 py-1 rounded-md text-sm`}
                      onClick={() =>
                        handleActiveStatusToggle(row["referralCode"])
                      }
                    >
                      {row[value.field]}
                    </button>
                  </td>
                ) : (
                  <td className="p-4" key={index}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row[value.field]}
                    </Typography>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default ReferralCodesTable;
