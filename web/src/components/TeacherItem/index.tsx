import React from 'react';

import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

const TeacherItem:React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars1.githubusercontent.com/u/53700136?s=460&u=d42f60996d55805cce70437836b5c781c0f75896&v=4" alt="Rosivaldo Lucas"/>
        <div>
          <strong>Rosivaldo Lucas</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
        Texto
        <br /><br />
        Texto
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 20,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
