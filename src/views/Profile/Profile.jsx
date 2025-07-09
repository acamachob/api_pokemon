export default function Profile() {
  const user = JSON.parse(localStorage.getItem("auth"));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
      {user ? (
        <div className="mt-2">
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>No hay información del usuario disponible.</p>
      )}
    </div>
  );
}
