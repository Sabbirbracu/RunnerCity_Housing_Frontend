// src/pages/Admin/CommunityUserMiddle.jsx

const CommunityUserMiddle = ({ searchValue, setSearchValue }) => (
  <div className="flex justify-end mb-4">
    <input
      type="text"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search by name/email..."
      className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 w-64"
    />
  </div>
);

export default CommunityUserMiddle;
