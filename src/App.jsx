import { Analytics } from '@vercel/analytics/react';
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RootRouter } from "./rootRouter";


const App = () => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false}>
        {(toastInstance) => (
          <ToastBar toast={toastInstance}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {toastInstance.type !== "loading" && (
                  <button
                    onClick={() => toast.dismiss(toastInstance.id)}
                    className="ml-2 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
                    aria-label="Dismiss"
                  >
                    ✕
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <RootRouter />
      <Analytics />
    </Provider>
  );
};

export default App;
