import { Edit, MapPin } from "lucide-react";
import { Accommodation } from "../../types";

interface Props {
    accommodation: Accommodation;
    onEdit: (a: Accommodation) => void;
    onView: (id: number) => void;
}

const AccommodationCard = ({ accommodation, onEdit, onView }: Props) => {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-[400px] relative flex flex-col justify-between overflow-hidden">
        <div className="p-6 pb-20">
            <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{accommodation.name}</h3>
            <button
                onClick={() => onEdit(accommodation)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
            >
                <Edit className="w-4 h-4" />
            </button>
            </div>

            <div className="space-y-2 mb-3 text-sm text-gray-600">
            <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {accommodation.address}
            </div>
            <p className="line-clamp-3 overflow-hidden text-ellipsis">{accommodation.description}</p>
            </div>

            {accommodation.image && (
            <img
                src={accommodation.image}
                alt={accommodation.name}
                loading="lazy"
                className="absolute bottom-14 left-0 w-full h-32 object-cover transition-transform hover:scale-105"
            />
            )}
        </div>

        <button
            onClick={() => onView(accommodation.id)}
            className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
        >
            Ver más
        </button>
        </div>
    );
};

export default AccommodationCard;
