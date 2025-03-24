import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';
import Updateprofile from './Updateprofile';

const EditProfile = () => {
  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit");

  if (edit === "password") {
    return <UpdatePassword />;
  }

  if (edit === "profile") {
    return <Updateprofile />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Edit Profile
        </h2>
        <div className="flex space-x-4">
          <Link
            to="/profile/edit?edit=profile"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Edit Profile
          </Link>
          <Link
            to="/profile/edit?edit=password"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Change Password
          </Link>
        </div>
      </div>
    );
  }
};

export default EditProfile;