export const onChange = (setFormData) => (e) => {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
};

export const getBgColor = (prop) => {
  switch (prop) {
    case "bg-sky-200":
      return "bg-sky-100";
    case "bg-green-200":
      return "bg-green-100";
    case "bg-purple-200":
      return "bg-purple-100";
    case "bg-yellow-200":
      return "bg-yellow-100";
    case "bg-red-200":
      return "bg-red-100";
    case "bg-orange-200":
      return "bg-orange-100";
    default:
      return "bg-white";
  }
};

export const getMonth = (monthString) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = parseInt(monthString) - 1;

  if (monthIndex >= 0 && monthIndex < months.length) {
    return months[monthIndex];
  } else {
    return "";
  }
};

export const getTextColor = (prop) => {
  switch (prop) {
    case "bg-sky-200":
      return "text-sky-800";
    case "bg-green-200":
      return "text-green-800";
    case "bg-purple-200":
      return "text-purple-800";
    case "bg-yellow-200":
      return "text-yellow-800";
    case "bg-red-200":
      return "text-red-800";
    case "bg-orange-200":
      return "text-orange-800";
    default:
      return "text-gray-800";
  }
};

export const getBorderColor = (prop) => {
  switch (prop) {
    case "bg-sky-200":
      return "border-sky-800";
    case "bg-green-200":
      return "border-green-800";
    case "bg-purple-200":
      return "border-purple-800";
    case "bg-yellow-200":
      return "border-yellow-800";
    case "bg-red-200":
      return "border-red-800";
    case "bg-orange-200":
      return "border-orange-800";
    default:
      return "border-gray-800";
  }
};
