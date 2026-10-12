export default function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`font-mono text-[11.5px] tracking-[0.2em] text-brand-purple uppercase ${className}`}
    >
      {children}
    </div>
  );
}
