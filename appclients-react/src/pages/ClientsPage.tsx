import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClientsService } from '../services/ClientsService';

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);

  const loadClients = async () => {
    const data = await ClientsService.getClients();
    setClients(data);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que quieres borrar este cliente?')) return;
    await ClientsService.deleteClient(id);
    loadClients(); // recarga la lista
  };

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Clientes</h2>
      <Link to="/addClient" className="btn btn-primary mb-3">Nuevo Cliente</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                <Link to={`/editClient/${client.id}`} className="btn btn-sm btn-warning me-2">
                  Editar
                </Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(client.id)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}