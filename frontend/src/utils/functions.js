export function formatMemberSince(inputDateString) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(inputDateString));

  return formattedDate;
}
