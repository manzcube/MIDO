export const default_pic =
  "https://imgs.search.brave.com/UOHewl77s_cOrxcg1FpDaocIjjuonwgezaN4DtbAPp4/rs:fit:800:800:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zZWFo/b3JzZS1pY29uLXNl/YWhvcnNlLW9jZWFu/LWFuaW1hbC1vdXRs/aW5lLWljb24tbG9n/by12ZWN0b3ItaWxs/dXN0cmF0aW9uLTE4/MTQ4Mjg2OS5qcGc";

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
