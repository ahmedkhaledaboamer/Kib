import React from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

function ServiceModal({ isOpen, onClose, link }) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-lg w-full mx-4 rounded-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          <IoClose size={26} />
        </button>

        <h2 className="text-3xl font-bold mb-4">
          {t('modal.publicRelation')}
        </h2>

        <p className="text-gray-600 mb-6">
          {t('modal.publicRelationDesc')}
        </p>

        <Link to={link}>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-[#2f6fb2] text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {t('common.bookNow')}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ServiceModal;
