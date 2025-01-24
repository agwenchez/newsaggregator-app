import { forwardRef, ForwardedRef } from "react";
import dayjs from "dayjs";
import { FaCalendar, FaChevronCircleDown } from "react-icons/fa";

interface FilterDateProps {
  value?: Date | null;
  onClick?: () => void;
}

const dateFormat = "DD/MM/YYYY";

const CustomDateInput = forwardRef(
  (
    { value, onClick }: FilterDateProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div
        className="flex border-2 cursor-pointer w-full justify-center rounded-md bg-white px-16 py-2 text-sm relative box-border"
        onClick={onClick}
        ref={ref}
      >
        <div className="absolute left-4">
          <FaCalendar />
        </div>
        <span>{value ? dayjs(value).format(dateFormat) : "dd/mm/yyyy"}</span>
        <div className="absolute right-4">
          <FaChevronCircleDown />
        </div>
      </div>
    );
  }
);

export default CustomDateInput;
