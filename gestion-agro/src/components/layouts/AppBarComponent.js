import React from 'react';
import Tag1 from './Tag1';
import Tag2 from './Tag2';

function AppBarComponent() {
  const name = 'Tag2'; // Variable que determina el nombre del componente a renderizar

  const components = {
    Tag1: Tag1,
    Tag2: Tag2,
  };

  const DynamicTag = components[name]; // Accede al componente según el nombre

  return (
    <div>
      <h1>Componente dinámico</h1>
      <DynamicTag /> {/* Renderiza el componente dinámicamente */}
    </div>
  );
}

export default AppBarComponent;