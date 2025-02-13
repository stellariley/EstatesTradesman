import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-3xl font-semibold mb-8 text-center text-gray-900">My Profile</h3>
      
      <div className="space-y-8">
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">Full Name</label>
          <input
            type="text"
            disabled
            value={user?.name || ""}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">Email Address</label>
          <input
            type="email"
            disabled
            value={user?.email || ""}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
          />
        </div>

        {user?.role === "Tradesman" && (
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-900">My Preferred Job Skills</label>
            <div className="space-y-4">
              <input
                type="text"
                disabled
                value={user?.skills?.firstSkill || ""}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
              />
              <input
                type="text"
                disabled
                value={user?.skills?.secondSkill || ""}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
              />
              <input
                type="text"
                disabled
                value={user?.skills?.thirdSkill || ""}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">Phone Number</label>
          <input
            type="number"
            disabled
            value={user?.phone || ""}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">Address</label>
          <input
            type="text"
            disabled
            value={user?.address || ""}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">Role</label>
          <input
            type="text"
            disabled
            value={user?.role || ""}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">Joined On</label>
          <input
            type="text"
            disabled
            value={user?.createdAt || ""}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
