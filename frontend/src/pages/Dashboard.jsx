import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { LuMoveRight } from "react-icons/lu";
import MyProfile from "../components/MyProfile.jsx";
import UpdateProfile from "../components/UpdateProfile.jsx";
import UpdatePassword from "../components/UpdatePassword.jsx";
import MyJobs from "../components/MyJobs.jsx";
import JobPost from "../components/JobPost.jsx";
import Applications from "../components/Applications.jsx";
import MyApplications from "../components/MyApplications.jsx";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, navigateTo]);

  return (
    <>
      <section className="account">
        <div className="component_header">
          <h1>Dashboard</h1>
          <p>
            Welcome! <span>{user && user.name}</span>
          </p>
        </div>

        <div className="container">
          <div className={`w-64 ${show ? "block" : "hidden"} lg:block`}>
            <ul className="sidebar_links">
              <h4>Manage Account</h4>

              <li>
                <button
                  onClick={() => {
                    setComponentName("My Profile");
                    setShow(!show);
                  }}
                  className="w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setComponentName("Update Profile");
                    setShow(!show);
                  }}
                  className="w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Update Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setComponentName("Update Password");
                    setShow(!show);
                  }}
                  className="w-full text-left p-2 rounded hover:bg-gray-200"
                >
                  Update Password
                </button>
              </li>

              {user && user.role === "Business Owner" && (
                <>
                  <li>
                    <button
                      onClick={() => {
                        setComponentName("Job Post");
                        setShow(!show);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-gray-200"
                    >
                      Post New Job
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setComponentName("My Jobs");
                        setShow(!show);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-gray-200"
                    >
                      My Jobs
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setComponentName("Applications");
                        setShow(!show);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-gray-200"
                    >
                      Applications
                    </button>
                  </li>
                </>
              )}

              {user && user.role === "Tradesman" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("My Applications");
                      setShow(!show);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-gray-200"
                  >
                    My Applications
                  </button>
                </li>
              )}

              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left p-2 rounded hover:bg-gray-200 text-red-600"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          <div className="banner">
            <div
              className={
                show ? "sidebar_icon move_right" : "sidebar_icon move_left"
              }
            >
              <LuMoveRight
                onClick={() => setShow(!show)}
                className={show ? "left_arrow" : "right_arrow"}
              />
            </div>

            {(() => {
              switch (componentName) {
                case "My Profile":
                  return <MyProfile />;
                case "Update Profile":
                  return <UpdateProfile />;
                case "Update Password":
                  return <UpdatePassword />;
                case "Job Post":
                  return <JobPost />;
                case "My Jobs":
                  return <MyJobs />;
                case "Applications":
                  return <Applications />;
                case "My Applications":
                  return <MyApplications />;
                default:
                  return <MyProfile />;
              }
            })()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
