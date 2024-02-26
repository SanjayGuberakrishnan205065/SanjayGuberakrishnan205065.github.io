import { Card, Typography } from "@material-tailwind/react";
import { formatDateTimeWithTimezone } from "../../../utils";

const TABLE_HEAD = [
  "S. no.",
  "UPI Transaction ID",
  "Amount",
  "Transaction Status",
  "Date",
  "Includes",
];

function MyTicketsTable({ myTickets }) {
  return (
    <Card className="h-full w-full overflow-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-900 bg-blue-gray-900 p-4"
              >
                <Typography
                  variant="h6"
                  color="white"
                  className="font-normal leading-none opacity-75"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {myTickets.map(
            (
              {
                upiTransactionId,
                transactionAmount,
                transactionStatus,
                createdAt,
                purchasedTickets,
              },
              index
            ) => (
              <tr
                key={upiTransactionId}
                className="even:bg-blue-gray-800 odd:bg-blue-gray-700"
              >
                <td className="p-4">
                  <Typography
                    variant="small"
                    className="font-normal"
                    color="white"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {upiTransactionId}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {transactionAmount["$numberDecimal"]}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {transactionStatus}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {formatDateTimeWithTimezone(createdAt)}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {purchasedTickets
                      .map((ticket) => ticket.ticketName)
                      .join(", ")}
                  </Typography>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Card>
  );
}

export default MyTicketsTable;
