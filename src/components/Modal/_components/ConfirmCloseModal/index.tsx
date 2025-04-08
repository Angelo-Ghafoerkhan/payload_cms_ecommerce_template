import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useEffect, useRef } from 'react'

const ConfirmCloseModal: React.FC<{
  message?: string
  onConfirm: () => void
  onCancel: () => void
}> = ({ message, onConfirm, onCancel }) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const confirmButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCancel])

  useEffect(() => {
    const handleTouchEnd = (e: TouchEvent, action: () => void) => {
      action()
    }

    const cancelButton = cancelButtonRef.current
    const confirmButton = confirmButtonRef.current

    if (cancelButton) {
      cancelButton.addEventListener('touchend', (e) => handleTouchEnd(e, onCancel))
    }

    if (confirmButton) {
      confirmButton.addEventListener('touchend', (e) => handleTouchEnd(e, onConfirm))
    }

    return () => {
      if (cancelButton) {
        cancelButton.removeEventListener('touchend', (e) => handleTouchEnd(e, onCancel))
      }

      if (confirmButton) {
        confirmButton.removeEventListener('touchend', (e) => handleTouchEnd(e, onConfirm))
      }
    }
  }, [onCancel, onConfirm])

  return (
    <Transition show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="z-50 pt-4 relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xsl transition-all w-full sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div className="text-lg font-medium text-gray-900">
                  {message ? message : `Are you sure you want to close? Progress won't be saved.`}
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    ref={cancelButtonRef}
                    onClick={onCancel}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    style={{ minWidth: '75px' }}
                  >
                    Cancel
                  </button>
                  <button
                    ref={confirmButtonRef}
                    onClick={onConfirm}
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    style={{ minWidth: '75px' }}
                  >
                    Confirm
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ConfirmCloseModal
