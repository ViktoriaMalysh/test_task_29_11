import { IPerson, Role } from "@/units/interfaces";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchPeople = async (): Promise<IPerson[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/people`);
  if (!res.ok) throw new Error("Failed to fetch people list");
  return res.json();
};

interface AssignPayload {
  person_id: string;
  new_role: Role;
}

const assignPeople = async (payload: AssignPayload): Promise<IPerson> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assign`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.detail || "Failed to assign person");
  }
  return res.json();
};

export const usePeople = () => {
  return useQuery({
    queryKey: ["people"],
    queryFn: fetchPeople,
  });
};

export const useAssignPeople = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignPeople,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};
