import { useGetOwnProfileQuery } from "@/redux/query/student";
import ProfileContent from "./ProfileContent";
import ProfileSideItems from "./ProfileSideItems";
import Banner from "@/components/ui-components/Banner";
import { PiUserBold } from "react-icons/pi";

const StudentProfile = () => {
  const { data: profile } = useGetOwnProfileQuery();
  console.log(profile);
  return (
    <div className="mx-auto max-w-380">
      <Banner
        title="My Profile"
        desc="View and manage your personal and academic information. Keep your details up to date for seamless access to university services."
        actionButton={<PiUserBold className="text-primary" size={40} />}
        containterClass="mb-8"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <ProfileSideItems profile={profile?.profile} />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-2">
          <ProfileContent profile={profile?.profile} />
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;
