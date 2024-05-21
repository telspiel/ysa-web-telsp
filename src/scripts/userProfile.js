import Validator from "./../scripts/validator";

const ViewUser  = {
  id: "view-user",
  action: "#",
  method: "post",
  fields: [
    {
      label: "User Name",
      type: "text",
      id: "username",
      name: "username",
      title: "User Name",
      placeholder: "User Name",
      required: true
    },
    {
      label: "Password",
      type: "text",
      id: "password",
      name: "password",
      title: "Password",
      placeholder: "Password ",
      required: true
    },
    {
      label: "Email ID",
      type: "text",
      id: "emailID",
      name: "emailID",
      title: "Email ID",
      placeholder: "Email ID ",
      required: true
    },
    {
      label: "Mobile Number",
      type: "text",
      id: "mobileNumber",
      name: "mobileNumber",
      title: "Mobile Number .",
      placeholder: "Mobile Number ",
      required: true
    },
    {
      label: "Organization",
      type: "text",
      id: "organization",
      name: "organization",
      title: "Organization.",
      placeholder: "Organization ",
      required: true
    },
    {
      label: "Department",
      type: "text",
      id: "department",
      name: "department",
      title: "Department .",
      placeholder: "Department ",
      required: true
    }
    // {
    //   label: "Account Manager",
    //   type: "text",
    //   id: "accountManager",
    //   name: "accountManager",
    //   title: "Account Manager .",
    //   placeholder: "Account Manager "
    // },
    // {
    //   label: "Contact Number",
    //   type: "text",
    //   id: "contactNumber",
    //   name: "contactNumber",
    //   title: "Contact Number .",
    //   placeholder: "Contact Number "
    // }
  ]
};
export default ViewUser;
