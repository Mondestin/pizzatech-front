import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserData } from "@/services/userService";
import { Shield, Mail, User } from "lucide-react";

interface UsersListProps {
  users: UserData[];
}

const UsersList = ({ users }: UsersListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Utilisateurs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-red-100">
                    <User className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {user.first_name} {user.last_name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {user.is_superuser && (
                    <Badge className="bg-purple-100 text-purple-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                  <Badge className={user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {user.is_active ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersList; 