import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import Link from "next/link";

interface Props {
  users: User[];
}

const UserDataTable = ({ users }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow className="bg-secondary">
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              ? users.map((users) => (
                  <TableRow key={users.id} data-href="/">
                    <TableCell>
                      <Link href={`/users/${users.id}`}>{users.name}</Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/users/${users.id}`}>{users.email}</Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/users/${users.id}`}>{users.role}</Link>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserDataTable;
