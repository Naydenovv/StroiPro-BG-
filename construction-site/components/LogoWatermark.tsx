/* eslint-disable @next/next/no-img-element */
export default function LogoWatermark() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      <img
        src="/logo.png"
        alt=""
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[550px] h-auto opacity-[0.03] select-none"
        aria-hidden="true"
      />
    </div>
  );
}
