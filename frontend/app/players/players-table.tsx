"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link } from "@/components/nextui-use-client";

import { UserProfile } from "@/lib/api";

export interface PlayersTableProps {
  players: UserProfile[];
  columns: { key: string; label: string }[];
}

export default function PlayersTable({ players, columns }: PlayersTableProps) {
  return (
    <div className="flex flex-col items-center justify-center h-90 w-90">
      <Table
        isHeaderSticky
        isVirtualized
        aria-label="Players List"
        classNames={{
          wrapper: "bg-transparent backdrop-blur-md rounded-3xl border-small border-neutral-500/40 h-90 w-90",
        }}
        selectionMode="single"
        shadow="md"
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>

        <TableBody items={players}>
          {(item) => (
            <TableRow key={item.id} as={Link} href={`/players/${item.username}`} style={{ cursor: "pointer" }}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function renderCell(row: UserProfile, columnKey: React.Key) {
  const { username } = row;

  switch (columnKey) {
    case "username":
      return <Link href={`/players/${username}`}>{username}</Link>;
    case "pronouns":
      return row.pronouns ?? "they/them";
    default:
      return row[columnKey as keyof UserProfile] ?? "-";
  }
}
