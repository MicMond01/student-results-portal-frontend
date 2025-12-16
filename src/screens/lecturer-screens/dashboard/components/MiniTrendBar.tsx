const MiniTrendBar = ({ value }: { value: number }) => (
  <div className="flex gap-0.5 items-end h-4 w-6">
    <div
      className={`w-1.5 rounded-sm ${
        value > 20 ? "bg-emerald-400" : "bg-emerald-100"
      } h-[40%]`}
    ></div>
    <div
      className={`w-1.5 rounded-sm ${
        value > 50 ? "bg-emerald-500" : "bg-emerald-200"
      } h-[70%]`}
    ></div>
    <div
      className={`w-1.5 rounded-sm ${
        value > 80 ? "bg-emerald-600" : "bg-emerald-300"
      } h-[100%]`}
    ></div>
  </div>
);

export default MiniTrendBar;
