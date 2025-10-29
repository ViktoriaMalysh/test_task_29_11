"use client";

import { useAssignPeople, usePeople } from "@/hooks/usePeople";
import { usePeopleStore } from "@/store/store";
import { rolesList } from "@/units/constants";
import { IEditState, IOption, IPerson, Role } from "@/units/interfaces";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";

const initEditState: IEditState = {
  id: "",
  newRole: "none",
};

export default function Home() {
  const { people, setPeople } = usePeopleStore();
  const {
    mutate: assignPerson,
    isPending,
    error: errorAssign,
  } = useAssignPeople();

  const { data, isLoading, error } = usePeople();

  const [isEditPerson, setIsEditPerson] = useState<IEditState>(initEditState);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (error) {
      const message = (error as Error).message || "Something went wrong";
      toast.error(message);
    }
    if (errorAssign) {
      const message = (errorAssign as Error).message || "Something went wrong";
      toast.error(message);
    }
  }, [error, toast, errorAssign]);

  useEffect(() => {
    if (data) setPeople(data);
  }, [data, setPeople]);

  const handleAssign = () => {
    assignPerson({
      person_id: isEditPerson.id,
      new_role: isEditPerson.newRole,
    });

    setIsEditPerson(initEditState);
  };

  const getLabel = (role: Role) => {
    switch (role) {
      case "leader":
        return "Leader";

      case "group1":
        return "Group 1";

      case "group2":
        return "Group 2";

      case "none":
        return "Not setup";

      default:
        break;
    }
  };

  const filteredPeople = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return normalizedQuery
      ? people.filter((p) => p.name.toLowerCase().includes(normalizedQuery))
      : people;
  }, [people, query]);

  return (
    <>
      <div className="font-sans flex flex-col gap-4">
        <div className="bg-neutral-200 border-none px-8 py-4 text-2xl font-semibold">
          People{" "}
          <span className="border border-neutral-300 px-2">
            {filteredPeople.length}
          </span>
        </div>
        <div>
          {isLoading ? (
            <div className="h-[85vh] w-full flex justify-center items-center">
              <Spinner className="size-8" />
            </div>
          ) : (
            <div className="px-8 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Search by name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-base w-60"
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-gray-700">
                {filteredPeople.map((person: IPerson, index: number) => (
                  <div
                    className="border border-neutral-300 bg-neutral-200 rounded-[5px] p-4"
                    key={index}
                  >
                    <p className="font-semibold text-[20px]">{person.name}</p>
                    {isEditPerson.id && isEditPerson.id === person.id ? (
                      <div className="flex gap-4">
                        <select
                          className="rounded-[5px] border border-borderLight px-3 py-2 shadow-sm"
                          value={isEditPerson.newRole}
                          onChange={(e) =>
                            setIsEditPerson({
                              ...isEditPerson,
                              newRole: e.target.value as Role,
                            })
                          }
                        >
                          {rolesList.map((role: IOption, indexRole: number) => (
                            <option
                              key={indexRole}
                              value={role.value}
                              disabled={
                                people.find((item) => item.role === "leader") &&
                                role.value === "leader"
                              }
                            >
                              {role.label}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleAssign()}
                          disabled={isPending}
                          className="border border-gray-500 text-gray-700 px-3 py-1 rounded"
                        >
                          &#x2713;
                        </button>
                        <button
                          onClick={() => setIsEditPerson(initEditState)}
                          disabled={isPending}
                          className="border border-gray-500 text-gray-700 px-3 py-1 rounded"
                        >
                          &#10008;
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-start items-center gap-4">
                        <p>{getLabel(person.role)}</p>
                        <button
                          onClick={() =>
                            setIsEditPerson({
                              newRole: person.role,
                              id: person.id,
                            })
                          }
                          disabled={isPending}
                          className="border border-gray-500 text-gray-700 px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
