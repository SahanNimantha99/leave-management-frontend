// Helper function to format date strings to 'YYYY-M-D'
export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
