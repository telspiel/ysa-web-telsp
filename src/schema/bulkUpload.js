const Schema = {
  id: "bulk-upload",
  action: "#",
  method: "post",
  fields: [
    {
      label: "File Type",
      type: "radio",
      id: "fileType",
      name: "fileType",
      title: "Select File Type",
      options: [
        {
          label: "Txt",
          value: "txt",
          checked: true
        },
        {
          label: "Csv",
          value: "csv"
        }
      ]
    },
    {
      label: "Select File",
      type: "file",
      id: "selectFile",
      name: "selectFile",
      title: "Select File",
      required: true
    },
    {
      label: "Message Text",
      type: "textarea",
      rows: 3,
      id: "messageText",
      name: "messageText",
      title: "Message Text",
      placeholder: "Message Text"
    },
    {
      label: "Message Type",
      type: "radio",
      id: "messageType",
      name: "messageType",
      title: "Select Message Type",
      options: [
        {
          label: "Plain Text",
          value: "plainText",
          checked: true
        },
        {
          label: "Unicode",
          value: "unicode"
        }
      ]
    },
    {
      label: "Schedule Message",
      type: "text",
      id: "scheduleMessage",
      name: "scheduleMessage",
      title: "Schedule Message",
      required: true
    }
  ],
  buttons: [
    {
      type: "submit",
      value: "Save"
    },
    {
      type: "button",
      value: "Cancel",
      id: "cancelForm"
    }
  ]
};

export default Schema;
