import Spinner from "./_components/Spinner";

function Loading() {
  return (
    <div className="absolute left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-neutral">
      <Spinner />
    </div>
  );
}

export default Loading;
