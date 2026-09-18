import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";

type ChildProps = {
  dateOfBirth: string;
};

type SuggestedBracket = {
  suggested: AgeBracket;
  brackets: AgeBracket[];
};

type AgeBracket = {
  id: string;
  label: string;
  age: Age;
};

type Age = {
  unit: String;
  at: number | null;
  min: number | null;
  max_inclusive: number | null;
  max_exclusive: number | null;
};

function NutritionalScreening({ dateOfBirth }: ChildProps) {
  useEffect(() => {
    async function fetchSuggestedBracket() {
      try {
        const brackets = await invoke<SuggestedBracket>(
          "get_suggested_age_bracket",
          {
            birthDate: dateOfBirth,
          },
        );

        console.log(brackets);
      } catch (error) {
        console.log("Failed to fetch age bracket: " + error);
      }
    }

    fetchSuggestedBracket();
  }, []);

  return <div></div>;
}

export default NutritionalScreening;
