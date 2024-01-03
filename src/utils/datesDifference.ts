import React from 'react'

export const datesDifference = (start_date: string) => {
    // Get the current date
    const currentDate = new Date();

    // Assuming the start date is "2022-01-01" (replace it with your actual start date)
    const startDate = new Date(start_date);

    // Calculate the difference in milliseconds

    const timeDifference = currentDate - startDate;

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Check if the difference is positive (future date) or negative (past date)
    if (daysDifference >= 0) {
        if (daysDifference === 0) {
         return true
        } else {
            return false
        }
      } else {
        return false
      }

}
export  const checkDateRange = (start_date:string, end_date:string) => {
  const currentDate = new Date();
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (currentDate >= startDate && currentDate <= endDate) {
    return true
  } else {
   return false
  }
};