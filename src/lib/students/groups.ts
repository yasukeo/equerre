import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { LevelOption, StudentStatus } from "./queries";

// Groups, as the tutor manages them (DECISIONS.md, D-072).

function must<Result extends { data: unknown; error: unknown }>(
  result: Result,
): NonNullable<Result["data"]> | null {
  if (result.error) throw new Error("Could not read the groups", { cause: result.error });
  return result.data ?? null;
}

export type GroupRow = {
  id: string;
  name: string;
  levelLabel: string | null;
  scheduleLabel: string | null;
  members: number;
};

export async function listGroups(): Promise<{ groups: GroupRow[]; levels: LevelOption[] }> {
  const supabase = await createClient();
  const [groups, levels] = await Promise.all([
    supabase
      .from("groups")
      .select("id, name, schedule_label, level:levels(label), members:group_members(left_at)")
      .order("name"),
    supabase.from("levels").select("code, label").order("position"),
  ]);
  return {
    groups: (must(groups) ?? []).map((group) => ({
      id: group.id,
      name: group.name,
      levelLabel: group.level?.label ?? null,
      scheduleLabel: group.schedule_label,
      members: group.members.filter((member) => member.left_at === null).length,
    })),
    levels: must(levels) ?? [],
  };
}

export type GroupFile = {
  id: string;
  name: string;
  levelCode: string | null;
  scheduleLabel: string | null;
  members: {
    id: string;
    name: string;
    status: StudentStatus;
    levelLabel: string | null;
    joinedAt: string;
  }[];
  /** Students who could join: every student not in it, stopped ones excepted (D-060). */
  candidates: { id: string; name: string; levelLabel: string | null }[];
  /** Homework, sessions or messages hold on to the group: renamed or emptied, not deleted. */
  hasHistory: boolean;
  /** The group's conversation (D-080). */
  conversationId: string | null;
  levels: LevelOption[];
};

export async function getGroup(id: string): Promise<GroupFile | null> {
  const supabase = await createClient();
  const group = must(
    await supabase
      .from("groups")
      .select(
        "id, name, level_code, schedule_label, members:group_members(joined_at, left_at, student:profiles(id, full_name, status, level:levels(label)))",
      )
      .eq("id", id)
      .maybeSingle(),
  );
  if (!group) return null;

  const [students, assignments, sessions, levels, conversation] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, status, level:levels(label)")
      .eq("role", "student")
      .neq("status", "arrete")
      .order("full_name"),
    supabase.from("assignments").select("id", { count: "exact", head: true }).eq("group_id", id),
    supabase.from("sessions").select("id", { count: "exact", head: true }).eq("group_id", id),
    supabase.from("levels").select("code, label").order("position"),
    supabase.from("conversations").select("id, last_message_at").eq("group_id", id).maybeSingle(),
  ]);
  if (assignments.error || sessions.error) {
    throw new Error("Could not read the group's history", {
      cause: assignments.error ?? sessions.error,
    });
  }

  // Members today; those who left keep their past in the group (D-070).
  const members = group.members
    .filter((member) => member.left_at === null)
    .map((member) => ({
      id: member.student.id,
      name: member.student.full_name,
      status: member.student.status,
      levelLabel: member.student.level?.label ?? null,
      joinedAt: member.joined_at,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
  const inGroup = new Set(members.map((member) => member.id));

  return {
    id: group.id,
    name: group.name,
    levelCode: group.level_code,
    scheduleLabel: group.schedule_label,
    members,
    candidates: (must(students) ?? [])
      .filter((student) => !inGroup.has(student.id))
      .map((student) => ({
        id: student.id,
        name: student.full_name,
        levelLabel: student.level?.label ?? null,
      })),
    hasHistory:
      (assignments.count ?? 0) + (sessions.count ?? 0) > 0 ||
      Boolean(conversation.data?.last_message_at),
    conversationId: conversation.data?.id ?? null,
    levels: must(levels) ?? [],
  };
}
