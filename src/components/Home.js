import React from "react";

import BurguerMenu from "./BurguerMenu";

function Home(props) {
  return (
    <BurguerMenu>
      <h1>
        <a href="https://github.com/igoroctaviano/sige-rh">SIGE RH</a>
      </h1>
      <h2 className="description">
        Integração de Recursos Humanos como trabalho prático de Sistemas
        Integrados de Gestão Empresarial
      </h2>
      <nav>
        <a className="special-btn" target={'_blank'} href={'https://github.com/igoroctaviano/sige-rh'}>API</a>
        <a className="special-btn" target={'_blank'} href={'https://github.com/igoroctaviano/sige-rh-react'}>Versionamento</a>
      </nav>
    </BurguerMenu>
  );
}

export default Home;
