import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getToken, logout } from "./services/authorize";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5); // จำนวนรายการต่อหน้า
  const [hasNextPage, setHasNextPage] = useState(true);

  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoad(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/users?page=${currentPage}&limit=${perPage}`
      );
      if (response.data.users.length < 5) {
        setHasNextPage(false);
      } else {
        setHasNextPage(true);
      }
      setUsers(response.data.users);
      console.log(response.data.users.length)
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setIsLoad(false);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/delete/${id}`);
        console.log("deleted");
        navigate("/");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        await fetchData();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(
        "An error occurred while deleting the user. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchData();
    getToken();
  }, [currentPage, perPage]); // เรียก fetchData เมื่อ currentPage หรือ perPage มีการเปลี่ยนแปลง

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      {isLoad ? (
        <h1>Loading...</h1>
      ) : (
        <div className="w-50 bg-white rounded p-3">
          <h1>CRUD Operations</h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {getToken() ? (
              <Link to="/create" className="btn btn-success btn-sm">
                Add +
              </Link>
            ) : (
              <div></div>
            )}

            {getToken() ? (
              <Link
                className="btn btn-sm btn-outline-danger mx-2"
                onClick={() => logout()}
              >
                Logout
              </Link>
            ) : (
              <div>
                <Link
                  to={`/login`}
                  className="btn btn-sm btn-outline-success mx-2"
                >
                  Sign IN
                </Link>
                <Link to={`/register`} className="btn btn-sm btn-success me-2">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                {getToken() ? <th>Action</th> : <th></th>}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td> {user.name} </td>
                  <td> {user.email} </td>
                  <td> {user.age} </td>
                  {getToken() ? (
                    <td>
                      <Link
                        to={`/edit/${user._id}`}
                        className="btn btn-sm btn-success me-2"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-center">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-sm btn-outline-primary mx-2"
              disabled={currentPage <= 1}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!hasNextPage}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
