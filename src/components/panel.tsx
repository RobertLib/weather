import cn from "@/utils/cn";

export default function Panel({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      {...props}
      className={cn(
        "flex rounded-xl border bg-white py-4 shadow-sm",
        className,
      )}
    />
  );
}
