export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
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

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow White",
    img: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg",
    status: "active",
    email: "snowwhite@gmail.com",
    age: 35,
    contact: "+1 202-918-2132"
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://xsgames.co/randomusers/assets/avatars/male/2.jpg",
    email: "jamielannister@gmail.com",
    status: "passive",
    age: 42,
    contact: "+1 202-920-4432"
  },
  {
    id: 3,
    username: "Alex Jonathan",
    img: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg",
    email: "alexjonathan@gmail.com",
    status: "pending",
    age: 45,
    contact: "+1 202-945-2145"
  },
  {
    id: 4,
    username: "Tony Stark",
    img: "https://xsgames.co/randomusers/assets/avatars/male/4.jpg",
    email: "tonystark@gmail.com",
    status: "active",
    age: 16,
    contact: "+1 205-920-2032"
  },
  {
    id: 5,
    username: "Targaryen Jim",
    img: "https://xsgames.co/randomusers/assets/avatars/female/5.jpg",
    email: "targaryenjim@gmail.com",
    status: "passive",
    age: 22,
    contact: "+1 303-121-2371"
  },
  {
    id: 6,
    username: "Melisandre Octave",
    img: "https://xsgames.co/randomusers/assets/avatars/female/6.jpg",
    email: "melisandreoctave@gmail.com",
    status: "active",
    age: 15,
    contact: "+1 102-501-4045"
  },
  {
    id: 7,
    username: "Clifford Hangman",
    img: "https://xsgames.co/randomusers/assets/avatars/male/7.jpg",
    email: "cliffordhangman@gmail.com",
    status: "passive",
    age: 44,
    contact: "+1 202-911-2120"
  },
  {
    id: 8,
    username: "Frances Louis",
    img: "https://xsgames.co/randomusers/assets/avatars/male/8.jpg",
    email: "franceslouis@gmail.com",
    status: "active",
    age: 36,
    contact: "+1 201-963-1052"
  },
  {
    id: 9,
    username: "Roxie Jackson",
    img: "https://xsgames.co/randomusers/assets/avatars/female/9.jpg",
    email: "roxiejackson@gmail.com",
    status: "pending",
    age: 65,
    contact: "+1 203-971-2021"
  },
  {
    id: 10,
    username: "Jimmy Carton",
    img: "https://xsgames.co/randomusers/assets/avatars/male/10.jpg",
    email: "jimmycarton@gmail.com",
    status: "active",
    age: 65,
    contact: "+1 205-967-9045"
  },
  {
    id: 11,
    username: "Tony Stark",
    img: "https://xsgames.co/randomusers/assets/avatars/male/11.jpg",
    email: "tonystark@gmail.com",
    status: "active",
    age: 16,
    contact: "+1 205-920-2032"
  },
  {
    id: 12,
    username: "Frances Louis",
    img: "https://xsgames.co/randomusers/assets/avatars/male/12.jpg",
    email: "franceslouis@gmail.com",
    status: "active",
    age: 36,
    contact: "+1 201-963-1052"
  },
];

  // https://xsgames.co/randomusers/