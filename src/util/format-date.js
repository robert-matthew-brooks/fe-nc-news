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

    if (deltaYears > 0) return `${deltaYears} years ago`;
    else if (deltaMonths > 0) return `${deltaMonths} months ago`;
    else if (deltaWeeks > 0) return `${deltaWeeks} weeks ago`;
    else if (deltaDays > 0) return `${deltaDays} days ago`;
    else if (deltaHours > 0) return `${deltaHours} days ago`;
    else if (deltaMinutes > 0) return `${deltaMinutes} days ago`;
    else return `${deltaSeconds} days ago`;
}