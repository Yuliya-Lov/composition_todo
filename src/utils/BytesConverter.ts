export const saveBlob = (reportName: string, blob: Blob) => {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = reportName;
  link.click();
};
