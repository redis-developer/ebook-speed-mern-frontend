import { toast, ToastOptions } from 'react-toastify';

/**
 * <ToastContainer> must be added in app UI
 * ReactToastify.css must be included
 */
const defaultSettings: ToastOptions<{}> = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

class ToastCls {
    static success(_message: string) {
        if (_message) {
            toast.success(_message, defaultSettings);
        }
    }

    static error(_message: string) {
        if (_message) {
            toast.error(_message, defaultSettings);
        }
    }

    static info(_message: string) {
        if (_message) {
            toast.info(_message, defaultSettings);
        }
    }
}

export {
    ToastCls
};