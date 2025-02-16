import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="account_components">
      <h3>My Profile</h3>
      <div>
        <div>
          <label >Full Name</label>
          <input
            type="text"
            disabled
            value={user?.name || ""}
          />
        </div>

        <div>
          <label >Email Address</label>
          <input
            type="email"
            disabled
            value={user?.email || ""}
          />
        </div>

        {user?.role === "Tradesman" && (
          <div>
            <label >My Preferred Job Skills</label>
            <div>
              <input
                type="text"
                disabled
                value={user?.skills?.firstSkill || ""}

              />
              <input
                type="text"
                disabled
                value={user?.skills?.secondSkill || ""}

              />
              <input
                type="text"
                disabled
                value={user?.skills?.thirdSkill || ""}

              />
            </div>
          </div>
        )}

        <div>
          <label >Phone Number</label>
          <input
            type="number"
            disabled
            value={user?.phone || ""}
          />
        </div>

        <div>
          <label >Address</label>
          <input
            type="text"
            disabled
            value={user?.address || ""}
          />
        </div>

        <div>
          <label >Role</label>
          <input
            type="text"
            disabled
            value={user?.role || ""}
          />
        </div>

        <div>
          <label >Joined On</label>
          <input
            type="text"
            disabled
            value={user?.createdAt || ""}

          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
