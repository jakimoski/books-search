import { useState, useEffect, useRef } from "react";

type DropdownProps = {
  options: string[];
  optionHandler: (option: string) => void;
};

const Dropdown = ({ options, optionHandler }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleToggleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        setIsOpen(true);
        break;
      case "ArrowUp":
        setIsOpen(false);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "Enter":
      case " ":
        setIsOpen((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown__toggle"
        onClick={handleToggleClick}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption}
      </button>

      {isOpen && (
        <ul className="dropdown__menu" role="listbox" tabIndex={-1}>
          {options.map((option) => (
            <li
              className="dropdown__menu__item"
              key={option}
              onClick={() => {
                handleOptionClick(option);
                optionHandler(option);
              }}
              role="option"
              aria-selected={selectedOption === option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
