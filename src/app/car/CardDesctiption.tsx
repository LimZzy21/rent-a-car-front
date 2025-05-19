export const CardDescription = ({
  label,
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title?: string | number;
  label?: string | number;
  description?: string | number;
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        {icon}
        <span className="text-sm ms-1">{title} </span>
      </div>
      {<p className="font-bold"> {description} {label}</p>}
    </div>
  );
};
