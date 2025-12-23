export const calculateSplit = (amount, members, splitType, values) => {
  let splits = [];

  if (splitType === "EQUAL") {
    const share = amount / members.length;
    members.forEach(id => {
      splits.push({ userId: id, amount: share });
    });
  }

  if (splitType === "EXACT") {
    splits = values;
  }

  if (splitType === "PERCENT") {
    values.forEach(v => {
      splits.push({
        userId: v.userId,
        amount: (amount * v.percent) / 100
      });
    });
  }

  return splits;
};
