/**Esse projeto é o quarto e consiste em um tipo de calculadora de juros
 *onde o usuário digita o atual valor guardado (current savings), o valor por ano
 (yearly savings), o juros esperado (expected interest) a quantidade de anos
 que o investimento vai durar (investiment durations) e deve aparecer uma tabela
 com cada valor por ano. Essa tarefa deveria ser feita por nós, cheguei a 
 fazer, mas deu erro, vou acompanhar o professor e tentar fazer novamente.
 Primeiro foram criados as pastas e os arquivos dentro da pasta componentes,
 dividindo a parte do Header, UserInput e da tabela. */

 import Header from "./components/Header/Header";
 import UserInput from "./components/UserInput/UserInput";
 import ResultsTable from "./components/ResultsTable/ResultsTable";
import { useState } from "react";
 
 /**Ainda na aula 117 é criado o useState abaixo para que o setUserInput, ou seja, para
  * que as informações inseridas no Input, mas já alteradas, seja passada dentro da função.
   */
 function App() {
  const [userInput, setUserInput] = useState(null);
/**A função abaixo vai fazer o cálculo, ela já veio pronta. Pelo que entendi,
 * a função apenas vai receber o input do usuário como parâmetro e depois
 * já alterado, ou seja, já com algo digitado (não entendi muito bem) 
  */
   const calculateHandler = (userInput) => {
    setUserInput(userInput);
   };
     
 /**Para executar efetivamente o cálculo, primeiro, criou um array vazio
  * Depois, se (if) algo for digitado, as variáveis são criadas, o cálculo feito é
  * empurrado (push) para dentro do array.
  */
     const yearlyData = []; // per-year results
   
      if (userInput) {
        let currentSavings = +userInput["current-savings"]; // feel free to change the shape of this input object!
        const yearlyContribution = +userInput["yearly-contribution"]; // as mentioned: feel free to change the shape...
        const expectedReturn = +userInput["expected-return"] / 100;
        const duration = +userInput["duration"];
    
        // The below code calculates yearly results (total savings, interest etc)
        for (let i = 0; i < duration; i++) {
          const yearlyInterest = currentSavings * expectedReturn;
          currentSavings += yearlyInterest + yearlyContribution;
          yearlyData.push({
            // feel free to change the shape of the data pushed to the array!
            year: i + 1,
            yearlyInterest: yearlyInterest,
            savingsEndOfYear: currentSavings,
            yearlyContribution: yearlyContribution
          });
        }
    }
      
 /**Os componentes vão sendo criados e realocados no return abaixo, que é
  * a ordem que vai aparecer na página.
  * Na aula 117 dentro do UserInput foi passado o onCalculate que é o props para passar
  * a função calculateHandler que é a que efetivamente faz os cálculos para depois mostrar na tabela.
  *Na aula 118, vai ser inserido o código para que a tabela seja mostrada condicionalmente,
  ou seja, somente se algo for preenchido e o formulário for submetido. Para isso foi criada
  a lógica abaixo onde se userInput for falso, se não for preenchido, é mostrada a mensagem,
  se não, é mostrada a tabela. Lembrando q o estado de Null foi setado no começo da função.
  Depois foi criado um props de nome data e passado o yearlyData (os dados inseridos e já calculados)
  como parâmetro.
  Já o props initialInvestment é necessário no resultsTable e corresponde ao valor 
  inicialmente digitado pelo usuário, por isso foi passado dessa maneira abaixo. */
   return (
     <div>
       <Header />
       <UserInput onCalculate={calculateHandler}/>
       {!userInput && {{textAlign: 'center'}}<p>No investment calculated yet.</p>}
       {userInput && <ResultsTable data={yearlyData} initialInvestment={userInput['current-savings']}/>}
 
       
      
      
     </div>
   );
 }
 
 export default App;
 