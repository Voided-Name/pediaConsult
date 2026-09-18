import { useEffect, useRef } from "react";
import { SuggestedBracket } from "../utils/types";
type ChildProps = {
  suggestedBracket: SuggestedBracket;
};

function AgeBracketModal({ suggestedBracket }: ChildProps) {
  const suggestedDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    suggestedDialog.current?.showModal();
  }, []);

  return (
    <dialog
      ref={suggestedDialog}
      id="suggestedDialog"
      className="fixed inset-0 m-auto"
    >
      <button autoFocus>Close</button>
      <p>This modal dialog has a groovy backdrop!</p>
    </dialog>
  );
}

export default AgeBracketModal;
