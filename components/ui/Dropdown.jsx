"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

export default function Dropdown({ setWho, setId }) {
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const [allDoctors, setAllDoctors] = React.useState([]);
  React.useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch("/api/doctor");
        if (!response.ok) {
          throw new Error("Failed to fetch prescriptions");
        }
        const data = await response.json();
        console.log(data);
        setAllDoctors(data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    allDoctors.length > 0 && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selectedOption.name ? selectedOption.name : "Select a doctor"}
            <ChevronDown className="ml-2 h-4  opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]" align="start" sideOffset={5}>
          {allDoctors.map((option) => (
            <DropdownMenuItem
              key={option.id}
              onSelect={() => {
                setSelectedOption(option);
                setWho("user");
                setId(option.id);
              }}
              className="justify-between"
            >
              {option.name}
              {option.id === selectedOption.id && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
