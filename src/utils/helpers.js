export const formatRuntime = (minutes, lang = 'en') => {
  if (!minutes) return '—';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (lang === 'ka') {
    return h > 0 ? `${h} სთ ${m} წთ` : `${m} წთ`;
  }
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
};

export const formatDate = (dateStr, lang = 'en') => {
  if (!dateStr) return '—';
  const locale = lang === 'ka' ? 'ka-GE' : 'en-US';
  return new Date(dateStr).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRating = (rating) => (rating ? rating.toFixed(1) : '—');
