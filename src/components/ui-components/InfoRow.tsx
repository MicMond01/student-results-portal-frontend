const InfoRow: React.FC<{
  label: string;
  value: React.ReactNode;
  icon?: React.ElementType;
}> = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
    <span className="text-sm text-gray-500 flex items-center gap-2">
      {Icon && <Icon className="h-3.5 w-3.5" />} {label}
    </span>
    <span className="text-sm font-medium text-gray-900 text-right">
      {value || "N/A"}
    </span>
  </div>
);

export default InfoRow;
