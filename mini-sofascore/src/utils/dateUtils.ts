export function formatDate(dateInput: Date) {

    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}.`;
  }

export function formatDateForUrl(dateInput: Date) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${year}-${month}-${day}`;
}

export const generateDates = (date: Date) => {
  const dateArray: Date[] = []
  for (let i = 5; i > 0; i--) {
    let newDay = new Date(date)
    newDay.setDate(date.getDate() - i)
    dateArray.push(newDay)
  }
  dateArray.push(new Date(date))
  for (let i = 1; i <= 5; i++) {
    let newDay = new Date(date)
    newDay.setDate(date.getDate() + i)
    dateArray.push(newDay)
  }
  return dateArray
}