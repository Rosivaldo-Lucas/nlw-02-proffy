import React from 'react';

import './styles.css';

const CreateUser: React.FC = () => {
  return (
    <div id="page-create-user">
      <section className="create-user">
        <h2>Cadastro</h2>
        <p>Preencha os dados abaixo para começar.</p>

        <form>
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="Sobrenome" />
          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="Senha" />
        </form>

      </section>
      <section className="banner-vai">
        <div>banner</div>
        jdhjdhdjh
      </section>
    </div>
  );
};

export default CreateUser;
