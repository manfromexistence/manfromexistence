import React from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Open</button>
      {isOpen && (
        <div>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
