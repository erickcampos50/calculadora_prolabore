/**
 * chart-controller.js - Configuração e renderização de gráficos
 * Gerencia a criação e atualização do gráfico de comparação de valores
 */

const ChartController = {
    /**
     * Gera os dados para o gráfico
     * @return {Object} Objeto contendo os arrays com os valores para o gráfico
     */
    gerarDadosGrafico: function() {
        const valoresLiquidos = [];
        const valoresBrutos = [];
        const valoresINSS = [];
        const valoresIRRF = [];
        const valoresCPP = [];
        const valoresRequisicao = [];
        const valoresDotacao = [];

        // Gerar dados para uma faixa de valores líquidos
        for (let valorLiquido = 1000; valorLiquido <= 20000; valorLiquido += 1000) {
            valoresLiquidos.push(valorLiquido);
            
            // Calcular o valor bruto correspondente
            let salarioBruto = Calculator.calcularBrutoAPartirDeLiquido(valorLiquido, false);
            valoresBrutos.push(salarioBruto);

            // Calcular INSS e IRRF para o salário bruto
            let inssObj = TaxCalculator.calcularInssProgressivo(salarioBruto);
            let irrfObj = TaxCalculator.calcularIrrfDetalhado(salarioBruto - inssObj.total);
            valoresINSS.push(inssObj.total);
            valoresIRRF.push(irrfObj.total);

            // Calcular CPP
            const cppAliquota = parseFloat($('#cppAliquota').val()) / 100 || 0.2; // Valor padrão de 20%
            const cppValor = salarioBruto * cppAliquota / (1 - cppAliquota);
            valoresCPP.push(cppValor);
            
            // Valor da requisição = Valor bruto + CPP
            const valorRequisicao = salarioBruto + cppValor;
            valoresRequisicao.push(valorRequisicao);
            
            // Valor da requisição do SIGA = Valor da requisição - CPP
            valoresDotacao.push(valorRequisicao - cppValor);
        }

        return { 
            valoresLiquidos, 
            valoresBrutos, 
            valoresINSS, 
            valoresIRRF, 
            valoresCPP,
            valoresRequisicao,
            valoresDotacao 
        };
    },

    /**
     * Renderiza o gráfico na tela
     */
    renderizarGrafico: function() {
        const { valoresLiquidos, valoresBrutos, valoresINSS, valoresIRRF, valoresCPP, valoresRequisicao, valoresDotacao } = this.gerarDadosGrafico();

        const ctx = document.getElementById('graficoBrutoLiquido').getContext('2d');
        
        // Limpar gráfico anterior se existir
        if (window.calculadoraChart) {
            window.calculadoraChart.destroy();
        }
        
        // Criar novo gráfico
        window.calculadoraChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: valoresLiquidos,
                datasets: [
                    {
                        label: 'Valor da dotação',
                        data: valoresRequisicao,
                        borderColor: 'rgba(0, 128, 0, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Valor da requisição do SIGA',
                        data: valoresDotacao,
                        borderColor: 'rgba(0, 151, 167, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Valor Bruto (Base)',
                        data: valoresBrutos,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Desconto INSS',
                        data: valoresINSS,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Desconto IRRF',
                        data: valoresIRRF,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Valor CPP',
                        data: valoresCPP,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                stacked: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Valor Líquido Desejado (R$)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Valores (R$)'
                        }
                    }
                }
            }
        });
    }
};

// Exportar o objeto ChartController para uso em outros módulos
window.ChartController = ChartController;