'use client';

export default function DeleteConfirmModal({ concierto, onCancel, onConfirm, borrando }) {
  if (!concierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-cream max-w-sm w-full p-6 shadow-xl">
        <h3 className="font-display text-xl mb-2">¿Eliminar concierto?</h3>
        <p className="text-sm text-stone leading-relaxed mb-6">
          Esta acción no se puede deshacer. El concierto{' '}
          <strong>{concierto.titulo}</strong> será eliminado permanentemente
          de la base de datos.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={borrando}
            className="border border-ink/20 px-4 py-2 text-sm font-medium hover:bg-ink/5 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={borrando}
            className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-2 text-sm font-medium disabled:opacity-60"
          >
            {borrando ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
