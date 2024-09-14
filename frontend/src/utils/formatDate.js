export const formatPastDate = (dateString) => {
  const date = new Date(dateString); 
  
  if (isNaN(date)) {
      return "Invalid Date"; 
  }
  
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = `'${String(date.getFullYear()).slice(-2)}`;
  const hours = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${day}${getDaySuffix(day)} ${month}${year} ${hours}:${minutes} ${ampm}`;
};

  // Helper to add suffix for day 
export  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; 
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  