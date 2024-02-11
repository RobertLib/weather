export default function dayOrNightIcon(
  iconName: string,
  dateTimeString: string,
) {
  const hours = new Date(dateTimeString).getHours();
  const isDayTime = hours > 6 && hours < 18;

  return iconName.replace(/.$/, isDayTime ? "d" : "n");
}
