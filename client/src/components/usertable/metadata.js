export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={`data:image/png;base64, ${params.row.image}`} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 350,
  },

  {
    field: "age",
    headerName: "Age",
    width: 110,
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 220
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
