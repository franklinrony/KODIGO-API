import { Accommodation } from "../../types";
import Spinner from "../Common/Spinner";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    accommodation: Accommodation | null;
    loading: boolean;
}

const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} a las ${hours}:${minutes}`;
};

const DetailsModal = ({ isOpen, onClose, accommodation, loading }: Props) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg max-w-xl w-full p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
                {accommodation?.name || "Detalles del Alojamiento"}
            </h2>
            <button onClick={onClose} className="text-red-500 hover:text-red-700 font-semibold">
                Cerrar
            </button>
            </div>

            {loading || !accommodation ? (
            <Spinner className="my-10" />
            ) : (
            <div className="space-y-4">
                <img
                src={accommodation.image}
                alt={accommodation.name}
                className="w-full h-60 object-cover rounded"
                />
                <div>
                <strong>Dirección:</strong> {accommodation.address}
                </div>
                <div>
                <strong>Descripción:</strong> {accommodation.description}
                </div>
                <div className="text-xs text-gray-400">
                Creado: {formatDateTime(accommodation.created_at)}
                </div>
                <div className="text-xs text-gray-400">
                Actualizado: {formatDateTime(accommodation.updated_at)}
                </div>
            </div>
            )}
        </div>
        </div>
    );
};

export default DetailsModal;