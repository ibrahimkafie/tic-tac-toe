type ContentProps = {
  /**
   * The children components to render within the wrapper
   */
  children: React.ReactNode;
};

export const Content = ({ children }: ContentProps) => {
  return (
    <div className="flex flex-col bg-gray-100 text-gray-600 min-h-screen">
        {children}
    </div>
  );
};

export default Content;
