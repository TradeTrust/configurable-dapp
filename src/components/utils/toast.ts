import { toast } from 'react-toastify';

toast.configure({
    autoClose: 8000,
    draggable: false,
});

export const notify = (message: string) => toast("Wow so easy !"+ message);