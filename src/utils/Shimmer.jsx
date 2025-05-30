export const UserCardSkeleton = () => {
  return (
    <div className="bg-base-200 rounded-4xl">
      <div className="flex w-96 flex-col gap-4">
        <div className="skeleton h-96 rounded-t-3xl rounded-b-none w-full"></div>
        <div className="px-6">
          <div className="skeleton h-4 w-56 mb-4"></div>
          <div className="skeleton h-4 w-32 mb-6"></div>
          <div className="skeleton h-4 w-full mb-8"></div>
          <div className="flex justify-center gap-16 mb-8">
            <button className="skeleton btn btn-circle size-14 rounded-full"></button>
            <button className="skeleton btn btn-circle size-14 rounded-full"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConnectionCardSkeleton = ({ request }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-34 w-sm md:w-2xl bg-base-200 rounded-xl px-8 py-4 gap-4 md:gap-0 mb-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-24 w-24 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-28 md:w-36"></div>
          <div className="skeleton h-4 w-20 md:w-20"></div>
          <div className="skeleton h-4 w-52 md:w-80"></div>
        </div>
      </div>
      {request && (
        <div className="flex md:flex-col gap-20 md:gap-2">
          <button className="skeleton btn btn-circle size-14 rounded-full"></button>
          <button className="skeleton btn btn-circle size-14 rounded-full"></button>
        </div>
      )}
      {!request && <div className="skeleton h-11 w-20"></div>}
    </div>
  );
};
