import EditLecturerSidebar from "./lecturer-profile-compo/EditLecturerSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalDetailsForm from "./lecturer-profile-compo/PersonalDetailsForm";
import PasswordResetForm from "./lecturer-profile-compo/PasswordResetForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UpdateProfile: React.FC = () => {
  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-380">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <EditLecturerSidebar />
          </aside>

          {/* Main Content Area with Tabs */}
          <main className="lg:col-span-2">
            <Tabs defaultValue="personalDetails" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personalDetails">
                  Personal Details
                </TabsTrigger>
                <TabsTrigger value="changePassword">
                  Change Password
                </TabsTrigger>
                <TabsTrigger value="others">Others</TabsTrigger>{" "}
                {/* Placeholder */}
              </TabsList>
              <TabsContent value="personalDetails" className="mt-4">
                <PersonalDetailsForm />
              </TabsContent>
              <TabsContent value="changePassword" className="mt-4">
                <PasswordResetForm />
              </TabsContent>
              <TabsContent value="others" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Other Settings</CardTitle>
                    <CardDescription>
                      This section can be expanded for other customizable
                      settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      (Content for other settings like notifications, privacy,
                      etc., would go here.)
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
