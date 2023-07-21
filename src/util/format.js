export function getTimeAgo(dateStr) {
    const past = new Date(dateStr);
    const now = new Date();

    const deltaSeconds = Math.floor(
        (now.getTime() - past.getTime()) / 1000
    );

    const deltaMinutes = Math.floor(
        (now.getTime() - past.getTime()) / (1000 * 60)
    );

    const deltaHours = Math.floor(
        (now.getTime() - past.getTime()) / (1000 * 60 * 60)
    );

    const deltaDays = Math.floor(
        (now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24)
    );

    const deltaWeeks = Math.floor(
        deltaDays / 7
    );

    const deltaMonths = Math.floor(
        now.getMonth() - past.getMonth() + ((now.getFullYear() - past.getFullYear()) * 12)
    );

    const deltaYears = Math.floor(
        deltaMonths / 12
    );

    let value;
    let period;

    if (deltaYears > 0) period = 'year', value = deltaYears;
    else if (deltaMonths > 0) period = 'month', value = deltaMonths;
    else if (deltaWeeks > 0) period = 'week', value = deltaWeeks;
    else if (deltaDays > 0) period = 'day', value = deltaDays;
    else if (deltaHours > 0) period = 'hour', value = deltaHours;
    else if (deltaMinutes > 0) period = 'minute', value = deltaMinutes;
    else if (deltaSeconds < 3) return 'Just now';
    else period = 'second', value = deltaSeconds;

    return `${value} ${period}${value === 1 ? '' : 's'} ago`;
}

export function getFormattedDate(dateStr) {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);

    return `
        ${date.getDate()}
        ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][date.getMonth()]}
        ${date.getFullYear()}
    `;
}

export function getFormattedNumber(number) {
    if (number < 1000 && number > -1000) return number;

    const sign = number < 0 ? '-' : '';
    number = Math.abs(number);

    const thousands = Math.floor(number / 1000);
    const hundreds = Math.floor(number%1000 / 100);

    return `${sign}${thousands}.${hundreds}k`;
}

export function capitalise(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}