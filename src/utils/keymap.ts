import { useEffect } from "react";
import { useNavigate } from "react-router";

export function keymap(): void {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateVisits = (event: KeyboardEvent): void => {
      const isModifierPressed = event.ctrlKey;

      if (
        isModifierPressed &&
        event.key.toLowerCase() === "i"
      ) {
        event.preventDefault();
        navigate("/");
      }
    };

    const navigateAddVisits = (event: KeyboardEvent): void => {
      const isModifierPressed = event.ctrlKey;

      if (
        isModifierPressed &&
        event.key.toLowerCase() === "n"
      ) {
        event.preventDefault();
        navigate("/encounter/add");
      }
    };

    const navigatePatients = (event: KeyboardEvent): void => {
      const isModifierPressed = event.ctrlKey;

      if (
        isModifierPressed &&
        event.key.toLowerCase() === "t"
      ) {
        event.preventDefault();
        navigate("/patient");
      }
    };

    const navigateAddPatients = (event: KeyboardEvent): void => {
      const isModifierPressed = event.ctrlKey;

      if (
        isModifierPressed &&
        event.shiftKey &&
        event.key.toLowerCase() === "n"
      ) {
        event.preventDefault();
        navigate("/patient/add");
      }
    };

    window.addEventListener("keydown", navigateVisits);
    window.addEventListener("keydown", navigateAddVisits);
    window.addEventListener("keydown", navigatePatients);
    window.addEventListener("keydown", navigateAddPatients);

    return () => {
      window.removeEventListener("keydown", navigateVisits);
      window.removeEventListener("keydown", navigateAddVisits);
      window.removeEventListener("keydown", navigatePatients);
      window.removeEventListener("keydown", navigateAddPatients);
    };
  }, [navigate])
}
