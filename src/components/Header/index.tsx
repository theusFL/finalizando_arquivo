import Image from "next/image";

export function Header() {
  return (
    <header className="bg-header w-full h-[212px]" >
      <div className="max-w-[1120px] mx-auto flex row justify-between pt-8">
        <div className="flex flex-row items-center gap-4 text-align-center">
          <Image src="/logo.png" width={40} height={40} alt="Logo Image" />
          <p className="text-3xl text-white font-bold">dt money</p>
        </div>
        <button className="bg-button text-white px-8 py-3 rounded-md hover:opacity-80"> Nova transação </button>
      </div>
    </header>
  );
}