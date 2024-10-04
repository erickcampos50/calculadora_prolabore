# Calculadora Avançada de Valores

Esta é uma ferramenta web interativa desenvolvida para auxiliar no cálculo de pagamentos a pessoas físicas, considerando deduções como INSS, IRRF, alíquotas adicionais e CPP. A calculadora permite personalizar as faixas e alíquotas dos impostos e oferece uma visualização gráfica para estimativas rápidas.

## Funcionalidades

- **Cálculo do Valor Bruto**: A partir de um valor líquido desejado, calcula o valor bruto necessário considerando todas as deduções aplicáveis.
- **Cálculo do Valor Líquido**: Informa o valor líquido que será recebido pelo prestador com base em um valor bruto fornecido.
- **Configurações Personalizáveis**:
  - Ajuste das faixas e alíquotas do INSS e IRRF.
  - Definição de alíquotas adicionais (como ISSQN).
  - Configuração da alíquota do CPP e outros encargos devidos pela UFJF.
- **Detalhamento dos Cálculos**: Exibe um passo a passo dos cálculos realizados para transparência e verificação.
- **Gráfico Interativo**:
  - Mostra a variação do Valor Bruto Calculado em função do Valor Líquido Desejado (R$), para valores entre R$1.000 e R$50.000.
  - Inclui linhas representando o Desconto INSS, Desconto IRRF e Valor CPP.
  - **Observação**: O gráfico não considera nenhuma alíquota adicional e serve apenas para consulta ou estimativa rápida.

## Como Utilizar

1. **Acesse a Calculadora**: Abra o arquivo HTML em um navegador web compatível.

2. **Selecione o Modo de Cálculo**:
   - **Calcular Valor Bruto/Requisição**: Para descobrir o valor bruto necessário para atingir um valor líquido desejado.
   - **Calcular Valor Líquido/Recebido pelo prestador**: Para saber qual será o valor líquido recebido a partir de um valor bruto informado.

3. **Informe o Valor**:
   - Dependendo do modo selecionado, insira o Valor Líquido Desejado ou o Valor Bruto Recebido.

4. **Consulte os Resultados**:
   - O valor calculado (bruto ou líquido) será exibido, juntamente com os descontos de INSS, IRRF e alíquota adicional.
   - O detalhamento dos cálculos estará disponível para verificação.

5. **Personalize as Configurações** (Opcional):
   - Acesse a aba **Configurações** para ajustar as faixas e alíquotas do INSS e IRRF.
   - Defina uma alíquota adicional, caso aplicável.
   - Ajuste a alíquota do CPP e outros encargos devidos pela UFJF.

6. **Visualize o Gráfico**:
   - Acesse a aba **Gráfico** para ver como o Valor Bruto Calculado varia em função do Valor Líquido Desejado.
   - O gráfico inclui linhas para o Valor Bruto, Desconto INSS, Desconto IRRF e Valor CPP.
   - **Importante**: O gráfico não considera alíquotas adicionais configuradas e serve apenas para estimativas rápidas.

## Tecnologias Utilizadas

- **HTML5 e CSS3**: Para a estrutura e estilo da aplicação.
- **JavaScript (jQuery)**: Para manipulação do DOM e lógica dos cálculos.
- **Bootstrap 5**: Para estilização responsiva e componentes UI.
- **Chart.js**: Para renderização dos gráficos interativos.

## Instalação

1. **Download do Projeto**:
   - Baixe o arquivo HTML fornecido ou clone o repositório se estiver disponível.

2. **Execução Local**:
   - Abra o arquivo `index.html` em um navegador web moderno (recomendado: Google Chrome, Mozilla Firefox ou Microsoft Edge).

3. **Pré-requisitos**:
   - Conexão à internet para carregar as bibliotecas externas (jQuery, Bootstrap e Chart.js) via CDN.

## Créditos e Informações

Esta calculadora foi desenvolvida por **Erick C. Campos** (<erick.campos@ufjf.br>) para facilitar o cálculo do valor devido ao pagamento de pessoas físicas na **Universidade Federal de Juiz de Fora (UFJF)**.

### Fontes Oficiais

Os valores e as tabelas utilizados nesta calculadora foram extraídos das seguintes fontes oficiais:

- [Tabela de IRRF 2024 (Receita Federal)](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2024)
- [Tabela de Alíquotas INSS (INSS)](https://www.gov.br/inss/pt-br/noticias/confira-as-aliquotas-de-contribuicao-ao-inss-com-o-aumento-do-salario-minimo)

### Observações

- **Precisão dos Cálculos**: Os resultados fornecidos são aproximados, com base nas informações disponíveis nas fontes mencionadas.
- **Responsabilidade**: A utilização desta calculadora é de responsabilidade do usuário. Esta ferramenta é disponibilizada sem nenhuma garantia.
- **Atualizações**: Mantenha-se atento a possíveis mudanças nas legislações fiscais que possam afetar as alíquotas e faixas utilizadas.

## Contato

Para dúvidas, sugestões ou feedback, entre em contato com:

- **Erick C. Campos**
- **E-mail**: <erick.campos@ufjf.br>

---

**Nota**: Este projeto é de caráter educacional e destina-se a auxiliar nos cálculos relacionados a pagamentos de pessoas físicas, considerando as particularidades da UFJF. Sempre consulte um profissional especializado ou as fontes oficiais para informações atualizadas e precisas.