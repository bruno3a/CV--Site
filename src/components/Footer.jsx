import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background-dark py-8">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Tu Nombre. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;