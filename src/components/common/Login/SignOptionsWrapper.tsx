export const SignOptionsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      <div className="bg-white w-full max-w-[30rem] flex flex-col items-center  rounded-xl p-[2.5rem] gap-y-[1.5rem]">
        {children}
      </div>
    </div>
  );
};
