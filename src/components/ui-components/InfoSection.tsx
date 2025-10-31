const InfoSection: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className }) => {
  return (
    <div className={className}>
      <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default InfoSection;
