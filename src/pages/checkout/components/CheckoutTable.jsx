import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["S. no.", "Ticket Name", "Price"];

function CheckoutTable({ cartItems }) {
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
          {cartItems.map(({ ticketName, ticketPrice }, index) => (
            <tr
              key={ticketName}
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
                  {ticketName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal"
                >
                  {ticketPrice["$numberDecimal"]}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default CheckoutTable;
