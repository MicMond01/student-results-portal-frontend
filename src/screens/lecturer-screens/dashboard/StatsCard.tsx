const StatsCard = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-xl">
      <div className="text-sm text-[#2b2653]/70">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-[#2b2653]">
        {subTitle}
      </div>
    </div>
  );
};

export default StatsCard;
