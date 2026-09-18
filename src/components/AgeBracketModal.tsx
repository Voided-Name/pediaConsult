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
    <div>
      <dialog ref={suggestedDialog} id="suggestedDialog">
        <button autoFocus>Close</button>
        <p>This modal dialog has a groovy backdrop!</p>
      </dialog>
    </div>
  );
}

export default AgeBracketModal;
