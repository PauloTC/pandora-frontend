export const Label = ({ children, subtext, htmlFor }: any) => {
  return (
    <label htmlFor={htmlFor} className="flex flex-col grow">
      <span className="font-medium uppercase text-sm text-gray-900">
        {children}
      </span>
      <span className="text-xs font-regular">{subtext}</span>
    </label>
  );
};
