import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { getAccommodations, getAccommodationById } from "../../services/AccommodationsService";
import Modal from "../Common/Modal";
import AccommodationForm from "./AccommodationForm";
import Spinner from "../Common/Spinner";
import { setLoading, subscribeLoading } from "../../services/LoadingService";
import AccommodationCard from "./AccommodationCard";
import Pagination from "../Common/Pagination";
import DetailsModal from "./DetailsModal";
import { Accommodation } from "../../types";

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [filtered, setFiltered] = useState<Accommodation[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState<Accommodation | null>(null);
  const [loading, setLoadingState] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const unsub = subscribeLoading(setLoadingState);
    fetchAccommodations();
    return () => unsub();
  }, []);

  useEffect(() => {
    const filteredList = accommodations.filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.address.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
    setCurrentPage(1);
  }, [search, accommodations]);

  const fetchAccommodations = async () => {
    setLoading(true);
    const data = await getAccommodations();
    setAccommodations(data);
    setLoading(false);
  };

  const handleEdit = (accommodation: Accommodation) => {
    setEditingAccommodation(accommodation);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingAccommodation(null);
    setIsModalOpen(true);
  };

  const closeModal = (shouldReload = false) => {
    setIsModalOpen(false);
    setEditingAccommodation(null);
    if (shouldReload) fetchAccommodations();
  };

  const handleViewMore = async (id: number) => {
  setSelectedAccommodation({ id } as Accommodation);
  setDetailsLoading(true);
  try {
    const data = await getAccommodationById(id);
    setSelectedAccommodation(data);
  } finally {
    setDetailsLoading(false);
  }
  };

  const closeDetailsModal = () => setSelectedAccommodation(null);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Alojamientos</h1>
        <button
          onClick={handleCreate}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Alojamiento</span>
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre o dirección..."
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Spinner className="my-10" />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginated.map((a) => (
            <AccommodationCard
              key={a.id}
              accommodation={a}
              onEdit={handleEdit}
              onView={handleViewMore}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => closeModal(false)}
        title={editingAccommodation ? "Editar Alojamiento" : "Nuevo Alojamiento"}
        size="lg"
        loading={loading}
      >
        <AccommodationForm
          accommodation={editingAccommodation}
          onClose={() => closeModal(true)}
          loading={loading}
        />
      </Modal>

      <DetailsModal
        isOpen={!!selectedAccommodation}
        onClose={closeDetailsModal}
        accommodation={selectedAccommodation}
        loading={detailsLoading}
      />
    </div>
  );
};

export default AccommodationList;
