function SidebarSection({ title, children, isOpen }) {
  return (
    <div className="mt-2 mb-1">
      {isOpen && (
        <div className="px-3 py-1.5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h2>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

export default SidebarSection;
