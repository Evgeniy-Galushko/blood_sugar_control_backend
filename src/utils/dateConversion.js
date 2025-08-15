export function dateConversion(period) {
  const yer = parseInt(period.slice(0, 4));
  const month = parseInt(period.slice(6, 8));
  const endDey = new Date(yer, month, 0).getDate();

  return {
    beginningOfPeriod: period + `-${'01'}`,
    endOfPeriod: period + `-${endDey}`,
  };
}

// export function dateConversion(period) {
//   const yer = parseInt(period.slice(0, 4));
//   const day = parseInt(period.slice(8, 10));

//   const data = new Date(period);
//   const newMonth = data.getMonth() + 1 - 1;

//   let newYer;
//   let month;
//   if (0 >= newMonth) {
//     newYer = yer - 1;
//     month = 12 + newMonth;
//   } else {
//     newYer = yer;
//     month = newMonth;
//   }

//   return {
//     beginningOfPeriod: period,
//     endOfPeriod: `${newYer}-${month.toString().padStart(2, '0')}-${day
//       .toString()
//       .padStart(2, '0')}`,
//   };
// }

export function inSixMonths(period) {
  const yer = parseInt(period.slice(0, 4));
  const day = parseInt(period.slice(8, 10));

  const data = new Date(period);
  const newMonth = data.getMonth() + 1 - 6;

  let newYer;
  let month;
  if (0 >= newMonth) {
    newYer = yer - 1;
    month = 12 + newMonth;
  } else {
    newYer = yer;
    month = newMonth;
  }

  return {
    beginningOfPeriod: period,
    endOfPeriod: `${newYer}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`,
  };
}
