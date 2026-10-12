import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.png"
        alt="Raccoon Technology"
        width={915}
        height={752}
        className="h-[34px] w-auto"
        priority
      />
      <span className="flex flex-col items-start leading-none">
        <span className="font-heading text-[17px] font-bold tracking-tight text-brand-black">
          Raccoon
        </span>
        <span className="font-mono text-[9.5px] tracking-[0.22em] text-brand-purple uppercase">
          Technology
        </span>
      </span>
    </span>
  );
}
