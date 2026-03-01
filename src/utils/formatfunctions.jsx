export const getFormattedDate = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate.replace(/\b(\d{1,2})\b/, (match) => {
    const suffixes = ["st", "nd", "rd"];
    const relevantDigits = match % 100;
    const suffix =
      suffixes[(relevantDigits - 20) % 10] || suffixes[relevantDigits] || "th";
    return match + suffix;
  });
};

export const formatNumberWithCommas = (value) => {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 });
};
