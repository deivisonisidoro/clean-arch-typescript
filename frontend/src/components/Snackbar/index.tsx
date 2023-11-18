import { useEffect, useState } from 'react';
import { SnackbarProps } from './@types/SnackbarProps';
import { snackbar } from "./variants";



function Snackbar ({ message, type }: SnackbarProps) {
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    const snackbarElement = document.getElementById('snackbar');

    if (snackbarElement) {
      snackbarElement.className = snackbar({ type }) + ` ${showMessage ? 'translate-y-0' : 'translate-y-full'}`;
    }
  }, [type, showMessage]);

  return (
    <div id="snackbar" role="alert">
      <div className="flex items-center">
        <span className="block sm:inline">{message}</span>
        <span className="ml-4 cursor-pointer" onClick={() => showMessage && setShowMessage(false)}>
          <svg
            className={`fill-current h-6 w-6`}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Snackbar;
