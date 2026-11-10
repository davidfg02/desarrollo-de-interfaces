import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientsService } from '../services/ClientsService';

export default function EditClientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadClient() {
      if (!id || isNaN(Number(id))) {
        setError('Id de cliente no válido');
        return;
      }
      try {
        const data = await ClientsService.getClient(Number(id));
        setClient(data);
      } catch (e: any) {
        setError(e.message);
      }
    }
    loadClient();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Se excluye el id del body: es la clave primaria y no debe actualizarse
      const { id: _id, ...changes } = client;
      await ClientsService.updateClient(Number(id), changes);
      navigate('/clients');
    } catch (e: any) {
      setError(e.message);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setClient({ ...client, [e.target.name]: e.target.value });
  }

  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;
  if (!client) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <h2>Editar cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" name="name" value={client.name ?? ''} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" type="email" name="email" value={client.email ?? ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input className="form-control" name="phone" value={client.phone ?? ''} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary me-2">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/clients')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}