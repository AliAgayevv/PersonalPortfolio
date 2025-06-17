const loginData = [
  {
    id: 0,
    type: "text",
    placeHolder: "Name",
    name: "firstName",
    required: " Name is required",
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "Enter letters only.",
    },
  },
  {
    id: 1,
    type: "email",
    placeHolder: "Email",
    name: "email",
    required: "Email mütləqdir",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Düzgün email daxil edin",
    },
  },
  {
    id: 2,
    type: "text",
    placeHolder: "Message",
    name: "message",
    required: "Message is required",
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Enter letters only.",
    },
  },
];
export default loginData;
