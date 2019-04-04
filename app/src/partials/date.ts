export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const dd = (date.getDay() < 10) ? '0' + date.getDay() : date.getDay();
    const mm = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const yyyy = date.getFullYear();
    const HH = date.getHours();
    const MM = date.getMinutes();
    return `${dd}/${mm}/${yyyy} ${HH}:${MM}`;
}
