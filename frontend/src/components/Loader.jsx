/**
 * Loading spinner component
 */
export default function Loader() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative">
        <div className="h-11 w-11 rounded-full border-2 border-primary-200"></div>
        <div className="absolute top-0 left-0 h-11 w-11 rounded-full border-2 border-transparent border-t-primary-600 animate-spin"></div>
      </div>
    </div>
  );
}
