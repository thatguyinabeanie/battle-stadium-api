"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link } from "@nextui-org/react";

import { components } from "@/lib/battle-stadium-api";

type User = components["schemas"]["User"];

export interface PlayersTableProps {
  players: User[];
  columns: { key: string; label: string }[];
}

const renderCell = (row: User, columnKey: React.Key) => {
  const { username } = row;

  switch (columnKey) {
    case "username":
      return <Link href={`/players/${username}`}>{username}</Link>;
    case "pronouns":
      return row.pronouns ?? "they/them";
    default:
      return row[columnKey as keyof User] ?? "-";
  }
};

export default function PlayersTable({ players, columns }: PlayersTableProps) {
  return (
    <Table isStriped aria-label="list of tournaments" shadow="none">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody items={players}>
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
