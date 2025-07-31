export const formatDate = (date: string): string => {
  const dateObj = new Date(date);

  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${month}-${day}-${year}`;
};

export const formatTimeAgo = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Handle future dates
    if (seconds < 0) {
      return date.toLocaleDateString();
    }

    if (seconds < 60) {
      return seconds === 0 ? 'just now' : `${seconds} sec ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hr ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
      return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    }

    const months = Math.floor(days / 30.44); // Average days in a month
    if (months < 12) {
      return `${months} month${months === 1 ? '' : 's'} ago`;
    }

    const years = Math.floor(days / 365.25); // Account for leap years
    return `${years} year${years === 1 ? '' : 's'} ago`;
  } catch (e) {
    console.error('Error formatting date:', e);
    return isoDateString; // Fallback
  }
};

export const formatIntl = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formatter = Intl.DateTimeFormat('en-US', options);

  return formatter.format(new Date(date));
};
