import ExcelJS from 'exceljs';

export async function exportToExcel(fields: string[], headers: (string | undefined)[], data: any) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Add headers
    worksheet.addRow(headers);

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '0070C0' },
    };

    // Add filtered rows
    const filteredRows = data?.result.map((row: any) =>
      fields.map((field) => row[field])
    );
    filteredRows.forEach((row: any) => worksheet.addRow(row));

    // Adjust column widths
    worksheet.columns = headers.map((header, index) => ({
      header: header || '',
      key: fields[index],
      width: Math.max((header?.length || 10) + 5, 15),
    }));

    // Generate Excel file buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Convert the buffer to a Blob and trigger download
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Algofast_data.xlsx';
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error creating Excel file:', error);
    throw new Error('Failed to generate Excel file');
  }
}
