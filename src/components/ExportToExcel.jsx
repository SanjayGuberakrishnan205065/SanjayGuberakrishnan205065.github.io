import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { utils, writeFile } from "xlsx";

const ExportToExcel = ({ data, fileName }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportExcel = () => {
    setIsExporting(true);

    const worksheet = utils.json_to_sheet(data);

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const currentDate = new Date().toLocaleString(); // Get current date and time
    writeFile(workbook, `${fileName} - ${currentDate}.xlsx`);

    setIsExporting(false);
  };

  return (
    <div>
      <Button
        color="green"
        variant="gradient"
        disabled={isExporting}
        onClick={exportExcel}
      >
        Export to Excel
      </Button>
    </div>
  );
};

export default ExportToExcel;
