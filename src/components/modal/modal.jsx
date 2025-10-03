import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-80"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-80"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal Panel */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300 ease-out"
            enterFrom="scale-95 opacity-0 translate-y-4"
            enterTo="scale-100 opacity-100 translate-y-0"
            leave="transition-transform duration-200 ease-in"
            leaveFrom="scale-100 opacity-100 translate-y-0"
            leaveTo="scale-95 opacity-0 translate-y-4"
          >
            <Dialog.Panel className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 shadow-sm transition"
              >
                ✕
              </button>

              {/* Title */}
              {title && (
                <Dialog.Title className="text-2xl font-bold text-center mb-6 text-gray-900">
                  {title}
                </Dialog.Title>
              )}

              {/* Content */}
              <div className="relative z-10 space-y-4">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
