import { useState } from "react";
import Stack from "@mui/material/Stack";
import { SearchByEmail, SearchByPhone, AllUsers } from "./UserList";
import { EditUserDialog, SubscriptionDialog } from "./UserInfo";

const UsersPanel = () => {
  const [editUser, setEditUser] = useState(null);
  const [subUser, setSubUser] = useState(null);

  return (
    <>
      <Stack spacing={3}>
        <SearchByEmail onEdit={setEditUser} onViewSub={setSubUser} />
        <SearchByPhone onEdit={setEditUser} onViewSub={setSubUser} />
        <AllUsers onEdit={setEditUser} onViewSub={setSubUser} />
      </Stack>

      <EditUserDialog
        user={editUser}
        open={Boolean(editUser)}
        onClose={() => setEditUser(null)}
      />

      <SubscriptionDialog
        user={subUser}
        open={Boolean(subUser)}
        onClose={() => setSubUser(null)}
      />
    </>
  );
};

export default UsersPanel;
