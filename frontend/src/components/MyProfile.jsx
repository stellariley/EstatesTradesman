import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h3 className="text-2xl font-semibold mb-6 text-center">My Profile</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium">Full Name</label>
          <input
            type="text"
            disabled
            value={user?.name || ""}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Email Address</label>
          <input
            type="email"
            disabled
            value={user?.email || ""}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {user?.role === "Tradesman" && (
          <div>
            <label className="block text-lg font-medium">My Preferred Job Skills</label>
            <div className="space-y-4">
              <input
                type="text"
                disabled
                value={user?.skills?.firstSkill || ""}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                disabled
                value={user?.skills?.secondSkill || ""}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                disabled
                value={user?.skills?.thirdSkill || ""}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-lg font-medium">Phone Number</label>
          <input
            type="number"
            disabled
            value={user?.phone || ""}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Address</label>
          <input
            type="text"
            disabled
            value={user?.address || ""}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Role</label>
          <input
            type="text"
            disabled
            value={user?.role || ""}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Joined On</label>
          <input
            type="text"
            disabled
            value={user?.createdAt || ""}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
