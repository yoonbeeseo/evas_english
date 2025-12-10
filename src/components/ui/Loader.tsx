import Spinner from "./Spinner";

export default function Loader() {
  return (
    <div className="h-dvh flex-center animate-pulse gap-2">
      <Spinner className="text-4xl " />
      <p>Loading...</p>
    </div>
  );
}
