/**Terceiro, a mesma lógica foi aplicada ao formulário,
 * criando um componente separado. Portanto, observar os componentes
 * que podem ser separados dentro de uma mesma lógica.
 * Quinto, vai começar a construir a lógica para lidar com os botões
 * de submit e reset. Na aula 115 foi incluído o onSubmit para que algo aconteça
 * quando o formulário for submetido, no caso, a função submitHandler, passada sem
 * parênteses para evitar ser chamada automaticamente. Dentro da função é passada 
 * o preventDefault que evita o comportamente padrão do Browser de reiniciar a página
 * toda. Então, no botão de reset, é colocada a função resetHandler na função onClick.
 * A diferença entre o onSubmit e o onClick é que o primeiro vai renderizar
 * todo o formulário, por isso o tipo de formulário para calcular é submit
 * Já o de reset vai executar a função quando for clicado, mas não submeter
 * o formulário todo.
 * Também é necessário ouvir o evento de input, ou seja, o que vai ser digitado
 * dentro de cada input. Para isso, dentro do input foi chamado o onChange
 * e dessa vez uma função anônima para que a função seja corretamente executada
 * com os devidos parâmetros e só seja executada quando os valores mudarem.
 * Assim, dentro da função inputChangeHandler é passado id correspondendo ao atributo
 * input e o event.target.value correspondendo ao parâmetro value. Desta forma,
 * essa função servirá para lidar também com os outros inputs.
 * Sexto, na aula 116, vamos lidar com o estado dos componentes, nesse caso, todos as informações
 * que forem digitadas no INPUT. Vou explicando em comentário 
 * antes de cada item
 * Sétimo passo, na aula 117 o código vai ser configurado para passar a informação que é recebida
 * no input, processada no cálculo e devolvida para a tabela, usando os princípios
 * do lift state up e passando a função de calcular como props. */

import { useState } from "react";
import classes from './UserInput.module.css'
/**Essa variável guarda o estado inicial dos itens para que possa ser passado
 * para o botão de de UserInput e reset, ao invés de copiar diretamente dentro da função.
 */
const initialUserInput = {
  'current.savings': 1000,
  'yearly-contribution': 1200,
  'expected-return': 7,
  'duration': 10,
}
/**Na aula 117 foi incluído o props dentro do UserInput pois é necessário aceitar uma função
 * como props e essa função vai estar definida no componente App.js
 */
const UserInput = (props) => {
/**Seguindo a aula 116 para controle do estado, abaixo, criou-se um useState
 * setando um estado inicial para cada input(depois, acima separado e passada só a referência).
 * Lembrando que poderia também ser um userState para cada componente.
 * Então, na função mais abaixo, do inputChangeHandler, o setUserInput é chamado.
 */
  const [UserInput, setUserInput] = useState(initialUserInput);

/**Na aula 117, dentro da função abaixo que lida com o formulário sendo submetido, é passada
 * o props.onCalculate, sendo o onCalculate uma função que será criada acionada quando a função 
 * calculate for executada. Notar que a função calculate não foi passada diretamente, mas através
 * desse onCalculate. Vale ressaltar que on... é a nomenclatura padrão quando se quer mostrar
 * que aquela função vai ser chamada quando algum evento ocorrer.
 */

  const submitHandler = (event) => {
    event.preventDefault();
    props.onCalculate(UserInput);
  };
  const resetHandler = () => {setUserInput(initialUserInput)};

/**Assim, o setUserInput, ou seja, o estado alterado do input, é passado
 * na função abaixo que vai usar pegar o estado anterior (prevInput)
 * e retornar um array copiado do anterior (...), mas modificado. Aqui se usou
 * uma função de Javascript para setar uma propriedade dinâmicamente, 
 * por isso se colocou input dentro de chaves, assim, todos valores incluídos
 * nos itens input do formulário, serão automaticamente, setados. 
 * Depois, dentro do input é acrescentada essa linha em cada input com o respectivo id:
 *  value={UserInput['current_savings']} 
 * usando o princípio do two-way-binding e passando o valor capturado para
 * a função abaixo.
 */
const inputChangeHandler = (input, value) => {
  setUserInput((prevInput) => {
    return {
      ...prevInput,
      [input]: +value, // the "+" converts the string value to a number
    };
  });
};

return (<form onSubmit={submitHandler} className={classes.form}>
        <div className={classes['input-group']}>
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input
             onChange={(event) =>
              inputChangeHandler('current-savings', event.target.value)}
              value={UserInput['current_savings']} 
              type="number"
              id="current-savings" />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input 
            onChange={(event) =>
              inputChangeHandler('yearly-contribution', event.target.value)}
            value={UserInput['yearly-contribution']} 
            type="number"
            id="yearly-contribution" />
          </p>
        </div>
        <div className={classes['input-group']}>
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input 
            onChange={(event) =>
              inputChangeHandler('expected-return', event.target.value)}
            value={UserInput['expected-return']} 
            type="number"
            id="expected-return" />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input
            onChange={(event) =>
              inputChangeHandler('duration', event.target.value)}
            value={UserInput['duration']} 
            type="number"
            id="duration" />
          </p>
        </div>
        <p className={classes.actions}>
          <button onClick={resetHandler} type="reset" className={classes.buttonAlt}>
            Reset
          </button>
          <button type="submit" className={classes.button}>
            Calculate
          </button>
        </p>
      </form>)

};

export default UserInput;