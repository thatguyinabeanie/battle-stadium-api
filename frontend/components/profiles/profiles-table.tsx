"use client";

import { Profile } from "@/lib/api";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Image,
  Chip,
} from "@/components/nextui-use-client";
import { cn } from "@/lib";

const columns = [
  { key: "id", label: "ID" },
  { key: "username", label: "Username" },
  { key: "pronouns", label: "Pronouns" },
  { key: "image_url", label: "Image" },
];

interface ProfilesTableProps {
  profiles: Profile[];
}

export function ProfilesTable({ profiles }: Readonly<ProfilesTableProps>) {
  return (
    <Table
      isCompact
      isHeaderSticky
      isVirtualized
      aria-label="list of tournaments"
      classNames={{
        wrapper: "bg-transparent backdrop-blur rounded-3xl border-small border-neutral-500/40",
      }}
      color="secondary"
      selectionMode="single"
      shadow="md"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={profiles}>
        {(profile) => (
          <TableRow key={profile.id} as={Link} href={`/profile/${profile.username}`} style={{ cursor: "pointer" }}>
            {(columnKey) => <TableCell>{renderCell(profile, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function renderCell(row: Profile, columnKey: React.Key) {
  const { username } = row;

  switch (columnKey) {
    case "username":
      return (
        <>
          <Link href={`/players/${username}`}>{username}</Link>
          <Chip className={cn("ml-2", { hidden: !row.default })} radius="full" size="sm">
            default
          </Chip>
        </>
      );
    case "pronouns":
      return row.pronouns ?? "";
    case "image_url":
      return <Image alt={username} height={50} src={row.image_url ?? undefined} width={50} />;
    case "default":
      return row.default ? "true" : "false1";
    default:
      return row[columnKey as keyof Profile] ?? "-";
  }
}
