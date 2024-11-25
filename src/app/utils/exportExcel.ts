import * as XLSX from 'xlsx';

export async function exportToExcel(fields: string[], headers: (string | undefined)[], data: any) {
    try {
      const filteredRows = data?.result.map((row: any) =>
        Object.fromEntries(fields.map((field) => [field, row[field]]))
      );
  
      // Prepare Excel worksheet
      const ws = XLSX.utils.json_to_sheet(filteredRows);
  
      // Add headers (header names) to the worksheet
      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' });
  
      // Create and export workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'Algofast_data.xlsx');
    } catch (error) {
      console.error('Error creating Excel file:', error);
      throw new Error('Failed to generate Excel file');
    }
  }
  